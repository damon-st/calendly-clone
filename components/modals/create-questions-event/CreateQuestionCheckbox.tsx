"use client";
import { TypeQuestionSelection } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { GripVertical, Plus, Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
type Props = {
  optionsCheckBox: TypeQuestionSelection[];
  setOptionsCheckBox: (e: TypeQuestionSelection[]) => void;
};

export default function CreateQuestionCheckbox({
  optionsCheckBox,
  setOptionsCheckBox,
}: Props) {
  const [options, setOptions] =
    useState<TypeQuestionSelection[]>(optionsCheckBox);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over!.id) {
      setOptions((items) => {
        let temp = [...items];
        let tempInde = temp.map((_, i) => i);
        const oldIndex = tempInde.indexOf(active.id as number);
        const newIndex = tempInde.indexOf(over!.id as number);
        console.log(oldIndex, newIndex);

        return arrayMove(temp, oldIndex, newIndex);
      });
    }
  }

  const handleOnchange = useCallback((t: TypeQuestionSelection, i: number) => {
    setOptions((p) => {
      let temp = [...p];
      temp[i] = t;
      return temp;
    });
  }, []);

  const onAddItem = useCallback(() => {
    setOptions((p) => {
      let temp = [...p];
      temp.push({
        label: "",
        selected: false,
      });
      return temp;
    });
  }, []);

  const handleDelete = useCallback((t: TypeQuestionSelection) => {
    setOptions((p) => {
      let temp = [...p];
      temp = temp.filter((v) => v != t);
      console.log(temp);
      return temp;
    });
  }, []);

  useEffect(() => {
    setOptionsCheckBox(options);
  }, [options, setOptionsCheckBox]);

  return (
    <div className="w-full size-full">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={options.map((_, i) => i)}
          strategy={verticalListSortingStrategy}
        >
          {options.map((id, i) => (
            <ItemQuestion
              handleDelete={() => handleDelete(id)}
              key={i}
              id={i}
              type={id}
              handleOnchange={(v) => handleOnchange(v, i)}
            />
          ))}
        </SortableContext>
      </DndContext>
      <div className="flex items-center">
        <button
          onClick={onAddItem}
          className="flex items-center gap-3 text-colorAzul font-girloyRegular hover:underline"
        >
          <Plus className="text-colorAzul" /> Add Another
        </button>
      </div>
    </div>
  );
}

type PropTy = {
  type: TypeQuestionSelection;
  id: number;
  handleOnchange: (t: TypeQuestionSelection) => void;
  handleDelete: () => void;
};

const ItemQuestion = ({ id, type, handleOnchange, handleDelete }: PropTy) => {
  const [value, setValue] = useState(type);

  useEffect(() => {
    setValue(type);
  }, [type]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleChange = useCallback(
    (e: { target: { value: string } }) => {
      const temp = { ...value, label: e.target.value };
      setValue(temp);
      handleOnchange(temp);
    },
    [handleOnchange, value]
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full min-h-11 flex items-center justify-between mt-2 mb-2"
    >
      <div {...attributes} {...listeners} className="w-[10%] cursor-move">
        <GripVertical className="text-colorTextBlack" size={30} />
      </div>
      <Input
        value={value.label}
        onChange={handleChange}
        className="w-[75%] border border-gray-300"
      />
      <div
        onClick={handleDelete}
        className="w-[13%] min-h-11 flex items-center cursor-pointer justify-center rounded-lg hover:bg-gray-100"
      >
        <Trash2Icon className="text-colorTextBlack" />
      </div>
    </div>
  );
};
