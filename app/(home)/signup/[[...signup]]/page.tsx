import React from "react";
import { SignUp } from "@clerk/nextjs";
const features = [
  "Capacidad de reservar reuniones con clientes como equipo y más",
  "Tipos de eventos ilimitados (videollamada de 30 minutos, llamada telefónica de 15 minutos)",
  "Eliminar la marca de Calendly",
];

export default function SignupPage() {
  return (
    <section className="mt-28 w-full flex flex-col items-center gap-4 relative">
      <picture className="absolute right-[10%] top-[10%]">
        <img src="/cd/icon-signup.png" alt="img" />
      </picture>
      <div className="z-10 w-full flex items-center justify-between max-w-[1200px] pt-[72px]">
        <div className="w-full flex flex-col max-w-[485px]">
          <h6 className="text-colorAzul font-semibold text-lg mb-8">
            PRUEBA CALENDLY GRATIS
          </h6>
          <h1 className="text-colorText font-girloyBold text-7xl mb-8">
            Crear tu cuenta
            <span className="text-colorAzul"> free</span>
          </h1>
          <p className="text-colorTextO font-girloyRegular text-lg pb-8">
            Facilita la programación con clientes y recluta con una cuenta
            gratuita de Calendly. Quienes se inscriben por primera vez también
            reciben una prueba gratuita de 14 días de nuestro plan de
            suscripción Teams.
          </p>
          <div className="w-full h-auto">
            <h2 className="font-girloyBold text-2xl text-colorText pb-8">
              Esta prueba de Teams incluye actualizaciones como:
            </h2>
            <div className="w-full flex flex-col gap-4">
              {features.map((f) => (
                <div key={f} className="w-full flex items-center gap-2">
                  <picture className="h-6 w-[10%]">
                    <img
                      className="size-full"
                      loading="lazy"
                      src="https://images.ctfassets.net/k0lk9kiuza3o/1kT0F9CByOsdaYC6RzUKW0/e239fa67c5e6366d6c3d3cf05e43c8ad/check-circle__2_.svg"
                      alt="create account"
                    />
                  </picture>
                  <p className="text-colorTextO font-girloyRegular w-full">
                    {f}
                  </p>
                </div>
              ))}
              <div className="w-full flex items-center gap-2">
                <picture className="h-6 w-[10%]">
                  <img
                    className="size-full"
                    loading="lazy"
                    src="https://images.ctfassets.net/k0lk9kiuza3o/1kT0F9CByOsdaYC6RzUKW0/e239fa67c5e6366d6c3d3cf05e43c8ad/check-circle__2_.svg"
                    alt="create account"
                  />
                </picture>
                <p className="text-colorTextO font-girloyRegular w-full">
                  Capacidad de cobrar por reuniones con PayPal y Stripe{" "}
                  <b className="font-girloyBold">y más</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[485px] flex flex-col items-center justify-center">
          <SignUp afterSignOutUrl="/dashboard" signInUrl="/dashboard" />
        </div>
      </div>
    </section>
  );
}
