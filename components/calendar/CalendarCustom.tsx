"use client";
import { CalendarDaysIcon, ChevronLeft, ChevronRight } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { format } from "date-fns";
import { daysEN } from "@/common/week_days";
import { cn, divideArrayInParts } from "@/lib/utils";
import { ScheduleTypeWithHours } from "@/lib/types";
import { ScheduleSpecifitHours } from "@prisma/client";

type Props = {
  weekHours: ScheduleTypeWithHours[];
  specificDays: ScheduleSpecifitHours[];
};

type TypeCalerad = {
  label: string;
  date: Date;
  classNames: string;
  active: boolean;
  id: number;
  weekDate?: ScheduleTypeWithHours;
  idSpecificHours?: string;
};

export default function CalendarCustom({ weekHours, specificDays }: Props) {
  let onMosePreset = useRef(false);
  let date = useRef(new Date());
  let dateDow = useRef<Date | null>();
  let year = useRef(date.current.getFullYear());
  let month = useRef(date.current.getMonth());
  let txtMonthYear = useRef("");
  const [calendar, setCalendar] = useState<TypeCalerad[][]>([]);

  const refTbody = useRef<HTMLTableSectionElement>(null);

  const weekDays = useMemo(() => {
    return daysEN;
  }, []);

  const onGenereCalendar = () => {
    function generateID() {
      return Math.floor(1000 + Math.random() * 9000);
    }
    function verifyId(arr: Array<TypeCalerad>) {
      const id = generateID();
      const extPreId = lit.find((v) => v.id == id);
      if (extPreId) {
        return verifyId(arr);
      }
      return id;
    }
    ///Get the first day of the month
    let dayOne = new Date(year.current, month.current, 1).getDay();
    ///Get the last date of the month
    let lastDate = new Date(year.current, month.current + 1, 0).getDate();
    ///Get the day o the last date of the month
    let dayEnd = new Date(year.current, month.current, lastDate).getDay();
    ///Get the last date of the previous month
    let monthLastDate = new Date(year.current, month.current, 0).getDate();

    /// Variable to store the generated calendar in HTML
    let lit: Array<TypeCalerad> = [];
    /// Loop to add the last dates of the current moth
    for (let i = dayOne; i > 0; i--) {
      const value = monthLastDate - i + 1;
      const id = verifyId(lit);
      lit.push({
        active: false,
        classNames: "inactiveDates",
        label: `${value}`,
        date: new Date(year.current, month.current, value),
        id: id,
      });
    }
    /// Loop to add the dates of the current moth
    const tempDate = new Date();
    for (let i = 1; i <= lastDate; i++) {
      const id = verifyId(lit);
      const dateTemp = new Date(year.current, month.current, i);

      /// Check if the current date is today
      let isToday =
        i === date.current.getDate() &&
        month.current === tempDate.getMonth() &&
        year.current === tempDate.getFullYear();
      let classN = isToday
        ? "activeDate tdHover textBlack"
        : "tdHover textBlack";
      if (i < date.current.getDate() && month.current === tempDate.getMonth()) {
        classN = "inactiveDates";
      }
      let idSpecificHours: string | undefined = undefined;
      if (
        specificDays.find((v) =>
          v.dates.some((d) => d.getTime() === dateTemp.getTime())
        )
      ) {
        classN = `${classN} datesSpecifc`;
        idSpecificHours = specificDays.find((v) =>
          v.dates.some((d) => d.getTime() === dateTemp.getTime())
        )?.id;
      }
      lit.push({
        active: isToday,
        classNames: classN,
        label: `${i}`,
        date: dateTemp,
        id,
        idSpecificHours,
      });
    }
    /// Loop to add the first dates of the next moth
    for (let i = dayEnd; i < 6; i++) {
      const id = verifyId(lit);

      const value = i - dayEnd + 1;
      lit.push({
        active: false,
        classNames: "inactiveDates",
        date: new Date(year.current, month.current, value),
        label: `${value}`,
        id: id,
      });
    }

    /// Update the HTML of the dates element
    /// with the generated calendar
    let tempDivide = divideArrayInParts(lit, 7);
    for (let i = 0; i < tempDivide.length; i++) {
      for (let j = 0; j < tempDivide[i].length; j++) {
        let element = tempDivide[i][j];
        const weekDate = weekHours.find(
          (v) => v.weekDayStr === weekDays[j].title
        );
        element = {
          ...element,
          weekDate,
        };
        tempDivide[i][j] = element;
      }
    }
    return tempDivide;
  };

  const onNextBackMonth = (isNext: boolean) => {
    if (isNext) {
      month.current = month.current + 1;
    } else {
      if (
        month.current - 1 < new Date().getMonth() &&
        year.current == new Date().getFullYear()
      ) {
        return;
      }
      month.current = month.current - 1;
    }
    ///Check if the mothj is out of range
    if (month.current < 0 || month.current > 11) {
      ///Set the date to the firest day of the moth with the new year
      date.current = new Date(
        year.current,
        month.current,
        new Date().getDate()
      );
      ///Set the yar to the new year
      year.current = date.current.getFullYear();
      ///Set the month to the new month
      month.current = date.current.getMonth();
    } else {
      //Set the date to the current date
      date.current = new Date();
    }
    setCalendar(onGenereCalendar());
    txtMonth();
  };

  useEffect(() => {
    setCalendar(onGenereCalendar());
    txtMonth();
  }, []);

  const txtMonth = () => {
    txtMonthYear.current = format(
      new Date(year.current, month.current, date.current.getDate()),
      "MMMM yyyy"
    );
  };

  const onSelectDate = useCallback((value: TypeCalerad) => {
    console.log(value);
  }, []);
  const onMousedown = useCallback((item: TypeCalerad) => {
    console.log("MOUSE-DOWN");
    item.classNames = `${item.classNames} tdHoverActive`;
    dateDow.current = item.date;
    onMosePreset.current = true;
  }, []);
  const onMouseUp = useCallback((item: TypeCalerad) => {
    dateDow.current = null;
    onMosePreset.current = false;
    setCalendar((p) => {
      let temp1 = [...p];
      for (const iterator of temp1) {
        for (const row of iterator) {
          row.classNames = row.classNames.replaceAll("tdHoverActive", "");
        }
      }
      return temp1;
    });
  }, []);

  const onMouseEnter = useCallback((item: TypeCalerad) => {
    if (!onMosePreset.current) return;
    // item.classNames = `${item.classNames} tdHoverActive`;
    if (!dateDow?.current) return;
    setCalendar((p) => {
      let temp1 = [...p];
      for (const iterator of temp1) {
        for (const row of iterator) {
          if (!dateDow.current) continue;
          const condition =
            dateDow.current!.getTime() >= row.date.getTime()
              ? row.date.getTime() <= dateDow.current!.getTime() &&
                row.date.getTime() >= item.date.getTime()
              : row.date.getTime() >= dateDow.current!.getTime() &&
                row.date.getTime() <= item.date.getTime();
          if (
            condition &&
            row.weekDate &&
            row.weekDate.active &&
            !row.classNames.includes("inactiveDates")
          ) {
            row.classNames = `${item.classNames} tdHoverActive`;
          } else {
            if (row.date.getTime() === dateDow.current.getTime()) continue;
            row.classNames = row.classNames.replaceAll("tdHoverActive", "");
          }
        }
      }
      return temp1;
    });
  }, []);
  const onMouseLeave = useCallback((item: TypeCalerad) => {
    if (!onMosePreset.current) return;
  }, []);

  return (
    <div className="w-full">
      <div className="w-full h-24 flex items-center px-4 justify-between border-b border-gray-300">
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="text-3xl font-girloyBold">{txtMonthYear.current}</p>
          <span className="text-colorTextGris text-sm">
            Set your weekly hours
          </span>
        </div>
        <div className="flex w-[120px] rounded-lg items-center border border-gray-300 min-h-12">
          <button
            onClick={() => onNextBackMonth(false)}
            className="w-[50%] h-full min-h-12 border-r border-gray-300 flex items-center justify-center"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => onNextBackMonth(true)}
            className="w-[50%] h-full min-h-12 flex items-center justify-center"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            {weekDays.map((v) => (
              <th
                scope="col"
                key={v.value}
                className="text-colorTextGris font-girloySemiBold py-3 border-b border-gray-300"
              >
                {v.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody ref={refTbody}>
          {calendar.map((col, i) => (
            <tr className="" key={i}>
              {col.map((row) => (
                <td
                  className={cn(
                    "border-r border-gray-300 tdCal h-[140px]",
                    row.classNames
                  )}
                  key={row.id}
                >
                  <button
                    onMouseLeave={() => onMouseLeave(row)}
                    onMouseEnter={() => onMouseEnter(row)}
                    onMouseUp={() => onMouseUp(row)}
                    onMouseDown={() => onMousedown(row)}
                    onClick={() => onSelectDate(row)}
                    className="flex pt-8 size-full"
                  >
                    <div
                      className={cn(
                        "absolute top-1 left-2 size-5 rounded-lg font-bold flex items-center justify-center",
                        row.active && "bg-[#1A1A1A1A]"
                      )}
                    >
                      {row.label}
                    </div>
                    {row.idSpecificHours && (
                      <div className="absolute top-1 right-1 flex items-center justify-center">
                        <CalendarDaysIcon className="text-colorAzul" />
                      </div>
                    )}
                    {row.weekDate && (
                      <div className="w-full flex items-center flex-col gap-1">
                        {row.weekDate.scheduleHours.map((sh) => (
                          <div
                            key={sh.id + i + row.id}
                            className="flex items-center gap-2"
                          >
                            <>
                              {row.weekDate?.active && (
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-girloyRegular">
                                    {sh.hourInitStr}:{sh.minuteInitStr}
                                  </span>
                                  -
                                  <span className="text-sm font-girloyRegular">
                                    {sh.hourEndStr}:{sh.minuteEndStr}
                                  </span>
                                </div>
                              )}
                            </>
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
