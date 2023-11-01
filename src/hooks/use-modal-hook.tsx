import { create } from "zustand";

export type ModalType =
  | "updateProfileModal"
  | "anotherModal..."
//   you can add as much as you want... and control all of them right here...


interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) =>
    set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: null }),
}));
