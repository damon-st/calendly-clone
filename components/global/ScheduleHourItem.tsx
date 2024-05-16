"use client";
import { daysEN } from "@/common/week_days";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TypeTimeHourValid } from "@/lib/types";
import {
  cn,
  extractHourFromString,
  validFormatHour,
  validTimeRangeTimeEnd,
  validTimeRangeTimeInit,
} from "@/lib/utils";
import { ScheduleHoursM } from "@prisma/client";
import { X } from "lucide-react";
import React, { useCallback, useState } from "react";

type Props = {
  hours: ScheduleHoursM;
  scheduleWeekDayId: string;
  active: boolean;
  handleDisabled: (id: string) => void;
  onSaveTime: (
    time: TypeTimeHourValid,
    isTimeInit: boolean,
    idTime: string
  ) => void;
  weekDay: number;
};

export default function ScheduleHourItem({
  hours,
  scheduleWeekDayId,
  weekDay,
  active,
  handleDisabled,
  onSaveTime,
}: Props) {
  const [errorFormatInit, setErrorFormatInit] = useState("");
  const [errorFormatEnd, setErrorFormatEnd] = useState("");
  const [initHour, setInitHour] = useState(
    hours.hourInitStr + ":" + hours.minuteInitStr
  );
  const [prevInitHour, setPrevInitHour] = useState(
    hours.hourInitStr + ":" + hours.minuteInitStr
  );

  const [endHour, setEndHour] = useState(
    hours.hourEndStr + ":" + hours.minuteEndStr
  );
  const [prevEndHour, setPrevEndHour] = useState(
    hours.hourEndStr + ":" + hours.minuteEndStr
  );

  const handleOnChangeHourInit = (e: { target: { value: string } }) => {
    setInitHour(e.target.value);
  };
  const handleOnChangeHourEnd = (e: { target: { value: string } }) => {
    setEndHour(e.target.value);
  };

  const onSubmitHourInit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSaveHourInit();
  };
  const onSubmitHourEnd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSaveHourEnd();
  };

  const onBlurHourInit = () => {
    onSaveHourInit();
  };
  const onBlurHourEnd = () => {
    onSaveHourEnd();
  };

  const onSaveHourInit = () => {
    setErrorFormatInit("");
    if (initHour == prevInitHour) return;
    const valid = validFormatHour(initHour);
    if (!valid) {
      setErrorFormatInit("Invalid time");
      return;
    }
    const formatTime = extractHourFromString(initHour);
    if (!formatTime) {
      setErrorFormatInit("Error parsing");
      return;
    }
    const validTimeEnd = validFormatHour(endHour);

    if (validTimeEnd) {
      const formatTimeEnd = extractHourFromString(endHour);
      if (!formatTimeEnd) {
        setErrorFormatInit("Error time verify please");
        return;
      }
      const validTime = validTimeRangeTimeInit(
        {
          hour: formatTime.hour,
          minute: formatTime.min,
        },
        {
          hour: formatTimeEnd.hour,
          minute: formatTimeEnd.min,
        }
      );
      if (!validTime.success) {
        setErrorFormatInit(validTime.message);
        return;
      }
    }
    onSaveTime(formatTime, true, hours.id);
    setPrevInitHour(initHour);
  };
  const onSaveHourEnd = () => {
    setErrorFormatEnd("");
    if (endHour == prevEndHour) return;
    const valid = validFormatHour(endHour);
    if (!valid) {
      setErrorFormatEnd("Invalid time");
      return;
    }
    const formatTime = extractHourFromString(endHour);
    if (!formatTime) {
      setErrorFormatEnd("Error parsing");
      return;
    }
    const validTimeInit = validFormatHour(initHour);

    if (validTimeInit) {
      const formatTimeInit = extractHourFromString(initHour);
      if (!formatTimeInit) {
        setErrorFormatEnd("Error time verify please");
        return;
      }
      const validTime = validTimeRangeTimeEnd(
        {
          hour: formatTime.hour,
          minute: formatTime.min,
        },
        {
          hour: formatTimeInit.hour,
          minute: formatTimeInit.hour,
        }
      );
      if (!validTime.success) {
        setErrorFormatEnd(validTime.message);
        return;
      }
    }
    onSaveTime(formatTime, false, hours.id);
    setPrevEndHour(endHour);
  };

  const weekDayStr = useCallback(() => {
    return daysEN.find((v) => v.value == weekDay)?.labe;
  }, [weekDay]);

  return (
    <div className="flex h-full items-center gap-2">
      {active ? (
        <>
          <div className="flex flex-col">
            <div className="flex items-center">
              <form onSubmit={onSubmitHourInit} className="flex flex-col">
                <Input
                  onBlur={onBlurHourInit}
                  value={initHour}
                  className={cn(
                    "w-24 border border-gray-300",
                    errorFormatInit.length && "border-colorError"
                  )}
                  onChange={handleOnChangeHourInit}
                />
              </form>
              <div className="flex items-start h-full">
                <span className="text-colorTextGris ">-</span>
              </div>
              <form onSubmit={onSubmitHourEnd} className="flex flex-col">
                <Input
                  onBlur={onBlurHourEnd}
                  value={endHour}
                  className={cn(
                    "w-24  border border-gray-300",
                    errorFormatEnd.length && "border-colorError"
                  )}
                  onChange={handleOnChangeHourEnd}
                />
              </form>
              <div>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleDisabled(hours.id)}
                        className="size-11 rounded-sm flex items-center justify-center hover:bg-gray-100"
                      >
                        <X size={20} className="text-colorTextBlack" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Remove {weekDayStr()} interval {hours.order + 1}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <span className="text-colorError font-girloyLight h-4">
              {errorFormatInit}
              {errorFormatEnd}
            </span>
          </div>
        </>
      ) : (
        <div className="flex items-start h-full justify-center">
          <span className="text-colorTextGris font-girloyRegular">
            Unavailable
          </span>
        </div>
      )}
    </div>
  );
}
