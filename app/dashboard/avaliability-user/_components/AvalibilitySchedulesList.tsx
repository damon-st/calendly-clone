import { getAllSchedules } from "@/actions/schedules";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@clerk/nextjs/server";
import { Loader } from "lucide-react";
import SchedulesList from "./SchedulesList";

export default async function AvalibilitySchedulesList() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const schedules = await getAllSchedules(userId);
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold text-colorTextBlack">Schedule</h2>
      <SchedulesList schedules={schedules} />
    </div>
  );
}

export const AvalibilitySchedulesListSkeleton = () => {
  return (
    <div className="w-full p-2 relative">
      <Skeleton className="w-full rounded-lg min-h-[200px] bg-white" />
      <Loader size={50} className="absolute top-1/2 left-1/2 text-colorText" />
    </div>
  );
};
