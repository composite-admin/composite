import { create } from "zustand";

interface ModalStoreState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const createModalStore = () =>
  create<ModalStoreState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));

export const useAddCommentModal = createModalStore();
export const useUpdateRequestModal = createModalStore();