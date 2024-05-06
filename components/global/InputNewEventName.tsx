"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { colorDefault } from "@/common/colorsDefault";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type Props = {
  onChangeColor: (e: string) => void;
  colorSelected: string;
  name: string;
  onChangeName: (e: string) => void;
};

export default function InputNewEventName({
  colorSelected,
  onChangeColor,
  name,
  onChangeName,
}: Props) {
  const [onOpenPanel, setOnOpenPanel] = useState(false);

  const onSelectColor = useCallback(
    (value: string) => {
      onChangeColor(value);
      setOnOpenPanel(false);
    },
    [onChangeColor]
  );

  const messageError = useMemo(() => {
    if (name.length == 0) return "Please prove an event name";
    return "";
  }, [name.length]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full min-h-[46px] border border-gray-300 rounded-lg flex items-center justify-center">
        <Popover open={onOpenPanel} onOpenChange={setOnOpenPanel}>
          <PopoverTrigger asChild>
            <button className="outline-none border-r border-gray-300 h-full w-[20%] flex items-center gap-2 justify-center">
              <div
                className="size-5 rounded-full"
                style={{ backgroundColor: colorSelected }}
              ></div>
              <ChevronDown className="text-colorAzul" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="flex flex-col gap-2 p-6">
            <p className="text-colorTextBlack font-semibold">Event color*</p>
            <div className="gap-3 gap-y-6 grid grid-cols-5">
              {colorDefault.map((e) => (
                <div
                  onClick={() => onSelectColor(e.color)}
                  key={e.color}
                  className={cn(
                    "size-7 flex items-center justify-center border-2 border-transparent rounded-full",
                    e.color === colorSelected && "border-colorAzul"
                  )}
                >
                  <div
                    style={{ backgroundColor: e.color }}
                    className="rounded-full size-5 cursor-pointer"
                  ></div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Input
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          className="m-0 border-none focus:border-none w-[80%] rounded-none rounded-r-lg"
          placeholder="Name your event"
        />
      </div>
      <div className="flex items-center">
        <p className="pl-[20%] text-colorError font-girloyRegular">
          {messageError}
        </p>
      </div>
    </div>
  );
}
