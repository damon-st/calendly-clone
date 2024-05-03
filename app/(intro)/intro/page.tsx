import { Progress } from "@/components/ui/progress";
import { existUser } from "@/lib/services/user";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import IntroInfoTeam from "./_components/IntroInfoTeam";
import IntroInfoDoWork from "./_components/IntroInfoDoWork";

export default async function IntroLayout() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await existUser(userId);
  if (!user) {
    return redirect("/");
  }
  const introP = user.introInfo;
  let progress = 50;
  let step = 1;
  let title = "¿Cómo planeas usar Calendly?";
  if (introP) {
    step = 2;
    progress = 100;
    title = "¿Cuentas cual es tu rol en tu trabajo?";
  }
  const stepOne = step == 1;
  if (introP?.howDoYouWork) {
    return redirect("/dashboard");
  }
  return (
    <main className="size-full relative overflow-hidden">
      <picture>
        <img
          loading="lazy"
          className="absolute bottom-0"
          src="https://assets.calendly.com/assets/intro/media/left-blob-b48851bb3cb1a240da3d.svg"
          alt="img1"
        />
      </picture>
      <picture>
        <img
          loading="lazy"
          className="absolute right-0 top-[15%]"
          src="https://assets.calendly.com/assets/intro/media/right-blob-ae4b66b1340832a4093b.svg"
          alt="img1"
        />
      </picture>
      <header className="w-full  px-8 mb-16 flex justify-between pt-8">
        <Image
          priority={false}
          loading="lazy"
          src="/logo.svg"
          width={160}
          height={38}
          alt="logo"
        />
        <div className="flex flex-col md:flex-row gap-2">
          <span className="text-colorText text-sm font-girloySemiBold">
            STEP {step} OF 2
          </span>
          <Progress
            value={progress}
            className="w-[150px] md:w-[250px] bg-white border border-colorBorder"
          />
        </div>
      </header>
      <section className="w-full flex flex-col items-center">
        <div className="w-full max-w-[980px] flex flex-col mb-4 gap-4 px-2 md:px-0">
          <h3 className="text-colorText font-girloyRegular">
            BIENVENIDO, {user.name?.toUpperCase()}!
          </h3>
          <h1 className="text-colorText text-2xl font-girloyBold">{title}</h1>
        </div>
        <div className="w-full flex items-center justify-center">
          {stepOne ? <IntroInfoTeam /> : <IntroInfoDoWork />}
        </div>
      </section>
    </main>
  );
}
