import { itemsLocationEvent } from "@/common/location_types";
import { TypeLocationEventNames } from "@/lib/types";
import { MapPinIcon, Phone, Video } from "lucide-react";
import React, { ReactElement } from "react";

type Props = {
  type: TypeLocationEventNames;
};

export default function LocationEventType({ type }: Props) {
  const item = itemsLocationEvent.find((v) => v.value == type);
  if (!item) return null;
  return (
    <div className="w-full flex items-center gap-3 mt-2 mb-2 text-colorTextGris font-girloySemiBold">
      {item!.icon}
      {item?.title}
    </div>
  );
}
