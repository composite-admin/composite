import { create } from "zustand";

const useGetAllInventory : any = create((set: any) => ({
    inventoryData: null,
    setData: (inventoryData: any) => set({ inventoryData }),
    clearData: () => set({ inventoryData: null }),
  }));

export const useGetEachinventory : any = create((set: any) => ({
  singleInventoryData: null,
  setSingleInventoryData: (singleInventoryData: any) => set({ singleInventoryData }),
  clearData: () => set({ singleInventoryData: null }),
}));
  
  export default useGetAllInventory;