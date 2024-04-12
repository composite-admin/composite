import { create } from "zustand";

export type FormType =
  | "cash_advance_project"
  | "material"
  | "tools_and_machine_buy"
  | "tools_and_machine_store"
  | "tools_and_machine_rent"
  | "cash_advance_office"
  | "labour";
interface StaffStore {
  formType: FormType;
  setFormType: (type: FormType) => void;
}

const useStaffStore = create<StaffStore>((set) => ({
  formType: "cash_advance_project",
  setFormType: (type) => set({ formType: type }),
}));

export default useStaffStore;
