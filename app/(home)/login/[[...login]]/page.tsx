import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <section className="mt-28 w-full flex flex-col items-center gap-4 relative">
      <picture className="absolute right-[10%] top-[10%]">
        <img src="/cd/icon-signup.png" alt="img" />
      </picture>
      <div className="z-10 w-full flex items-center justify-between max-w-[1200px] pt-[72px]">
        <div className="w-full flex flex-col max-w-[485px]">
          <h1 className="text-colorText font-girloyBold text-7xl mb-8">
            Bienvenido de nuevo a
            <span className="text-colorAzul"> Calendly</span>
          </h1>
          <p className="text-colorTextO font-girloyRegular text-lg pb-8">
            Inicia sesión en tu cuenta para volver a tu centro para programar
            reuniones.
          </p>
          <div className="w-full h-auto">
            <p className="text-colorText font-bold font-girloySemiBold text-xl">
              ¿No tienes una cuenta?
              <Link
                href="/signup"
                className="text-colorAzul ml-1 hover:text-colorText"
              >
                Registrarse
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full max-w-[485px] flex flex-col items-center justify-center">
          <SignIn afterSignOutUrl="/dashboard" />
        </div>
      </div>
    </section>
  );
}
