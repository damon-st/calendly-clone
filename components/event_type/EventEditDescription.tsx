"use client";
import { Info } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  value: string;
  onChange?: (e: string) => void;
  isEditing: boolean;
};

export default function EventEditDescription({
  onChange,
  value,
  isEditing,
}: Props) {
  const [showInfo, setShowInfo] = useState(false);

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-colorTextBlack flex items-center gap-3 font-girloySemiBold">
        Description/Instructions
        <Popover open={showInfo} onOpenChange={setShowInfo}>
          <PopoverTrigger>
            <Info className="text-colorTextGris cursor-pointer" size={15} />
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="bg-[#333333] text-white font-girloyRegular p-6 flex flex-col gap-3"
          >
            <p>
              Use this optional field to provide a description of your event.
              The circled text in the screen shot below is the event
              description.
            </p>
            <picture>
              <img
                src="https://assets.calendly.com/assets/frontend/media/help-description-e9394c3a87167203bc8d.png"
                alt="img"
              />
            </picture>
            <button
              onClick={() => setShowInfo(false)}
              className="rounded-full w-full border border-white py-2 mt-5"
            >
              Got it
            </button>
          </PopoverContent>
        </Popover>
      </p>
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder="Write a summary and any details your invitee should about the event."
        theme="snow"
        readOnly={!isEditing}
      />
    </div>
  );
}
