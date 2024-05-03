"use server";

import { daysEN } from "@/common/week_days";
import { db } from "@/lib/db";
import { TypeResultAction } from "@/lib/types";
import { formatHourMin } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { ScheduleHoursM } from "@prisma/client";
import { getCountry } from "countries-and-timezones";

export const getAllSchedules = async (userId: string) => {
  try {
    return await db.scheduleM.findMany({
      where: {
        userId,
      },
      include: {
        scheduleWeekDays: {
          include: {
            scheduleHours: true,
          },
        },
      },
    });
  } catch (error) {
    console.log("[ERROR_getAllSchedules]", error);
    return [];
  }
};

export const createDefaultSchedule = async (userId: string) => {
  try {
    const temp = getCountry("EC");

    console.log(temp);

    const idSchedule = await db.scheduleM.create({
      data: {
        countryCode: temp.id,
        countryName: temp.name,
        timeZone: temp.timezones[0],
        userId,
        title: "Working hours",
      },
    });

    for (let i = 1; i <= 7; i++) {
      const idWeekDays = await db.scheduleWeekdDays.create({
        data: {
          weekDay: i,
          weekDayStr: daysEN.find((v) => v.value == i)?.title ?? "MON",
          active: true,
          scheduleId: idSchedule.id,
        },
      });
      await db.scheduleHoursM.create({
        data: {
          hourInit: 9,
          hourInitStr: "09",
          minuteInit: 0,
          minuteInitStr: "00",
          hourEnd: 17,
          hourEndStr: "17",
          minuteEnd: 0,
          minuteEndStr: "00",
          scheduleWeekDayId: idWeekDays.id,
        },
      });
    }

    return undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const updateScheduleWeekDayActiveOrDesct = async (
  value: boolean,
  id: string
): Promise<TypeResultAction> => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("USER NOT FOUND");
    }
    await db.scheduleWeekdDays.update({
      where: {
        id,
      },
      data: {
        active: value,
      },
    });
    return { message: "Success update", success: true };
  } catch (error) {
    return {
      message: `ERROR:${error}`,
      success: false,
    };
  }
};
export const updateScheduleWeekDayHours = async (
  id: string,
  data: Partial<ScheduleHoursM>
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("USER NOT FOUND");
    }
    return await db.scheduleHoursM.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    console.log("[ERROR_updateScheduleWeekDayHours]", error);
    return undefined;
  }
};

export const createScheduleWeekDayNewHour = async (
  idWeek: string,
  lastHour: ScheduleHoursM
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("USER NOT FOUND");
    }
    if (!lastHour) {
      return await db.scheduleHoursM.create({
        data: {
          hourInit: 9,
          hourInitStr: "09",
          minuteInit: 0,
          minuteInitStr: "00",
          hourEnd: 18,
          hourEndStr: "18",
          minuteEnd: 0,
          minuteEndStr: "00",
          order: 0,
          scheduleWeekDayId: idWeek,
        },
      });
    }
    if (lastHour.hourEnd >= 23) {
      throw new Error("CAN NOT ADD MORE HOURS");
    }
    const hourInit = lastHour.hourEnd + 1;
    const hourInitStr = formatHourMin(hourInit);
    let hourEnd = hourInit + 1;
    let minuteEnd = lastHour.minuteEnd;
    let minuteEndStr = lastHour.minuteEndStr;
    if (hourEnd > 23) {
      hourEnd = 23;
      minuteEnd = 50;
      minuteEndStr = formatHourMin(minuteEnd);
    }
    const hourEndStr = formatHourMin(hourEnd);
    return await db.scheduleHoursM.create({
      data: {
        scheduleWeekDayId: idWeek,
        hourInit,
        hourInitStr,
        minuteInit: lastHour.minuteEnd,
        minuteInitStr: lastHour.minuteEndStr,
        hourEnd,
        hourEndStr,
        minuteEnd,
        minuteEndStr,
        order: lastHour.order + 1,
      },
    });
  } catch (error) {
    console.log("[ERROR_createScheduleWeekDayNewHour]", error);
    return undefined;
  }
};

export const deleteScheduleWeekDayHOUR = async (
  id: string
): Promise<TypeResultAction> => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("USER NOT FOUND");
    }
    await db.scheduleHoursM.delete({
      where: {
        id,
      },
    });
    return {
      message: "Remove success",
      success: true,
    };
  } catch (error) {
    return {
      message: `Error:${error}`,
      success: false,
    };
  }
};
