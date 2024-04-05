import { create } from "zustand";
import { IManageStaffData } from "@/utils/types";

interface ManageStaffStore {
  staffData: IManageStaffData[] | null;
  setStaffData: (staffData: IManageStaffData[]) => void;
}

const useManageStaffStore = create<ManageStaffStore>((set) => ({
  staffData: null,
  setStaffData: (staffData: IManageStaffData[]) => set({ staffData }),
}));

export default useManageStaffStore;
