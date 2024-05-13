"use server";

import { db } from "@/lib/db";
import { utapi } from "@/lib/server/uploadthing";
import { CountryInfoUser, TypeResultAction, UserInfo } from "@/lib/types";
import { excludeNulls } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

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
export const updateCountryUser = async (
  userId: string,
  country: CountryInfoUser
) => {
  try {
    return await db.user.update({
      where: {
        userId,
      },
      data: {
        countryInfo: country,
      },
    });
  } catch (error) {
    return null;
  }
};

export const updateInfoUser = async (
  data: Partial<UserInfo>,
  formData?: FormData,
  isBranding: boolean = false
): Promise<TypeResultAction> => {
  try {
    const { userId: userIdU } = auth();
    if (!userIdU) {
      throw new Error("USER NOT FOUDN");
    }
    const { id, userId, ...oldData } = data;
    const newData = excludeNulls(oldData);
    let imageUrl = newData?.imageUrl;
    if (formData) {
      const files = formData.get("files");
      const response = await utapi.uploadFiles(files as any);
      if (isBranding) {
        oldData.brandingInfo!.logoUrl = response.data?.url;
      } else {
        imageUrl = response.data?.url ?? imageUrl;
      }
    }

    const user = await db.user.update({
      where: {
        userId: userIdU,
      },
      data: {
        ...newData,
        imageUrl,
      },
    });
    return {
      message: "Update data success",
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      message: `${error}`,
      success: false,
    };
  }
};
export const updateUserName = async (
  userName: string
): Promise<TypeResultAction> => {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("USER NOT FOUND");
    }

    const existUser = await db.user.findFirst({
      where: {
        userName,
      },
    });

    if (existUser) {
      if (existUser.userId !== userId) {
        throw new Error("URL LINK AREADY EXITS PLEASE CHOUSE OTHER");
      }
    }
    await db.user.update({
      where: {
        userId,
      },
      data: {
        userName,
      },
    });
    return {
      message: "Update data",
      success: true,
    };
  } catch (error) {
    return {
      message: `${error}`,
      success: false,
    };
  }
};
