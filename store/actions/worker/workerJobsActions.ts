import { create } from "zustand";
import {
  createWorker,
  getAllWorkerJobs,
  getWorkerJobsById,
  updateWorkerJob,
  deleteWorkerJob,
} from "@/api/worker/workersJobRequests";
import { ID, IWorkerJobCreateData, IWorkerJobData } from "@/utils/types";

export interface WorkersStoreState {
  workerJobs: IWorkerJobData[];
  job: IWorkerJobData | null;
  error: string | null;

  // loading
  fetching?: boolean;
}

// Define the type for your actions
export interface WorkersStoreActions {
  setItems: (items: IWorkerJobData[]) => void;
  setSelectedItem: (job: IWorkerJobData) => void;
  setError: (error: any) => void;
  createWorker: (data: IWorkerJobCreateData) => void;
  getAllWorkers: () => void;
  getWorkerById: (id: ID) => void;
  updateWorker: (id: ID, data: any) => void;
}

// Define the type for your store combining state and actions
export type WorkersStore = WorkersStoreState & WorkersStoreActions;

const useStore = create<WorkersStore>((set) => ({
  workerJobs: [],
  job: null,
  error: null,
  fetching: true,

  setItems: (workerJobs) => set((state) => ({ ...state, workerJobs })),
  setSelectedItem: (job) => set((state) => ({ ...state, job })),
  setError: (error: any) => set({ error }),

  createWorker: async (data: IWorkerJobCreateData) => {
    try {
      const newItem = await createWorker(data);
      set((state) => ({ workerJobs: [...state.workerJobs, newItem] }));
    } catch (error) {
      set((state) => ({ ...state, error: "" }));
    }
  },

  getAllWorkers: async () => {
    set((state) => ({ ...state, fetching: true }));

    try {
      const jobs = await getAllWorkerJobs();
      if (jobs) set({ workerJobs: jobs });
    } catch (error) {
      set((state) => ({ ...state, error: "" }));
    } finally {
      set((state) => ({ ...state, fetching: false }));
    }
  },

  getWorkerById: async (id: ID) => {
    set((state) => ({ ...state, fetching: true }));
    try {
      const item = await getWorkerJobsById(id);
      set((state) => ({ ...state, job: item }));
    } catch (error) {
      set((state) => ({ ...state, error: "" }));
    } finally {
      set((state) => ({ ...state, fetching: false }));
    }
  },

  updateWorker: async (id: ID, data) => {
    try {
      const updatedJob = await updateWorkerJob(id, data);
      set((state) => ({
        ...state,
        workerJobs: state.workerJobs.map((item) => (item.id === id ? updatedJob : item)),
        job: updatedJob.id === state.job?.id ? updatedJob : state.job,
      }));
    } catch (error) {
      set((state) => ({ ...state, error: "" }));
    }
  },

  deleteWorker: async (id: number) => {
    try {
      await deleteWorkerJob(id);
      set((state) => ({
        ...state,
        workerJobs: state.workerJobs.filter((item) => item.id !== id),
        job: state.job && state.job.id === id ? null : state.job,
      }));
    } catch (error) {
      set((state) => ({ ...state, error: "" }));
    }
  },
}));

export default useStore;
