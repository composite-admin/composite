import axiosInstance from "..";
import axios from "axios";
import { IAddToolsAndMachineryData, ApiResponse, ID, IUpdateToolAndMachineryData } from "@/utils/types";

const logErr = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    console.log(error.response.data);
  }
};

export const createTool = async <T = any>(data: IAddToolsAndMachineryData) => {
  try {
    const response = await axiosInstance.post<ApiResponse<T>>("/suppliers/tools/machinery", data);
    return response.data.data;
  } catch (error) {
    logErr(error);
  }
};

export const getAllTools = async <T = any>() => {
  try {
    const response = await axiosInstance.get<ApiResponse<T>>("/suppliers/tools/machinery");
    return response.data.data;
  } catch (error) {
    logErr(error);
  }
};

export const getToolById = async <T = any>(id: ID) => {
  try {
    const response = await axiosInstance.get<ApiResponse<T>>(`/suppliers/tools/machinery/${id}`);
    return response.data.data;
  } catch (error) {
    logErr(error);
  }
};

export const updateTool = async <T = any>(id: ID, data: IUpdateToolAndMachineryData) => {
  try {
    const response = await axiosInstance.put<ApiResponse<T>>(`/tools/machinery/${id}`);
    return response.data.data;
  } catch (error) {
    logErr(error);
  }
};

export const deleteTool = async <T = any>(id: ID) => {
  try {
    const response = await axiosInstance.put<ApiResponse<T>>(`/suppliers/tools/machinery/${id}`);
    return response.data;
  } catch (error) {
    logErr(error);
  }
};

// MATERIAL TYPES=========================
export const getMaterialTypes = async <T = any>() => {
  try {
    const response = await axiosInstance.get<ApiResponse<T>>(`/suppliers-materials/types/all`);
    return response.data.data;
  } catch (error) {
    logErr(error);
  }
};

export const getMaterialSubTypes = async <T = any>(id: ID) => {
  try {
    const response = await axiosInstance.get<ApiResponse<T>>(`/suppliers-materials/sub-type/${id}`);
    return response.data.data;
  } catch (error) {
    logErr(error);
  }
};

export const getMaterialDescription = async <T = any>(subType: string) => {
  try {
    const response = await axiosInstance.get<ApiResponse<T>>(
      `/suppliers-materials/type/description?materialSubType=${subType}`
    );
    return response.data.data;
  } catch (error) {
    logErr(error);
  }
};
