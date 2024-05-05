import { ICashAdvanceData } from "@/utils/types";
import { create } from "zustand";

export type CashAdvanceTables =
  | "advances"
  | "retirement"
  | "approved"
  | "pending"
  | null;

interface TableStoreState {
  cashAdvanceData: ICashAdvanceData[] | null;
  cashAdvanceTableData: ICashAdvanceData[] | null;
  setCashAdvanceTableData: (data: ICashAdvanceData[] | null) => void;
  pendingCashAdvanceData: ICashAdvanceData[] | null;
  setPendingCashAvance: (cashAdvancedata: ICashAdvanceData[]) => void;
  setCashAvance: (cashAdvancedata: ICashAdvanceData[]) => void;
  cashAdvanceTableState?: CashAdvanceTables;
  setTableType: (type: CashAdvanceTables) => void;
}

export const createTableStore = () =>
  create<TableStoreState>((set) => ({
    cashAdvanceData: null,
    pendingCashAdvanceData: null,
    cashAdvanceTableData: null,
    setCashAdvanceTableData: (data) => set({ cashAdvanceTableData: data }),
    setPendingCashAvance: (cashAdvancedata) =>
      set({ pendingCashAdvanceData: cashAdvancedata }),
    setCashAvance: (cashAdvancedata) =>
      set({ cashAdvanceData: cashAdvancedata }),
    cashAdvanceTableState: "advances",
    setTableType: (type) => set({ cashAdvanceTableState: type }),
  }));

const cashAdvanceTablesStore = createTableStore();

export { cashAdvanceTablesStore };
