import { ChevronDown } from "lucide-react";
import React, { Suspense } from "react";
import ScheduledEventsList, {
  ScheduledEventsListSkeleton,
} from "./_components/ScheduledEventsList";
import { DateRange, ScheduleEventSearch } from "@/lib/types";
interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}
export default function ScheduleEventsUser({ searchParams }: Props) {
  const period = searchParams?.period ?? "upcoming";

  let dateRange: DateRange | undefined;

  if (searchParams?.startDate && searchParams?.endDate) {
    dateRange = {
      from: new Date(decodeURIComponent(searchParams!.startDate as string)),
      to: new Date(decodeURIComponent(searchParams!.endDate as string)),
    };
  }

  return (
    <div className="w-full flex flex-col gap-9">
      <div className="py-4">
        <h1 className="text-3xl font-girloyBold text-colorTextBlack">
          Scheduled events
        </h1>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex items-center gap-4 mb-6">
          <button className="rounded-lg bg-white px-4 py-2 flex items-center gap-2 text-colorTextBlack font-girloyRegular border border-gray-300">
            <span>My Calendly</span>
            <ChevronDown className="text-colorTextBlack" />
          </button>
        </div>
        <div className="w-full flex flex-col">
          <Suspense fallback={<ScheduledEventsListSkeleton />}>
            <ScheduledEventsList
              dateRange={dateRange}
              period={period as ScheduleEventSearch}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
