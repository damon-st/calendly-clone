import { TypeLocationEventNames } from "@/lib/types";
import {
  MapPinIcon,
  MapPinnedIcon,
  Phone,
  TextCursorInput,
} from "lucide-react";
import { ReactElement } from "react";

export const itemsLocationEvent: Array<{
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
