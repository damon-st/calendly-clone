import { getSingleEventByName } from "@/actions/event_type";
import SelectTimeEvent from "@/components/event_type/SelectTimeEvent";
import LocationEventType from "@/components/global/LocationEventType";
import { Clock } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import BrandingCalendly from "@/components/global/BrandingCalendly";
type Props = {
  params: {
    nameUser: string;
    idEvent: string;
  };
};

export default async function IdEventUser({ params }: Props) {
  const eventType = await getSingleEventByName(params.idEvent, params.nameUser);
  if (!eventType) {
    return redirect("/");
  }
  return (
    <main className="size-full bg-colorGrisDash flex items-center justify-center">
      <div className="size-full px-[5%] flex items-center justify-center">
        <div className="w-full max-w-[1060px] h-[80vh] bg-white rounded-lg shadow-xl flex flex-col md:flex-row items-center">
          <div className="w-[40%] h-full relative border-r border-gray-300 overflow-hidden">
            <div className="size-full flex flex-col pt-6 ">
              {eventType.user?.brandingInfo?.logoUrl && (
                <div className="w-full relative border-b border-gray-300 mb-2">
                  <picture>
                    <img
                      className="w-full object-contain max-h-[180px]"
                      src={eventType.user?.brandingInfo?.logoUrl}
                      alt=""
                    />
                  </picture>
                </div>
              )}
              <div className="flex-1 px-8">
                <p className="text-gray-600 font-girloySemiBold">
                  {eventType.user?.name}
                </p>
                <h1 className="text-colorTextBlack font-girloyBold text-3xl">
                  {eventType.eventName}
                </h1>
                <div className="mt-2 flex flex-col gap-3">
                  <div className="w-full flex items-center gap-3">
                    <Clock className="text-colorTextGris font-girloySemiBold" />
                    <span className="flex items-center gap-3">
                      {eventType.duration.time} {eventType.duration.format}
                    </span>
                  </div>
                  <LocationEventType type={eventType.location.type.type} />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: eventType.descriptionInstruc,
                    }}
                  ></div>
                </div>
              </div>
              <div className="w-full flex justify-between pb-5 px-8">
                <Link href="#" className="text-colorAzul font-girloyRegular">
                  Cookie settings
                </Link>
                <Link
                  href="#"
                  className="text-colorTextGris font-girloyRegular"
                >
                  Report abuse
                </Link>
              </div>
            </div>
          </div>
          <div className="w-[60%] h-full flex items-start justify-start relative">
            {(eventType.user?.brandingInfo?.useCalendlyBrading ?? true) && (
              <BrandingCalendly />
            )}
            <div className="size-full px-8 pt-8">
              <SelectTimeEvent preview={false} eventType={eventType} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
