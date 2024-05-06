"use client";
import {
  ChevronDown,
  Info,
  MapPinIcon,
  MapPinnedIcon,
  Phone,
  TextCursorInput,
  Video,
} from "lucide-react";
import React, { useCallback, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypeLocationEventNames, TypeNewEventLocation } from "@/lib/types";
import { useShowModal } from "@/lib/store/useShowModal";

type Props = {
  canUseZoom: boolean;
  typeSelect?: TypeLocationEventNames;
  onChangeLocation: (value: TypeNewEventLocation) => void;
};

export default function InputNewEventLocation({
  canUseZoom,
  typeSelect,
  onChangeLocation,
}: Props) {
  const [showMsg, setShowMsg] = useState(false);
  const { onOpen } = useShowModal();

  const handleSelectLocation = useCallback(
    (type: TypeLocationEventNames) => {
      if (type == "zoom") {
        onChangeLocation({
          type: {
            type: "zoom",
          },
        });
      } else if (type == "phoneCall") {
        onOpen("editLocation");
      }
    },
    [onChangeLocation, onOpen]
  );

  return (
    <div className="w-full">
      <div className="w-full flex items-center gap-2">
        <p className="text-colorTextBlack font-girloySemiBold text-lg">
          Location*
        </p>
        <Popover open={showMsg} onOpenChange={setShowMsg}>
          <PopoverTrigger>
            <Info className="text-colorTextGris cursor-pointer" size={15} />
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="bg-[#333333] p-6 text-white font-girloyRegular  flex flex-col gap-4 text-sm"
          >
            <span>
              Use the &quot;Location`&quot; field to specify how and where both
              parties will connect at the scheduled time.{" "}
            </span>
            <span>
              The location entered here will appear on the confirmation page
              after events are scheduled and in the calendar event added to both
              you and your invitee&apos;s calendars.
            </span>
            <button
              onClick={() => setShowMsg(false)}
              type="button"
              className="px-3 py-2 mt-6 border border-white w-full rounded-full"
            >
              Got it
            </button>
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-full grid grid-cols-4 gap-2 mt-2">
        <button
          onClick={() => handleSelectLocation("zoom")}
          type="button"
          className="w-full border border-gray-300 h-20 rounded-lg flex flex-col gap-1 items-center justify-center text-colorTextBlack font-girloyRegular hover:bg-colorGrisDash cursor-pointer text-sm"
        >
          <Video className="text-colorTextBlack" />
          <span>Zoom</span>
        </button>
        <button
          onClick={() => handleSelectLocation("phoneCall")}
          type="button"
          className="w-full border border-gray-300 h-20 rounded-lg flex flex-col gap-1 items-center justify-center text-colorTextBlack font-girloyRegular hover:bg-colorGrisDash cursor-pointer text-sm"
        >
          <Phone className="text-colorTextBlack" />
          <span>Phone call</span>
        </button>
        <button
          onClick={() => handleSelectLocation("inPerson")}
          type="button"
          className="w-full border border-gray-300 h-20 rounded-lg flex flex-col gap-1 items-center justify-center text-colorTextBlack font-girloyRegular hover:bg-colorGrisDash cursor-pointer text-center text-sm"
        >
          <MapPinIcon className="text-colorTextBlack" />
          <span>In-person meeting</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="w-full h-20 flex flex-col justify-center items-center gap-2 text-colorTextBlack font-girloyRegular cursor-pointer"
            >
              <ChevronDown className="text-colorTextBlack" />
              <span>All options</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => handleSelectLocation("askInvite")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <MapPinnedIcon size={20} className="text-colorTextBlack" />
              <span>Ask invitee</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSelectLocation("custom")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <TextCursorInput size={20} className="text-colorTextBlack" />
              <span>Custom</span>
            </DropdownMenuItem>
            <DropdownMenuLabel className="font-girloySemiBold">
              WEEB CONFERENCING
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleSelectLocation("googleMeet")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <picture>
                <img
                  loading="lazy"
                  src="https://assets.calendly.com/assets/frontend/media/google-meet-fe6527ea0e4bd6fb57ad.svg"
                  alt="googleMets"
                  className="size-5 object-contain"
                />
              </picture>
              <span>Google Meet</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSelectLocation("mTeams")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <picture>
                <img
                  loading="lazy"
                  src="https://assets.calendly.com/assets/frontend/media/ms-teams-e0858e32c5245a478456.svg"
                  alt="microsoftTems"
                  className="size-5 object-contain"
                />
              </picture>
              <span>Microsoft Teams</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSelectLocation("webex")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <picture>
                <img
                  loading="lazy"
                  src="https://assets.calendly.com/assets/frontend/media/webex-06679da3bace64c4b1d4.svg"
                  alt="webex"
                  className="size-5 object-contain"
                />
              </picture>
              <span>Webex</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSelectLocation("goToMeting")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <picture>
                <img
                  loading="lazy"
                  src="https://assets.calendly.com/assets/frontend/media/gotomeeting-58f03523b2e7fe24bfcd.svg"
                  alt="goToMeeting"
                  className="size-5 object-contain"
                />
              </picture>
              <span>GoTo Meeting</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
