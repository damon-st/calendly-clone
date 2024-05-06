"use client";
import { useNewEnventStore } from "@/lib/store/useNewEvent";
import { User } from "@prisma/client";
import { Clock, MapPin } from "lucide-react";
import React, { useMemo } from "react";

type Props = {
  user?: User | null;
  isCreating: boolean;
};

export default function PreviewCreate({ user, isCreating }: Props) {
  const { data } = useNewEnventStore();

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
    return null;
  }, [data.location.type.type]);

  return (
    <div className="size-full flex items-center justify-center m-auto p-4">
      <div className="w-full max-w-[640px] h-full bg-white rounded-lg shadow-lg flex flex-col">
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
        <div className="flex flex-1 flex-col w-full h-auto items-center justify-center">
          {isCreating && (
            <p className="text-colorTextGris font-girloyBold text-lg max-w-[300px] text-center">
              A preview of your availability will show on the next step
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
