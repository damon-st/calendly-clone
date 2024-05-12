"use client";
import React, { ReactNode, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllCountries } from "countries-and-timezones";

type Props = {
  children: ReactNode;
  onChangeContry?: (value: string, code: string) => void;
};

export default function CountrySelect({ children, onChangeContry }: Props) {
  const [showPop, setShowPop] = useState(false);
  const timesZones = useMemo(() => {
    return Object.entries(getAllCountries());
  }, []);

  const onSelectCountry = (e: string, code: string) => {
    setShowPop(false);
    onChangeContry?.(e, code);
  };

  return (
    <Popover open={showPop} onOpenChange={setShowPop}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-full max-h-[40vh] overflow-y-auto">
        {timesZones.map(([k, t]) => (
          <div
            onClick={() => onSelectCountry(t.name, t.id)}
            className="w-full min-h-11 cursor-pointer hover:bg-colorCeleste flex items-center px-2 rounded-lg justify-between"
            key={k}
          >
            <p>{t.name}</p>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
