"use server";

import { db } from "@/lib/db";
import {
  TypeEventFormating,
  TypeInviteQuestions,
  TypeResultAction,
  TypeScheduleEventInvitation,
} from "@/lib/types";
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
    };
  } catch (error) {
    console.log(error);

    return null;
  }
};
