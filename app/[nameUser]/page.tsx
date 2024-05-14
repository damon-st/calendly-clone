import { getUserByUserName } from "@/actions/userActions";
import BrandingCalendly from "@/components/global/BrandingCalendly";
import React, { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EventListUser, {
  EventListUserSkeleton,
} from "./_components/EventListUser";

type Props = {
  params: {
    nameUser: string;
  };
};

export default async function NameUserPage({ params }: Props) {
  const user = await getUserByUserName(params.nameUser);
  if (!user) {
    return (
      <div className="size-full flex items-center justify-center">
        USER NOT EXISTS
      </div>
    );
  }
  return (
    <main className="size-full bg-colorGrisDash flex items-start justify-center">
      <div className="w-full md:w-[80%]  bg-white shadow-lg rounded-lg md:mt-14  relative flex flex-col items-center justify-start">
        {(user.brandingInfo?.useCalendlyBrading ?? true) && (
          <BrandingCalendly />
        )}

        <div className="w-full p-6 flex flex-col justify-center items-center gap-3">
          <Avatar className="size-14">
            <AvatarImage src={user.imageUrl ?? ""} />
            <AvatarFallback>
              {user.name?.substring(0, 2) ?? "US"}
            </AvatarFallback>
          </Avatar>
          <h1 className="font-girloyBold text-colorTextGris">{user.name}</h1>
          <p className="text-colorTextBlack font-girloyRegular w-full md:max-w-[40%] text-center">
            {user.welcomeMsg}
          </p>
          <Suspense fallback={<EventListUserSkeleton />}>
            <EventListUser user={user} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
