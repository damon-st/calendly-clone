"use client";

import { ChevronDown, Earth } from "lucide-react";
import React, { useEffect, useState } from "react";
import TimeZoneSelect from "./TimeZoneSelect";
import { fomarmatHourTimezon } from "@/lib/utils";
import { CountryInfoUser } from "@/lib/types";

type Props = {
  timeZone: string;
  country: string;
  onChangeTimeZone: (e: CountryInfoUser) => void;
};

export default function SelectTimeZone({
  timeZone,
  country,
  onChangeTimeZone,
}: Props) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const handleInter = () => {
      setTime(fomarmatHourTimezon(new Date(), timeZone));
    };
    handleInter();
    const interval = setInterval(handleInter, 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeZone]);

  return (
    <TimeZoneSelect onSelectZone={onChangeTimeZone}>
      <div className="flex gap-3 items-center hover:bg-gray-100 rounded-lg cursor-pointer px-1 py-1 text-sm">
        <Earth className="text-colorTextGris" size={20} />
        <span>
          {country} Time ({time}){" "}
        </span>
        <ChevronDown className="text-colorTextGris" />
      </div>
    </TimeZoneSelect>
  );
}
