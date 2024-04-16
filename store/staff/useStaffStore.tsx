import { create } from "zustand";

export type FormType =
  | "Cash Advance Project"
  | "Material"
  | "Tools and Machine Buy"
  | "Tools and Machine Store"
  | "Tools and Machine Rent"
  | "Cash Advance Office"
  | "Labour";
interface StaffStore {
  formType: FormType;
  setFormType: (type: FormType) => void;
}

const useStaffStore = create<StaffStore>((set) => ({
  formType: "Cash Advance Project",
  setFormType: (type) => set({ formType: type }),
}));

export default useStaffStore;
