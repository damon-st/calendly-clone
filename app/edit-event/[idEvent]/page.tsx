import { getSingleEvent } from "@/actions/event_type";
import PreviewCreate from "@/components/event_type/PreviewCreate";
import SidebarCreate from "@/components/event_type/SidebarCreate";
import SidebarEditEventType from "@/components/event_type/SidebarEditEventType";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    idEvent: string;
  };
};

export default async function EditEventPage({ params }: Props) {
  const eventType = await getSingleEvent(params.idEvent);

  if (!eventType) {
    return redirect("/dashboard");
  }
  return (
    <main className="size-full bg-colorGrisDash flex">
      <div className="w-[30%] h-full bg-white border-r border-gray-300">
        <SidebarEditEventType
          typeEvent={eventType.typeEvent}
          eventType={eventType}
        />
      </div>
      <div className="w-[70%] h-full">
        <PreviewCreate user={null} isCreating={false} />
      </div>
    </main>
  );
}
