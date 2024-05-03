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
