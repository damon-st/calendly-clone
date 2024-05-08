"use client";
import { TypeEventFormating } from "@/lib/types";
import {
  CalendarRangeIcon,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  LinkIcon,
  ListMinus,
  Mail,
  SettingsIcon,
  Share2Icon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

type Props = {
  typeEvent: string;
  eventType: TypeEventFormating;
};

export default function SidebarEditEventType({ eventType, typeEvent }: Props) {
  const copyLink = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_URL}/${
        eventType.user?.userName
      }/${eventType.eventName.toLowerCase().replaceAll(" ", "-")}`;
      await navigator.clipboard.writeText(url);
      toast.success("Copy link sucess");
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
    }
  };

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
                  <button
                    onClick={copyLink}
                    className="size-11 rounded-lg flex items-center justify-center hover:bg-gray-100"
                  >
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
      <div className="w-full h-[85%] overflow-y-auto">
        <div className="w-full  flex flex-col   ">
          <button
            type="button"
            className="w-full  border-b border-gray-300 px-6 flex pt-3 pb-3 hover:bg-colorCeleste cursor-pointer"
          >
            <div className="w-[10%] flex items-start justify-start">
              <ListMinus className="text-colorTextBlack" size={30} />
            </div>
            <div className="w-[80%] flex flex-col gap-1 items-start">
              <p className="text-colorTextBlack font-girloyBold text-xl">
                Event Details
              </p>
              <p className="text-colorTextBlack font-girloyRegular">
                {eventType.duration.time} {eventType.duration.format}
              </p>
              <div className="rounded-lg w-full px-1 py-1 bg-colorCeleste">
                <p className="font-girloyRegular text-colorTextBlack">
                  <span className="font-girloyBold">Tip:</span> Specify the
                  location for this meeting (phone, Zoom, etc.)
                </p>
              </div>
            </div>
            <div className="w-[10%] flex items-center justify-center">
              <ChevronRight className="text-colorTextBlack" size={30} />
            </div>
          </button>
          <button
            type="button"
            className="w-full  border-b border-gray-300 px-6 flex pt-3 pb-3 hover:bg-colorCeleste cursor-pointer"
          >
            <div className="w-[10%] flex items-start justify-start">
              <UsersIcon className="text-colorTextBlack" size={30} />
            </div>
            <div className="w-[80%] flex flex-col gap-1 items-start">
              <p className="text-colorTextBlack font-girloyBold text-xl">
                Hosts and invitees
              </p>
              <p className="text-colorTextBlack font-girloyRegular">
                {eventType.user?.name} (you)
              </p>
              <div className="flex rounded-lg w-full ">
                <p className="font-girloyRegular text-colorTextBlack">
                  {typeEvent} event
                </p>
              </div>
            </div>
            <div className="w-[10%] flex items-center justify-center">
              <ChevronRight className="text-colorTextBlack" size={30} />
            </div>
          </button>
          <button
            type="button"
            className="w-full  border-b border-gray-300 px-6 flex pt-3 pb-3 hover:bg-colorCeleste cursor-pointer"
          >
            <div className="w-[10%] flex items-start justify-start">
              <CalendarRangeIcon className="text-colorTextBlack" size={30} />
            </div>
            <div className="w-[80%] flex flex-col gap-1 items-start">
              <p className="text-colorTextBlack font-girloyBold text-xl">
                Scheduling settings
              </p>
              <p className="text-colorTextBlack font-girloyRegular">
                60 rolling calendar days
              </p>
              <div className="flex rounded-lg w-full ">
                <p className="font-girloyRegular text-colorTextBlack">
                  Mon,Tue Wed,Thue,Fri,Dun,hours vary
                </p>
              </div>
            </div>
            <div className="w-[10%] flex items-center justify-center">
              <ChevronRight className="text-colorTextBlack" size={30} />
            </div>
          </button>
          <button
            type="button"
            className="w-full  border-b border-gray-300 px-6 flex pt-3 pb-3 hover:bg-colorCeleste cursor-pointer"
          >
            <div className="w-[10%] flex items-start justify-start">
              <CreditCard className="text-colorTextBlack" size={30} />
            </div>
            <div className="w-[80%] flex flex-col gap-1 items-start">
              <p className="text-colorTextBlack font-girloyBold text-xl">
                Booking page options
              </p>
              <p className="text-colorTextBlack font-girloyRegular">
                Asking for name, email,+1 question
              </p>
              <div className="flex rounded-lg w-full ">
                <p className="font-girloyRegular text-colorTextBlack">
                  Calendy confirmation page
                </p>
              </div>
            </div>
            <div className="w-[10%] flex items-center justify-center">
              <ChevronRight className="text-colorTextBlack" size={30} />
            </div>
          </button>
          <button
            type="button"
            className="w-full  border-b border-gray-300 px-6 flex pt-3 pb-3 hover:bg-colorCeleste cursor-pointer"
          >
            <div className="w-[10%] flex items-start justify-start">
              <Mail className="text-colorTextBlack" size={30} />
            </div>
            <div className="w-[80%] flex flex-col gap-1 items-start">
              <p className="text-colorTextBlack font-girloyBold text-xl">
                Communications
              </p>
              <p className="text-colorTextBlack font-girloyRegular">
                Calendar invitations
              </p>
              <div className="flex rounded-lg w-full ">
                <p className="font-girloyRegular text-colorTextBlack">
                  No remienders or workflows
                </p>
              </div>
            </div>
            <div className="w-[10%] flex items-center justify-center">
              <ChevronRight className="text-colorTextBlack" size={30} />
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
