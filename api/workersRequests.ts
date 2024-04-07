import axiosInstance from "./index";

export const createWorker = async (data:any) => {
    try {
      const response = await axiosInstance.post('/worker', data);
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
  
  export const getAllWorkers = async () => {
    try {
      const response = await axiosInstance.get('/worker');
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
  
  export const getWorkerById = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/worker/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
  
  export const updateWorker = async (id: number, data: any) => {
    try {
      const response = await axiosInstance.put(`/worker/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
  
  export const deleteWorker = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/worker/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };