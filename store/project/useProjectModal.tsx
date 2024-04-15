import { create } from "zustand";

type currentModal =
  | "add_startup_cost"
  | "add_management_cost"
  | "add_stakeholder"
  | "add_worker"
  | "add_material"
  | "add_contractor";

interface ModalStoreState {
  isOpen: boolean;
  currentModal: currentModal;
  setCurrentModal: (currentModal: currentModal) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useProjectDetailsPageFormModal = create<ModalStoreState>(
  (set) => ({
    isOpen: false,
    currentModal: "add_startup_cost",
    setCurrentModal: (currentModal) => set({ currentModal, isOpen: true }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
