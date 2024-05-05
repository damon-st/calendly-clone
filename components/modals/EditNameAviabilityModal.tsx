"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useEditNameAvailability } from "@/lib/store/useModalEditNameAvailability";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  createDefaultSchedule,
  updateNameScheduleAviability,
} from "@/actions/schedules";
import { useRouter } from "next/navigation";

export default function EditNameAviabilityModal() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onClose, data } = useEditNameAvailability();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setValue(data?.previusTitle ?? "");
  }, [data?.previusTitle]);

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  const onSave = () => {
    if (isPending) return;
    setError("");
    if (!data?.id && !data?.isCreated) {
      setError("Not found Schedule Aviability please reatry again");
      return;
    }
    if (value.length < 1) {
      setError("Please name is required");
      return;
    }
    startTransition(async () => {
      try {
        if (data.isCreated) {
          const result = await createDefaultSchedule(data.userId ?? "", value);
          if (!result.success) {
            throw new Error(result.message);
          }
          router.refresh();
        } else {
          const result = await updateNameScheduleAviability(
            data.id ?? "",
            value
          );
          if (!result.success) {
            throw Error(result.message);
          }
          data.onChange?.(value);
        }
        setValue("");
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
          <DialogTitle className="text-2xl">
            {data?.isCreated ? "New schedule" : "Edit schedule name"}
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col gap-2">
          <span className="text-colorTextBlack font-girloySemiBold">
            Schedule name
          </span>
          <Input
            placeholder="Working Hours, Exlusive Hours, etc..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <span className="text-colorError text-sm font-girloyRegular">
            {error}
          </span>
        </div>
        <DialogFooter className="flex items-center justify-between">
          <Button
            disabled={isPending}
            type="button"
            onClick={handleClose}
            variant="outline"
            className="rounded-lg border border-colorTextBlack px-4 py-2 flex items-center justify-center font-girloyRegular"
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={onSave}
            variant="azul"
            size="lg"
            className="rounded-full px-6"
          >
            {isPending ? (
              <Loader2 className="text-white animate-spin" />
            ) : (
              <>{data?.isCreated ? "Create" : "Save"}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
