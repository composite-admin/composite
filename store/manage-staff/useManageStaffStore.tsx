import { create } from "zustand";
import { IManageStaffData } from "@/utils/types";

interface ManageStaffStore {
  staffData: IManageStaffData[] | null;
  staffDetails: IManageStaffData | null;
  setStaffDetails: (staffDetails: IManageStaffData) => void;
  setStaffData: (staffData: IManageStaffData[]) => void;
}

const useManageStaffStore = create<ManageStaffStore>((set) => ({
  staffData: null,
  staffDetails: null,
  setStaffDetails: (staffDetails: IManageStaffData) => set({ staffDetails }),
  setStaffData: (staffData: IManageStaffData[]) => set({ staffData }),
}));

export default useManageStaffStore;
