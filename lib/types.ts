import { getAllSchedules } from "@/actions/schedules";
import {
  EventType,
  Prisma,
  ScheduleHoursM,
  ScheduleM,
  ScheduleWeekdDays,
  User,
} from "@prisma/client";

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
export type TypeResultAction = {
  message: string;
  success: boolean;
  data?: any;
};

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
  | "webex"
  | "none";

export type TypeLocationEvent =
  | {
      type: "zoom";
      data?: {};
    }
  | {
      type: "none";
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

export type TypeCountry = {
  name: string;
  flag: string;
  code: string;
  country: string;
  phone?: string;
};

export type DataNewEnvet = {
  color: string;
  nameEvent: string;
  duration: TypeDurationCustom;
  location: TypeNewEventLocation;
};

export type TypeEventFormating = EventType & {
  duration: TypeDurationCustom;
  location: TypeNewEventLocation;
  user?: User | null;
  scheduleAvailibity?: ScheduleWithProps | null;
};

export type ScheduleWithProps = ScheduleM & {
  scheduleWeekDays: ScheduleTypeWithHours[];
};

export type ScheduleTypeWithHours = ScheduleWeekdDays & {
  scheduleHours: ScheduleHoursM[];
};
