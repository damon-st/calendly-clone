import Link from "next/link";
import { Suspense } from "react";
import AvalibilitySchedulesList, {
  AvalibilitySchedulesListSkeleton,
} from "./_components/AvalibilitySchedulesList";

export default function AvaliabilityPage() {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-colorTextBlack text-3xl font-girloyBold mb-4">
        Availability
      </h1>
      <div className="w-full flex mb-5 border-b border-gray-300">
        <div className="w-full h-[48px]">
          <nav className="h-full">
            <ul className="flex w-full h-full">
              <li className="px-4 h-full">
                <Link
                  href="#"
                  className="border-b-[3px] border-colorAzul h-full inline-flex"
                >
                  Schedules
                </Link>
              </li>
              <li className="px-4 h-full">
                <Link
                  href="#"
                  className="border-b-[3px] border-transparent h-full inline-flex text-colorTextBlack font-girloyLight gap-4"
                >
                  <span>Holidays</span>
                  <div className="rounded-sm bg-colorAzul text-white text-sm flex items-center justify-center px-2 h-[50%] font-girloyBold">
                    NEW
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Suspense fallback={<AvalibilitySchedulesListSkeleton />}>
        <AvalibilitySchedulesList />
      </Suspense>
    </div>
  );
}
