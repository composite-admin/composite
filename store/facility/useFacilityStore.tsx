import { create } from "zustand";
import { ITenantData, IFlatData } from "@/utils/types";

interface FacilityStore {
  tenantData: ITenantData[] | null;
  flatData: IFlatData[] | null;
  setFlatData: (flatData: IFlatData[]) => void;
  setTenantData: (tenantData: ITenantData[]) => void;
}

const useFacilityStore = create<FacilityStore>((set) => ({
  tenantData: null,
  flatData: null,
  setFlatData: (flatData: IFlatData[]) => set({ flatData }),
  setTenantData: (tenantData: ITenantData[]) => set({ tenantData }),
}));

export default useFacilityStore;
