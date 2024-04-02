import axiosInstance from "./index";

export const createContractor = async (data:any) => {
    try {
      const response = await axiosInstance.post('/contractors', data);
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
  
  export const getAllContractors = async () => {
    try {
      const response = await axiosInstance.get('/contractors');
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
  
  export const getContractorById = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/contractors/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
  
  export const updateContractor = async (id: number, data: any) => {
    try {
      const response = await axiosInstance.put(`/contractors/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
  
  export const deleteContractor = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/contractors/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };