"use client";
import {
  DateRange,
  ScheduleEventSearch,
  TypeScheduleEventInvitation,
} from "@/lib/types";
import { cn, compareDates } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronDown, Download, ListFilter } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import ScheduleEventItem from "./ScheduleEventItem";
import { useRouter } from "next/navigation";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";

type Props = {
  events: TypeScheduleEventInvitation[];
  period: ScheduleEventSearch;
};

export default function ScheduleEventTable({ events, period }: Props) {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const router = useRouter();
  const eventsGroup = useMemo(() => {
    let group: Array<{ date: Date; events: TypeScheduleEventInvitation[] }> =
      [];
    for (const iterator of events) {
      const tempDate = new Date(
        iterator.dateEvent.getFullYear(),
        iterator.dateEvent.getMonth(),
        iterator.dateEvent.getDate()
      );
      const indexPrev = group.findIndex((v) => compareDates(v.date, tempDate));
      if (indexPrev >= 0) {
        group[indexPrev].events.push(iterator);
      } else {
        group.push({
          date: tempDate,
          events: [iterator],
        });
      }
    }
    return group;
  }, [events]);
  const onChangeType = useCallback(
    (t: ScheduleEventSearch) => {
      setDateRange(null);
      router.push(`/dashboard/scheduled-events-user?period=${t}`);
    },
    [router]
  );
  function onChangeRangeDates(v: DateRange) {
    setDateRange(v);
    let startDate = v.from?.toISOString();
    let endDate = v.to?.toISOString();
    router.push(
      `/dashboard/scheduled-events-user?period=dateRange&startDate=${startDate}&endDate=${endDate}`
    );
  }

  const txtRange = useMemo(() => {
    if (!dateRange) return ``;
    let dateInit = format(dateRange.from!, "dd MMMM");
    let dateEnd = format(dateRange.to!, "dd MMMM yyyy");
    return `${dateInit} - ${dateEnd}`;
  }, [dateRange]);

  return (
    <div className="w-full border py-5 rounded-lg border-gray-300 bg-white font-girloyRegular">
      <div className="w-full px-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-8">
          <button
            onClick={() => onChangeType("upcoming")}
            className={cn(
              "text-colorTextBlack border-b-2 py-1 border-transparent hover:border-gray-300",
              period === "upcoming" && "border-colorAzul hover:border-colorAzul"
            )}
          >
            Upcoming
          </button>
          <button
            onClick={() => onChangeType("pending")}
            className={cn(
              "text-colorTextBlack border-b-2 py-1 border-transparent hover:border-gray-300",
              period === "pending" && "border-colorAzul hover:border-colorAzul"
            )}
          >
            Pending
          </button>
          <button
            onClick={() => onChangeType("past")}
            className={cn(
              "text-colorTextBlack border-b-2 py-1 border-transparent hover:border-gray-300",
              period === "past" && "border-colorAzul hover:border-colorAzul"
            )}
          >
            Past
          </button>
          <DatePickerWithRange onChangeRangeDates={onChangeRangeDates}>
            <button
              className={cn(
                "text-colorTextBlack border-b-2 py-1 border-transparent flex items-center gap-1 hover:border-gray-300",
                period === "dateRange" &&
                  "border-colorAzul hover:border-colorAzul"
              )}
            >
              <span>Date Range</span>
              <ChevronDown size={15} />
            </button>
          </DatePickerWithRange>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-full bg-white border border-colorTextBlack flex items-center gap-1 px-3 py-1 hover:bg-gray-100">
            <Download className="text-colorTextBlack" />
            <span>Export</span>
          </button>
          <button className="rounded-full bg-white border border-colorTextBlack flex items-center gap-1 px-3 py-1 hover:bg-gray-100">
            <ListFilter className="text-colorTextBlack" />
            <span>Filter</span>
            <ChevronDown className="text-colorTextBlack" size={15} />
          </button>
        </div>
      </div>
      <div>
        {dateRange && <div className="w-full bg-white p-6">{txtRange}</div>}
        {events.length == 0 && (
          <div className="w-full p-6 flex flex-col items-center justify-center border-t border-gray-300">
            <picture>
              <img
                src="https://assets.calendly.com/assets/frontend/media/no-events-2ed89b6c6379caebda4e.svg"
                alt="noEvents"
              />
            </picture>
            <p className="text-colorTextGris font-girloySemiBold text-xl">
              No events in this Range
            </p>
          </div>
        )}
        {eventsGroup.map((v, i) => (
          <div key={v.date.toString()}>
            <div className="dayHeader font-girloyBold text-lg">
              <h2>{format(v.date, "EEEE, dd MMMM yyyy")}</h2>
            </div>
            {v.events?.map((t, i) => (
              <ScheduleEventItem event={t} key={t.id} index={i} />
            ))}
          </div>
        ))}
      </div>
      <div className="w-full px-3 py-2 flex items-center justify-center border-t border-gray-300">
        <p>You`&apos;ve reached the end of the list</p>
      </div>
    </div>
  );
}
