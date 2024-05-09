"use client";
import { useNewEnventStore } from "@/lib/store/useNewEvent";
import { User } from "@prisma/client";
import { Clock, MapPin, Phone, Video } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import SelectTimeEvent from "./SelectTimeEvent";
import { TypeEventFormating } from "@/lib/types";

type Props = {
  user?: User | null;
  isCreating: boolean;
  eventType?: TypeEventFormating;
};

export default function PreviewCreate({ user, isCreating, eventType }: Props) {
  const { data, onChange } = useNewEnventStore();

  const title = useMemo(() => {
    if (data.nameEvent.length == 0) return "Event name here";
    return data.nameEvent;
  }, [data.nameEvent]);

  const time = useMemo(() => {
    return `${data.duration.time} ${
      data.duration.format == "min" ? "min" : "hours"
    }`;
  }, [data.duration]);

  const typeLocation = useMemo(() => {
    if (data.location.type.type == "none") {
      return (
        <div className="flex items-center gap-2">
          <MapPin className="text-colorTextGris" />
          <span>Add a location for it to show here</span>
        </div>
      );
    }
    if (data.location.type.type === "inPerson") {
      return (
        <div className="flex items-center gap-2">
          <MapPin className="text-colorTextGris" />
          <span>
            {data.location.type.data.location.length > 0
              ? data.location.type.data.location
              : "Add a location for it to show here"}
          </span>
        </div>
      );
    }

    if (data.location.type.type == "phoneCall") {
      return (
        <div className="flex items-center gap-2 font-girloySemiBold">
          <Phone className="text-colorTextGris" />
          <span>Phone call</span>
        </div>
      );
    }

    if (data.location.type.type == "zoom") {
      return (
        <div className="flex items-center gap-3 text-colorTextGris font-girloySemiBold">
          <Video className="text-colorTextGris" />
          <span>Web conferencing details provided upon confirmation.</span>
        </div>
      );
    }

    return null;
  }, [data.location.type.type]);

  useEffect(() => {
    if (!eventType) return;
    onChange({
      color: eventType.colorEvent,
      duration: eventType.duration,
      nameEvent: eventType.eventName,
      location: eventType.location,
    });
  }, [eventType]);

  return (
    <div className="size-full flex items-center justify-center m-auto p-4">
      <div className="w-full max-w-[640px] min-h-[753px] bg-white rounded-lg shadow-lg flex flex-col">
        <div className="w-full rounded-t-lg text-sm bg-colorTextBlack py-2 px-4 text-white font-girloyRegular">
          <span className="font-girloyBold">This is a preview. </span>
          <span>. To book an event, share the link with your invitees.</span>
        </div>
        <div className="border-b p-6 border-gray-300 flex flex-col items-center justify-center gap-1">
          <p className="text-colorTextGris font-girloySemiBold">{user?.name}</p>
          <p className="max-w-full overflow-hidden text-colorTextBlack font-bold text-2xl italic text-wrap whitespace-nowrap text-center">
            {title}
          </p>
          <div className="w-full flex items-center justify-evenly gap-2">
            <div className="flex items-center gap-2 text-colorTextGris font-semibold">
              <Clock className="text-colorTextGris" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2 text-colorTextGris font-semibold">
              {typeLocation}
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col w-full h-auto items-center justify-center px-4">
          {isCreating ? (
            <p className="text-colorTextGris font-girloyBold text-lg max-w-[300px] text-center">
              A preview of your availability will show on the next step
            </p>
          ) : (
            <>
              {eventType && (
                <SelectTimeEvent preview={true} eventType={eventType} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
