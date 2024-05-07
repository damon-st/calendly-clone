"use server";

import { db } from "@/lib/db";
import {
  DataNewEnvet,
  TypeDurationCustom,
  TypeEventFormating,
  TypeLocationEvent,
  TypeResultAction,
} from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

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
    const response = await db.eventType.create({
      data: {
        typeEvent,
        userId,
        colorEvent: data.color,
        eventName: data.nameEvent,
        duration: data.duration,
        location: data.location,
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
    });
    if (!result) {
      return null;
    }
    return {
      ...result,
      duration: result.duration as TypeDurationCustom,
      location: result.location as TypeLocationEvent,
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
