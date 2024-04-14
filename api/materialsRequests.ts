import { AddMaterialData, UpdateMaterialData } from "@/store/actions/materials/types";
import axiosInstance from ".";
import axios from "axios";
import { ApiResponse } from "@/utils/types";

const logErr = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    console.log(error.response.data);
  }
};

export const createMaterial = async <T = any>(data: AddMaterialData) => {
  try {
    const response = await axiosInstance.post<ApiResponse<T>>("/suppliers-materials", data);
    return response.data.data;
  } catch (error) {
    logErr(error);
  }
};

export const getAllMaterials = async <T = any>() => {
  try {
    const response = await axiosInstance.get<ApiResponse<T>>("/suppliers-materials");
    return response.data.data;
  } catch (error) {
    logErr(error);
  }
};

export const getMaterialById = async <T = any>(id: number | string) => {
  try {
    const response = await axiosInstance.get<ApiResponse<T>>(`/suppliers-materials/${id}`);
    return response.data.data;
  } catch (error) {
    logErr(error);
  }
};

export const updateMaterial = async <T = any>(id: string | number, data: UpdateMaterialData) => {
  try {
    const response = await axiosInstance.put<ApiResponse<T>>(`/suppliers-materials/${id}`);
    return response.data.data;
  } catch (error) {
    logErr(error);
  }
};

export const deleteMaterial = async <T = any>(id: string | number) => {
  try {
    const response = await axiosInstance.put<ApiResponse<T>>(`/suppliers/materials/${id}`);
    return response.data;
  } catch (error) {
    logErr(error);
  }
};
