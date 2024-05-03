import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@prisma/client";
import React from "react";

type Props = {
  user: User;
};

export default async function EventsTypeList({ user }: Props) {
  return <div></div>;
}

export const EventsTypeListSkeleton = () => {
  return (
    <div className="w-full flex flex-wrap gap-4">
      {[
        ...Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="bg-white rounded-lg h-56 w-[280px]" />
        )),
      ]}
    </div>
  );
};
