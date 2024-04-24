import { create } from "zustand";

interface TeamMember {
  userid: string;
  firstname: string;
  middlename: string;
  lastname: string;
}

interface IProjectStore {
  teamMemberData: TeamMember[] | null;
  setTeamMemberData: (data: any) => void;
}

export const useProjectStore = create<IProjectStore>((set) => ({
  teamMemberData: [],
  setTeamMemberData: (data: any) => set({ teamMemberData: data }),
}));


interface IInventoryStore {
  toolData: [] | null;
  setToolData: (data: any) => void;
}

export const useInventoryStore = create<IInventoryStore>((set) => ({
  toolData: [],
  setToolData: (data: any) => set({ toolData: data }),
}));