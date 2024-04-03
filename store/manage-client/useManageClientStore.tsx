import { create } from "zustand";
import { IClientData, ApiResponse } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";

interface ManageClientStore {
  clientData: IClientData[] | null;
  tableData: any;
  setClientData: (clientData: IClientData[]) => void;
  setTableData: (tableData: IClientData[]) => void;
}

const useManageClientStore = create<ManageClientStore>((set) => ({
  tableData: null,
  clientData: null,
  setClientData: (clientData: IClientData[]) => set({ clientData }),
  setTableData: (tableData: IClientData[]) => set({ tableData }),
}));

export default useManageClientStore;
