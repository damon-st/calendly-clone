"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useShowModal } from "@/lib/store/useShowModal";
import { ChevronDown, Phone } from "lucide-react";
import { Button } from "../ui/button";

export default function EditLocationModal() {
  const { isOpen, onClose, type } = useShowModal();

  const open = isOpen && type == "editLocation";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Location</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="cursor-pointer rounded-lg border border-gray-300 min-h-12 flex items-center px-4 justify-between">
            <div className="flex items-center gap-3">
              <Phone className="text-colorTextGris" size={20} />
              <span className="text-colorTextBlack font-girloyRegular">
                Phone call
              </span>
            </div>
            <ChevronDown className="text-colorAzul" />
          </div>
          <button
            type="button"
            className="w-full flex gap-3 items-center cursor-pointer"
          >
            <div className="rounded-full size-5 border-colorAzul bg-colorAzul flex items-center justify-center">
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
            type="button"
            className="w-full flex gap-3 items-center cursor-pointer"
          >
            <div className="rounded-full size-5 border border-gray-300 flex items-center justify-center">
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
            </div>
          </button>
        </div>
        <DialogFooter className="w-full flex flex-row ">
          <div className="w-full flex items-center justify-between">
            <Button
              onClick={onClose}
              variant="outline"
              className="rounded-full border border-colorTextBlack w-[40%]"
            >
              Cancel
            </Button>
            <Button variant="azul" className="rounded-full border w-[40%]">
              Update
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
