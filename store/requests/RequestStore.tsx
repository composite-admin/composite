import { create } from "zustand";
import { ApiResponse, IRequestData } from "@/utils/types";
import { api } from "@/config/api";
import axios from "axios";

interface RequestStore {
  request: IRequestData[] | null;
  requestDetails: IRequestData | null;
  setRequestDetails: (requestDetails: IRequestData) => void;
  setRequest: (request: IRequestData[]) => void;
}

export const useRequestStore = create<RequestStore>((set) => ({
  request: null,
  requestDetails: null,
  setRequestDetails: (requestDetails) => set({ requestDetails }),
  setRequest: (request) => set({ request }),
}));

export const getAllrequest = async () => {
  try {
    const response = await api.get<ApiResponse<IRequestData[]>>("/requests");
    useRequestStore.setState({ request: response.data.data });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

export const getrequestById = async (id: number | string) => {
  try {
    const response = await api.get<ApiResponse<IRequestData>>(
      `/requests/${id}`
    );
    useRequestStore.setState({ requestDetails: response.data.data });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};
