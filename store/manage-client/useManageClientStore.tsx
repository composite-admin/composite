import { create } from "zustand";
import { IClientData } from "@/utils/types";

interface ManageClientStore {
  clientData: IClientData[] | null;
  tableData: any;
  clientDetailsData: IClientData | null;
  setClientDetailsData: (clientDetailsData: IClientData | null) => void;
  setClientData: (clientData: IClientData[]) => void;
  setTableData: (tableData: IClientData[]) => void;
}

const useManageClientStore = create<ManageClientStore>((set) => ({
  clientDetailsData: null,
  setClientDetailsData: (clientDetailsData: IClientData | null) =>
    set({ clientDetailsData }),
  tableData: null,
  clientData: null,
  setClientData: (clientData: IClientData[]) => set({ clientData }),
  setTableData: (tableData: IClientData[]) => set({ tableData }),
}));

export default useManageClientStore;
