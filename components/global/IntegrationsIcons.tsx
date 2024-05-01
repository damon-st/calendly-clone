import { integrationsIcons } from "@/common/integrations_icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function IntegrationsIcons() {
  return (
    <div className="w-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-6 pt-20 pb-24">
      {integrationsIcons.map((inte) => (
        <TooltipProvider delayDuration={200} key={inte.label}>
          <Tooltip>
            <TooltipTrigger>
              <div className="rounded-lg px-2 py-2 flex items-center justify-center aspect-square h-28 iconInte cursor-pointer">
                <picture>
                  <img
                    loading="lazy"
                    src={inte.iconUrl}
                    alt={inte.label}
                    className="object-contain w-full"
                  />
                </picture>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-colorText font-girloyBold">{inte.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
