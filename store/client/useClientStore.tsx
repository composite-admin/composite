import { tabType } from "@/app/(client)/client/project/project-details/[id]/page";
import { create } from "zustand";

interface ClientStore {
  TabType: tabType;
  setTabType: (type: tabType) => void;
}

const useClientStore = create<ClientStore>((set) => ({
  TabType: "Project Details",
  setTabType: (type) => set({ TabType: type }),
}));

export default useClientStore;
