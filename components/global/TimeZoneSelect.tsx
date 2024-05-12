"use client";
import React, { ReactNode, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Country, getAllCountries } from "countries-and-timezones";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  onChange?: (value: string) => void;
  country?: string;
};

type CountryTemp = Country & {
  time: string;
};

export default function TimeZoneSelect({ children, onChange, country }: Props) {
  const [showPop, setShowPop] = useState(false);
  const timesZones = useMemo(() => {
    const date = new Date();
    let temp = Object.entries(getAllCountries());
    let timeFomrats: [string, CountryTemp][] = [];

    for (const iterator of temp) {
      const time = date.toLocaleString("en-US", {
        timeZone: iterator[1].timezones[0],
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      });
      let data: CountryTemp = {
        ...iterator[1],
        time: time,
      };
      timeFomrats.push([iterator[0], data]);
    }
    return timeFomrats;
  }, []);

  const onChangeTime = (value: string) => {
    setShowPop(false);
    onChange?.(value);
  };

  return (
    <Popover open={showPop} onOpenChange={setShowPop}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-full max-h-[40vh] overflow-y-auto">
        {timesZones.map(([k, t]) => (
          <div
            onClick={() => onChangeTime(t.timezones[0])}
            className={cn(
              "w-full min-h-11 cursor-pointer hover:bg-colorCeleste flex items-center px-2 rounded-lg justify-between mb-1",
              country === t.name && "bg-colorCeleste"
            )}
            key={k}
          >
            <div className="flex flex-col ">
              <p className="font-girloySemiBold">{t.name} Time</p>
              <span className="text-colorTextGris font-girloyLight">
                {t.timezones[0]}
              </span>
            </div>
            <span>{t.time}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
