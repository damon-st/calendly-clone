"use server";

import { db } from "@/lib/db";
import { TypeResultAction } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { IntroInfo } from "@prisma/client";

export const createIntroInfoUser = async (
  howDoyPlanUsingCalendly: string
): Promise<TypeResultAction> => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not found");
    }
    const id = await db.introInfo.create({
      data: {
        userId,
        howDoyPlanUsingCalendly: howDoyPlanUsingCalendly,
      },
    });
    await db.user.update({
      where: {
        userId,
      },
      data: {
        introInfoId: id.id,
      },
    });
    return { message: "Create info success", success: true };
  } catch (error) {
    return {
      message: `ERROR: ${error}`,
      success: false,
    };
  }
};

export const updateIntroInfoUser = async (
  howDoYouWork: string
): Promise<TypeResultAction> => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not found");
    }
    await db.introInfo.update({
      where: {
        userId,
      },
      data: {
        howDoYouWork,
      },
    });
    return { message: "Update status success", success: true };
  } catch (error) {
    return {
      message: `ERROR: ${error}`,
      success: false,
    };
  }
};
