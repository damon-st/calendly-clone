"use client";
import {
  ChevronDown,
  MapPinIcon,
  MapPinnedIcon,
  Phone,
  TextCursorInput,
} from "lucide-react";
import { ReactElement, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypeLocationEventNames } from "@/lib/types";
import { itemsLocationEvent } from "@/common/location_types";

type Props = {
  typeSelect?: TypeLocationEventNames;
};

export default function EditLocationTypes({ typeSelect }: Props) {
  const selectetTeype = useMemo(() => {
    return itemsLocationEvent.find((v) => v.value === typeSelect);
  }, [typeSelect]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="cursor-pointer rounded-lg border border-gray-300 min-h-12 flex items-center px-4 justify-between">
          <div className="flex items-center gap-3">
            {selectetTeype?.icon}
            <span className="text-colorTextBlack font-girloyRegular">
              {selectetTeype?.title}
            </span>
          </div>
          <ChevronDown className="text-colorAzul" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full md:min-w-[450px]">
        {itemsLocationEvent.map((v, i) => (
          <div key={v.value}>
            {i == 4 && (
              <DropdownMenuLabel className="font-girloySemiBold">
                WEEB CONFERENCING
              </DropdownMenuLabel>
            )}
            <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
              {v.icon}
              <span>{v.title}</span>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
