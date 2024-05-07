"use client";
import {
  ChevronDown,
  MapPinIcon,
  MapPinnedIcon,
  Phone,
  TextCursorInput,
} from "lucide-react";
import { ReactElement, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypeLocationEventNames } from "@/lib/types";

type Props = {
  typeSelect?: TypeLocationEventNames;
};

const items1: Array<{
  icon: ReactElement;
  value: TypeLocationEventNames;
  title: string;
}> = [
  {
    icon: <Phone size={20} className="text-colorTextBlack" />,
    title: "Phone call",
    value: "phoneCall",
  },
  {
    icon: <MapPinIcon size={20} className="text-colorTextBlack" />,
    title: "In-person meeting",
    value: "inPerson",
  },
  {
    icon: <MapPinnedIcon size={20} className="text-colorTextBlack" />,
    title: "Ask invitee",
    value: "askInvite",
  },
  {
    icon: <TextCursorInput size={20} className="text-colorTextBlack" />,
    title: "Custom",
    value: "custom",
  },
  {
    title: "Zoom",
    value: "zoom",
    icon: (
      <picture>
        <img
          loading="lazy"
          src="https://assets.calendly.com/assets/frontend/media/zoom-dd4ce5bef905d2b74c0a.svg"
          alt="googleMets"
          className="size-5 object-contain"
        />
      </picture>
    ),
  },
  {
    icon: (
      <picture>
        <img
          loading="lazy"
          src="https://assets.calendly.com/assets/frontend/media/google-meet-fe6527ea0e4bd6fb57ad.svg"
          alt="googleMets"
          className="size-5 object-contain"
        />
      </picture>
    ),
    title: "Google Meet",
    value: "googleMeet",
  },
  {
    icon: (
      <picture>
        <img
          loading="lazy"
          src="https://assets.calendly.com/assets/frontend/media/ms-teams-e0858e32c5245a478456.svg"
          alt="microsoftTems"
          className="size-5 object-contain"
        />
      </picture>
    ),
    title: "Microsoft Teams",
    value: "mTeams",
  },
  {
    icon: (
      <picture>
        <img
          loading="lazy"
          src="https://assets.calendly.com/assets/frontend/media/webex-06679da3bace64c4b1d4.svg"
          alt="webex"
          className="size-5 object-contain"
        />
      </picture>
    ),
    title: "Webex",
    value: "webex",
  },
  {
    icon: (
      <picture>
        <img
          loading="lazy"
          src="https://assets.calendly.com/assets/frontend/media/gotomeeting-58f03523b2e7fe24bfcd.svg"
          alt="goToMeeting"
          className="size-5 object-contain"
        />
      </picture>
    ),
    title: "GoTo Meeting",
    value: "goToMeting",
  },
];

export default function EditLocationTypes({ typeSelect }: Props) {
  const selectetTeype = useMemo(() => {
    return items1.find((v) => v.value === typeSelect);
  }, [typeSelect]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="cursor-pointer rounded-lg border border-gray-300 min-h-12 flex items-center px-4 justify-between">
          <div className="flex items-center gap-3">
            {selectetTeype?.icon}
            <span className="text-colorTextBlack font-girloyRegular">
              {selectetTeype?.title}
            </span>
          </div>
          <ChevronDown className="text-colorAzul" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full md:min-w-[450px]">
        {items1.map((v, i) => (
          <div key={v.value}>
            {i == 4 && (
              <DropdownMenuLabel className="font-girloySemiBold">
                WEEB CONFERENCING
              </DropdownMenuLabel>
            )}
            <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
              {v.icon}
              <span>{v.title}</span>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
