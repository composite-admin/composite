import { tabType } from "@/app/(client)/client/project/project-details/[id]/page";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type editType = "information" | "identification" | "password"; 

interface ClientStore {
  TabType: tabType;
  setTabType: (type: tabType) => void;
  clientImage: string | null;
  setClientImage: (clientImage: string | null) => void;
  EditType: editType;
  setEditType: (type: editType) => void;
  projectDetails: any;
  setProjectDetails: (projectDetails: any) => void;
}

const useClientStore = create<ClientStore>()(
  devtools(
    persist(
      (set) => ({
        TabType: "Project Details",
        setTabType: (type) => set({ TabType: type }),
        EditType: "information",
        setEditType: (type) => set({ EditType: type }),
        projectDetails: {},
        clientImage: null,
        setClientImage: (clientImage) => set({ clientImage }),
        setProjectDetails: (projectDetails) => set({ projectDetails }),
      }),
      {
        name: "client-store",
      }
    )
  )
);

export default useClientStore;

type currentModal = "add images" | "add comment" | null;

interface ClientStoreModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  modalType: currentModal;
  setModalType: (type: currentModal) => void;
}

export const useClientStoreModal = create<ClientStoreModal>()((set) => ({
  modalType: null,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setModalType: (type) => set({ modalType: type }),
}));