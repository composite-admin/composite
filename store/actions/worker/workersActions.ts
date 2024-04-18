import { create } from "zustand";
import { createWorker, getAllWorkers, getWorkerById, updateWorker, deleteWorker } from "@/api/worker/workersRequests";
import { ID, IWorkerData } from "@/utils/types";

export interface WorkersStoreState {
  workers: IWorkerData[];
  worker: IWorkerData | null;
  error: string | null;

  // loading
  fetching?: boolean;
}

// Define the type for your actions
export interface WorkersStoreActions {
  setWorkers: (items: IWorkerData[]) => void;
  setSingleWorker: (selectedItem: IWorkerData) => void;
  setError: (error: any) => void;
  createWorker: (data: any) => void;
  getAllWorkers: () => void;
  getWorkerById: (id: ID) => void;
  updateWorker: (id: ID, data: any) => void;
}

// Define the type for your store combining state and actions
export type WorkersStore = WorkersStoreState & WorkersStoreActions;

const useWorkersActionsStore = create<WorkersStore>((set) => ({
  workers: [],
  worker: null,
  error: null,
  fetching: true,

  setWorkers: (items) => set((state) => ({ ...state, workers: items })),
  setSingleWorker: (selectedItem) => set((state) => ({ ...state, worker: selectedItem })),
  setError: (error: any) => set({ error }),

  createWorker: async (data: any) => {
    try {
      const newItem = await createWorker(data);
      set((state: any) => ({ workers: [...state.items, newItem] }));
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  getAllWorkers: async () => {
    set((state) => ({ ...state, fetching: true }));

    try {
      const items = await getAllWorkers();
      set({ workers: items });
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
      set({ worker: item });

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
        workers: state.items.map((item: any) => (item.id === id ? updatedItem : item)),
        worker: updatedItem.id === state.selectedItem?.id ? updatedItem : state.selectedItem,
      }));
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },

  deleteWorker: async (id: number) => {
    try {
      await deleteWorker(id);
      set((state: any) => ({
        workers: state.items.filter((item: any) => item.id !== id),
        worker: state.selectedItem && state.selectedItem.id === id ? null : state.selectedItem,
      }));
    } catch (error) {
      set((state: any) => ({ error: "" }));
    }
  },
}));

export default useWorkersActionsStore;
