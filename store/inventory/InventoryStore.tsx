import { create } from "zustand";

const useGetAllInventory : any = create((set: any) => ({
    inventoryData: null,
    setData: (inventoryData: any) => set({ inventoryData }),
    clearData: () => set({ inventoryData: null }),
  }));

export const useGetEachinventory : any = create((set: any) => ({
  singleinventoryData: null,
  setSingleinventoryData: (singleinventoryData: any) => set({ singleinventoryData }),
  clearData: () => set({ singleinventoryData: null }),
}));
  
  export default useGetAllInventory;