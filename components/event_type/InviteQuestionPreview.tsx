import { TypeInviteQuestions } from "@/lib/types";
import {
  Edit2Icon,
  GripVertical,
  LockKeyholeIcon,
  MoreVertical,
  Trash,
} from "lucide-react";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  invite: TypeInviteQuestions;
  id: number;
  onAction: (
    action: "edit" | "delete",
    value: TypeInviteQuestions,
    id: number
  ) => void;
};

export default function InviteQuestionPreview({ invite, id, onAction }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id, disabled: !invite.data.disabled, data: invite });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full border-b border-gray-300 p-4 min-h-12 flex items-center justify-between"
    >
      <div
        {...attributes}
        {...listeners}
        className="flex items-center gap-3 font-girloyRegular"
      >
        {invite.data.disabled ? (
          <GripVertical className="text-colorTextBlack cursor-move" />
        ) : (
          <LockKeyholeIcon className="text-colorTextBlack" />
        )}
        <span>{invite.data.label}</span>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical className="text-colorTextBlack cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => onAction("edit", invite, id)}
              className="cursor-pointer flex items-center gap-2 font-girloyRegular text-lg pointer-events-auto "
            >
              <Edit2Icon className="text-colorTextBlack" />
              <span>Edit</span>
            </DropdownMenuItem>
            {invite.data.disabled && (
              <DropdownMenuItem
                onClick={() => onAction("delete", invite, id)}
                className="cursor-pointer flex items-center gap-2 font-girloyRegular text-lg  text-colorError"
              >
                <Trash className="text-colorError" />
                <span>Delete</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
