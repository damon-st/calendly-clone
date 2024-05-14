"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const items: Array<{ title: string; imageUrl: string; href: string }> = [
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/gong_routing_graphic-d46097597978242896b1.svg",
    href: "#",
    title: "Quick, easy scheduling in Gong for better lead conversion",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/hubspot_routing_graphic-e4c921cb2f6c13a590b7.svg",
    href: "#",
    title:
      "Increase HubSpot form conversion with instant, account-matched scheduling",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/sfdc_routing_graphic-b92742ea2df4ac44456e.svg",
    href: "#",
    title:
      "Route leads to the right team member via real-time Salesforce lookup",
  },
  {
    imageUrl:
      "https://assets.calendly.com/assets/frontend/media/marketo_routing_graphic-9b7e9276d36957744ad9.svg",
    href: "#",
    title: "Boost Marketo form conversion with instant, qualified booking",
  },
];

export default function CarouselIntegrations() {
  const [position, setPosition] = useState(0);

  const info = useMemo(() => {
    if (position > items.length - 1) {
      return items[0];
    }
    return items[position];
  }, [position]);

  const handleClickCircles = useCallback((i: number) => {
    setPosition(i);
  }, []);

  useEffect(() => {
    const handleChange = () => {
      setPosition((p) => {
        if (p >= items.length - 1) {
          return 0;
        }
        return p + 1;
      });
    };
    const interval = setInterval(handleChange, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full flex items-center min-h-[250px] bg-[#F2F8FF] rounded-t-sm relative">
      <div className="w-full h-full relative">
        <picture>
          <img src={info.imageUrl} alt="integration" loading="lazy" />
        </picture>
      </div>
      <div className="w-[78%] h-full flex flex-col items-start justify-center px-6 gap-5">
        <p className="text-colorAzul font-girloyBold text-sm">
          FEATURED INTEGRATION
        </p>
        <p className="text-colorTextBlack font-girloyBold text-2xl">
          {info.title}
        </p>
        <Link
          href={info.href}
          className="rounded-full bg-colorAzul text-white font-girloyBold px-5 py-3"
        >
          Get started
        </Link>
      </div>
      <div className="w-full absolute bottom-5 flex items-center justify-center gap-2">
        {items.map((v, i) => (
          <div
            onClick={() => handleClickCircles(i)}
            key={v.title}
            className={cn(
              "rounded-full size-3 bg-gray-300 cursor-pointer",
              i == position && "bg-black"
            )}
          />
        ))}
      </div>
    </div>
  );
}
