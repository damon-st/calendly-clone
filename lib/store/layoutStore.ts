import { create } from "zustand";
export type LayoutStore = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useLayoutStore = create<LayoutStore>((set) => ({
  onClose: () => set({ open: false }),
  onOpen: () => set({ open: true }),
  open: true,
}));
