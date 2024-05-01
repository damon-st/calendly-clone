import { sectionTabsInfo } from "@/common/section_one_info";
import IntegrationsIcons from "@/components/global/IntegrationsIcons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Section2() {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="w-full max-w-[1280px] flex flex-col items-center">
        <h2 className="text-colorText font-girloyBold text-5xl  max-w-[770px] text-center leading-[1.2] mb-14">
          Programación más inteligente para los equipos que realizan reuniones a
          escala
        </h2>
        <div className="w-full flex flex-col items-center mb-28">
          <Tabs
            defaultValue="ventas"
            className="w-full items-center justify-center flex flex-col overflow-x-hidden"
          >
            <TabsList className="bg-white w-full justify-evenly border-b-4 border-colorGris ">
              {sectionTabsInfo.map((v) => (
                <TabsTrigger
                  key={v.title}
                  value={v.value}
                  className="min-w-max px-4  transition-colors duration-500 rounded-none border-b-2 border-transparent shadow-none font-girloySemiBold text-colorText text-lg data-[state=active]:bg-transparent hover:bg-colorAzul/10 data-[state=active]:text-colorAzul data-[state=active]:border-b-colorAzul"
                >
                  {v.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {sectionTabsInfo.map((v) => (
              <TabsContent
                key={v.value}
                value={v.value}
                className="w-full flex items-center mt-2"
              >
                <div className="w-[50%] flex flex-col items-start">
                  {v.infos.map((inf) => (
                    <div key={inf.title} className="flex flex-col w-full mb-4">
                      <div className="flex items-center">
                        <div className="w-[10%]">
                          <div className="size-14 rounded-full bg-colorBorder relative flex items-center justify-center ">
                            <picture>
                              <img
                                src={inf.iconUrl}
                                alt="icon"
                                className="rounded-full size-10 object-contain"
                              />
                            </picture>
                          </div>
                        </div>
                        <div className="w-[90%] flex items-center">
                          <p className="text-xl text-colorText font-girloyBold">
                            {inf.title}
                          </p>
                        </div>
                      </div>
                      <p className="text-colorText font-girloyLight text-lg ">
                        {inf.description}
                      </p>
                    </div>
                  ))}
                  <Link
                    href={v.href}
                    className="flex items-center gap-2 text-colorAzul font-girloyBold mt-2 group transition-colors"
                  >
                    <span className="group-hover:text-colorText">
                      {v.titleLink}
                    </span>
                    <ArrowRightIcon className="text-colorAzul group-hover:text-colorText" />
                  </Link>
                </div>
                <div className="w-[50%] relative min-h-[500px]">
                  <Image
                    loading="lazy"
                    priority={false}
                    src={v.imageUrl}
                    alt={v.title}
                    width={1024}
                    height={500}
                    placeholder="blur"
                    blurDataURL="/logo.svg"
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <div className="w-full flex items-center justify-between mb-14">
          <h2 className="text-colorText font-girloyBold text-6xl w-[50%]">
            Stay in sync from any app, on any device
          </h2>
          <div className="flex flex-col items-start justify-center gap-4">
            <p className="text-colorText font-girloyLight text-lg">
              Boost productivity with integrations that fold right into your
              workflow.
            </p>
            <Link href="#" className="text-colorAzul flex items-center gap-2">
              <span>Ver todas las integraciones</span>
              <ArrowRightIcon className="text-colorAzul" />
            </Link>
          </div>
        </div>
        <IntegrationsIcons />
      </div>
    </section>
  );
}
