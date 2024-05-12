"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { EventType } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import React, { useCallback, useState } from "react";

type Props = {
  events: EventType[];
};

export default function ActiveEventsAvialibility({ events }: Props) {
  const [showPopap, setShowPopap] = useState(false);
  const toggleShow = useCallback(() => {
    setShowPopap((v) => !v);
  }, []);

  return (
    <Popover open={showPopap} onOpenChange={setShowPopap}>
      <PopoverTrigger asChild>
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Active on</span>
          <button className="text-colorAzul flex items-center gap-2 font-girloyRegular">
            <span>{events.length} Event Type</span>
            <ChevronDown className="text-colorAzul" />
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <div className="w-full flex flex-col p-3 border-b border-gray-300">
          <div className="w-full">
            <Input placeholder="Search" className="border border-gray-300" />
          </div>
        </div>
        <div className="w-full flex items-center justify-between p-3 border-b border-gray-300">
          <div className="w-full flex items-center justify-between">
            <button className="text-colorAzul hover:underline">
              Select all
            </button>
            <button className="text-colorAzul hover:underline">
              Deselect all
            </button>
          </div>
        </div>
        <div className="w-full min-h-40 border-b border-gray-300 p-3">
          <p className="text-colorTextGris font-girloyRegular">ACTIVE ON</p>
          {events.map((v) => (
            <div key={v.id} className="flex items-center gap-3">
              <Checkbox checked className="data-[state=checked]:bg-colorAzul" />
              <p className="text-colorTextBlack font-girloyBold cursor-pointer">
                {v.eventName}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-between p-3 gap-3 font-girloySemiBold">
          <button
            onClick={toggleShow}
            className="border border-gray-300 px-6 w-full py-1 bg-white rounded-full"
          >
            Cancel
          </button>
          <button className="border  px-6 w-full py-1 bg-colorAzul text-white rounded-full">
            Save
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
