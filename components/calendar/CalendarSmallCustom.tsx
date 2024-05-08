"use client";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
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

type Props = {
  weekHours: ScheduleTypeWithHours[];
  initialDate: Date;
  onChangeDate: (date: Date, weekDate?: ScheduleTypeWithHours) => void;
  dateSelected?: Date | null;
};

type TypeCalerad = {
  label: string;
  date: Date;
  classNames: string;
  active: boolean;
  id: number;
  weekDate?: ScheduleTypeWithHours;
};

export default function CalendarSmallCustom({
  weekHours,
  initialDate,
  onChangeDate,
  dateSelected,
}: Props) {
  let loading = useRef(true);
  let date = useRef(initialDate);
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
        classNames: "inactiveDatesBook inactiveDatesLast",
        label: `${value}`,
        date: new Date(year.current, month.current, value),
        id: id,
      });
    }
    /// Loop to add the dates of the current moth
    const tempDate = new Date();
    for (let i = 1; i <= lastDate; i++) {
      const id = verifyId(lit);

      /// Check if the current date is today
      let isToday =
        i === date.current.getDate() &&
        month.current === tempDate.getMonth() &&
        year.current === tempDate.getFullYear();
      let classN = isToday ? "activeDateBook tdHoverBook " : "tdHoverBook ";
      if (i < date.current.getDate() && month.current === tempDate.getMonth()) {
        classN = "inactiveDatesBook datesNoValid";
      }
      lit.push({
        active: isToday,
        classNames: classN,
        label: `${i}`,
        date: new Date(year.current, month.current, i),
        id,
      });
    }
    /// Loop to add the first dates of the next moth
    for (let i = dayEnd; i < 6; i++) {
      const id = verifyId(lit);

      const value = i - dayEnd + 1;
      lit.push({
        active: false,
        classNames: "inactiveDatesBook",
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
          classNames: `${element.classNames} ${
            weekDate?.active ? "validDateBook" : "inactiveDatesBook"
          }`,
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
    loading.current = false;
  }, []);

  const txtMonth = () => {
    txtMonthYear.current = format(
      new Date(year.current, month.current, date.current.getDate()),
      "MMMM yyyy"
    );
  };

  const onSelectDate = useCallback(
    (value: TypeCalerad) => {
      onChangeDate(value.date, value.weekDate);
    },
    [onChangeDate]
  );

  return (
    <div className="w-full max-w-[400px] min-h-[40vh] relative">
      {loading.current && (
        <div className="w-full min-h-[40vh] z-10 rounded-lg absolute top-0 flex items-center justify-center">
          <Loader className="text-colorAzul animate-spin" size={50} />
        </div>
      )}
      <div className="w-full h-24 flex items-center px-4 justify-between ">
        <div className="flex justify-center w-full rounded-lg items-center min-h-12">
          <button
            onClick={() => onNextBackMonth(false)}
            className="min-w-[50px] hover:bg-colorCeleste rounded-full h-full min-h-12  flex items-center justify-center"
          >
            <ChevronLeft />
          </button>
          <p className="text-xl font-girloyRegular px-3">
            {txtMonthYear.current}
          </p>

          <button
            onClick={() => onNextBackMonth(true)}
            className="min-w-[50px] rounded-full hover:bg-colorCeleste h-full min-h-12 flex items-center justify-center"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="tdCalBook">
            {weekDays.map((v) => (
              <th
                scope="col"
                key={v.value}
                className="text-colorTextBlack font-girloyLight py-3"
              >
                {v.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody ref={refTbody}>
          {calendar.map((col, i) => (
            <tr key={i}>
              {col.map((row) => (
                <td
                  className={cn(
                    " tdCalBook border-none size-11 bg-white",
                    row.classNames,
                    dateSelected && dateSelected == row.date && "dateSelecBook"
                  )}
                  key={row.id}
                >
                  <button
                    onClick={() => onSelectDate(row)}
                    className="flex items-center justify-center size-full"
                  >
                    {row.label}
                    {row.active && (
                      <div className="size-2 bg-colorAzul rounded-full absolute bottom-[5%]"></div>
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
