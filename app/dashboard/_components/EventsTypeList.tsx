import { getAllEvents } from "@/actions/event_type";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@prisma/client";
import React from "react";
import EventTypeItem from "./EventTypeItem";

type Props = {
  user: User;
  urlUser: string;
};

export default async function EventsTypeList({ user, urlUser }: Props) {
  const eventLists = await getAllEvents();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {eventLists.map((e) => (
        <EventTypeItem
          urlUser={urlUser}
          key={e.id}
          event={e}
          userId={user.userId}
        />
      ))}
    </div>
  );
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
