import { create } from "zustand";

interface ModalStoreState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const createModalStore = () =>
  create<ModalStoreState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));

export const useAddCommentModal = createModalStore();
export const useUpdateRequestModal = createModalStore();