import axiosInstance from "./index";

  export const getAllInventoryTypes = async () => {
    try {
      const response = await axiosInstance.get('/inventory/types/all');
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
  
  export const getInventoryByType = async (type: string) => {
    try {
      const response = await axiosInstance.get(`/inventory/type/all?type=${type}`);
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
