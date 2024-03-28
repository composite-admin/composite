import { create } from "zustand";

export type breakdownModal = "add" | "edit" | null;

export type EditModalAction = {
  edit: (action: string) => void;
};

interface ModalStoreState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  breakdownModalType?: breakdownModal;
  action: string;
  setAction: (action: string) => void;
  setBreakdownModalType: (type: "add" | "edit" | null) => void;
}

export const createModalStore = () =>
  create<ModalStoreState>((set) => ({
    isOpen: false,
    breakdownModalType: null,
    action: "",
    setAction: (action: string) => set({ action }),
    setBreakdownModalType: (type) => set({ breakdownModalType: type }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false, breakdownModalType: null }),
  }));

const useAddCommentModal = createModalStore();
const useUpdateRequestModal = createModalStore();
const useAddNewApartmentModal = createModalStore();
const useEditFlatModal = createModalStore();
const useAddAndEditBreakDownModal = createModalStore();
const useSuccessModal = createModalStore()

export {
  useAddCommentModal,
  useUpdateRequestModal,
  useAddNewApartmentModal,
  useEditFlatModal,
  useAddAndEditBreakDownModal,
  useSuccessModal
};
