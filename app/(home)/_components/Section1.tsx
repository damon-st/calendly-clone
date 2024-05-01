import ButtonGoogle from "@/components/btn-social/ButtonGoogle";
import ButtonMiscrosoft from "@/components/btn-social/ButtonMicrosoft";
import CarouselCompanys from "@/components/global/CarouselCompanys";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type Props = {};

export default function Section1({}: Props) {
  return (
    <section className="w-full relative flex flex-col items-center mt-28">
      <div className="w-full max-w-[1280px] flex flex-col mt-14">
        <div className="w-full flex flex-col items-center justify-center gap-6 bgSection1">
          <h1 className="text-colorText font-girloyBold text-6xl text-center">
            Easy scheduling ahead
          </h1>
          <p className="text-colorText font-girloyRegular max-w-[770px] text-center text-xl">
            Calendly is your scheduling automation platform for eliminating the
            back-and-forth emails to find the perfect time — and so much more.
          </p>
          <p className="text-colorText font-girloyRegular max-w-[770px] text-center text-sm">
            Sign up free with Google or Microsoft.
          </p>
          <div className="w-full max-w-[525px] flex flex-col md:flex-row items-center justify-center gap-2">
            <ButtonGoogle />
            <ButtonMiscrosoft />
          </div>
          <div className="overflow-hidden flex items-center justify-center gap-2">
            <div className="w-[200px] flex-grow border-t border-colorBorder"></div>
            <p className="text-colorText  relative text-sm">OR</p>
            <div className="w-[200px] flex-grow border-t border-colorBorder"></div>
          </div>
          <div className="w-full flex items-center justify-center max-w-[525px] gap-2 font-girloySemiBold text-sm">
            <Link href={"/signup"} className="text-colorAzul">
              Sign up free with email.
            </Link>
            <span className="text-colorText">No credit card required</span>
          </div>
        </div>
        <div className="w-full flex flex-col relative mt-12">
          <Image
            className="w-full"
            alt="img"
            src="/imgSection1.png"
            width={1024}
            height={1024}
            priority={false}
            loading="lazy"
          />
        </div>
        <div className="w-full flex items-center justify-center mt-20">
          <h2 className="text-colorText font-semibold text-xl">
            Programación simplificada para más de{" "}
            <span className="font-girloyBold">20 000 000</span> usuarios en todo
            el mundo
          </h2>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-10 mb-24">
        <CarouselCompanys />
      </div>
    </section>
  );
}
