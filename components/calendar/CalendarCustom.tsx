"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { format } from "date-fns";
import { daysEN } from "@/common/week_days";
import { divideArrayInParts } from "@/lib/utils";

type Props = {};

export default function CalendarCustom({}: Props) {
  const [initialDate, setInitialDate] = useState(new Date());

  const refTbody = useRef<HTMLTableSectionElement>(null);

  const txtMonth = useMemo(() => {
    return format(initialDate, "MMMM yyyy");
  }, [initialDate]);

  const weekDays = useMemo(() => {
    return daysEN.sort((a, b) => a.value - b.value);
  }, []);

  useEffect(() => {
    onGenereCalendar();
  }, []);

  const onGenereCalendar = useCallback(() => {
    const year = initialDate.getFullYear();
    const month = initialDate.getMonth();

    ///Get the first day of the month
    let dayOne = new Date(year, month, 1).getDay();
    ///Get the last date of the month
    let lastDate = new Date(year, month + 1, 0).getDate();
    ///Get the day o the last date of the month
    let dayEnd = new Date(year, month, lastDate).getDay();
    ///Get the last date of the previous month
    let monthLastDate = new Date(year, month, 0).getDate();
    /// Variable to store the generated calendar in HTML
    let lit: Array<string> = [];
    /// Loop to add the last dates of the current moth
    for (let i = dayOne; i > 0; i--) {
      lit.push(`<td class="inactive">${monthLastDate - i + 1}</td>`);
    }
    /// Loop to add the dates of the current moth
    const tempDate = new Date();
    for (let i = 1; i <= lastDate; i++) {
      /// Check if the current date is today
      let isToday =
        i === initialDate.getDate() &&
        month === tempDate.getMonth() &&
        year === tempDate.getFullYear()
          ? "active"
          : "";
      lit.push(`<td class="${isToday}">${i}</td>`);
    }
    /// Loop to add the first dates of the next moth
    for (let i = dayEnd; i < 6; i++) {
      lit.push(`<td class="inactive">${i - dayEnd + 1}</td>`);
    }

    /// Update the HTML of the dates element
    /// with the generated calendar
    let formatetH = "";
    const result = divideArrayInParts(lit, 7);

    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      console.log(element);

      formatetH += `<tr>`;
      for (let j = 0; j < element.length; j++) {
        formatetH += element[j];
      }
      formatetH += `</tr>`;
    }

    refTbody.current!.innerHTML = formatetH;
  }, [initialDate]);

  return (
    <div className="w-full">
      <div className="w-full h-24 flex items-center px-4 justify-between border-b border-gray-300">
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="text-3xl font-girloyBold">{txtMonth}</p>
          <span className="text-colorTextGris text-sm">
            Set your weekly hours
          </span>
        </div>
        <div className="flex w-[120px] rounded-lg items-center border border-gray-300 min-h-12">
          <button className="w-[50%] h-full min-h-12 border-r border-gray-300 flex items-center justify-center">
            <ChevronLeft />
          </button>
          <button className="w-[50%] h-full min-h-12 flex items-center justify-center">
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
        <tbody ref={refTbody}></tbody>
      </table>
    </div>
  );
}
