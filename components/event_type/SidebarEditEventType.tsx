"use client";
import { TypeEventFormating } from "@/lib/types";
import {
  ChevronLeft,
  Forward,
  LinkIcon,
  SettingsIcon,
  Share2Icon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  typeEvent: string;
  eventType: TypeEventFormating;
};

export default function SidebarEditEventType({ eventType, typeEvent }: Props) {
  return (
    <aside className="size-full">
      <div className=" px-6 w-full h-[15%] border-b border-gray-300 flex items-start justify-evenly flex-col">
        <div className="w-full flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-colorTextBlack font-girloyRegular"
          >
            <ChevronLeft />
            <span className="underline">Done</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="size-11 rounded-lg flex items-center justify-center hover:bg-gray-100">
              <SettingsIcon className="text-colorTextBlack" />
            </button>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="size-11 rounded-lg flex items-center justify-center hover:bg-gray-100">
                    <LinkIcon className="text-colorTextBlack" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="font-girloyLight">
                  <p>Copy link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <button className="rounded-full px-3 py-2 bg-colorAzul flex items-center gap-2 text-white font-girloySemiBold hover:bg-colorTextAzulOther">
              <Share2Icon className="text-white" />
              <span>Share</span>
            </button>
          </div>
        </div>
        <h1 className="text-colorTextBlack font-girloyBold text-2xl">
          {eventType.eventName}
        </h1>
      </div>
      <div className="w-full h-[85%] overflow-y-auto"></div>
    </aside>
  );
}
