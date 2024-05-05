"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useRemoveAvailability } from "@/lib/store/useRemoveAvailability";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteScheduleAviability } from "@/actions/schedules";

export default function RemoveAvailabilityModal() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onClose, data } = useRemoveAvailability();
  const handleClose = () => {
    if (isPending) return;
    onClose();
  };
  const onDelete = () => {
    if (isPending) return;
    startTransition(async () => {
      try {
        const result = await deleteScheduleAviability(
          data?.id ?? "",
          data?.userId ?? ""
        );
        if (!result.success) {
          throw new Error(result.message);
        }
        router.refresh();
        onClose();
      } catch (error) {
        console.log(error);
        toast.error(`${error}`);
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4">
            Delete {data?.title}
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Any event types associated with this
            schedule will be set to custom availability with these hours.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className=" mt-4 w-full flex flex-row items-center !justify-between">
          <DialogClose
            disabled={isPending}
            className="rounded-full py-2 px-4 w-[150px] border border-colorTextBlack"
          >
            {" "}
            Cancel
          </DialogClose>
          <Button
            onClick={onDelete}
            variant="azul"
            className="rounded-full px-4 w-[150px]"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
