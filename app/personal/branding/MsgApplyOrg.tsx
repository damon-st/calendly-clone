"use client";
import { ReactNode, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  children: ReactNode;
};

export default function MsgApplyOrg({ children }: Props) {
  const [showPop, setShowPop] = useState(false);
  return (
    <Popover open={showPop} onOpenChange={setShowPop}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        className="bg-[#333333] text-white font-girloyRegular"
      >
        <div className="w-full flex flex-col gap-3">
          <p>
            This setting automatically applies the same logo display for all
            users and teams. Please note that checking this box restricts users
            without admin permissions from using their own logo.
          </p>
        </div>
        <div className="w-full flex items-center justify-center mt-5">
          <button
            onClick={() => setShowPop(false)}
            className="w-full rounded-full border border-white py-2"
          >
            Got it
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
