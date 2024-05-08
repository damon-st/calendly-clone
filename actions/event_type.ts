"use server";

import { db } from "@/lib/db";
import {
  DataNewEnvet,
  TypeDurationCustom,
  TypeEventFormating,
  TypeLocationEvent,
  TypeNewEventLocation,
  TypeResultAction,
} from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { getSchedulesFavorite } from "./schedules";
import { getUserByUserName } from "./userActions";

export const createNewEvent = async (
  data: DataNewEnvet,
  typeEvent: string
): Promise<TypeResultAction> => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("USER NOT FOUND");
    }
    if (data.location.type.type == "none") {
      throw new Error("Please location is required");
    }
    if (data.nameEvent.length < 2) {
      throw new Error("Please prove an event name");
    }

    const scheduleAvaible = await getSchedulesFavorite(userId);

    if (!scheduleAvaible) {
      throw new Error(
        "Availability Times not found please create and come back this!"
      );
    }

    const response = await db.eventType.create({
      data: {
        typeEvent,
        userId,
        colorEvent: data.color,
        eventName: data.nameEvent,
        duration: data.duration,
        location: data.location,
        scheduleAvailibityId: scheduleAvaible.id,
      },
    });
    return {
      message: "Create new event correct",
      success: true,
      data: response,
    };
  } catch (error) {
    console.log("[ERROR_createNewEvent]", error);
    return { message: `${error}`, success: false };
  }
};

export const getAllEvents = async () => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("USER NOT FOUND");
    }
    const result = await db.eventType.findMany({
      where: {
        userId,
      },
    });
    return result.map((e) => {
      return {
        ...e,
        duration: e.duration as TypeDurationCustom,
        location: e.location as TypeLocationEvent,
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getSingleEvent = async (
  id: string
): Promise<TypeEventFormating | null> => {
  try {
    const result = await db.eventType.findUnique({
      where: {
        id,
      },
      include: {
        scheduleAvailibity: {
          include: {
            scheduleWeekDays: {
              include: {
                scheduleHours: true,
              },
            },
          },
        },
      },
    });
    if (!result) {
      return null;
    }
    const user = await db.user.findUnique({
      where: {
        userId: result.userId,
      },
    });
    return {
      ...result,
      duration: result.duration as TypeDurationCustom,
      location: result.location as TypeNewEventLocation,
      user,
    };
  } catch (error) {
    console.log("[ERROR_getSingleEvent]", error);
    return null;
  }
};

export const removeEventType = async (
  id: string,
  idUser: string
): Promise<TypeResultAction> => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("USER NOT FOUND");
    }
    await db.eventType.delete({
      where: {
        id,
        userId: idUser,
      },
    });
    return {
      message: "Remove event success",
      success: true,
    };
  } catch (error) {
    return {
      message: `${error}`,
      success: false,
    };
  }
};

export const getSingleEventByName = async (
  nameEvent: string,
  nameUser: string
): Promise<TypeEventFormating | null> => {
  try {
    const user = await getUserByUserName(nameUser);
    if (!user) {
      return null;
    }

    const events = await db.eventType.findMany({
      where: {
        userId: user.userId,
      },
    });
    if (events.length == 0) {
      return null;
    }

    const findEvne = events.find(
      (v) => v.eventName.toLowerCase().replaceAll(" ", "-") === nameEvent
    );
    if (!findEvne) {
      return null;
    }

    return await getSingleEvent(findEvne.id);
  } catch (error) {
    return null;
  }
};
