import { create } from "zustand";
import { ITenantData, IFlatData } from "@/utils/types";

interface FacilityStore {
  tenantData: ITenantData[] | null;
  flatData: IFlatData[] | null;
  dueDatesData: ITenantData[] | null;
  setDueDatesData: (dueDatesData: ITenantData[]) => void;
  currentTable: "all_tenants" | "upcoming_due_dates";
  setCurrentTable: (currentTable: "all_tenants" | "upcoming_due_dates") => void;
  setFlatData: (flatData: IFlatData[]) => void;
  setTenantData: (tenantData: ITenantData[]) => void;
}

const useFacilityStore = create<FacilityStore>((set) => ({
  tenantData: null,
  flatData: null,
  currentTable: "all_tenants",
  dueDatesData: null,
  setDueDatesData: (dueDatesData: ITenantData[]) => set({ dueDatesData }),
  setCurrentTable: (currentTable: "all_tenants" | "upcoming_due_dates") =>
    set({ currentTable }),
  setFlatData: (flatData: IFlatData[]) => set({ flatData }),
  setTenantData: (tenantData: ITenantData[]) => set({ tenantData }),
}));

export default useFacilityStore;
