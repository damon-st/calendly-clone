import { create } from "zustand";
import {
  DataNewEnvet,
  TypeDurationCustom,
  TypeEventFormating,
  TypeNewEventLocation,
  TypeResultAction,
} from "../types";
import { colorDefault } from "@/common/colorsDefault";
import { createNewEvent, onSaveChangesEventType } from "@/actions/event_type";

const initialData: DataNewEnvet = {
  color: colorDefault[0].color,
  duration: {
    format: "min",
    time: 15,
  },
  location: {
    type: {
      type: "none",
    },
  },
  nameEvent: "",
  inviteQuestions: [
    {
      type: "oneLine",
      data: {
        active: true,
        disabled: false,
        id: "name",
        label: "Name",
        required: true,
        responseTxt: "",
        typeInput: "text",
      },
    },
    {
      type: "oneLine",
      data: {
        typeInput: "email",
        active: true,
        disabled: false,
        id: "email",
        label: "Email",
        required: true,
        responseTxt: "",
      },
    },
  ],
};

type TypeNewEvent = {
  data: DataNewEnvet;
  onChange: (data: Partial<DataNewEnvet>) => void;
  onChangeNameEvent: (title: string) => void;
  onChangeColor: (title: string) => void;
  onChangeDuration: (duration: TypeDurationCustom) => void;
  onChangeLocation: (location: TypeNewEventLocation) => void;
  onReset: () => void;
  onSave: (data: DataNewEnvet, typeEvent: string) => Promise<TypeResultAction>;
  onSaveChanges: (
    id: string,
    data: Partial<TypeEventFormating>
  ) => Promise<TypeResultAction>;
};

export const useNewEnventStore = create<TypeNewEvent>((set) => ({
  data: initialData,
  onChange: (newData) =>
    set((prev) => ({
      data: {
        ...prev.data,
        ...newData,
      },
    })),
  onReset: () =>
    set(() => ({
      data: initialData,
    })),
  onChangeNameEvent: (title) =>
    set((prev) => ({
      data: {
        ...prev.data,
        nameEvent: title,
      },
    })),
  onChangeColor: (color) =>
    set((prev) => ({
      data: {
        ...prev.data,
        color,
      },
    })),
  onChangeDuration: (duration) =>
    set((prev) => ({
      data: {
        ...prev.data,
        duration,
      },
    })),
  onChangeLocation: (location) =>
    set((prev) => ({
      data: {
        ...prev.data,
        location,
      },
    })),
  async onSave(data, typeEvent) {
    return createNewEvent(data, typeEvent);
  },
  async onSaveChanges(id, data) {
    return onSaveChangesEventType(id, data);
  },
}));
