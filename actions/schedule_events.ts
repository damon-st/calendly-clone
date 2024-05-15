"use server";
import { google } from "googleapis";
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
    const timeZone = type.scheduleAvailibity!.timeZone;
    const dateStr = format(dateEvent, "yyyy-MM-dd");
    const hourStr = format(dateEvent, "HH:mm");
    const email = type.inviteQuestions[1].data.responseTxt;
    const nameContact = type.inviteQuestions[0].data.responseTxt;
    const temp = await db.scheduleEvents.create({
      data: {
        eventType: {
          connect: {
            id: type.id,
          },
        },
        countryCode: type.scheduleAvailibity!.countryCode,
        countryName: type.scheduleAvailibity!.countryName,
        timeZone: timeZone,
        dateEvent: dateEvent,
        dateStr,
        hourStr,
        location: type.location,
        inviteQuestions: type.inviteQuestions,
      },
    });

    const previusContact = await db.contacts.findFirst({
      where: {
        email,
        userIdHost: type.userId,
      },
    });

    if (previusContact) {
      await db.contacts.update({
        where: {
          id: previusContact.id,
        },
        data: {
          meetingHistory: {
            connect: {
              id: temp.id,
            },
          },
        },
      });
    } else {
      await db.contacts.create({
        data: {
          email,
          name: nameContact,
          timeZone: timeZone,
          userIdHost: type.userId,
          meetingHistory: {
            connect: {
              id: temp.id,
            },
          },
        },
      });
    }
    await createEventInCalendar(type, dateEvent);
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

const createEventInCalendar = async (
  type: TypeEventFormating,
  dateEvent: Date
) => {
  try {
    const userAccounts = await db.user.findFirst({
      where: {
        userId: type.userId,
      },
      include: {
        accounts: true,
      },
    });

    if (!userAccounts?.accounts) {
      throw new Error("NOT FOUND ACOUNTS USER");
    }

    if (!userAccounts.accounts.some((v) => v.type == "oauth_google")) {
      throw new Error("NOT FOUND ACCOUNT GOOGLE");
    }

    const startDate = dateEvent.toISOString();
    const timeDuration = type.duration.time;
    const timeAdd =
      type.duration.format == "min" ? timeDuration : timeDuration * 60;

    dateEvent.setMinutes(dateEvent.getMinutes() + timeAdd);
    const endDate = dateEvent.toISOString();
    const email = type.inviteQuestions[1].data.responseTxt;
    var event = {
      summary: `Event: ${type.eventName}`,
      location: `${type.location.type.type}`,
      description: "This is schedule event for meeting",
      start: {
        dateTime: startDate,
        timeZone: type.scheduleAvailibity!.timeZone,
      },
      end: {
        dateTime: endDate,
        timeZone: type.scheduleAvailibity!.timeZone,
      },
      recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
      attendees: [{ email: email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };

    const accountGoogle = userAccounts.accounts.find(
      (v) => v.type === "oauth_google"
    );
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.OAUTH2_REDIRECT_URI
    );
    oauth2Client.setCredentials({
      access_token: accountGoogle?.accessToken,
    });
    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    const result = new Promise((resolve, reject) => {
      calendar.events.insert(
        {
          calendarId: "primary",
          requestBody: event,
          auth: oauth2Client,
        },
        (err: any, event: any) => {
          if (err) {
            reject(err);
            return;
          }
          reject(event);
        }
      );
    });

    console.log("[CREATE_EVENT_CALENDAR]");
  } catch (error) {
    console.log("[ERROR_createEventInCalendar]", error);
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
