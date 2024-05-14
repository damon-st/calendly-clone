"use server";

import { db } from "@/lib/db";
import {
  DataNewEnvet,
  TypeDurationCustom,
  TypeEventFormating,
  TypeInviteQuestions,
  TypeLocationEvent,
  TypeNewEventLocation,
  TypeResultAction,
  UserInfo,
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

    const eventLinkName = data.nameEvent
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll(/\s+/g, "-");

    const response = await db.eventType.create({
      data: {
        inviteQuestions: data.inviteQuestions,
        eventLinkName,
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

export const getAllEventsByUserId = async (userId: string) => {
  try {
    const result = await db.eventType.findMany({
      where: {
        userId,
      },
    });
    return result.map((e) => {
      return <TypeEventFormating>{
        ...e,
      };
    });
  } catch (error) {
    console.log(error);
    return [];
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
      return <TypeEventFormating>{
        ...e,
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
      inviteQuestions: result.inviteQuestions as TypeInviteQuestions[],
      user: user as UserInfo,
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

    const findEvne = await db.eventType.findFirst({
      where: {
        userId: user.userId,
        eventLinkName: nameEvent,
      },
    });

    if (!findEvne) {
      return null;
    }

    return await getSingleEvent(findEvne.id);
  } catch (error) {
    return null;
  }
};

export const onSaveChangesEventType = async (
  idR: string,
  data: Partial<TypeEventFormating>
): Promise<TypeResultAction> => {
  try {
    const { userId: userT } = auth();
    if (!userT) {
      throw new Error("USER NOT FOUND");
    }

    const { scheduleAvailibity, user, id, userId, ...newDATA } = data;
    await db.eventType.update({
      where: {
        id: idR,
      },
      data: {
        colorEvent: newDATA.colorEvent,
        eventLinkName: newDATA.eventLinkName,
        location: newDATA.location,
        eventName: newDATA.eventName,
        inviteQuestions: newDATA.inviteQuestions,
        typeEvent: newDATA.typeEvent,
        duration: newDATA.duration,
        descriptionInstruc: newDATA.descriptionInstruc,
      },
    });
    return {
      message: "update success",
      success: true,
    };
  } catch (error) {
    console.log("[ERROR_onSaveChangesEventType]", error);

    return { message: `${error}`, success: false };
  }
};
