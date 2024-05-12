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

export default function InfoWelcomeMsg({ children }: Props) {
  const [showMsg, setShowMsg] = useState(false);
  return (
    <Popover open={showMsg} onOpenChange={setShowMsg}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        className="bg-[#333333] text-white font-girloyRegular"
      >
        <div className="flex flex-col gap-3">
          <p>
            The welcome message will appear on your Calendly page as shown
            below.
          </p>
          <picture>
            <img
              src="https://assets.calendly.com/assets/frontend/media/welcome_message_tip_image-53b2324a82b6570b5319.jpg"
              alt="imgs"
              loading="lazy"
            />
          </picture>
        </div>
        <div className="w-full flex items-center justify-center mt-5">
          <button
            onClick={() => setShowMsg(false)}
            className="rounded-full w-full border border-white py-2"
          >
            Got it
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
