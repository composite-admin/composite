import { ID } from "@/utils/types";
import axiosInstance from "../index";

export const createSupplier = async (data: any) => {
  try {
    const response = await axiosInstance.post("/suppliers", data);
    return response.data;
  } catch (error: any) {
    throw new Error("");
  }
};

export const getAllSuppliers = async () => {
  try {
    const response = await axiosInstance.get("/suppliers");
    return response.data;
  } catch (error: any) {
    throw new Error("");
  }
};

export const getSupplierById = async <T = any>(id: ID) => {
  try {
    const response = await axiosInstance.get<T>(`/suppliers/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error("");
  }
};

export const updateSupplier = async (id: ID, data: any) => {
  try {
    const response = await axiosInstance.put(`/suppliers/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error("");
  }
};

export const deleteSupplier = async (id: ID) => {
  try {
    const response = await axiosInstance.delete(`/suppliers/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error("");
  }
};
