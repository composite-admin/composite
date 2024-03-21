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
export const useAddProjectModal = createModalStore();
export const useSuccessModal = createModalStore()
export const useAddStartupModal = createModalStore()
export const useAddStakeHolderModal = createModalStore()
export const useAddContractorModal = createModalStore()
export const useAddMaterial = createModalStore()
export const useUpdateProjectModal = createModalStore()
