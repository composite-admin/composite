import {create} from 'zustand';
import { createWorker, getAllWorkers, getWorkerById, updateWorker, deleteWorker } from '../../api/workersRequests';

export interface WorkersStoreState {
  items: object[];
  selectedItem: object | null;
  error: string | null;
}

// Define the type for your actions
export interface WorkersStoreActions {
  selectedItem: object;
  setItems: (items: any) => void;
  setSelectedItem: (selectedItem: any) => void;
  setError: (error: any) => void;
  createWorker: (data: any) => void;
  getAllWorkers: () => void;
  getWorkerById: (id: number) => void;
  updateWorker: (id: number, data: any) => void;
}

// Define the type for your store combining state and actions
export type WorkersStore = WorkersStoreState & WorkersStoreActions;

const useStore = create<WorkersStore>((set) => ({
  items: [],
  selectedItem: {},
  error: null,

  setItems: (items: any) => set({ items }),
  setSelectedItem: (selectedItem: any) => set({ selectedItem }),
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
    try {
      const items = await getAllWorkers();
      set({ items });
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  getWorkerById: async (id: number) => {
    try {
      const item = await getWorkerById(id);
      set({ selectedItem: item.data });
      return item.data
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  updateWorker: async (id: number, data: any) => {
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
