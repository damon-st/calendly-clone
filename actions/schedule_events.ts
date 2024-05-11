"use server";

import { db } from "@/lib/db";
import {
  DateRange,
  ScheduleEventSearch,
  TypeEventFormating,
  TypeInviteQuestions,
  TypeNewEventLocation,
  TypeResultAction,
  TypeScheduleEventInvitation,
} from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";

export const createScheduleEvent = async (
  type: TypeEventFormating,
  dateEvent: Date
): Promise<TypeResultAction> => {
  try {
    const dateStr = format(dateEvent, "yyyy-MM-dd");
    const hourStr = format(dateEvent, "HH:mm");
    const temp = await db.scheduleEvents.create({
      data: {
        eventType: {
          connect: {
            id: type.id,
          },
        },
        countryCode: type.scheduleAvailibity!.countryCode,
        countryName: type.scheduleAvailibity!.countryName,
        timeZone: type.scheduleAvailibity!.timeZone,
        dateEvent: dateEvent,
        dateStr,
        hourStr,
        location: type.location,
        inviteQuestions: type.inviteQuestions,
      },
    });
    return {
      message: `Succes create`,
      success: true,
      data: temp.id,
    };
  } catch (error) {
    return {
      message: `${error}`,
      success: false,
    };
  }
};

export const getScheduleEventInvitation = async (
  id: string
): Promise<TypeScheduleEventInvitation | null> => {
  try {
    const result = await db.scheduleEvents.findUnique({
      where: {
        id,
      },
      include: {
        eventType: true,
      },
    });

    if (!result) {
      return null;
    }

    return {
      ...result,
      eventType: result!.eventType as TypeEventFormating,
      inviteQuestions: result.inviteQuestions as TypeInviteQuestions[],
      location: result.location as TypeNewEventLocation,
    };
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const getAllScheduleEventInvitation = async (
  period: ScheduleEventSearch,
  dateRange?: DateRange
): Promise<TypeScheduleEventInvitation[]> => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not found");
    }
    const temp = new Date();
    const now = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate());
    let query: any = {};
    console.log("[DATE_RANGE]", dateRange);

    if (period === "upcoming") {
      query = {
        dateEvent: {
          gte: now,
        },
      };
    } else if (period === "past") {
      query = {
        dateEvent: {
          lte: now,
        },
      };
    } else if (period === "dateRange" && dateRange) {
      query = {
        dateEvent: {
          gte: dateRange.from,
          lte: dateRange.to,
        },
      };
    } else if (period === "pending") {
      query = {
        dateEvent: {
          gte: now,
          lte: now,
        },
      };
    }
    const result = await db.scheduleEvents.findMany({
      where: {
        eventType: {
          userId,
        },
        ...query,
      },
      include: {
        eventType: true,
      },
    });
    return result.map((e) => {
      return <TypeScheduleEventInvitation>{
        ...e,
      };
    });
  } catch (error) {
    console.log("[ERROR_getAllScheduleEventInvitation]", error);
    return [];
  }
};

export const getSchedulesEventInvitationWhereTime = async (
  idEvent: string,
  date: Date
) => {
  try {
    const dateStr = format(date, "yyyy-MM-dd");
    console.log(dateStr);

    const events = await db.scheduleEvents.findMany({
      where: {
        idEventType: idEvent,
        dateStr,
      },
    });
    return events.map((e) => {
      return {
        hourStr: e.hourStr,
        hour: e.dateEvent.getHours(),
        min: e.dateEvent.getMinutes(),
      };
    });
  } catch (error) {
    console.log("[ERROR_getSchedulesEventInvitationWhereTime]", error);
    return [];
  }
};

export const updateMeetingNotesSchedule = async (
  id: string,
  meetingNotes: string
): Promise<TypeResultAction> => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not found");
    }
    await db.scheduleEvents.update({
      where: {
        id,
        eventType: {
          userId,
        },
      },
      data: {
        meetingNotes,
      },
    });
    return {
      message: `Update success`,
      success: true,
    };
  } catch (error) {
    return {
      message: `${error}`,
      success: false,
    };
  }
};
