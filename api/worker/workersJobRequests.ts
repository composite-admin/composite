import { ApiResponse, ID, IWorkerJobCreateData, IWorkerJobData } from "@/utils/types";
import axiosInstance from "../index";

export const createWorker = async (data: IWorkerJobCreateData) => {
  try {
    const response = await axiosInstance.post("/worker-jobs", data);
    return response.data;
  } catch (error: any) {
    throw new Error("");
  }
};

export const getAllWorkerJobs = async () => {
  try {
    const response = await axiosInstance.get<ApiResponse<IWorkerJobData[]>>("/worker-jobs");
    return response.data.data;
  } catch (error: any) {
    throw new Error("");
  }
};

export const getWorkerJobsById = async (id: ID) => {
  try {
    const response = await axiosInstance.get<ApiResponse<IWorkerJobData>>(`/worker-jobs/${id}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error("");
  }
};

export const updateWorkerJob = async (id: ID, data: any) => {
  try {
    const response = await axiosInstance.put(`/worker-jobs/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error("");
  }
};

export const deleteWorkerJob = async (id: ID) => {
  try {
    const response = await axiosInstance.delete(`/worker-jobs/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error("");
  }
};
