import { ApiResponse, ID, IWorkerData } from "@/utils/types";
import axiosInstance from "../index";

export const createWorker = async (data: any) => {
  try {
    const response = await axiosInstance.post("/worker", data);
    return response.data;
  } catch (error: any) {
    throw new Error("");
  }
};

export const getAllWorkers = async () => {
  try {
    const response = await axiosInstance.get<ApiResponse<IWorkerData[]>>("/worker");
    return response.data.data;
  } catch (error: any) {
    throw new Error("");
  }
};

export const getWorkerById = async (id: ID) => {
  try {
    const response = await axiosInstance.get<ApiResponse<IWorkerData>>(`/worker/${id}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error("");
  }
};

export const updateWorker = async (id: ID, data: any) => {
  try {
    const response = await axiosInstance.put(`/worker/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error("");
  }
};

export const deleteWorker = async (id: ID) => {
  try {
    const response = await axiosInstance.delete(`/worker/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error("");
  }
};
