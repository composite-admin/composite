import {create} from 'zustand';
import { getAllInventoryTypes, getInventoryByType } from '../../api/inventoryRequests';

export interface InventoryStoreState {
  items: object[];
  selectedItem: object | null;
  error: string | null;
}

// Define the type for your actions
export interface InventoryStoreActions {
  selectedItem: object;
  setItems: (items: any) => void;
  setSelectedItem: (selectedItem: any) => void;
  setError: (error: any) => void;
  getAllInventoryTypes: () => void;
  getInventoryByType: (type: string) => void;
}

// Define the type for your store combining state and actions
export type InventoryStore = InventoryStoreState & InventoryStoreActions;

const useStore = create<InventoryStore>((set) => ({
  items: [],
  selectedItem: {},
  error: null,

  setItems: (items: any) => set({ items }),
  setSelectedItem: (selectedItem: any) => set({ selectedItem }),
  setError: (error: any) => set({ error }),


  getAllInventoryTypes: async () => {
    try {
      const items = await getAllInventoryTypes();
      set({ items });
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  getInventoryByType: async (type: string) => {
    try {
      const item = await getInventoryByType(type);
      set({ selectedItem: item.data });
      return item.data
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  }
}));

export default useStore;
