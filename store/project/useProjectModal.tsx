import { create } from "zustand";

type currentModal =
  | "add_startup_cost"
  | "add_management_cost"
  | "add_stakeholder"
  | "add_material"
  | "add_consultant"
  | "add_contractor";

interface ModalStoreState {
  projectName: string;
  projectCode: string;
  isOpen: boolean;
  currentModal: currentModal;
  onOpen: () => void;
  setProjectName: (projectName: string, projectCode: string) => void;
  setCurrentModal: (currentModal: currentModal) => void;
  onClose: () => void;
}

export const useProjectDetailsPageFormModal = create<ModalStoreState>(
  (set) => ({
    isOpen: false,
    projectName: "",
    currentModal: "add_startup_cost",
    projectCode: "",
    setCurrentModal: (currentModal) => set({ currentModal, isOpen: true }),
    setProjectName: (projectName, projectCode) =>
      set({ projectName, projectCode }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
