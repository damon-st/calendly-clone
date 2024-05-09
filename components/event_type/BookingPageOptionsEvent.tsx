"use client";
import { TypeEventFormating, TypeInviteQuestions } from "@/lib/types";
import { ChevronLeft, Info, Plus } from "lucide-react";
import React, { useCallback, useMemo, useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { useNewEnventStore } from "@/lib/store/useNewEvent";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import InviteQuestionPreview from "./InviteQuestionPreview";
import { useShowModal } from "@/lib/store/useShowModal";
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
type Props = {
  eventType: TypeEventFormating;
  onClose: (value: boolean) => void;
};

export default function BookingPageOptionsEvent({ eventType, onClose }: Props) {
  const { onSaveChanges } = useNewEnventStore();
  const { onOpen } = useShowModal();
  const [isPending, startTransition] = useTransition();
  const [showSmgLink, setShowSmgLink] = useState(false);
  const [eventLinkName, setEventLinkName] = useState(eventType.eventLinkName);
  const [inviteQuestions, setInviteQuestions] = useState(
    eventType.inviteQuestions
  );
  const router = useRouter();

  const handleClose = useCallback(() => {
    onClose(false);
  }, [onClose]);

  const toggleShowMsg = useCallback((value: boolean) => {
    setShowSmgLink(value);
  }, []);

  const linkUser = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_DOMIAN}/${eventType.user?.userName}/`;
  }, [eventType.user?.userName]);

  const onChangeNameLink = useCallback((e: { target: { value: string } }) => {
    if (e.target.value.length < 2) return;
    setEventLinkName(e.target.value);
  }, []);

  const onSave = useCallback(() => {
    if (isPending) return;
    startTransition(async () => {
      try {
        const save = await onSaveChanges(eventType.id, {
          eventLinkName: eventLinkName,
          inviteQuestions: inviteQuestions,
        });
        if (!save.success) {
          throw new Error(save.message);
        }
        toast.success("Changed saved");
        router.refresh();
      } catch (error) {
        console.log(error);

        toast.error(`${error}`);
      }
    });
  }, [
    eventLinkName,
    eventType.id,
    inviteQuestions,
    isPending,
    onSaveChanges,
    router,
  ]);

  const onCreateQuestionDialg = () => {
    onOpen("createQuestions", {
      onSaveTypeQuestion(type) {
        setInviteQuestions((p) => {
          let temp = [...p];
          temp.push(type);
          return temp;
        });
        onSave();
      },
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      let tempE = [...inviteQuestions];
      console.log(active);
      if (!over!.data!.current!.data.disabled) {
        return;
      }

      const oldIndex = tempE.map((_, i) => i).indexOf(active.id as number);
      const newIndex = tempE.map((_, i) => i).indexOf(over!.id as number);
      tempE = arrayMove(tempE, oldIndex, newIndex);
      setInviteQuestions(tempE);
    }
  };

  return (
    <div className="size-full absolute top-0 bg-white z-50">
      <div className=" px-6 w-full h-[15%] border-b border-gray-300 flex items-start justify-evenly flex-col">
        <button
          disabled={isPending}
          onClick={handleClose}
          type="button"
          className="flex items-center gap-2"
        >
          <ChevronLeft className="text-colorTextBlack" />
          <span className="text-colorTextBlack font-girloyRegular underline">
            Event Type Summary
          </span>
        </button>
        <h2 className="text-colorTextBlack font-girloyBold text-2xl">
          Booking page options
        </h2>
      </div>
      <div className="w-full h-[75%] px-6 flex flex-col gap-2">
        <div className="w-full mt-3">
          <p className="text-colorTextBlack font-girloyBold text-3xl">
            Booking page options
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="x font-girloySemiBold text-colorTextBlack">
            Event link *
          </p>
          <Popover open={showSmgLink} onOpenChange={toggleShowMsg}>
            <PopoverTrigger>
              <Info className="text-colorTextGris cursor-pointer" size={15} />
            </PopoverTrigger>
            <PopoverContent align="start" className="bg-[#333333] text-white">
              <div className="mb-4">
                <p className="font-girloyLight">
                  Event URL is the link you can share with your invitees if you
                  want them to bypass the &quot;Pick Event&quot; step on your
                  Calendly page and go directly to the &quot;Pick Date &
                  Time&quot; step. The event URL is circled in the sample below.
                  We&apos;ll automatically generate an Event URL for you if you
                  don&apos;t specify one.
                </p>
                <picture>
                  <img
                    src="https://assets.calendly.com/assets/frontend/media/help-slug-d2951c0c8b3e55a37dd1.png"
                    alt="img"
                    loading="lazy"
                  />
                </picture>
              </div>
              <button
                onClick={() => toggleShowMsg(false)}
                className="text-white border border-white w-full rounded-full py-3"
              >
                Got it
              </button>
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-colorTextGris font-girloyRegular">{linkUser}</p>
        <Input
          value={eventLinkName}
          onChange={onChangeNameLink}
          className="w-full border border-gray-300"
        />
        <div className="w-full mt-3 flex flex-col gap-3">
          <p className="text-colorTextBlack font-bold text-xl">Booking form</p>
          <p className="text-colorTextBlack font-girloySemiBold">
            Invite questions
          </p>
          <div className="w-full rounded-lg border border-gray-300">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={inviteQuestions.map((v: TypeInviteQuestions, i) => ({
                  id: i,
                }))}
                strategy={verticalListSortingStrategy}
              >
                {inviteQuestions.map((v: TypeInviteQuestions, i) => (
                  <InviteQuestionPreview key={i} invite={v} id={i} />
                ))}
              </SortableContext>
            </DndContext>
          </div>

          <button
            onClick={onCreateQuestionDialg}
            className="text-colorAzul font-girloyRegular flex items-center gap-3"
          >
            <Plus className="text-colorAzul" />
            <span className="hover:underline">Add new question</span>
          </button>
        </div>
      </div>
      <div className="w-full h-[10%] flex items-center justify-end px-6 border-t border-gray-300 gap-4">
        <Button
          disabled={isPending}
          type="button"
          variant="ghost"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          disabled={isPending}
          onClick={onSave}
          variant="azul"
          className="rounded-full"
        >
          Save and close
        </Button>
      </div>
    </div>
  );
}
