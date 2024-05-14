import {
  integrationFilters,
  itemIntegrations,
} from "@/common/itemsIntegrations";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  category?: string;
};

export default function AllIntegrations({ category }: Props) {
  const itemsFilter = itemIntegrations.filter((v) => {
    if (!category) return true;
    if (category === "all") return true;
    return v.type == (category as any);
  });

  return (
    <div className="w-full flex items-start mt-5 gap-5 px-6">
      <div className="w-[25%] sticky top-0 border-t-4 border-t-black flex flex-col gap-2 pt-2">
        {integrationFilters.map((v) => (
          <Link
            key={v.value}
            href={`/dashboard/integrations-user?category=${v.value}`}
            className={cn(
              "flex items-center font-girloyRegular",
              category === v.value && "text-colorAzul font-girloyBold",
              !category && v.value === "all" && "text-colorAzul font-girloyBold"
            )}
          >
            {v.title}
          </Link>
        ))}
      </div>
      <div className="w-[75%]">
        <p className="text-colorTextBlack font-girloyBold text-2xl">
          All integrations
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 pt-5 gap-5">
          {itemsFilter.map((v) => (
            <Link
              target={v.target}
              href={v.href}
              key={v.title}
              className="w-full border border-[#F2F2F2] p-6 hover:border-gray-300 hover:shadow-lg cursor-pointer relative"
            >
              {v.forAdmin && (
                <div className="absolute top-[10%] right-[5%] bg-colorAzul text-white font-girloyBold rounded-lg px-3">
                  ADMIN
                </div>
              )}
              <div className="size-12 relative">
                <picture>
                  <img
                    src={v.imageUrl}
                    alt={v.title}
                    loading="lazy"
                    className="size-full"
                  />
                </picture>
              </div>
              <p className="font-girloySemiBold mt-1">{v.title}</p>
              <p className="text-colorTextGris font-girloyRegular text-sm">
                {v.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
