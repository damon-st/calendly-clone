"use client";
import {
  TypeCountry,
  TypeInviteQuestions,
  TypeQuestionSelection,
} from "@/lib/types";
import { Input } from "../ui/input";
import { useCallback, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import SelectCountry, {
  getCountryDefault,
} from "../select_country/SelectCountry";
import { Textarea } from "../ui/textarea";

type Props = {
  invite: TypeInviteQuestions;
  onChange: (v: TypeInviteQuestions) => void;
};

export default function InviteQuestionInput({ invite, onChange }: Props) {
  const [iniviteValue, setIniviteValue] = useState(invite);
  const [showSelectCountry, setShowSelectCountry] = useState(false);
  const canInput = invite.type == "oneLine";
  const canRadioButon = invite.type === "radioButtons";
  const canUseCheckbox = invite.type === "checkboxes";
  const canUseDropDwn = invite.type === "drowpDown";
  const [countryDefault, setCountryDefault] = useState(getCountryDefault());

  const onValueChangeRadio = useCallback(
    (v: TypeQuestionSelection, i: number) => {
      if (iniviteValue.type === "radioButtons") {
        let temp: TypeInviteQuestions = { ...iniviteValue };
        let options = [...temp.data.options];
        for (const iterator of options) {
          iterator.selected = false;
        }
        options[i].selected = true;
        temp.data.options = options;
        setIniviteValue(temp);
        onChange(temp);
      } else if (iniviteValue.type === "checkboxes") {
        let temp: TypeInviteQuestions = { ...iniviteValue };
        let options = [...temp.data.options];
        options[i].selected = !v.selected;
        temp.data.options = options;
        setIniviteValue(temp);
        onChange(temp);
      }
    },
    [iniviteValue, onChange]
  );

  const handleChangeDrow = useCallback(
    (e: { target: { value: string } }) => {
      if (iniviteValue.type === "drowpDown") {
        let temp: TypeInviteQuestions = { ...iniviteValue };
        let options = [...temp.data.options];
        for (const iterator of options) {
          iterator.selected = iterator.label === e.target.value;
        }
        temp.data.options = options;
        setIniviteValue(temp);
        onChange(temp);
      }
    },
    [iniviteValue, onChange]
  );
  const onChangeCountry = useCallback(
    (c: TypeCountry) => {
      setShowSelectCountry(false);
      setCountryDefault(c);
      if (iniviteValue.type === "phonNumber") {
        let temp: TypeInviteQuestions = {
          ...iniviteValue,
        };
        temp.data.country = c.country;
        setIniviteValue(temp);
        onChange(temp);
        console.log(c);
      }
    },
    [iniviteValue, onChange]
  );
  const countryElem = useMemo(() => {
    if (!showSelectCountry) return null;
    return (
      <SelectCountry
        onClose={setShowSelectCountry}
        onChange={onChangeCountry}
      />
    );
  }, [onChangeCountry, showSelectCountry]);

  const onChangeNumber = useCallback(
    (e: { target: { value: string } }) => {
      if (iniviteValue.type === "phonNumber") {
        let temp: TypeInviteQuestions = {
          ...iniviteValue,
        };
        temp.data.phone = e.target.value;
        setIniviteValue(temp);
        onChange(temp);
      }
    },
    [iniviteValue, onChange]
  );

  if (!iniviteValue.data.active) {
    return null;
  }

  return (
    <>
      {countryElem}
      <div className="w-full mt-2 mb-2">
        <p className="text-colorTextBlack font-semibold text-md mb-2">
          {invite.data.label} {invite.data.required && "*"}
        </p>
        {canInput && (
          <Input
            onChange={(e) => {
              let temp: any = {
                ...iniviteValue,
                data: {
                  ...iniviteValue.data,
                  responseTxt: e.target.value,
                },
              };
              setIniviteValue(temp);
              onChange(temp);
            }}
            value={iniviteValue.data.responseTxt}
            className="w-full max-w-[80%] border border-gray-300 inpuerr "
            type={iniviteValue.data.typeInput}
            id={iniviteValue.data.id}
            required={iniviteValue.data.required}
          />
        )}
        {iniviteValue.type === "multipleLines" && (
          <Textarea
            onChange={(e) => {
              let temp: any = {
                ...iniviteValue,
                data: {
                  ...iniviteValue.data,
                  responseTxt: e.target.value,
                },
              };
              setIniviteValue(temp);
              onChange(temp);
            }}
            value={iniviteValue.data.responseTxt}
            className="w-full max-w-[80%] border border-gray-300 inpuerr resize-none"
            id={iniviteValue.data.id}
            required={iniviteValue.data.required}
          ></Textarea>
        )}
        {canRadioButon && (
          <div className="w-full">
            {iniviteValue.type === "radioButtons" &&
              iniviteValue.data.options.map((v, i) => (
                <div
                  onClick={() => onValueChangeRadio(v, i)}
                  key={i}
                  className="flex items-center space-x-2 mb-2 mt-2 cursor-pointer"
                >
                  <div
                    id={`${i}`}
                    className={cn(
                      "size-5 border border-gray-300 rounded-full flex items-center justify-center",
                      v.selected && "border-colorAzul"
                    )}
                  >
                    <div
                      className={cn(
                        "size-3 bg-white rounded-full",
                        v.selected && "bg-colorAzul"
                      )}
                    ></div>
                  </div>
                  <Label htmlFor={`${i}`} className="cursor-pointer">
                    {v.label}
                  </Label>
                </div>
              ))}
          </div>
        )}
        {canUseCheckbox && (
          <div className="w-full">
            {iniviteValue.type === "checkboxes" &&
              iniviteValue.data.options.map((v, i) => (
                <div
                  onClick={() => onValueChangeRadio(v, i)}
                  key={i}
                  className="flex items-center space-x-2 mb-3 mt-3 cursor-pointer"
                >
                  <div
                    id={`${i}`}
                    className={cn(
                      "size-5 border border-gray-300 rounded-sm flex items-center justify-center",
                      v.selected && "border-colorAzul"
                    )}
                  >
                    <Check
                      className={cn(
                        "size-3 bg-white text-white",
                        v.selected && "text-colorAzul"
                      )}
                    />
                  </div>
                  <Label htmlFor={`${i}`} className="cursor-pointer">
                    {v.label}
                  </Label>
                </div>
              ))}
          </div>
        )}
        {canUseDropDwn && iniviteValue.type === "drowpDown" && (
          <select
            required={iniviteValue.data.required}
            onChange={handleChangeDrow}
            value={iniviteValue.data.options[0].label}
            className="customSelect outline-none rounded-lg border border-gray-300 min-h-11 w-full md:max-w-[80%] px-2"
          >
            {iniviteValue.data.options.map((v, i) => (
              <option
                className="py-2 hover:bg-colorCeleste cursor-pointer "
                key={i}
                value={v.label}
              >
                {v.label}
              </option>
            ))}
          </select>
        )}
        {iniviteValue.type === "phonNumber" && (
          <div className="w-full">
            <div className="w-full rounded-lg flex items-center max-w-[80%] min-h-11 border border-gray-300">
              <div className="w-[20%] h-full">
                <div
                  onClick={() => setShowSelectCountry(true)}
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
                value={iniviteValue.data.phone}
                onChange={onChangeNumber}
                className="w-[80%] border-none"
                required={iniviteValue.data.required}
                id={iniviteValue.data.id}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
