import { existUser } from "@/lib/services/user";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import EditUserLink from "./EditUserLink";

export default async function PageLink() {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const user = await existUser(userId);
  if (!user) return null;
  return (
    <section className="w-full flex flex-col md:max-w-[40%] px-6">
      <p className="text-colorTextGris font-girloyBold">Account details</p>
      <h1 className="text-colorTextBlack font-girloyBold text-3xl">My link</h1>
      <EditUserLink user={user} />
    </section>
  );
}
