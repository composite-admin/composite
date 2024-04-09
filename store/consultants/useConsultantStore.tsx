import { create } from "zustand";
import { ApiResponse, IConsultantData } from "@/utils/types";
import { api } from "@/config/api";
import axios from "axios";

interface ConsultantStore {
  consultantsData: IConsultantData[] | null;
  setConsultantData: (data: IConsultantData[] | null) => void;
}

const useConsultantStore = create<ConsultantStore>((set) => ({
  consultantsData: null,
  setConsultantData: (data) => set({ consultantsData: data }),
}));

export default useConsultantStore;

export const getAllConsultantData = async () => {
  try {
    const response = await api.get<ApiResponse<IConsultantData[]>>(
      "/consultants"
    );
    useConsultantStore.setState({ consultantsData: response.data.data });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};