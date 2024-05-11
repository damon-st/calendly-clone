"use client";
import { updateMeetingNotesSchedule } from "@/actions/schedule_events";
import EventEditDescription from "@/components/event_type/EventEditDescription";
import LocationEventScheduleSelect from "@/components/global/LocationEventScheduleSelect";
import QuestionsEventScheduleSelect from "@/components/global/QuestionsEventScheduleSelect";
import { Button } from "@/components/ui/button";
import { TypeInviteQuestions, TypeScheduleEventInvitation } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ChevronRight,
  Edit2,
  ExternalLink,
  Flag,
  ListFilterIcon,
  Loader2,
  NotebookPenIcon,
  RefreshCcw,
  Trash,
} from "lucide-react";
import Link from "next/link";
import React, { useCallback, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  event: TypeScheduleEventInvitation;
  index: number;
};

export default function ScheduleEventItem({ event, index }: Props) {
  const [isPending, startTransition] = useTransition();
  const [meetingNotes, setMeetingNotes] = useState(event.meetingNotes);
  const [showAddNotes, setShowAddNotes] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const timeRange = useMemo(() => {
    const time = new Date(event.dateEvent);
    const duration = event.eventType.duration.time;
    const timeAdd =
      event.eventType.duration.format === "min" ? duration : duration * 60;
    const timeStart = format(time, "HH:mm");
    time.setMinutes(time.getMinutes() + timeAdd);
    const timeEnd = format(time, "HH:mm");
    return `${timeStart} - ${timeEnd}`;
  }, [event.dateEvent, event.eventType.duration]);

  const toggleShowInfo = useCallback(() => {
    if (showAddNotes) return;
    setShowMoreInfo((t) => !t);
  }, [showAddNotes]);

  const questions = useMemo(() => {
    try {
      return event.inviteQuestions.slice(
        2,
        event.inviteQuestions.length
      ) as TypeInviteQuestions[];
    } catch (error) {
      return event.inviteQuestions;
    }
  }, [event.inviteQuestions]);
  const toggleShowNotes = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAddNotes((v) => !v);
  }, []);

  const onSaveNotes = useCallback(() => {
    startTransition(async () => {
      try {
        const response = await updateMeetingNotesSchedule(
          event.id,
          meetingNotes
        );
        if (!response.success) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
          setShowAddNotes(false);
        }
      } catch (error) {
        console.log(error);
        toast.error(`${error}`);
      }
    });
  }, [event.id, meetingNotes]);

  return (
    <div
      onClick={toggleShowInfo}
      className={cn(
        "w-full flex flex-col items-center justify-between bg-white p-6 relative border-t border-gray-300 cursor-pointer",
        index == 0 && "border-transparent"
      )}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="size-6 rounded-full"
            style={{
              backgroundColor: event.eventType.colorEvent,
            }}
          />
          <span className="text-colorTextBlack font-girloyRegular">
            {timeRange}
          </span>
        </div>
        <div className="flex items-start  flex-col">
          <p className="font-girloySemiBold text-colorTextBlack">
            {event.inviteQuestions[0].data.responseTxt}
          </p>
          <p className="font-girloyRegular text-colorTextBlack">
            Event Type{" "}
            <span className="font-girloySemiBold">
              {event.eventType.eventName}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 font-girloyRegular">
          <span className="border-r border-gray-300 pr-2">1 Host</span>
          <span>0 non-hosts</span>
        </div>
        <div className="flex items-center gap-2">
          <ChevronRight className="text-colorTextGris" />
          <span className="text-colorTextGris">Details</span>
        </div>
      </div>
      {showMoreInfo && (
        <div className="w-full scheduleEventGris mt-5">
          <div className="w-full flex flex-col gap-4 px-6">
            <Button
              variant="outline"
              className="rounded-full px-3 border border-colorTextBlack bg-white gap-2"
            >
              <RefreshCcw className="text-colorTextGris" size={15} />
              <span className="text-colorTextBlack">Reschedule</span>
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-3 border border-colorTextBlack bg-white gap-2"
            >
              <Trash className="text-colorTextGris" size={15} />
              <span className="text-colorTextBlack">Cancel</span>
            </Button>
            <Link
              href={`/edit-event/${event.idEventType}`}
              className="flex items-center gap-2 text-colorAzul hover:underline"
            >
              <ExternalLink className="text-colorAzul" />
              <span className="text-colorAzul">Edit Event Type</span>
            </Link>
            <Link
              href={`#`}
              className="flex items-center gap-2 text-colorAzul hover:underline"
            >
              <ListFilterIcon className="text-colorAzul" />
              <span className="text-colorAzul">Filter by Event Type</span>
            </Link>
            <Link
              href={`#`}
              className="flex items-center gap-2 text-colorAzul hover:underline"
            >
              <RefreshCcw className="text-colorAzul" />
              <span className="text-colorAzul">Schedule Invitee Again</span>
            </Link>
            <Link
              href={`#`}
              className="flex items-center gap-2 text-colorAzul hover:underline"
            >
              <Flag className="text-colorAzul" />
              <span className="text-colorAzul">Report this event</span>
            </Link>
          </div>
          <div className="w-full flex flex-col gap-3 px-6">
            <div className="w-full flex flex-col">
              <div className="flex items-center gap-3">
                <span className="font-girloySemiBold">EMAIL</span>
                <Edit2
                  className="text-colorTextGris hover:text-colorTextBlack"
                  size={15}
                />
              </div>
              <p>{event.inviteQuestions[1].data.responseTxt}</p>
            </div>
            <div className="w-full flex flex-col">
              <div className="flex items-center gap-3">
                <span className="font-girloySemiBold">LOCATION</span>
              </div>
              <LocationEventScheduleSelect location={event.location} />
            </div>
            <div className="w-full flex flex-col">
              <div className="flex items-center gap-3">
                <span className="font-girloySemiBold">Questions</span>
              </div>
              <QuestionsEventScheduleSelect questions={questions} />
            </div>
            <div className="w-full flex flex-col">
              <div
                onClick={toggleShowNotes}
                className="flex items-center gap-3 hover:underline"
              >
                {meetingNotes.length > 1 && !showAddNotes ? (
                  <>
                    <span className="text-colorTextBlack">MEETING NOTES</span>
                    <Edit2 className="text-colorTextGris" />
                  </>
                ) : (
                  <>
                    <NotebookPenIcon className="text-colorAzul" />
                    <span className="text-colorAzul">Add meeting notes</span>
                  </>
                )}
              </div>
              {meetingNotes.length > 1 && !showAddNotes && (
                <div dangerouslySetInnerHTML={{ __html: meetingNotes }}></div>
              )}
              {showAddNotes && (
                <div className="w-full min-h-24">
                  <EventEditDescription
                    isEditing
                    value={meetingNotes}
                    onChange={setMeetingNotes}
                  />
                  <div className="flex items-center gap-2 mt-5">
                    <Button
                      disabled={isPending}
                      onClick={onSaveNotes}
                      variant="azul"
                      className="rounded-full"
                    >
                      {isPending ? (
                        <Loader2 className="text-white animate-spin" />
                      ) : (
                        "Update"
                      )}
                    </Button>
                    <Button
                      disabled={isPending}
                      variant="outline"
                      onClick={toggleShowNotes}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              <p className="text-colorTextGris mt-1">
                (only the host will see these)
              </p>
            </div>
            <div className="w-full flex flex-col">
              <span className="text-colorTextGris">
                Created {format(event.createdAt, "dd MMMM yyyy")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
