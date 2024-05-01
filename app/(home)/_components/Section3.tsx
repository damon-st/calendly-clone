"use client";
import { useScroll, motion, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Section3() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.5], [512, 50]),
    springConfig
  );

  return (
    <div className="w-full flex items-center justify-center bg-colorText relative ">
      <div className="w-full h-full max-w-[1280px] flex flex-col items-center justify-center">
        <h2 className="text-center text-white font-girloyBold text-5xl pt-16 max-w-5xl">
          Hacemos que la programación sea más sencilla que nunca
        </h2>
        <div ref={ref} className="w-full">
          <div className="flex items-start w-full gap-[128px]">
            <div className="w-[50%]">
              <div className="w-full mt-28  min-h-[400px] ">
                <h2 className="text-white font-bold text-3xl">
                  Comparta su disponibilidad de Calendly con otros
                </h2>
                <p className="text-white font-girloyLight mt-4 text-lg mb-4">
                  Haga crecer su negocio con la automatización de la
                  programación. Simplemente envíe un correo electrónico, un
                  mensaje texto o añada su disponibilidad de Calendly a su sitio
                  web, y vea cómo los clientes potenciales y los candidatos
                  reservan reuniones de gran valor con usted.
                </p>
                <Link
                  href="#"
                  className="text-white flex items-center gap-2 font-girloySemiBold text-lg"
                >
                  <span className="text-white">Más información</span>
                  <ArrowRight className="text-white" />
                </Link>
              </div>
              <div className="w-full mt-2 min-h-[400px] ">
                <h2 className="text-white font-bold text-3xl">
                  Programar con un equipo
                </h2>
                <p className="text-white font-girloyLight mt-4 text-lg mb-4">
                  Calendly se adapta tanto a sus preferencias de programación
                  como a las de su equipo. Organiza en conjunto una llamada de
                  cliente con un compañero, recordatorios de correo electrónico
                  y seguimientos, e intégrelo todo con sus herramientas de
                  software preferidas.
                </p>
                <Link
                  href="#"
                  className="text-white flex items-center gap-2 font-girloySemiBold text-lg"
                >
                  <span className="text-white">Obtener más información</span>
                  <ArrowRight className="text-white" />
                </Link>
              </div>
              <div className="w-full mt-2 min-h-[400px] ">
                <h2 className="text-white font-bold text-3xl">
                  Logra sus cifras
                </h2>
                <p className="text-white font-girloyLight mt-4 text-lg mb-4">
                  Las reuniones de gran valor son el alma de su negocio. Aumente
                  los ingresos, retenga clientes y contrate con la plataforma
                  n.º 1 de automatización de la programación.
                </p>
                <Link
                  href="#"
                  className="text-white flex items-center gap-2 font-girloySemiBold text-lg"
                >
                  <span className="text-white">Obtener más información</span>
                  <ArrowRight className="text-white" />
                </Link>
              </div>
            </div>
            <div className="w-[50%] relative flex flex-col justify-start items-start">
              <motion.div className="w-full relative" style={{ translateY }}>
                <div className="w-full relative">
                  <picture>
                    <img
                      src="https://images.ctfassets.net/k0lk9kiuza3o/7mkknkKmPsEGwaB5mdt60t/f6a386c1a8c4944b51aae8b3b1fa607f/Calendly-Email-Embed-Recruiting.png?q=85&fm=webp"
                      alt="foto"
                      className="w-full h-auto"
                    />
                  </picture>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
