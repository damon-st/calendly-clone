import { sectionFourInfoBusiness } from "@/common/section_four_info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Section4() {
  return (
    <div className="w-full mt-28 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl flex flex-col justify-center items-center">
        <h2 className="text-colorText text-5xl text-center font-girloyBold mb-6">
          See Calendly in action
        </h2>
        <p className="text-colorText text-lg font-light mb-8 max-w-3xl text-center">
          Calendly is the scheduling automation platform with team-based
          scheduling, solutions and integrations for every department, and
          advanced security features.
        </p>
        <Link
          href="/signup"
          className="text-colorAzul font-semibold text-lg flex items-center gap-2"
        >
          <span>Sign up for free</span>
          <ArrowRight className="text-colorAzul" />
        </Link>
        <p className="mb-8">
          <br />
        </p>
        <div className="w-full px-10 mb-28">
          <video
            src="https://utfs.io/f/e1cddaa2-00fb-4791-9c6a-4571458bc486-6nfcw1.mp4"
            controls
            className="rounded-lg"
          ></video>
        </div>
      </div>
      <div className="w-full bg-colorBorder flex items-center justify-center">
        <div className="w-full max-w-7xl flex flex-col items-center px-10 justify-center mt-32 mb-32">
          <div className="w-full flex items-center justify-between">
            <div className="w-[50%]">
              <h2 className="text-colorText text-5xl font-girloyBold">
                Discover how businesses grow with Calendly
              </h2>
            </div>
            <div className="w-[50%]">
              <p className="text-colorText font-girloyLight text-lg pb-4">
                Learn how teams of all sizes are using Calendly’s scheduling
                automation platform to create value.
              </p>
              <Link
                href="#"
                className="text-lg text-colorAzul flex items-center gap-2 font-semibold group hover:text-colorText"
              >
                <span>View customer stories</span>
                <ArrowRight className="transition-transform duration-500 text-colorAzul group-hover:text-colorText group-hover:translate-x-2" />
              </Link>
            </div>
          </div>

          <Tabs
            defaultValue={sectionFourInfoBusiness[0].label}
            className="w-full mt-14 gap-12"
          >
            <TabsList className="bg-transparent gap-4 w-full">
              {sectionFourInfoBusiness.map((v) => (
                <TabsTrigger
                  key={v.label}
                  className="btnBus data-[state=active]:border-colorAzul data-[state=active]:bg-[#f4f8ff]"
                  value={v.label}
                >
                  <picture>
                    <img
                      src={v.imageUrl}
                      alt={v.label}
                      className="object-contain"
                    />
                  </picture>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="w-full mt-20 ">
              {sectionFourInfoBusiness.map((t) => (
                <TabsContent
                  key={t.imageUrl}
                  value={t.label}
                  className="w-full flex flex-col"
                >
                  <div className="w-full flex items-center justify-between gap-14">
                    {t.infos.map((inf) => (
                      <div className="w-full " key={inf.title}>
                        <p className="text-colorText font-bold text-6xl mb-4">
                          {inf.title}
                        </p>
                        <p className="text-colorText/70 font-semibold text-2xl">
                          {inf.description}
                        </p>
                        <div className="w-full h-[2px] bg-colorAzul mt-4 mb-4"></div>
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex items-center mt-4">
                    <Link
                      href={t.href}
                      className="text-colorText flex items-center gap-2 text-xl font-girloySemiBold"
                    >
                      <span>{t.titleLink}</span>
                      <ArrowRight className="text-colorText" />
                    </Link>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
