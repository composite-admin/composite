import { create } from "zustand";
import { ICashAdvanceData } from "@/utils/types";

interface CashAdvanceStore {
  cashAdvanceData: ICashAdvanceData[] | null;
  setCashAdvanceData: (cashAdvanceData: ICashAdvanceData[]) => void;
}

const useCashAdvanceStore = create<CashAdvanceStore>((set) => ({
  cashAdvanceData: null,
  setCashAdvanceData: (cashAdvanceData: ICashAdvanceData[]) =>
    set({ cashAdvanceData }),
}));

export default useCashAdvanceStore;
