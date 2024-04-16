import { create } from "zustand";

interface IProjectStore {
  teamMemberData: [] | null;
  setTeamMemberData: (data: any) => void;
}

export const useProjectStore = create<IProjectStore>((set) => ({
  teamMemberData: [],
  setTeamMemberData: (data: any) => set({ teamMemberData: data }),
}));
