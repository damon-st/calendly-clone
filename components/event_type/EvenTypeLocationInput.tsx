"use client";

import { TypeCountry, TypeNewEventLocation } from "@/lib/types";
import { useCallback, useMemo, useState } from "react";
import { Input } from "../ui/input";
import SelectCountry, {
  getCountryDefault,
} from "../select_country/SelectCountry";

type Props = {
  location: TypeNewEventLocation;
  onChangeLocation: (e: TypeNewEventLocation) => void;
};

export default function EvenTypeLocationInput({
  location,
  onChangeLocation,
}: Props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSelectCountry, setShowSelectCountry] = useState(false);
  const [countryDefault, setCountryDefault] = useState(getCountryDefault());

  const title = useMemo(() => {
    if (location.type.type == "phoneCall") {
      return "Phone Number";
    }
    return "";
  }, [location.type.type]);
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

  const handleChangeNumber = useCallback(
    (e: { target: { value: string } }) => {
      setPhoneNumber(e.target.value);
      if (location.type.type === "phoneCall") {
        let data: TypeNewEventLocation = {
          ...location,
          type: {
            ...location.type,
            data: {
              ...location.type.data,
              phone: e.target.value,
              country: countryDefault.country,
            },
          },
        };
        onChangeLocation(data);
      }
    },
    [countryDefault.country, location, onChangeLocation]
  );

  return (
    <>
      {showSelectCountry && <SelectCountry onChange={onChangeCountry} />}

      <div className="w-full flex flex-col items-start mt-2">
        <p className="text-md font-semibold text-colorTextBlack">{title} *</p>
        {location.type.type === "phoneCall" && (
          <div className="w-full rounded-lg flex items-center max-w-[80%] min-h-11 border border-gray-300">
            <div className="w-[20%] h-full">
              <div
                onClick={() => onShowDialoCountry(true)}
                className="cursor-pointer flex items-center justify-center gap-3 hover:bg-gray-300 h-full min-h-11"
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
            </div>
            <Input
              value={phoneNumber}
              onChange={handleChangeNumber}
              className="w-[80%] border-none"
              required
              id="PhoneNumber"
            />
          </div>
        )}
      </div>
    </>
  );
}
