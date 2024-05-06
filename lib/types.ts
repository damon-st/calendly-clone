import { getAllSchedules } from "@/actions/schedules";
import { Prisma } from "@prisma/client";

export type TypeSectionTabsInfo = {
  title: string;
  value: string;
  imageUrl: string;
  infos: Array<TypeSectionTabsInfoValues>;
  titleLink: string;
  href: string;
};

export type TypeSectionTabsInfoValues = {
  iconUrl: string;
  title: string;
  description: string;
};

export type TypeIntegrationsIcon = {
  iconUrl: string;
  label: string;
  href: "#";
};

export type TypeSectionFourInfoBusin = {
  label: string;
  href: string;
  titleLink: string;
  imageUrl: string;
  infos: Array<{
    title: string;
    description: string;
  }>;
};

export type TypeIntroInfo = { title: string; value: string; imgUrl: string };
export type TypeResultAction = { message: string; success: boolean };

export type ShedulesWithTypes = Prisma.PromiseReturnType<
  typeof getAllSchedules
>;

export type TimeHour = {
  hour: number;
  minute: number;
};

export type TypeTimeHourValid = {
  hour: number;
  min: number;
  hourStr: string;
  minStr: string;
};

export type TypeDurationCustom = {
  time: number;
  format: "min" | "hrs";
};

export type TypeLocationEventNames =
  | "zoom"
  | "phoneCall"
  | "inPerson"
  | "askInvite"
  | "custom"
  | "googleMeet"
  | "mTeams"
  | "goToMeting"
  | "webex";

export type TypeLocationEvent =
  | {
      type: "zoom";
      data?: {};
    }
  | {
      type: "phoneCall";
      data: {
        type: "mee" | "callMe";
        phone?: string;
        msgAditional?: string;
        country?: string;
      };
    }
  | {
      type: "inPerson";
      data: {
        location: string;
        msgAditional?: string;
      };
    }
  | {
      type: "askInvite";
      data?: {};
    }
  | {
      type: "custom";
      data: {
        value: string;
        typeShow: "before" | "after";
      };
    }
  | {
      type: "googleMeet";
      data?: {};
    }
  | {
      type: "mTeams";
      data?: {};
    }
  | {
      type: "goToMeting";
      data?: {};
    }
  | {
      type: "webex";
      data?: {};
    };

export type TypeNewEventLocation = {
  type: TypeLocationEvent;
  data?: any;
};
