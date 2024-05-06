import { create } from "zustand";
import { TypeDurationCustom, TypeNewEventLocation } from "../types";
import { colorDefault } from "@/common/colorsDefault";

type DataNewEnvet = {
  color: string;
  nameEvent: string;
  duration: TypeDurationCustom;
  location: TypeNewEventLocation;
};

const initialData: DataNewEnvet = {
  color: colorDefault[0].color,
  duration: {
    format: "min",
    time: 15,
  },
  location: {
    type: {
      type: "inPerson",
      data: {
        location: "",
      },
    },
  },
  nameEvent: "",
};

type TypeNewEvent = {
  data: DataNewEnvet;
  onChange: (data: Partial<DataNewEnvet>) => void;
  onChangeNameEvent: (title: string) => void;
  onChangeColor: (title: string) => void;
  onChangeDuration: (duration: TypeDurationCustom) => void;
  onChangeLocation: (location: TypeNewEventLocation) => void;
  onReset: () => void;
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
}));
