import { create } from "zustand";

export type CashAdvanceTables =
  | "advances"
  | "retirement"
  | "approved"
  | "pending"
  | null;

interface TableStoreState {
  cashAdvanceTableState?: CashAdvanceTables;
  setTableType: (type: CashAdvanceTables) => void;
}

export const createTableStore = () =>
  create<TableStoreState>((set) => ({
    cashAdvanceTableState: 'advances',
    setTableType: (type) => set({ cashAdvanceTableState: type }),
  }));

const cashAdvanceTablesStore = createTableStore();

export { cashAdvanceTablesStore };
