import { tabType } from "@/app/(client)/client/project/project-details/[id]/page";
import { create } from "zustand";

export type editType = "information" | "identification" | "password";

interface ClientStore {
  TabType: tabType;
  setTabType: (type: tabType) => void;
  EditType: editType;
  setEditType: (type: editType) => void;
}

const useClientStore = create<ClientStore>((set) => ({
  EditType: "information",
  setEditType: (type) => set({ EditType: type }),
  TabType: "Project Details",
  setTabType: (type) => set({ TabType: type }),
}));

export default useClientStore;
