"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNewEnventStore } from "@/lib/store/useNewEvent";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

type Props = {
  onClose: () => void;
};

export default function EditLocationInPerson({ onClose }: Props) {
  const { onChangeLocation } = useNewEnventStore();
  const [showMsgAditional, setShowMsgAditional] = useState(false);
  const refArea = useRef<HTMLTextAreaElement | null>(null);
  const [msgError, setMsgError] = useState("");
  const [location, setLocation] = useState("");

  const onSave = () => {
    setMsgError("");
    if (location.length < 3) {
      setMsgError("Physical location is required.");
      return;
    }
    let msgAditional = "";
    if (showMsgAditional) {
      msgAditional = refArea.current?.value ?? "";
    }
    onChangeLocation({
      type: {
        type: "inPerson",
        data: {
          location: location,
          msgAditional,
        },
      },
    });
    onClose();
  };
  return (
    <div className="w-full">
      <Input
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        className={cn(
          "min-h-12 border border-gray-300",
          msgError.length && "border-colorError"
        )}
      />
      <span className="text-colorError font-girloyRegular">{msgError}</span>
      <div className="w-full mt-2">
        {!showMsgAditional ? (
          <button
            onClick={() => setShowMsgAditional(true)}
            className="text-colorAzul font-girloyRegular flex items-center gap-2"
          >
            <Plus className="text-colorAzul" />
            <span className="hover:underline">
              Include additonal information
            </span>
          </button>
        ) : (
          <Textarea
            ref={refArea}
            className="resize-none border border-gray-300 mt-2"
          />
        )}
      </div>
      <div className="w-full flex items-center justify-between mt-6">
        <Button
          onClick={onClose}
          variant="outline"
          className="rounded-full border border-colorTextBlack w-[40%]"
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          variant="azul"
          className="rounded-full border w-[40%]"
        >
          Update
        </Button>
      </div>
    </div>
  );
}
