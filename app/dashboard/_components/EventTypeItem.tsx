"use client";
import { EventType } from "@prisma/client";
import React, { useCallback, useMemo, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Copy, Loader, Settings, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { removeEventType } from "@/actions/event_type";
import { Checkbox } from "@/components/ui/checkbox";
import { TypeEventFormating } from "@/lib/types";
import Link from "next/link";

type Props = {
  event: TypeEventFormating;
  userId: string;
  urlUser: string;
};

export default function EventTypeItem({ event, userId, urlUser }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`/edit-event/${event.id}`);
  }, [event.id, router]);

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isPending) return;
      startTransition(async () => {
        try {
          const response = await removeEventType(event.id, userId);
          if (!response.success) {
            throw new Error(response.message);
          }
          router.refresh();
        } catch (error) {
          console.log(error);
          toast.error(`${error}`);
        }
      });
    },
    [event.id, isPending, router, userId]
  );

  const linkUser = useMemo(() => {
    const tempN = event.eventName.toLowerCase().replaceAll(" ", "-");
    return `${urlUser}/${tempN}`;
  }, [event.eventName, urlUser]);

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-full flex flex-col min-h-[226px] border border-gray-300 bg-white rounded-md shadow-card relative"
    >
      {isPending && (
        <div className="absolute size-full top-0 bg-black/80 rounded-lg flex items-center justify-center">
          <Loader className="text-white animate-spin" size={40} />
        </div>
      )}
      <div
        className="w-full h-[4%] rounded-t-md"
        style={{ backgroundColor: event.colorEvent }}
      />
      <div className="w-full flex px-4 items-center justify-between mt-2">
        <div>
          <Checkbox className="rounded-none border border-gray-300" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <div className="flex gap-3">
              <Settings size={20} className="text-colorTextBlack" />
              <ChevronDown size={15} className="text-colorTextBlack" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={isPending}
              onClick={handleDelete}
              className="cursor-pointer flex items-center gap-3 text-sm text-colorTextBlack font-girloyRegular"
            >
              <Trash />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full flex-1 px-4 flex flex-col items-start justify-center overflow-hidden">
        <p className="text-colorTextBlack font-girloyBold text-lg">
          {event.eventName}
        </p>
        <span className="text-colorTextGris font-girloyRegular">
          {event.duration.time} {event.duration.format}, {event.typeEvent}
        </span>
        <Link
          onClick={(e) => e.stopPropagation()}
          target="_blank"
          href={linkUser}
          className="text-colorAzul hover:underline font-girloyRegular"
        >
          View booking page
        </Link>
      </div>
      <div className="w-full flex items-center justify-between border-t border-t-gray-300 px-4 py-3">
        <button className="text-colorAzul font-girloyRegular flex items-center gap-3">
          <Copy className="text-colorAzul" />
          <span>Copy link</span>
        </button>
        <button className="rounded-full border border-colorAzul px-6 py-1 text-colorAzul text-sm font-girloyRegular hover:bg-colorCeleste">
          Share
        </button>
      </div>
    </div>
  );
}
