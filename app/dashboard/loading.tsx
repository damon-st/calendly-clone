import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

export default function LoadingDashboard({}: Props) {
  return (
    <main className="size-full bg-colorGrisDash flex">
      <div className="w-[260px] h-full bg-white borderr border-gray-300">
        <Skeleton className="size-full" />
      </div>
      <div className="w-full flex-1 h-full">
        <Skeleton className="size-full" />
      </div>
    </main>
  );
}
