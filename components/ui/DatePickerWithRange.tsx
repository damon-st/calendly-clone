"use client";

import React, { useCallback, useState } from "react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>;
  onChangeRangeDates?: (v: DateRange) => void;
};

export function DatePickerWithRange({
  className,
  children,
  onChangeRangeDates,
}: Props) {
  const [showPop, setShowPop] = useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const onChangeRange = (value: any) => {
    try {
      console.log(value);
      setDate({
        from: value?.from,
        to: value?.to,
      });
    } catch (error) {
      console.log("[ERROR_CALENDAR_onChangeRange]", error);
    }
  };

  const onClose = useCallback(() => {
    setShowPop((p) => !p);
  }, []);

  const onSave = () => {
    if (!date) return;
    if (!date.from || !date.to) return;
    onChangeRangeDates?.(date!);
    onClose();
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover onOpenChange={onClose} open={showPop}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onChangeRange}
            numberOfMonths={2}
          />
          <div className="w-full flex items-center justify-center pb-2 gap-5">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={onSave} variant="azul" className="rounded-full">
              Appy
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
