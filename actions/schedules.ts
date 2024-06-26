"use server";

import { daysEN } from "@/common/week_days";
import { db } from "@/lib/db";
import { existUser } from "@/lib/services/user";
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
        eventTypes: true,
        scheduleWeekDays: {
          include: {
            scheduleHours: true,
          },
          orderBy: {
            weekDay: "asc",
          },
        },
        scheduleSpecificHours: {
          include: {
            hours: true,
          },
        },
      },
    });
  } catch (error) {
    console.log("[ERROR_getAllSchedules]", error);
    return [];
  }
};

export const createDefaultSchedule = async (
  userId: string,
  title: string = "Working hours",
  favorite: boolean
): Promise<TypeResultAction> => {
  try {
    const user = await existUser(userId);
    const temp = getCountry(user?.countryInfo?.countryCode ?? "EC");
    console.log(temp);
    const idSchedule = await db.scheduleM.create({
      data: {
        countryCode: temp!.id,
        countryName: temp!.name,
        timeZone: temp!.timezones[0],
        userId,
        title,
        favorite,
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

    return { message: "Create success", success: true, data: idSchedule.id };
  } catch (error) {
    console.log(error);
    return { message: `Error:${error}`, success: false };
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

export const updateNameScheduleAviability = async (
  id: string,
  title: string
): Promise<TypeResultAction> => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("USER NOT FOUND");
    }
    const result = await db.scheduleM.update({
      where: {
        id,
        userId,
      },
      data: {
        title,
      },
    });
    return { success: true, message: "Changes saved" };
  } catch (error) {
    console.log(error);
    return {
      message: `Error:${error}`,
      success: false,
    };
  }
};

export const deleteScheduleAviability = async (
  id: string,
  userId: string
): Promise<TypeResultAction> => {
  try {
    await db.scheduleM.delete({
      where: {
        id,
        userId,
      },
    });
    return {
      message: `Delete success`,
      success: true,
    };
  } catch (error) {
    return { message: `Error:${error}`, success: false };
  }
};

export const makeDefautlScheduleAvailability = async (
  id: string
): Promise<TypeResultAction> => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("USER NOT FOUND");
    }
    await db.scheduleM.updateMany({
      where: {
        userId,
      },
      data: {
        favorite: false,
      },
    });
    await db.scheduleM.update({
      where: {
        userId,
        id,
      },
      data: {
        favorite: true,
      },
    });
    return {
      message: "Update success",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: `${error}`,
      success: false,
    };
  }
};

export const getSchedulesFavorite = async (userId: string) => {
  try {
    return await db.scheduleM.findFirst({
      where: {
        userId,
        favorite: true,
      },
      include: {
        scheduleWeekDays: {
          include: {
            scheduleHours: true,
          },
          orderBy: {
            weekDay: "asc",
          },
        },
      },
    });
  } catch (error) {
    console.log("[ERROR_getAllSchedules]", error);
    return null;
  }
};

export const createSpecificScheduleHours = async (
  scheduleId: string,
  dates: Date[],
  hours: ScheduleHoursM[]
): Promise<TypeResultAction> => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("USER NOT FOUND");
    }
    if (dates.length == 0) {
      return {
        message: "Please one day is required",
        success: false,
      };
    }
    const create = await db.scheduleSpecifitHours.create({
      data: {
        dates,
        scheduleId,
      },
    });

    for (const iterator of hours) {
      const {
        id,
        createdAt,
        updatedAt,
        scheduleSpecificHourId,
        scheduleWeekDayId,
        ...dataHour
      } = iterator;
      await db.scheduleHoursM.create({
        data: {
          ...dataHour,
          scheduleSpecificHourId: create.id,
          scheduleWeekDayId: "",
        },
      });
    }
    return {
      message: "Create Date Specific correct",
      success: true,
    };
  } catch (error) {
    return {
      message: `${error}`,
      success: false,
    };
  }
};
export const deleteSpecificScheduleHours = async (
  id: string
): Promise<TypeResultAction> => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("USER NOT FOUND");
    }
    await db.scheduleSpecifitHours.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
      message: "Remove Date Specific hour correct",
    };
  } catch (error) {
    console.log("[ERROR_deleteSpecificScheduleHours]", error);
    return {
      message: `${error}`,
      success: false,
    };
  }
};

export const updateSpecificScheduleHours = async (
  scheduleId: string,
  idSpecificDateHours: string,
  dates: Date[],
  hours: ScheduleHoursM[]
): Promise<TypeResultAction> => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("USER NOT FOUND");
    }
    await db.scheduleHoursM.deleteMany({
      where: {
        scheduleSpecificHourId: idSpecificDateHours,
      },
    });
    if (dates.length == 0) {
      await db.scheduleSpecifitHours.delete({
        where: {
          id: idSpecificDateHours,
        },
      });
      return {
        message: "Update data correct",
        success: true,
      };
    }
    for (const iterator of hours) {
      const {
        id,
        createdAt,
        updatedAt,
        scheduleSpecificHourId,
        scheduleWeekDayId,
        ...dataHour
      } = iterator;
      await db.scheduleHoursM.create({
        data: {
          ...dataHour,
          scheduleSpecificHourId: idSpecificDateHours,
          scheduleWeekDayId: "",
        },
      });
    }
    await db.scheduleSpecifitHours.update({
      where: {
        id: idSpecificDateHours,
      },
      data: {
        dates,
      },
    });
    return {
      message: "Create Date Specific correct",
      success: true,
    };
  } catch (error) {
    return {
      message: `${error}`,
      success: false,
    };
  }
};
