"use client";
import { ShedulesWithTypes } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ChevronDown,
  List,
  LucideCalendarHeart,
  Plus,
  Settings,
} from "lucide-react";
import { useState } from "react";
import WeekDay from "./WeekDay";

type Props = {
  schedules: ShedulesWithTypes;
};

type TypeView = "ListView" | "CalendarView";

export default function SchedulesList({ schedules }: Props) {
  const [schedulesList, setSchedulesList] = useState(schedules);
  const [typeView, setTypeView] = useState<TypeView>("ListView");
  const [scheduleSelect, setScheduleSelect] = useState(() =>
    schedules.length ? schedules[0] : null
  );

  return (
    <div className="w-full mt-4">
      <div className="w-full flex items-center flex-wrap gap-4">
        {schedulesList.map((v) => (
          <div
            key={v.id}
            className={cn(
              "scheduleItem cursor-pointer flex gap-2 font-girloyBold",
              scheduleSelect?.id == v.id &&
                "!bg-[#f2f8ff] !text-colorAzul !border-colorAzul"
            )}
          >
            <LucideCalendarHeart
              className={cn(
                "text-[#1a1a1a9c]",
                scheduleSelect?.id == v.id && "text-colorAzul"
              )}
            />
            <span className="font-light">{v.title}</span>
          </div>
        ))}
        <button className="flex items-center gap-2 group">
          <Plus className="text-colorTextGris" size={20} />
          <span className="text-colorTextGris font-girloyRegular group-hover:underline">
            Create schedule
          </span>
        </button>
      </div>
      <div className="containerSchedule flex flex-col  mt-4 w-full">
        <div className="p-6 gap-4 flex flex-col border-b border-gray-300">
          <div className="w-full flex justify-between items-center">
            <div>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">Active on</span>
                  <button className="text-colorAzul flex items-center gap-2 font-girloyRegular">
                    <span>0 Event Type</span>
                    <ChevronDown className="text-colorAzul" />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">Time zone</span>
                  <button className="text-colorAzul flex items-center gap-2 font-girloyRegular">
                    <span>{scheduleSelect?.countryName} Time</span>
                    <ChevronDown className="text-colorAzul" />
                  </button>
                </div>
              </div>
              <div className="bg-[#F2F2F2] rounded-xl px-2 py-1 flex gap-2 mt-3">
                <button
                  onClick={() => setTypeView("ListView")}
                  type="button"
                  className={cn(
                    "bg-transparent rounded-lg flex items-center gap-1 px-2 py-1 font-girloyRegular text-lg cursor-pointer",
                    typeView == "ListView" &&
                      "bg-white font-girloySemiBold shadow-lg "
                  )}
                >
                  <List className="text-colorTextBlack" />
                  <span>List view</span>
                </button>
                <button
                  onClick={() => setTypeView("CalendarView")}
                  type="button"
                  className={cn(
                    "bg-transparent rounded-lg flex items-center gap-1 px-2 py-1  font-girloyRegular text-lg cursor-pointer",
                    typeView == "CalendarView" &&
                      "bg-white font-girloySemiBold shadow-lg"
                  )}
                >
                  <Calendar className="text-colorTextBlack" />
                  <span>Calendar view</span>
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <Settings className="text-colorTextGris" size={20} />
            </div>
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-full flex flex-col gap-2 md:w-[50%] md:border-r border-gray-300 p-6">
            <h3 className="text-lg font-girloyBold text-colorTextBlack">
              Weekly hours
            </h3>
            {scheduleSelect?.scheduleWeekDays.map((v) => (
              <WeekDay key={v.id} week={v} />
            ))}
          </div>
          <div className="w-full md:w-[50%] p-6 gap-4 flex flex-col">
            <h3 className="text-lg font-girloyBold text-colorTextBlack">
              Date-specific hours
            </h3>
            <p className="text-colorTextGris font-girloyRegular text-sm">
              Override your availability for specific dates when your hours
              differ from your regular weekly hours.
            </p>
            <button className="flex gap-2 items-center text-colorTextBlack text-sm font-girloyRegular border border-colorTextBlack rounded-full w-fit px-2 py-1 hover:bg-colorGris">
              <Plus />
              <span>Add date-specific hours</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
