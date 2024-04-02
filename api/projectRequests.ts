import axiosInstance from "./index";

export const createProject = async (data:any) => {
    try {
      const response = await axiosInstance.post('/projects', data);
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
  
  export const getAllProjects = async () => {
    try {
      const response = await axiosInstance.get('/projects');
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
  
  export const getProjectById = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/projects/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
  
  export const updateProject = async (id: number, data: any) => {
    try {
      const response = await axiosInstance.put(`/projects/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };
  
  export const deleteProject = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/projects/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error("");
    }
  };