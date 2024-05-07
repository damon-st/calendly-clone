import { create } from "zustand";

type Data = {
  id?: string;
  previusTitle?: string;
  onChange?: (e: string) => void;
  isCreated?: boolean;
  userId?: string;
  favorite?: boolean;
};

type EditNameAvailability = {
  data?: Data;
  onOpen: (data?: Data) => void;
  onClose: () => void;
  isOpen: boolean;
};

export const useEditNameAvailability = create<EditNameAvailability>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false, data: undefined }),
  onOpen: (data) => set({ data, isOpen: true }),
  data: undefined,
}));
