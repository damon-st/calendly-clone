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

export default function MsgLogo({ children }: Props) {
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
            Use this setting to add your logo to all of your Calendly scheduling
            pages.
          </p>
          <picture>
            <img
              src="https://assets.calendly.com/assets/frontend/media/logo_tip_image-039a4a76ffa0de882b29.jpg"
              alt="iomage"
              loading="lazy"
            />
          </picture>
          <p>
            Your logo will appear in the top left corner of your Event Type
            page. We recommend using an image that is 440px x 220px for the best
            display.
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
