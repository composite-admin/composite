import { create } from "zustand";
import { IClientData, IClientDetails } from "@/utils/types";

interface ManageClientStore {
  clientData: IClientData[] | null;
  tableData: any;
  clientDetailsData: IClientDetails | null;
  setClientDetailsData: (clientDetailsData: IClientDetails | null) => void;
  setClientData: (clientData: IClientData[]) => void;
  setTableData: (tableData: IClientData[]) => void;
}

const useManageClientStore = create<ManageClientStore>((set) => ({
  clientDetailsData: null,
  setClientDetailsData: (clientDetailsData: IClientDetails | null) =>
    set({ clientDetailsData }),
  tableData: null,
  clientData: null,
  setClientData: (clientData: IClientData[]) => set({ clientData }),
  setTableData: (tableData: IClientData[]) => set({ tableData }),
}));

export default useManageClientStore;
