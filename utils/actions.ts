import { redirect } from "next/navigation";
import axios from "axios";
import { api } from "@/config/api";
import {
  ApiResponse,
  IClientData,
  IFlatData,
  ITenantData,
  ITenantDetails,
} from "./types";

export async function getAllClients(): Promise<IClientData[] | null> {
  try {
    const response = await api.get<ApiResponse<IClientData[]>>("/clients");
    return response.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllTenants() {
  try {
    const response = await api.get<ApiResponse<ITenantData[]>>("/tenants");
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
}

export async function getAllFlats() {
  try {
    const response = await api.get<ApiResponse<IFlatData[]>>("/project-flats");
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
}

export async function getTenantDetails(id: number) {
  try {
    const response = await api.get<ITenantDetails>(`/tenants/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
}


