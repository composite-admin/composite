import { create } from "zustand";

export type breakdownModal = "add" | "edit" | null;
export type addToProjectFormType = "consultant" | "client" | null;

export type EditModalAction = {
  edit: (action: string) => void;
};

interface ModalStoreState {
  isOpen: boolean;
  onOpen: () => void;
  setProjectCode: (projectCode: string) => void;
  projectCode: string;
  onClose: () => void;
  breakdownModalType?: breakdownModal;
  addToProjectFormType?: addToProjectFormType;
  setAddToProjectFormType: (type: addToProjectFormType) => void;
  action: string;
  setStaffID: (staffID: string) => void;
  staffID: string;
  setAction: (action: string) => void;
  setBreakdownModalType: (type: "add" | "edit" | null) => void;
}

export const createModalStore = () =>
  create<ModalStoreState>((set) => ({
    projectCode: "",
    setProjectCode: (projectCode) => set({ projectCode }),
    isOpen: false,
    breakdownModalType: null,
    staffID: "",
    setStaffID: (staffID) => set({ staffID }),
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
const useSuccessModal = createModalStore();
const useAddToProjectModal = createModalStore();
const useIdModal = createModalStore();
const useChangePasswordModal = createModalStore();
const useAddPrivilegeModal = createModalStore();

export {
  useChangePasswordModal,
  useIdModal,
  useAddPrivilegeModal,
  useAddCommentModal,
  useUpdateRequestModal,
  useAddNewApartmentModal,
  useEditFlatModal,
  useAddAndEditBreakDownModal,
  useSuccessModal,
  useAddToProjectModal,
};
