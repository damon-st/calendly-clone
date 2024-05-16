"use client";

import { colorDefault } from "@/common/colorsDefault";
import CardInfoEventName from "@/components/global/CardInfoEventName";
import InputNewEventDuration from "@/components/global/InputNewEventDuration";
import InputNewEventLocation from "@/components/global/InputNewEventLocation";
import InputNewEventName from "@/components/global/InputNewEventName";
import { Button } from "@/components/ui/button";
import { useNewEnventStore } from "@/lib/store/useNewEvent";
import { TypeDurationCustom, TypeNewEventLocation } from "@/lib/types";
import { ChevronLeft, Info, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import EventEditDescription from "./EventEditDescription";

type Props = {
  typeEvent: string;
  isEditing: boolean;
  onCloseSide?: () => void;
  idEvent?: string;
};

export default function SidebarCreate({
  typeEvent,
  onCloseSide,
  isEditing,
  idEvent,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [nameEvent, setNameEvent] = useState("");
  const [color, setColor] = useState(colorDefault[0].color);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [descriptionInstruc, setDescriptionInstruc] = useState("");
  const router = useRouter();
  const {
    onChangeNameEvent,
    onChangeColor,
    onChangeDuration,
    onReset,
    data,
    onChangeLocation,
    onSave,
    onSaveChanges,
    onChange: onChangeAllStore,
  } = useNewEnventStore();
  const [durationCustom, setDurationCustom] = useState<TypeDurationCustom>({
    format: "min",
    time: 15,
  });

  useEffect(() => {
    if (!isEditing) return;
    setNameEvent(data.nameEvent);
    setDurationCustom(data.duration);
    setColor(data.color);
    setDescriptionInstruc(data.descriptionInstruc);
  }, [isEditing]);

  const onCancel = useCallback(() => {
    if (isEditing) {
      onCloseSide?.();
    } else {
      onReset();
      router.replace("/dashboard/new-event");
    }
  }, [isEditing, onCloseSide, onReset, router]);

  const onContinue = () => {
    if (isPending) return;
    startTransition(async () => {
      try {
        if (isEditing) {
          const response = await onSaveChanges(idEvent ?? "", {
            colorEvent: color,
            eventName: nameEvent,
            location: data.location,
            descriptionInstruc: descriptionInstruc,
            duration: durationCustom,
          });
          if (!response.success) {
            throw new Error(response.message);
          }
          toast.success("Changed Saved!");
          onCloseSide?.();
        } else {
          const response = await onSave(data, typeEvent);
          if (!response.success) {
            throw new Error(response.message);
          }
          console.log(response.data);
          router.push(`/edit-event/${response.data.id}`);
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    });
  };

  const toggleInfoCard = useCallback(() => {
    setShowInfoCard((v) => !v);
  }, []);

  const onChangeName = useCallback(
    (e: string) => {
      setNameEvent(e);
      onChangeNameEvent(e);
    },
    [onChangeNameEvent]
  );
  const handleChangeColor = useCallback(
    (e: string) => {
      setColor(e);
      onChangeColor(e);
    },
    [onChangeColor]
  );

  const handleChangeDuration = useCallback(
    (duration: TypeDurationCustom) => {
      setDurationCustom(duration);
      onChangeDuration(duration);
    },
    [onChangeDuration]
  );

  const handleChangeLocation = useCallback(
    (e: TypeNewEventLocation) => {
      onChangeLocation(e);
    },
    [onChangeLocation]
  );

  const handleOnChangeDescri = useCallback(
    (v: string) => {
      setDescriptionInstruc(v);
      onChangeAllStore({
        descriptionInstruc: v,
      });
    },
    [onChangeAllStore]
  );

  return (
    <aside className="size-full">
      <div className="w-full h-[12%] flex flex-col justify-center gap-2 border-b border-gray-300 px-6">
        <button
          type="button"
          disabled={isPending}
          onClick={onCancel}
          className="flex gap-2 items-center cursor-pointer"
        >
          <ChevronLeft className="text-colorTextBlack" />
          <span className="text-colorTextBlack font-girloyBold font-bold underline">
            {isEditing ? "Event Type Summary" : "Cancel"}
          </span>
        </button>
        <h1 className="text-xl font-girloySemiBold text-colorTextBlack">
          {isEditing ? "Event details" : "New Event Type"}
        </h1>
      </div>
      <div className="w-full h-[80%] p-6 flex flex-col gap-2 relative">
        <p className="text-colorTextBlack font-girloySemiBold font-bold text-lg flex items-center gap-2">
          Event name *
          <Info
            onClick={toggleInfoCard}
            className="text-colorTextGris cursor-pointer"
            size={15}
          />
        </p>
        {showInfoCard && <CardInfoEventName />}
        <InputNewEventName
          name={nameEvent}
          onChangeName={onChangeName}
          onChangeColor={handleChangeColor}
          colorSelected={color}
        />
        <InputNewEventDuration
          durationCustom={durationCustom}
          setDurationCustom={handleChangeDuration}
        />
        <InputNewEventLocation
          onChangeLocation={handleChangeLocation}
          canUseZoom={false}
          typeSelect={data.location.type.type}
        />
        {isEditing && (
          <EventEditDescription
            isEditing={isEditing}
            onChange={handleOnChangeDescri}
            value={descriptionInstruc}
          />
        )}
      </div>
      <div className="w-full h-[8%] flex items-center justify-end px-6 gap-3 border-t border-gray-300">
        <Button
          disabled={isPending}
          onClick={onCancel}
          variant="outline"
          className="rounded-full"
        >
          Cancel
        </Button>
        <Button
          disabled={isPending}
          onClick={onContinue}
          variant="azul"
          className="rounded-full"
        >
          {isPending ? (
            <Loader2 className="text-white animate-spin" />
          ) : (
            `${isEditing ? "Save and close" : "Continue"}`
          )}
        </Button>
      </div>
    </aside>
  );
}
