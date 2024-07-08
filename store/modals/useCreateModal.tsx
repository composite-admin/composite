import { create } from "zustand";

export type breakdownModal = "add" | "edit" | null;
export type addToProjectFormType = "consultant" | "client" | null;

export type EditModalAction = {
  edit: (action: string) => void;
};

interface ModalStoreState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  breakdownModalType?: breakdownModal;
  addToProjectFormType?: addToProjectFormType;
  setAddToProjectFormType: (type: addToProjectFormType) => void;
  action: string;
  setAction: (action: string) => void;
  setBreakdownModalType: (type: "add" | "edit" | null) => void;
}

export const createModalStore = () =>
  create<ModalStoreState>((set) => ({
    isOpen: false,
    breakdownModalType: null,
    action: "",
    setAddToProjectFormType: (type) => set({ addToProjectFormType: type }),
    addToProjectFormType: null,
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
const useAddToProjectModal = createModalStore();
const useIdModal = createModalStore();
const useChangePasswordModal = createModalStore();

export {
  useChangePasswordModal,
  useIdModal,
  useAddCommentModal,
  useUpdateRequestModal,
  useAddNewApartmentModal,
  useEditFlatModal,
  useAddAndEditBreakDownModal,
  useSuccessModal,
  useAddToProjectModal,
};
