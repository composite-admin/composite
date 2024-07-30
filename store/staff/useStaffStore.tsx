import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

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

interface PrivilegeStore {
  data: any;
  setData: (data: any) => void;
}

export const useStaffPrivilegeStore = create<PrivilegeStore>()(
  devtools(
    persist(
      (set) => ({
        data: null,
        setData: (data: any) => set({ data }),
      }),
      {
        name: "useStaffPrivilegeStore",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
