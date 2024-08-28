import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type currentModal =
  | "add_startup_cost"
  | "add_management_cost"
  | "add_stakeholder"
  | "add_material"
  | "add_consultant"
  | "add_contractor"
  | "add_management_member";

interface ModalStoreState {
  projectName: string;
  projectCode: string;
  flatProjectCode: string;
  setFlatProjectCode: (projectCode: string) => void;
  projectId: number | null;
  isOpen: boolean;
  currentModal: currentModal;
  onOpen: () => void;
  setProjectName: (
    projectName: string,
    projectCode: string,
    projectId: number
  ) => void;
  setCurrentModal: (currentModal: currentModal) => void;
  onClose: () => void;
}

export const useProjectDetailsPageFormModal = create<ModalStoreState>(
  (set) => ({
    isOpen: false,
    setFlatProjectCode: (flatProjectCode) =>
      set({ flatProjectCode: flatProjectCode }),
    flatProjectCode: "",
    projectName: "",
    projectId: null,
    currentModal: "add_startup_cost",
    projectCode: "",
    setCurrentModal: (currentModal) => set({ currentModal, isOpen: true }),
    setProjectName: (projectName, projectCode, projectId) =>
      set({ projectName, projectCode, projectId }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

interface ProjectDetails {
  projectName: string;
  projectCode: string;
  projectId: number | null;
  setProjectName: (
    projectName: string,
    projectCode: string,
    projectId: number
  ) => void;
}

export const useProjectDetails = create<ProjectDetails>()(
  devtools(
    persist(
      (set) => ({
        projectName: "",
        projectCode: "",
        projectId: null,
        setProjectName: (projectName, projectCode, projectId) =>
          set({ projectName, projectCode, projectId }),
      }),
      {
        name: "project-details",
      }
    )
  )
);


