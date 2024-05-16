"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useShowModal } from "@/lib/store/useShowModal";
import { ChevronDown, Phone } from "lucide-react";
import { useMemo } from "react";
import EditLocationPhoneCall from "./EditLocationPhoneCall";
import EditLocationTypes from "./EditLocationTypes";
import EditLocationInPerson from "./EditLocationInPerson";

export default function EditLocationModal() {
  const { isOpen, onClose, type, data } = useShowModal();

  const open = isOpen && type == "editLocation";

  const editChild = useMemo(() => {
    if (!data?.type) {
      return null;
    }
    if (data.type == "phoneCall") {
      return <EditLocationPhoneCall onClose={onClose} />;
    }
    if (data.type == "inPerson") {
      return <EditLocationInPerson onClose={onClose} />;
    }
  }, [data?.type, onClose]);
  if (!open) return null;
  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
          </DialogHeader>
          <div className="w-full flex flex-col gap-4">
            <EditLocationTypes typeSelect={data?.type} />
            {editChild}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
