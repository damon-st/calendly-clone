"use client";
import React, { useMemo } from "react";
import { countries } from "country-flags-svg";

import { all } from "country-codes-list";
import { TypeCountry } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const getCountryDefault = (): TypeCountry => {
  const temp = countries.find((v) => v.iso2 == "EC");
  const temp1 = all().find((a) => a["countryCode"] == "EC");
  return {
    code: `+${temp1?.countryCallingCode ?? ""}`,
    country: temp!.iso2,
    flag: temp!.flag,
    name: temp!.name,
  };
};

type Props = {
  onChange: (e: TypeCountry) => void;
  onClose: (b: boolean) => void;
};

export default function SelectCountry({ onChange, onClose }: Props) {
  const countryList = useMemo(() => {
    return countries.map((v) => {
      const temp = all().find(
        (a) => a["countryNameEn"] == v.name || a["countryNameLocal"] == v.name
      );
      let codeCalling: string = "";
      if (temp) {
        codeCalling = `+${temp["countryCallingCode"]}`;
      }
      return {
        ...v,
        codeCalling,
      };
    });
  }, []);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Select country code</DialogTitle>
        </DialogHeader>
        <div className="w-full  relative min-h-[400px] bg-white rounded-lg">
          <ScrollArea className="w-full h-[400px]">
            {countryList.map((m) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onChange({
                    code: m.codeCalling,
                    flag: m.flag,
                    name: m.name,
                    country: m.iso2,
                  });
                }}
                className="flex items-center py-2 px-4 justify-between hover:bg-gray-200 cursor-pointer"
                key={m.name}
              >
                <div className="flex items-center gap-3">
                  <picture>
                    <img className="size-5" src={m.flag} alt={m.flag} />
                  </picture>
                  <span>{m.name}</span>
                </div>
                <span>{m.codeCalling}</span>
              </div>
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
