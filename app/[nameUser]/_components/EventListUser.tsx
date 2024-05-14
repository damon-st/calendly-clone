import { getAllEvents, getAllEventsByUserId } from "@/actions/event_type";
import { Skeleton } from "@/components/ui/skeleton";
import { UserInfo } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  user: UserInfo;
};

export default async function EventListUser({ user }: Props) {
  const events = await getAllEventsByUserId(user.userId);
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 min-h-[250px] mt-5">
      {events.map((v) => (
        <Link href={`/${user.userName}/${v.eventLinkName}`} key={v.id}>
          <div className="w-full border-t border-t-gray-300 p-3 flex flex-col gap-2 items-start  hover:bg-gray-100 cursor-pointer">
            <div className="w-full flex items-center justify-between ">
              <div className="flex items-center gap-2">
                <div
                  style={{ backgroundColor: v.colorEvent }}
                  className="size-7 rounded-full"
                />
                <p className="text-colorTextBlack font-girloyBold text-lg">
                  {v.eventName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ChevronRight className="text-colorTextBlack" size={30} />
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: v.descriptionInstruc }}
            ></div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function EventListUserSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
      <Skeleton className="w-full min-h-[250px] bg-gray-100 rounded-lg" />
      <Skeleton className="w-full min-h-[250px] bg-gray-100 rounded-lg" />
      <Skeleton className="w-full min-h-[250px] bg-gray-100 rounded-lg" />
      <Skeleton className="w-full min-h-[250px] bg-gray-100 rounded-lg" />
    </div>
  );
}
