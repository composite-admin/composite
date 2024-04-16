import axiosInstance from "./index";

  export const getAllRoles = async () => {
    try {
      const response = await axiosInstance.get('/staffs/roles/all');
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
  
  export const getAllStaffByRoles = async (roleType: string) => {
    try {
      const response = await axiosInstance.get(`/staffs/role/all?role=${roleType}`);
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
