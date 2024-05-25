import { create } from "zustand";
import { ITenantData, IFlatData, IDeuDates } from "@/utils/types";

export type FlatFormType = "add" | "edit" | null;

interface FacilityStore {
  flatFormType: FlatFormType;
  setFlatFormType: (type: FlatFormType) => void;
  tenantData: ITenantData[] | null;
  flatData: IFlatData[] | null;
  dueDatesData: IDeuDates[];
  setDueDatesData: (dueDatesData: IDeuDates[]) => void;
  currentTable: "all_tenants" | "upcoming_due_dates";
  setCurrentTable: (currentTable: "all_tenants" | "upcoming_due_dates") => void;
  setFlatData: (flatData: IFlatData[]) => void;
  setTenantData: (tenantData: ITenantData[]) => void;
}

const useFacilityStore = create<FacilityStore>((set) => ({
  tenantData: null,
  flatData: null,
  currentTable: "all_tenants",
  dueDatesData: [],
  flatFormType: null,
  setFlatFormType: (type: FlatFormType) => set({ flatFormType: type }),
  setDueDatesData: (dueDatesData: IDeuDates[]) => set({ dueDatesData }),
  setCurrentTable: (currentTable: "all_tenants" | "upcoming_due_dates") =>
    set({ currentTable }),
  setFlatData: (flatData: IFlatData[]) => set({ flatData }),
  setTenantData: (tenantData: ITenantData[]) => set({ tenantData }),
}));

export default useFacilityStore;
