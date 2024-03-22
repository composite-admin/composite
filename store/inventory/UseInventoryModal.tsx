import { create } from "zustand";
import { createModalStore } from "../modals/useCreateModal";

interface ModalStoreState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}


export const useAddCommentModal = createModalStore();
export const useUpdateRequestModal = createModalStore();
export const useAddProjectModal = createModalStore();
export const useSuccessModal = createModalStore()
export const useAddStartupModal = createModalStore()
export const useAddStakeHolderModal = createModalStore()
export const useAddContractorModal = createModalStore()
export const useAddMaterial = createModalStore()
export const useUpdateProjectModal = createModalStore()
export const useInventoryDetails = createModalStore()
