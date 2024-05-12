import { db } from "../db";
import { UserDto } from "../models/user.dto";
import { UserInfo } from "../types";

export const existUser = async (userId: string): Promise<UserInfo | null> => {
  try {
    const user = await db.user.findUnique({
      where: {
        userId,
      },
      include: {
        introInfo: true,
      },
    });
    if (!user) {
      return null;
    }
    return <UserInfo>{
      ...user,
    };
  } catch (error) {
    console.log("[ERROR_VERIFY_EXITS]", error);

    return null;
  }
};

export const createNewUser = async (data: UserDto) => {
  try {
    const user = await db.user.create({
      data,
    });
    return user;
  } catch (error) {
    console.log("[ERROR_CREATE_USER]", error);

    return undefined;
  }
};
