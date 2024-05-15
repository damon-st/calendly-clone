import { getAllContacts } from "@/actions/contacts";
import { getAllSchedules } from "@/actions/schedules";
import {
  EventType,
  IntroInfo,
  Prisma,
  ScheduleEvents,
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

export type ContactWithSchedules = Prisma.PromiseReturnType<
  typeof getAllContacts
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
  inviteQuestions: TypeInviteQuestions[];
  descriptionInstruc: string;
};

export type TypeEventFormating = EventType & {
  duration: TypeDurationCustom;
  location: TypeNewEventLocation;
  user?: UserInfo | null;
  scheduleAvailibity?: ScheduleWithProps | null;
  inviteQuestions: TypeInviteQuestions[];
};

export type ScheduleWithProps = ScheduleM & {
  scheduleWeekDays: ScheduleTypeWithHours[];
};

export type ScheduleTypeWithHours = ScheduleWeekdDays & {
  scheduleHours: ScheduleHoursM[];
};

type TypeInviteQuestionsDto = {
  label: string;
  responseTxt: string;
  required: boolean;
  id: string;
  disabled: boolean;
  active: boolean;
  typeInput:
    | "email"
    | "text"
    | "number"
    | "checkbox"
    | "radioButton"
    | "textArea"
    | "tel"
    | "drowdown";
};

export type TypeQuestionSelection = {
  label: string;
  selected: boolean;
};

export type TypeInviteQuestionsNames =
  | "oneLine"
  | "multipleLines"
  | "radioButtons"
  | "checkboxes"
  | "drowpDown"
  | "phonNumber";

export type TypeInviteQuestions =
  | {
      type: "oneLine";
      data: TypeInviteQuestionsDto;
    }
  | {
      type: "multipleLines";
      data: TypeInviteQuestionsDto & {};
    }
  | {
      type: "radioButtons";
      data: TypeInviteQuestionsDto & {
        options: TypeQuestionSelection[];
      };
    }
  | {
      type: "checkboxes";
      data: TypeInviteQuestionsDto & {
        options: TypeQuestionSelection[];
      };
    }
  | {
      type: "drowpDown";
      data: TypeInviteQuestionsDto & {
        options: TypeQuestionSelection[];
      };
    }
  | {
      type: "phonNumber";
      data: TypeInviteQuestionsDto & {
        country?: string;
        phone?: string;
      };
    };

export type TypeScheduleEventInvitation = ScheduleEvents & {
  eventType: TypeEventFormating;
  inviteQuestions: TypeInviteQuestions[];
  location: TypeNewEventLocation;
};

export type ScheduleEventSearch = "upcoming" | "pending" | "past" | "dateRange";
export type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

export type CountryInfoUser = {
  countryCode: string;
  timezone: string;
  countryName: string;
};

export type BrandingInfoUser = {
  applyAll: boolean;
  logoUrl?: string;
  useCalendlyBrading: boolean;
};

export type UserInfo = User & {
  countryInfo?: CountryInfoUser | null;
  introInfo?: IntroInfo | null;
  brandingInfo?: BrandingInfoUser | null;
};
