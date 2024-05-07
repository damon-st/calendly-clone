import React from "react";
import { existUser } from "@/lib/services/user";
import { auth } from "@clerk/nextjs/server";
import SidebarCreate from "@/components/event_type/SidebarCreate";
import PreviewCreate from "@/components/event_type/PreviewCreate";

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
