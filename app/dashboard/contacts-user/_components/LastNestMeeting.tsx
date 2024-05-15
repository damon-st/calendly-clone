import { TypeScheduleEventInvitation } from "@/lib/types";
import { format } from "date-fns";
import React from "react";
type Props = {
  events: TypeScheduleEventInvitation[];
  isNext: boolean;
};

export default function LastNestMeeting({ events, isNext }: Props) {
  if (isNext) {
    const date = new Date();
    const now = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).getTime();
    const event = events.find((v) => v.dateEvent.getTime() >= now);
    if (!event) return null;
    const time = format(event.dateEvent, "EEEE, MMMM dd");
    return (
      <div className="flex items-center text-sm font-girloyRegular">
        <span>
          {event?.eventType?.eventName} {time}
        </span>
      </div>
    );
  }
  if (events.length == 0) return null;
  const event = events[events.length - 1];
  if (!event) return null;
  const time = format(event.dateEvent, "EEEE, MMMM dd");

  return (
    <div className="flex items-center text-sm font-girloyRegular">
      <span>
        {event.eventType.eventName} {time}
      </span>
    </div>
  );
}
