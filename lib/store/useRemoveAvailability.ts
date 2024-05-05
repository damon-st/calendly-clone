import { create } from "zustand";

type Data = {
  id: string;
  userId: string;
  title: string;
};

type RemoveAvailability = {
  data?: Data;
  onClose: () => void;
  onOpen: (data: Data) => void;
  isOpen: boolean;
};

export const useRemoveAvailability = create<RemoveAvailability>((set) => ({
  isOpen: false,
  onClose: () => set({ data: undefined, isOpen: false }),
  onOpen: (data: Data) => set({ data, isOpen: true }),
  data: undefined,
}));
