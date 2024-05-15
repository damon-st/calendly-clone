import { Input } from "@/components/ui/input";
import { ContactWithSchedules, TypeScheduleEventInvitation } from "@/lib/types";
import {
  CalendarClock,
  MoreVertical,
  Plus,
  Redo,
  Search,
  Star,
} from "lucide-react";
import React from "react";
import LastNestMeeting from "./LastNestMeeting";

type Props = {
  data: ContactWithSchedules;
};

export default function Contact({ data }: Props) {
  return (
    <div className="w-full flex flex-col gap-3 mt-10">
      <div className="flex items-center gap-5">
        <div className="border-b-[3px] border-colorAzul pb-3 font-girloyRegular cursor-pointer">
          All contacts
        </div>
        <div className="border-b-[3px] border-transparent pb-3 font-girloyRegular cursor-pointer hover:border-gray-300">
          Favorites
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="w-[30%] flex items-center  bg-white px-2 min-h-11 border border-gray-400 rounded-lg">
          <Search className="text-colorTextGris" />
          <Input
            placeholder="Search"
            className="w-full border border-transparent outline-none outline-transparent"
          />
        </div>
        <div className="flex items-center gap-3 text-colorTextGris font-girloySemiBold">
          <Plus className="text-colorTextGris" />
          <span>New contact</span>
        </div>
      </div>
      <div className="w-full mt-5 rounded-sm shadow-lg bg-white">
        <div className="contactGrid font-girloyBold text-colorTextBlack p-4 text-center border-b border-gray-300">
          <p>Name</p>
          <p>Next Meeting</p>
          <p>Last Meeting</p>
        </div>
        <div className="w-full   border-b border-gray-300">
          {data.map((v) => (
            <div
              key={v.id}
              className="w-full p-4 contactGrid hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="size-12 bg-[#cccccc] rounded-full flex items-center justify-center text-black font-girloyRegular">
                  {v.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col gap-2 font-girloyRegular text-sm">
                  <div className="flex items-center gap-3">
                    <span>{v.name}</span>
                    <Star size={15} />
                  </div>
                  <p className="text-colorTextGris">{v.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <LastNestMeeting
                  events={v.meetingHistory as TypeScheduleEventInvitation[]}
                  isNext
                />
              </div>
              <div className="flex items-center justify-center">
                <LastNestMeeting
                  events={v.meetingHistory as TypeScheduleEventInvitation[]}
                  isNext={false}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="flex items-center gap-1 hover:underline"
                >
                  <CalendarClock size={15} className="text-colorAzul" />
                  <span className="text-colorAzul font-girloyRegular text-sm">
                    Book meeting
                  </span>
                </button>
                <button
                  type="button"
                  className="border border-colorAzul rounded-full flex px-2 items-center gap-2 py-1 hover:bg-colorCeleste"
                >
                  <Redo className="text-colorAzul" size={15} />
                  <span className="text-colorAzul font-girloyRegular text-sm">
                    Share availability
                  </span>
                </button>
                <div className="flex items-center justify-center">
                  <MoreVertical className="text-colorTextBlack" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
