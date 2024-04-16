import { create } from "zustand";
import { createWorker, getAllWorkers, getWorkerById, updateWorker, deleteWorker } from "@/api/worker/workersRequests";
import { ID, IWorkerData } from "@/utils/types";

export interface WorkersStoreState {
  items: IWorkerData[];
  selectedItem: IWorkerData | null;
  error: string | null;

  // loading
  fetching?: boolean;
}

// Define the type for your actions
export interface WorkersStoreActions {
  setItems: (items: IWorkerData[]) => void;
  setSelectedItem: (selectedItem: IWorkerData) => void;
  setError: (error: any) => void;
  createWorker: (data: any) => void;
  getAllWorkers: () => void;
  getWorkerById: (id: ID) => void;
  updateWorker: (id: ID, data: any) => void;
}

// Define the type for your store combining state and actions
export type WorkersStore = WorkersStoreState & WorkersStoreActions;

const useStore = create<WorkersStore>((set) => ({
  items: [],
  selectedItem: null,
  error: null,
  fetching: true,

  setItems: (items) => set((state) => ({ ...state, items })),
  setSelectedItem: (selectedItem) => set((state) => ({ ...state, selectedItem })),
  setError: (error: any) => set({ error }),

  createWorker: async (data: any) => {
    try {
      const newItem = await createWorker(data);
      set((state: any) => ({ items: [...state.items, newItem] }));
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  getAllWorkers: async () => {
    set((state) => ({ ...state, fetching: true }));

    try {
      const items = await getAllWorkers();
      set({ items });
    } catch (error) {
      set((state: any) => ({ error: "" }));
    } finally {
      set((state) => ({ ...state, fetching: false }));
    }
  },

  getWorkerById: async (id: ID) => {
    set((state) => ({ ...state, fetching: true }));
    try {
      const item = await getWorkerById(id);
      set({ selectedItem: item });

      return item;
    } catch (error) {
      set((state: any) => ({ error: "" }));
    } finally {
      set((state) => ({ ...state, fetching: false }));
    }
  },

  updateWorker: async (id: ID, data: any) => {
    try {
      const updatedItem = await updateWorker(id, data);
      set((state: any) => ({
        items: state.items.map((item: any) => (item.id === id ? updatedItem : item)),
        selectedItem: updatedItem.id === state.selectedItem?.id ? updatedItem : state.selectedItem,
      }));
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  deleteWorker: async (id: number) => {
    try {
      await deleteWorker(id);
      set((state: any) => ({
        items: state.items.filter((item: any) => item.id !== id),
        selectedItem: state.selectedItem && state.selectedItem.id === id ? null : state.selectedItem,
      }));
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },
}));

export default useStore;
