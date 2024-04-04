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
  setCashAvance: (cashAdvancedata: ICashAdvanceData[]) => void;
  cashAdvanceTableState?: CashAdvanceTables;
  setTableType: (type: CashAdvanceTables) => void;
}

export const createTableStore = () =>
  create<TableStoreState>((set) => ({
    cashAdvanceData: null,
    setCashAvance: (cashAdvancedata) =>
      set({ cashAdvanceData: cashAdvancedata }),
    cashAdvanceTableState: "advances",
    setTableType: (type) => set({ cashAdvanceTableState: type }),
  }));

const cashAdvanceTablesStore = createTableStore();

export { cashAdvanceTablesStore };
