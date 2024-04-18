import { create } from "zustand";
import {
  createWorker,
  getAllWorkerJobs,
  getWorkerJobsById,
  updateWorkerJob,
  deleteWorkerJob,
} from "@/api/worker/workersJobRequests";
import { ID, IWorkerJobCreateData, IWorkerJobData, IWorkerJobUpdateData } from "@/utils/types";

export interface WorkersStoreState {
  workerJobs: IWorkerJobData[];
  job: IWorkerJobData | null;
  error: string | null;

  // loading
  fetching?: boolean;
}

// Define the type for your actions
export interface WorkersStoreActions {
  getJobs: (items: IWorkerJobData[]) => void;
  setSingleJob: (job: IWorkerJobData) => void;
  setError: (error: any) => void;
  createWorkerJob: (data: IWorkerJobCreateData) => void;
  getAllWorkerJobs: () => void;
  getWorkerJobById: (id: ID) => void;
  updateWorkerJob: (id: ID, data: IWorkerJobUpdateData) => void;
  deleteWorker: (id: ID) => void;
}

// Define the type for your store combining state and actions
export type WorkersStore = WorkersStoreState & WorkersStoreActions;

const useWorkerJobsStore = create<WorkersStore>((set) => ({
  workerJobs: [],
  job: null,
  error: null,
  fetching: false,

  getJobs: (workerJobs) => set((state) => ({ ...state, workerJobs })),
  setSingleJob: (job) => set((state) => ({ ...state, job })),
  setError: (error: any) => set({ error }),

  createWorkerJob: async (data: IWorkerJobCreateData) => {
    try {
      const newItem = await createWorker(data);
      set((state) => ({ workerJobs: [...state.workerJobs, newItem] }));
    } catch (error) {
      set((state) => ({ ...state, error: "" }));
    }
  },

  getAllWorkerJobs: async () => {
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

  getWorkerJobById: async (id) => {
    set((state) => ({ ...state, fetching: true }));

    try {
      const job = await getWorkerJobsById(id);
      set((state) => ({ ...state, job: job }));
    } catch (error) {
      set((state) => ({ ...state, error: "" }));
    } finally {
      set((state) => ({ ...state, fetching: false }));
    }
  },

  updateWorkerJob: async (id, data) => {
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

  deleteWorker: async (id) => {
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

export default useWorkerJobsStore;
