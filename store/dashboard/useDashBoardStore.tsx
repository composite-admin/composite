import { IProjectData } from "@/utils/types";
import { create } from "zustand";

interface DashBoardStore {
  projectData: IProjectData[] | null;
  setProjectData: (data: IProjectData[]) => void;
}

const useDashBoardStore = create<DashBoardStore>((set) => ({
  projectData: null,
  setProjectData: (data: IProjectData[]) => set({ projectData: data }),
}));

export default useDashBoardStore;
