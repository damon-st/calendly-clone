import React from "react";
import { auth } from "@clerk/nextjs/server";
import { existUser } from "@/lib/services/user";
import BrandingEdit from "./BrandingEdit";
export default async function BrandingPage() {
  const { userId } = auth();
  if (!userId) return null;
  const user = await existUser(userId);
  if (!user) return null;
  return <BrandingEdit user={user} />;
}
