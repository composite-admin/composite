import { create } from "zustand";
import { ApiResponse, IRequestData } from "@/utils/types";
import { api } from "@/config/api";
import axios from "axios";

export type RequestStatus =
  | "all_requests"
  | "pending"
  | "approved"
  | "declined"
  | null;

interface RequestStore {
  request: IRequestData[] | null;
  requestDetails: IRequestData | null;
  currentTable: RequestStatus;
  setCurrentTable: (currentTable: RequestStatus) => void;
  setRequestDetails: (requestDetails: IRequestData) => void;
  setRequest: (request: IRequestData[]) => void;
}

export const useRequestStore = create<RequestStore>((set) => ({
  request: null,
  requestDetails: null,
  currentTable: null,
  setCurrentTable: (currentTable) => set({ currentTable }),
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

export type RequestType = "Material" | "Labour" | "Cash Advance Project" | "Cash Advance Office" | "Tools and Machine Buy" | "Tools and Machine Rent" | "Tools and Machine Store" | null; 
interface UpdateRequestStoreState {
  formType: RequestType | null;
  formDetails: IRequestData | null;
  isEdit: boolean;
  isDelete: boolean;
  setIsDelete: (isDelete: boolean) => void;
  setIsEdit: (isEdit: boolean) => void;
  setFormDetails: (type: IRequestData) => void;
  setFormType: (type: RequestType) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useUpdateRequestStore = create<UpdateRequestStoreState>((set) => ({
  isOpen: false,
  formType: null,
  formDetails: null,
  isEdit: false,
  isDelete: false,
  setIsDelete: (isDelete) => set({ isDelete }),
  setIsEdit: (isEdit) => set({ isEdit }),
  setFormDetails: (type) => set({ formDetails: type }),
  setFormType: (type) => set({ formType: type }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));