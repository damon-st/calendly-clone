"use client";
import { deleteSpecificScheduleHours } from "@/actions/schedules";
import { TypeScheduleSpecifitHours } from "@/lib/types";
import { format } from "date-fns";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  item: TypeScheduleSpecifitHours;
  onRemoveSpecific: (id: string) => void;
  onEdit: () => void;
};

export default function ScheduleSpecificHoursItem({
  item,
  onRemoveSpecific,
  onEdit,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const existsDates = item.dates.length > 0;
  const timeInit = existsDates ? format(item.dates[0], "MMMM dd") : "NOT-DATES";
  const timeEnd = existsDates
    ? format(item.dates[item.dates.length - 1], "dd, yyyy")
    : "NOT-DATES";
  const timeForm = `${timeInit} - ${timeEnd}`;

  const onRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      startTransition(async () => {
        try {
          const response = await deleteSpecificScheduleHours(item.id);
          if (!response.success) {
            toast.error(response.message);
            return;
          }
          toast.success(response.message);
          onRemoveSpecific(item.id);
        } catch (error) {
          toast.error(`${error}`);
        }
      });
    },
    [item.id, onRemoveSpecific]
  );
  return (
    <div
      onClick={onEdit}
      className="w-full flex items-center justify-between hover:bg-colorCeleste cursor-pointer p-2"
    >
      <div className="flex items-center font-girloyRegular">{timeForm}</div>
      <div className="flex flex-col gap-1">
        {item.hours.map((h) => (
          <p key={h.id}>
            {h.hourInitStr}:{h.minuteInitStr} - {h.hourEndStr}:{h.minuteEndStr}
          </p>
        ))}
      </div>
      <button
        onClick={onRemove}
        type="button"
        disabled={isPending}
        className="flex items-center justify-center"
      >
        {isPending ? (
          <Loader2 className="text-black animate-spin" size={30} />
        ) : (
          <X className="text-colorTextGris" size={30} />
        )}
      </button>
    </div>
  );
}
