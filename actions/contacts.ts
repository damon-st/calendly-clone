"use server";

import { db } from "@/lib/db";

export const getAllContacts = async (userId: string) => {
  try {
    return await db.contacts.findMany({
      where: {
        userIdHost: userId,
      },
      include: {
        meetingHistory: {
          include: {
            eventType: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  } catch (error) {
    console.log("[ERROR_getAllContacts]", error);
    return [];
  }
};
