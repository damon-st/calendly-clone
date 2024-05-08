"use server";

import { db } from "@/lib/db";

export const getUserByUserName = async (userName: string) => {
  try {
    return await db.user.findFirst({
      where: {
        userName,
      },
    });
  } catch (error) {
    console.log(`[ERROR_getUserByUserName]${error}`);
    return null;
  }
};
