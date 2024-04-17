import { create } from "zustand";
import {
  createSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
} from "../../api/suppliers-and-tools/suppliersRequests";
import { ID, ISupplierData } from "@/utils/types";

export interface SuppliersStoreState {
  items: ISupplierData[];
  selectedItem: ISupplierData | null;
  error: string | null;

  // REQUEST
  requestLoading: boolean;
}

// Define the type for your actions
export interface SuppliersStoreActions {
  setItems: (items: any) => void;
  setSelectedItem: (selectedItem: any) => void;
  setError: (error: any) => void;
  createSupplier: (data: any) => void;
  getAllSuppliers: () => void;
  getSupplierById: (id: ID) => void;
  updateSupplier: (id: ID, data: any) => void;
  deleteSupplier: (id: ID) => void;
}

// Define the type for your store combining state and actions
export type SuppliersStore = SuppliersStoreState & SuppliersStoreActions;

const useStore = create<SuppliersStore>((set) => ({
  items: [],
  selectedItem: null,
  error: null,
  requestLoading: false,

  setItems: (items: any) => set({ items }),
  setSelectedItem: (selectedItem: any) => set({ selectedItem }),
  setError: (error: any) => set({ error }),

  createSupplier: async (data: any) => {
    try {
      const newItem = await createSupplier(data);
      set((state) => ({ items: [...state.items, newItem] }));
    } catch (error) {
      set((state) => ({ error: "" }));
    }
  },

  getAllSuppliers: async () => {
    set((state) => ({ ...state, requestLoading: true }));

    try {
      const items = await getAllSuppliers();
      set({ items });
    } catch (error) {
      set((state) => ({ error: "" }));
    } finally {
      set((state) => ({ ...state, requestLoading: false }));
    }
  },

  getSupplierById: async (id) => {
    set((state) => ({ ...state, requestLoading: true }));

    try {
      const item = await getSupplierById(id);
      set({ selectedItem: item.data });
    } catch (error) {
      set((state) => ({ error: "" }));
    } finally {
      set((state) => ({ ...state, requestLoading: false }));
    }
  },

  updateSupplier: async (id, data: any) => {
    try {
      const updatedItem = await updateSupplier(id, data);
      set((state) => ({
        items: state.items.map((item: any) => (item.id === id ? updatedItem : item)),
        selectedItem: updatedItem.id === state.selectedItem?.id ? updatedItem : state.selectedItem,
      }));
    } catch (error) {
      set((state) => ({ error: "" }));
    }
  },

  deleteSupplier: async (id) => {
    try {
      await deleteSupplier(id);
      set((state) => ({
        items: state.items.filter((item: any) => item.id !== id),
        selectedItem: state.selectedItem && state.selectedItem.id === id ? null : state.selectedItem,
      }));
    } catch (error) {
      set((state) => ({ error: "" }));
    }
  },
}));

export default useStore;
