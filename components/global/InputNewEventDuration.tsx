"use client";
import { Info } from "lucide-react";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { TypeDurationCustom } from "@/lib/types";

type Props = {
  durationCustom: TypeDurationCustom;
  setDurationCustom: (e: TypeDurationCustom) => void;
};

export default function InputNewEventDuration({
  durationCustom,
  setDurationCustom,
}: Props) {
  const [openMsg, setOpenMsg] = useState(false);
  const [duration, setDuration] = useState("15");

  const [errorMsg, setErrorMsg] = useState("");

  const onValueChange = useCallback(
    (v: string) => {
      setDuration(v);
      if (v == "custom") return;
      setDurationCustom({ format: "min", time: parseInt(v) });
    },
    [setDurationCustom]
  );

  const isCustom = useMemo(() => {
    return duration == "custom";
  }, [duration]);

  const onChangeDuration = useCallback(
    (e: { target: { value: string } }) => {
      if (e.target.value.includes(".")) return;
      if (e.target.value.length == 0) return;
      const duration = parseInt(e.target.value);
      setErrorMsg("");
      if (duration > 12 && durationCustom.format == "hrs") {
        setErrorMsg("Must be less than or equal to 12 hrs");
        return;
      }
      if (duration > 12 * 60 && durationCustom.format == "min") {
        setErrorMsg("Must be less than or equal to 720 min");
        return;
      }
      setDurationCustom({
        ...durationCustom,
        time: parseInt(e.target.value),
      });
    },
    [durationCustom, setDurationCustom]
  );

  return (
    <div className="w-full flex items-start flex-col gap-2">
      <div className="flex items-center gap-2">
        <p className="text-colorTextBlack text-lg font-girloySemiBold">
          Duration*
        </p>
        <Popover open={openMsg} onOpenChange={setOpenMsg}>
          <PopoverTrigger>
            <Info className="text-colorTextGris" size={15} />
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="bg-[#333333] text-white font-girloyLight"
          >
            <span>
              Define how long your event will be. It can be as long as 12 hours.
            </span>
            <button
              onClick={() => setOpenMsg(false)}
              type="button"
              className="px-3 py-2 mt-6 border border-white w-full rounded-full"
            >
              Got it
            </button>
          </PopoverContent>
        </Popover>
      </div>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px] min-h-12 outline-none border border-gray-300">
          <SelectValue className="outline-none" placeholder="15 min" />
        </SelectTrigger>
        <SelectContent className="outline-none cursor-pointer">
          <SelectItem className="cursor-pointer" value="15">
            15 min
          </SelectItem>
          <SelectItem className="cursor-pointer" value="30">
            30 min
          </SelectItem>
          <SelectItem className="cursor-pointer" value="45">
            45 min
          </SelectItem>
          <SelectItem className="cursor-pointer" value="60">
            60 min
          </SelectItem>
          <SelectItem className="cursor-pointer" value="custom">
            Custom
          </SelectItem>
        </SelectContent>
      </Select>
      {isCustom && (
        <div className="w-full">
          <div className="w-full flex items-center gap-2">
            <Input
              type="number"
              className="w-[80px] border border-gray-300 min-h-12"
              onChange={onChangeDuration}
            />
            <Select
              onValueChange={(e) => {
                setDurationCustom({ ...durationCustom, format: e as any });
              }}
            >
              <SelectTrigger className="w-[100px] min-h-12 border border-gray-300 outline-none">
                <SelectValue
                  className="border border-gray-300"
                  placeholder="min"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="min">min</SelectItem>
                <SelectItem value="hrs">hrs</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="text-colorError font-girloyLight">{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
