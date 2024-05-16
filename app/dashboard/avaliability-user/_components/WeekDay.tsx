"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Copy, Loader, Plus } from "lucide-react";
import React, { useCallback, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  createScheduleWeekDayNewHour,
  deleteScheduleWeekDayHOUR,
  updateScheduleWeekDayActiveOrDesct,
  updateScheduleWeekDayHours,
} from "@/actions/schedules";
import { ScheduleTypeWithHours, TypeTimeHourValid } from "@/lib/types";
import ScheduleHourItem from "@/components/global/ScheduleHourItem";

type Props = {
  week: ScheduleTypeWithHours;
  onChangeValue: (e: ScheduleTypeWithHours) => void;
};

export default function WeekDay({ week: iniTialValue, onChangeValue }: Props) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [week, setWeek] = useState(iniTialValue);
  const onChangeActive = useCallback(
    (e: boolean) => {
      if (isPending) return;
      startTransition(async () => {
        try {
          const result = await updateScheduleWeekDayActiveOrDesct(e, week.id);
          if (!result.success) {
            throw new Error(result.message);
          }
          let newValue = { ...week, active: e };
          setWeek(newValue);
          onChangeValue(newValue);
          toast.success("Changed saved", {
            position: "bottom-center",
            duration: 1000,
          });
        } catch (error) {
          console.log(error);
          toast.error(`${error}`);
        }
      });
    },
    [isPending, onChangeValue, week]
  );

  const handleDisabled = (id: string) => {
    if (week.scheduleHours.length <= 1) {
      onChangeActive(false);
      return;
    }
    if (isPending) return;
    startTransition(async () => {
      try {
        const result = await deleteScheduleWeekDayHOUR(id);
        if (!result.success) {
          throw new Error(result.message);
        }
        let tempHours = [...week.scheduleHours];
        tempHours = tempHours.filter((v) => v.id != id);
        const newValue = { ...week, scheduleHours: tempHours };
        setWeek(newValue);
        onChangeValue(newValue);
        toast.success(`Changed Saved`, {
          position: "bottom-center",
          duration: 1000,
        });
      } catch (error) {
        console.log(error);
        toast.error(`${error}`, { position: "bottom-center" });
      }
    });
  };

  const onSaveTimeHour = (
    time: TypeTimeHourValid,
    isTimeInit: boolean,
    idTime: string
  ) => {
    if (isPending) return;
    startTransition(async () => {
      try {
        let data = {};
        if (isTimeInit) {
          data = {
            hourInit: time.hour,
            hourInitStr: time.hourStr,
            minuteInit: time.min,
            minuteInitStr: time.minStr,
          };
        } else {
          data = {
            hourEnd: time.hour,
            hourEndStr: time.hourStr,
            minuteEnd: time.min,
            minuteEndStr: time.minStr,
          };
        }
        const result = await updateScheduleWeekDayHours(idTime, {
          ...data,
        });
        if (!result) {
          throw new Error("Error update time");
        }
        let tempHours = [...week.scheduleHours];
        const indexPrev = tempHours.findIndex((v) => v.id == idTime);
        if (indexPrev >= 0) {
          tempHours[indexPrev] = result;
        }
        const newValue = { ...week, scheduleHours: tempHours };
        setWeek(newValue);
        onChangeValue(newValue);
        toast.success("Changed Saved", {
          position: "bottom-center",
          duration: 1000,
        });
      } catch (error) {
        console.log(error);
        toast.error(`${error}`, { position: "bottom-center" });
      }
    });
  };

  const onAddNewHours = () => {
    if (!week.active) {
      onChangeActive(true);
      return;
    }
    if (isPending) return;
    startTransition(async () => {
      try {
        const result = await createScheduleWeekDayNewHour(
          week.id,
          week.scheduleHours[week.scheduleHours.length - 1]
        );
        if (!result) {
          throw new Error("Error in create new hours");
        }
        let tempHours = [...week.scheduleHours];
        tempHours.push(result);
        const newValue = { ...week, scheduleHours: tempHours };
        setWeek(newValue);
        onChangeValue(newValue);
        toast.success(`Changed Saved`, {
          position: "bottom-center",
          duration: 1000,
        });
      } catch (error) {
        console.log(error);
        toast.error(`${error}`, { position: "bottom-center" });
      }
    });
  };

  return (
    <div className="w-full pt-1 flex justify-between relative">
      {(isPending || isSubmiting) && (
        <div className="absolute w-full bg-black/10 h-full rounded-lg flex items-center justify-center">
          <div className="rounded-sm bg-black">
            <Loader className="animate-spin text-white" size={30} />
          </div>
        </div>
      )}
      <div className="w-[20%] flex items-start gap-3 cursor-pointer">
        <Checkbox
          onCheckedChange={onChangeActive}
          id={week.id}
          checked={week.active}
          className={cn(
            "!rounded-sm mt-1",
            week.active && "!bg-colorAzul !border-colorAzul"
          )}
        />
        <label htmlFor={week.id} className="p-0 m-0">
          <span className="font-girloyBold cursor-pointer">
            {week.weekDayStr}
          </span>
        </label>
      </div>
      <div className="w-[60%] flex flex-col gap-2">
        {week.active ? (
          <>
            {week.scheduleHours.map((v) => (
              <ScheduleHourItem
                weekDay={week.weekDay}
                onSaveTime={onSaveTimeHour}
                handleDisabled={handleDisabled}
                active={week.active}
                key={v.id}
                hours={v}
                scheduleWeekDayId={week.id}
              />
            ))}
          </>
        ) : (
          <div className="flex items-center text-colorTextGris font-girloyRegular">
            Unavailable
          </div>
        )}
      </div>
      <div className="w-[20%] flex items-start gap-2">
        <button
          onClick={onAddNewHours}
          className="size-11 rounded-sm flex items-center justify-center hover:bg-gray-100"
        >
          <Plus size={20} className="text-colorTextBlack" />
        </button>
        <button className="size-11 rounded-sm flex items-center justify-center hover:bg-gray-100">
          <Copy size={20} className="text-colorTextBlack" />
        </button>
      </div>
    </div>
  );
}
