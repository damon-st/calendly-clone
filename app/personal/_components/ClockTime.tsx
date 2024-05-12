"use client";
import { fomarmatHourTimezon } from "@/lib/utils";
import React, { useEffect, useState } from "react";

type Props = {
  timezone: string;
};

export default function ClockTime({ timezone }: Props) {
  const [time, setTime] = useState("Current Time: ");
  useEffect(() => {
    const handleTime = () => {
      setTime(`Current Time: ${fomarmatHourTimezon(new Date(), timezone)}`);
    };
    handleTime();
    const interval = setInterval(handleTime, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timezone]);

  return <p>{time}</p>;
}
