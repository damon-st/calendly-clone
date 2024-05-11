import { create } from "zustand";
import { TypeInviteQuestions, TypeLocationEventNames } from "../types";

type Data = {
  type?: TypeLocationEventNames;
  onSaveTypeQuestion?: (type: TypeInviteQuestions) => void;
  typeInvite?: TypeInviteQuestions;
};

type TypeModal = "none" | "editLocation" | "createQuestions";

type ShowModal = {
  type: TypeModal;
  data?: Data;
  onClose: () => void;
  onOpen: (typeM: TypeModal, data?: Data) => void;
  isOpen: boolean;
};

export const useShowModal = create<ShowModal>((set) => ({
  type: "none",
  isOpen: false,
  onClose: () => set({ data: undefined, isOpen: false, type: "none" }),
  onOpen: (typeM: TypeModal, data?: Data) =>
    set({ data, isOpen: true, type: typeM }),
  data: undefined,
}));
