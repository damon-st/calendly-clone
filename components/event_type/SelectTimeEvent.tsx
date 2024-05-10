"use client";
import { ScheduleTypeWithHours, TypeEventFormating } from "@/lib/types";
import React, { useCallback, useMemo, useRef, useState } from "react";
import CalendarSmallCustom from "../calendar/CalendarSmallCustom";
import { ChevronDown, Earth, Loader2 } from "lucide-react";
import { format, setHours } from "date-fns";
import { cn, formatHourMin, generateIntervalHours } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  eventType: TypeEventFormating;
  preview: boolean;
};

type Hours = {
  label: string;
  hour: number;
  min: number;
  selected: boolean;
};

export default function SelectTimeEvent({ eventType, preview }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const [date, setDate] = React.useState<Date>(new Date());
  const [dateSelect, setDateSelect] = useState<Date | null>(null);
  const loadingHours = useRef(false);

  const [timeHours, setTimeHours] = useState<Array<Hours>>([]);

  const onGeneretaHours = useCallback(
    (dateSlec: Date, weekDate?: ScheduleTypeWithHours) => {
      if (!weekDate) return;
      loadingHours.current = true;

      const timeInterval = eventType.duration.time;
      const timeIntervalFormat = eventType.duration.format;
      const minAditional =
        timeIntervalFormat == "min" ? timeInterval : timeInterval * 60;
      let tempHours: Array<Hours> = [];

      for (const iterator of weekDate.scheduleHours) {
        let hourInit = iterator.hourInit;
        const hourEnd = iterator.hourEnd;
        const tempG = generateIntervalHours(
          hourInit,
          iterator.minuteInit,
          hourEnd,
          iterator.minuteEnd,
          minAditional,
          new Date(),
          dateSlec,
          4
        );

        for (const hm of tempG) {
          tempHours.push({
            hour: hm.hora,
            label: `${formatHourMin(hm.hora)}:${formatHourMin(hm.minuto)}`,
            min: hm.minuto,
            selected: false,
          });
        }
      }

      setTimeHours(tempHours);
      loadingHours.current = false;
    },
    [eventType.duration.format, eventType.duration.time]
  );
  const onChangeDate = useCallback(
    (value: Date, weekDate?: ScheduleTypeWithHours) => {
      setDateSelect(value);
      onGeneretaHours(value, weekDate);
    },
    [onGeneretaHours]
  );

  const dateTxt = useMemo(() => {
    if (!dateSelect) return "";
    return format(dateSelect, "EEEE MMMM dd");
  }, [dateSelect]);

  const onSelectHour = useCallback(
    (value: Hours) => {
      if (preview) return;
      setTimeHours((p) => {
        let temp = [...p];
        for (const iterator of temp) {
          iterator.selected = false;
          if (iterator.label == value.label) {
            iterator.selected = true;
          }
        }
        return temp;
      });
    },
    [preview]
  );

  const onConfirmHour = useCallback(
    (h: Hours) => {
      const tempDate = new Date(
        dateSelect!.getFullYear(),
        dateSelect!.getMonth(),
        dateSelect?.getDate(),
        h.hour,
        h.min
      );
      const dateF = format(dateSelect!, "yyyy-MM-dd");
      const formatDateT = tempDate.toISOString();
      const url = `${pathName}/${formatDateT}?date=${dateF}&hour=${JSON.stringify(
        h
      )}`;
      router.push(url);
    },
    [dateSelect, pathName, router]
  );

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-colorTextBlack font-girloyBold text-xl">
        Select a Date & Time
      </h2>
      <div className="w-full flex items-start justify-center">
        {eventType.scheduleAvailibity && (
          <div
            className={cn(
              "w-full flex-col items-center justify-center",
              preview && "w-[70%]"
            )}
          >
            <CalendarSmallCustom
              onChangeDate={onChangeDate}
              initialDate={date}
              weekHours={eventType.scheduleAvailibity?.scheduleWeekDays}
              dateSelected={dateSelect}
            />
            <div
              className={cn(
                "w-full mt-2 flex flex-col items-start justify-start",
                preview && "justify-center "
              )}
            >
              <p className="text-colorTextBlack font-girloySemiBold">
                Time zone
              </p>
              <div className="flex gap-3 items-center hover:bg-gray-100 rounded-lg cursor-pointer px-1 py-1">
                <Earth className="text-colorTextGris" size={20} />
                <span>{eventType.scheduleAvailibity?.countryName} Time</span>
                <ChevronDown className="text-colorTextGris" />
              </div>
            </div>
          </div>
        )}
        {dateSelect && (
          <div className="flex flex-col items-center max-h-[60vh] pt-8 relative overflow-y-auto min-w-[200px]">
            {loadingHours.current && (
              <div className="absolute bg-black/10 rounded-lg flex items-center justify-center size-full ">
                <Loader2 className="text-black animate-spin" size={30} />
              </div>
            )}
            <p className="text-sm text-colorTextBlack font-girloyRegular mb-2">
              {dateTxt}
            </p>
            {timeHours.map((v) => (
              <div
                key={v.label}
                className="w-full flex min-h-14 mt-2 items-center justify-center gap-2 overflow-hidden"
              >
                <div
                  onClick={() => onSelectHour(v)}
                  className={cn(
                    "cursor-pointer w-full min-h-14 border border-colorAzul rounded-sm flex item items-center justify-center text-colorAzul font-girloyBold text-lg hover:border-2 transition-width",
                    v.selected &&
                      "w-1/2 bg-colorTextGris text-white border-colorTextGris"
                  )}
                >
                  <span>{v.label}</span>
                </div>
                <button
                  onClick={() => onConfirmHour(v)}
                  type="button"
                  className={cn(
                    "w-0 overflow-hidden min-h-14 bg-colorAzul text-white rounded-sm  items-center justify-center flex font-girloyBold text-lg transition-width",
                    v.selected && "w-1/2"
                  )}
                >
                  Next
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
