import { db } from "../db";
import { UserDto } from "../models/user.dto";

export const existUser = async (userId: string) => {
  try {
    return await db.user.findUnique({
      where: {
        userId,
      },
      include: {
        introInfo: true,
      },
    });
  } catch (error) {
    console.log("[ERROR_VERIFY_EXITS]", error);

    return undefined;
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
