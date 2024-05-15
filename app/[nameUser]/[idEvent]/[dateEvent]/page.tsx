import { getSingleEventByName } from "@/actions/event_type";
import EventFormularioCreate from "@/components/event_type/EventFormularioCreate";
import BackButton from "@/components/global/BackButton";
import BrandingCalendly from "@/components/global/BrandingCalendly";
import LocationEventType from "@/components/global/LocationEventType";
import { CountryInfoUser } from "@/lib/types";
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
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function PageEventConfirm({
  params,
  searchParams,
}: Props) {
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

  if (!searchParams?.timeZone) {
    return redirect("/");
  }

  const timeZone = JSON.parse(
    decodeURIComponent(searchParams?.timeZone as string)
  ) as CountryInfoUser;

  return (
    <main className="size-full bg-colorGrisDash flex items-center justify-center overflow-y-auto">
      <div className="w-full flex flex-col md:flex-row md:max-w-[70%] bg-white h-full  shadow-lg rounded-lg relative md:max-h-[80vh]">
        <div className="flex flex-col md:w-[40%] h-full border-r border-gray-300 relative overflow-y-auto overflow-x-hidden">
          <div className="flex items-center justify-center relative min-h-12 border-b border-gray-300 p-6">
            {eventType.user?.brandingInfo?.logoUrl && (
              <picture>
                <img
                  src={eventType.user.brandingInfo.logoUrl}
                  alt="logo"
                  className="object-contain max-h-[150px]"
                />
              </picture>
            )}
            <div className="absolute flex items-start justify-start top-3 left-4  w-full">
              <BackButton />
            </div>
          </div>
          <div className="w-full mt-3 flex flex-col gap-1  p-6 ">
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
              <p>{timeZone.countryName} Time</p>
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
        <div className="w-full md:w-[60%] h-full relative overflow-y-auto">
          <EventFormularioCreate
            dateEvent={fechaEventInit}
            eventType={eventType}
            timeZone={timeZone}
          />
        </div>
        <BrandingCalendly />
      </div>
    </main>
  );
}
