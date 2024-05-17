import { create } from "zustand";

export type FormType =
  | "Cash Advance Project"
  | "Material"
  | "Tools and Machinery Buy"
  | "Tools and Machinery Store"
  | "Tools and Machinery Rent"
  | "Cash Advance Office"
  | "labour";
interface StaffStore {
  formType: FormType;
  setFormType: (type: FormType) => void;
}

const useStaffStore = create<StaffStore>((set) => ({
  formType: "Cash Advance Project",
  setFormType: (type) => set({ formType: type }),
}));

export default useStaffStore;
