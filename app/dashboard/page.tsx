import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { existUser } from "@/lib/services/user";
import { auth } from "@clerk/nextjs/server";
import { ChevronDown, Code2Icon, LinkIcon, Settings } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import EventsTypeList, {
  EventsTypeListSkeleton,
} from "./_components/EventsTypeList";

type Props = {};

export default async function DashboardPage({}: Props) {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const user = await existUser(userId);
  if (!user) {
    return null;
  }
  const name = (user.name ?? "USER").substring(0, 2).toUpperCase();
  const email = (user.email ?? "").split("@")?.[0];
  const urlUser = (process.env.NEXT_PUBLIC_URL ?? "") + "/" + email;
  return (
    <div className="w-full flex flex-col gap-9">
      <div className="py-4">
        <h1 className="text-3xl font-girloyBold text-colorTextBlack">
          Event types
        </h1>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex items-center gap-4 mb-6">
          <button className="rounded-lg bg-white px-4 py-2 flex items-center gap-2 text-colorTextBlack font-girloyRegular border border-gray-300">
            <span>My Calendly</span>
            <ChevronDown className="text-colorTextBlack" />
          </button>
          <Input
            placeholder="Find event types"
            className="w-full md:max-w-[250px] border border-gray-300"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="w-full flex items-center justify-between border-b border-gray-300 mb-5">
            <div className="flex items-center gap-2 py-4">
              <Avatar>
                <AvatarImage src={user.imageUrl ?? ""} />
                <AvatarFallback>{name}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-between">
                <p className="text-sm font-girloyRegular text-colorTextBlack">
                  {user.name?.toLowerCase()}
                </p>
                <Link
                  href={urlUser}
                  target="_blank"
                  className="text-colorAzul hover:underline font-girloyRegular text-sm"
                >
                  {urlUser}
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/new-event"
                className="text-colorAzul bg-white font-girloyRegular rounded-full border border-colorAzul px-3 py-1 hover:bg-colorCelesteHover"
              >
                New Event Type
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-center p-1 rounded-lg hover:bg-gray-100 cursor-pointer">
                          <Settings className="text-colorTextBlack" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-colorTextBlack font-girloyLight">
                          Shared options and Event Type Import/Export
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left">
                  <DropdownMenuItem className="flex gap-4 cursor-pointer">
                    <LinkIcon className="text-colorTextBlack" size={20} />
                    <span className="text-colorTextBlack font-girloyLight">
                      Copy link
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-4 cursor-pointer">
                    <Code2Icon className="text-colorTextBlack" size={20} />
                    <span className="text-colorTextBlack font-girloyLight">
                      Add to Website
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="w-full">
            <Suspense fallback={<EventsTypeListSkeleton />}>
              <EventsTypeList user={user} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
