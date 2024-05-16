import { TypeScheduleSpecifitHours } from "@/lib/types";
import { format } from "date-fns";
import { X } from "lucide-react";
import React from "react";

type Props = {
  item: TypeScheduleSpecifitHours;
};

export default function ScheduleSpecificHoursItem({ item }: Props) {
  const timeInit = format(item.dates[0], "MMMM dd");
  const timeEnd = format(item.dates[item.dates.length - 1], "dd, yyyy");
  const timeForm = `${timeInit} - ${timeEnd}`;
  return (
    <div className="w-full flex items-center justify-between hover:bg-colorCeleste cursor-pointer p-2">
      <div className="flex items-center font-girloyRegular">{timeForm}</div>
      <div className="flex flex-col gap-1">
        {item.hours.map((h) => (
          <p key={h.id}>
            {h.hourInitStr}:{h.minuteInitStr} - {h.hourEndStr}:{h.minuteEndStr}
          </p>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <X className="text-colorTextGris" size={30} />
      </div>
    </div>
  );
}
