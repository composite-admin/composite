import axiosInstance from "..";
import axios from "axios";
import { ApiResponse, ID } from "@/utils/types";
import { AddToolData, UpdateToolData } from "@/store/actions/materials-and-tools/types";

const logErr = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    console.log(error.response.data);
  }
};

export const createTool = async <T = any>(data: AddToolData) => {
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

export const updateTool = async <T = any>(id: ID, data: UpdateToolData) => {
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
