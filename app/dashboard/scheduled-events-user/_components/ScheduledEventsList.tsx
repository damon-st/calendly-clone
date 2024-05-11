import { getAllScheduleEventInvitation } from "@/actions/schedule_events";
import { Skeleton } from "@/components/ui/skeleton";
import { DateRange, ScheduleEventSearch } from "@/lib/types";
import ScheduleEventTable from "./ScheduleEventTable";
type Props = {
  period: ScheduleEventSearch;
  dateRange: DateRange | undefined;
};

export default async function ScheduledEventsList({
  period,
  dateRange,
}: Props) {
  const scheduleEvents = await getAllScheduleEventInvitation(period, dateRange);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center justify-end text-sm font-girloyRegular text-colorTextGris mb-2">
        <p>Displaying 0 of {scheduleEvents.length} Events</p>
      </div>
      <ScheduleEventTable events={scheduleEvents} period={period} />
    </div>
  );
}

export const ScheduledEventsListSkeleton = () => {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-300 min-h-32 shadow-lg">
      <Skeleton className="rounded-lg size-full min-h-32" />
    </div>
  );
};
