import { getScheduleEventInvitation } from "@/actions/schedule_events";
import { format } from "date-fns";
import { Calendar, CheckCircle, Earth, ExternalLink, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    nameUser: string;
    idEvent: string;
    idInvitee: string;
  };
};

export default async function InvitePages({ params }: Props) {
  const invitation = await getScheduleEventInvitation(params.idInvitee);
  if (!invitation) {
    return redirect("/");
  }
  const timeEvent = invitation.eventType.duration.time;
  const timeAdd =
    invitation.eventType.duration.format == "min" ? timeEvent : timeEvent * 60;
  let fechaEventInit = new Date(invitation.dateEvent);
  let fechaEventEnd = new Date(invitation.dateEvent);
  fechaEventEnd.setMinutes(fechaEventEnd.getMinutes() + timeAdd);
  const hourInit = format(fechaEventInit, "HH:mm");
  const hourEnd = format(fechaEventEnd, "HH:mm");

  const dateFormat = `${hourInit} - ${hourEnd}, ${format(
    fechaEventInit,
    "EEEE"
  )}, ${format(fechaEventInit, "MMMM dd, yyyy")}`;
  return (
    <main className="size-full bg-colorGrisDash flex items-center justify-center">
      <div className="w-full md:max-w-[70%] h-full md:max-h-[80vh] bg-white rounded-lg md:shadow-lg relative flex flex-col items-center p-6 font-girloyRegular">
        <button
          type="button"
          className="text-colorAzul bottom-5 absolute left-5"
        >
          Cookie settings
        </button>
        <Link
          href="https://calendly.com/?utm_campaign=sign_up&amp;utm_medium=badge&amp;utm_source=invitee"
          target="_blank"
          className="bannerCal  bannerCal2"
        >
          <div data-id="branding" className="brandinCal ">
            <div className="textBranCal ">powered by</div>
            <div className="textBranCal2 ">Calendly</div>
          </div>
        </Link>
        <div className="flex flex-col gap-3 items-center">
          <div className="flex items-center gap-3 font-girloyBold text-lg">
            <CheckCircle className="fill-green-600 text-white" size={30} />
            <p>You are scheduled</p>
          </div>
          <p className="text-colorTextBlack">
            A calndar invitation has been sent your email address.
          </p>
          <Link
            href="#"
            className="border border-colorTextBlack rounded-full px-3 flex items-center gap-3 py-2"
          >
            <span>Open Invitation</span>
            <ExternalLink />
          </Link>
          <div className="mt-3 border border-gray-300 p-6 rounded-lg flex flex-col gap-2">
            <h1 className="text-colorTextBlack font-bold">
              {invitation.eventType.eventName}
            </h1>
            <div className="flex items-center gap-2 font-girloySemiBold text-colorTextGris">
              <User className="text-colorTextGris" />
              <span>{invitation.inviteQuestions[0].data.responseTxt}</span>
            </div>
            <div className="w-full flex items-center gap-3 text-colorTextGris font-girloySemiBold mb-2">
              <Calendar className="text-colorTextGris" />
              <p>{dateFormat}</p>
            </div>
            <div className="w-full flex items-center gap-3 text-colorTextGris font-girloySemiBold">
              <Earth className="text-colorTextGris" />
              <p>{invitation.countryName} Time</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
