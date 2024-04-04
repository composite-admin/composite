import { create } from "zustand";
import { ITenantData, IFlatData } from "@/utils/types";

interface FacilityStore {
  tenantData: ITenantData[] | null;
  setTenantData: (tenantData: ITenantData[]) => void;
}

const useFacilityStore = create<FacilityStore>((set) => ({
  tenantData: null,
  setTenantData: (tenantData: ITenantData[]) => set({ tenantData }),
}));

export default useFacilityStore;
