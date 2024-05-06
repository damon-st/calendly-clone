import React from "react";
import SidebarCreate from "./_components/SidebarCreate";
import PreviewCreate from "./_components/PreviewCreate";
import { existUser } from "@/lib/services/user";
import { auth } from "@clerk/nextjs/server";

type Props = {
  params: {
    typeEvent: string;
  };
};

export default async function CreateEventPage({ params }: Props) {
  const { userId } = auth();
  const user = await existUser(userId ?? "");
  return (
    <main className="size-full bg-colorGrisDash flex">
      <div className="w-[30%] h-full bg-white border-r border-gray-300">
        <SidebarCreate typeEvent={params.typeEvent} />
      </div>
      <div className="w-[70%] h-full">
        <PreviewCreate user={user} isCreating />
      </div>
    </main>
  );
}
