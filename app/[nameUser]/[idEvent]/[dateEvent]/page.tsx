import { getSingleEventByName } from "@/actions/event_type";
import EventFormularioCreate from "@/components/event_type/EventFormularioCreate";
import BackButton from "@/components/global/BackButton";
import LocationEventType from "@/components/global/LocationEventType";
import { format } from "date-fns";
import { Calendar, Clock, Earth } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    nameUser: string;
    idEvent: string;
    dateEvent: string;
  };
};

export default async function PageEventConfirm({ params }: Props) {
  const eventType = await getSingleEventByName(params.idEvent, params.nameUser);
  if (!eventType) {
    return redirect("/");
  }
  const timeEvent = eventType.duration.time;
  const timeAdd =
    eventType.duration.format == "min" ? timeEvent : timeEvent * 60;
  let fechaEventInit = new Date(decodeURIComponent(params.dateEvent));
  let fechaEventEnd = new Date(decodeURIComponent(params.dateEvent));
  fechaEventEnd.setMinutes(fechaEventEnd.getMinutes() + timeAdd);
  const hourInit = format(fechaEventInit, "HH:mm");
  const hourEnd = format(fechaEventEnd, "HH:mm");

  const dateFormat = `${hourInit} - ${hourEnd}, ${format(
    fechaEventInit,
    "EEEE"
  )}, ${format(fechaEventInit, "MMMM dd, yyyy")}`;
  return (
    <main className="size-full bg-colorGrisDash flex items-center justify-center">
      <div className="w-full flex max-w-[70%] bg-white h-full max-h-[80vh] shadow-lg rounded-lg">
        <div className="w-[40%] h-full border-r border-gray-300 relative p-6 overflow-hidden">
          <div className="flex items-center ">
            <BackButton />
          </div>
          <div className="w-full mt-3 flex flex-col gap-1">
            <div className="w-full pb-2">
              <p className="text-colorTextGris font-girloySemiBold">
                {eventType.user?.name}
              </p>
              <h1 className="text-2xl font-bold text-colorTextBlack">
                {eventType.eventName}
              </h1>
            </div>
            <div className="w-full flex items-center gap-3 font-girloySemiBold text-colorTextGris text-lg">
              <Clock className="text-colorTextGris" />
              <p>
                {eventType.duration.time} {eventType.duration.format}
              </p>
            </div>
            <LocationEventType type={eventType.location.type.type} />
            <div className="w-full flex items-center gap-3 text-colorTextGris font-girloySemiBold mb-2">
              <Calendar className="text-colorTextGris" />
              <p>{dateFormat}</p>
            </div>
            <div className="w-full flex items-center gap-3 text-colorTextGris font-girloySemiBold">
              <Earth className="text-colorTextGris" />
              <p>{eventType.scheduleAvailibity?.countryName} Time</p>
            </div>
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: eventType.descriptionInstruc }}
            ></div>
            <div className="absolute left-0 right-0 px-6 bottom-5 w-full flex justify-between ">
              <Link href="#" className="text-colorAzul font-girloyRegular">
                Cookie settings
              </Link>
              <Link href="#" className="text-colorTextGris font-girloyRegular">
                Report abuse
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[60%] h-full relative overflow-y-auto overflow-x-hidden">
          <a
            href="https://calendly.com/?utm_campaign=sign_up&amp;utm_medium=badge&amp;utm_source=invitee"
            target="_blank"
            className="bannerCal  bannerCal2"
          >
            <div data-id="branding" className="brandinCal ">
              <div className="textBranCal ">powered by</div>
              <div className="textBranCal2 ">Calendly</div>
            </div>
          </a>
          <EventFormularioCreate
            dateEvent={fechaEventInit}
            eventType={eventType}
          />
        </div>
      </div>
    </main>
  );
}
