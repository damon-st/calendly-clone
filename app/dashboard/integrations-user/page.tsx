import React from "react";
import CarouselIntegrations from "./_components/CarouselIntegrations";
import AllIntegrations from "./_components/AllIntegrations";

type Props = {
  searchParams?: { [key: string]: string | string[] | null };
};

export default function IntegrationsPage({ searchParams }: Props) {
  const category = searchParams?.category;
  return (
    <div className="w-full overflow-y-auto">
      <h1 className="text-colorTextBlack font-girloyBold text-2xl">
        Integratiosn & apps
      </h1>
      <div className="w-full mt-5 bg-white shadow-lg rounded-sm p-6">
        <CarouselIntegrations />
        <AllIntegrations category={category as string} />
      </div>
    </div>
  );
}
