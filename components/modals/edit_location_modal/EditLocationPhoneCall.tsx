"use client";

import SelectCountry, {
  getCountryDefault,
} from "@/components/select_country/SelectCountry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewEnventStore } from "@/lib/store/useNewEvent";
import { TypeCountry } from "@/lib/types";
import { cn } from "@/lib/utils";
import React, { useCallback, useState } from "react";

type Props = {
  onClose: () => void;
};

export default function EditLocationPhoneCall({ onClose }: Props) {
  const { onChangeLocation } = useNewEnventStore();

  const [showSelectCountry, setShowSelectCountry] = useState(false);
  const [typeCall, setTypeCall] = useState<"mee" | "callMe">("mee");
  const [countryDefault, setCountryDefault] = useState(getCountryDefault());

  const [errorMsg, setErrorMsg] = useState("");

  const onShowDialoCountry = useCallback((v: boolean) => {
    setShowSelectCountry(v);
  }, []);

  const onChangeCountry = useCallback(
    (c: TypeCountry) => {
      onShowDialoCountry(false);
      setCountryDefault(c);
    },
    [onShowDialoCountry]
  );

  const onSave = useCallback(() => {
    setErrorMsg("");
    if (typeCall == "callMe" && !countryDefault.phone) {
      setErrorMsg("A valid phone number is required");
      return;
    }

    onChangeLocation({
      type: {
        type: "phoneCall",
        data: {
          type: typeCall,
          country: countryDefault.country,
          phone: `${countryDefault.code} ${countryDefault.phone}`,
        },
      },
    });
    onClose();
  }, [
    countryDefault.code,
    countryDefault.country,
    countryDefault.phone,
    onChangeLocation,
    onClose,
    typeCall,
  ]);
  return (
    <>
      {showSelectCountry && (
        <SelectCountry
          onClose={onShowDialoCountry}
          onChange={onChangeCountry}
        />
      )}

      <div className="w-full">
        <button
          onClick={() => setTypeCall("mee")}
          type="button"
          className="w-full flex gap-3 items-center cursor-pointer"
        >
          <div
            className={cn(
              "rounded-full size-5 border border-gray-300 flex items-center justify-center",
              typeCall == "mee" && "border-colorAzul bg-colorAzul"
            )}
          >
            <div className="size-2 bg-white rounded-full"></div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-colorTextBlack font-girloyRegular text-start">
              I will call my invitee
            </p>
            <p className="text-colorTextGris font-girloyRegular text-sm text-start">
              Calendly will require your invitee&apos;s phone number before
              scheduling.
            </p>
          </div>
        </button>
        <button
          onClick={() => setTypeCall("callMe")}
          type="button"
          className="w-full flex gap-3 items-center cursor-pointer"
        >
          <div
            className={cn(
              "rounded-full size-5 border border-gray-300 flex items-center justify-center",
              typeCall == "callMe" && "border-colorAzul bg-colorAzul"
            )}
          >
            <div className="size-2 bg-white rounded-full"></div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-colorTextBlack font-girloyRegular text-start">
              My invitee should call me
            </p>
            <p className="text-colorTextGris font-girloyRegular text-sm text-start">
              Calendly will provide your number after the call has been
              scheduled.
            </p>
            {typeCall == "callMe" && (
              <div className="w-full">
                <div className="w-full rounded-lg border border-gray-300 min-h-12 px-3 gap-2 flex items-center">
                  <div
                    onClick={() => onShowDialoCountry(true)}
                    className=" flex items-center gap-3 hover:bg-gray-300 h-full"
                  >
                    <picture>
                      <img
                        loading="lazy"
                        src={countryDefault.flag}
                        alt={countryDefault.name}
                        className="size-5"
                      />
                    </picture>
                    <span>{countryDefault.code}</span>
                  </div>
                  <Input
                    type="tel"
                    onChange={(e) => {
                      setCountryDefault((p) => ({
                        ...p,
                        phone: e.target.value,
                      }));
                    }}
                    className="w-[80%] border-none rounded-none rounded-r-lg outline-none ring-0 ring-transparent focus:ring-0 focus:outline-none focus:border-transparent focus:ring-transparent focus-within:ring-transparent"
                  />
                </div>
                <span className="text-colorError font-girloyRegular">
                  {errorMsg}
                </span>
              </div>
            )}
          </div>
        </button>
        <div className="w-full flex flex-row mt-4 ">
          <div className="w-full flex items-center justify-between">
            <Button
              onClick={onClose}
              variant="outline"
              className="rounded-full border border-colorTextBlack w-[40%]"
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              variant="azul"
              className="rounded-full border w-[40%]"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
