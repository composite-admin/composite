import { create } from "zustand";
import { ICashAdvanceData } from "@/utils/types";

export type CashAdvanceFormTypes = "return" | "refund" | "request" | null;

interface CashAdvanceStore {
  cashAdvanceData: ICashAdvanceData[] | null;
  CashAdvanceDetails: ICashAdvanceData | null;
  currentFormType: CashAdvanceFormTypes;
  setFormTypes: (formTypes: CashAdvanceFormTypes) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setCashAdvanceDetails: (cashAdvanceDetails: ICashAdvanceData | null) => void;
  setCashAdvanceData: (cashAdvanceData: ICashAdvanceData[]) => void;
}

const useCashAdvanceStore = create<CashAdvanceStore>((set) => ({
  cashAdvanceData: null,
  CashAdvanceDetails: null,
  isOpen: false,
  currentFormType: null,
  setFormTypes: (currentFormType: CashAdvanceFormTypes) =>
    set({ currentFormType }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setCashAdvanceDetails: (cashAdvanceDetails: ICashAdvanceData | null) => {
    set({ CashAdvanceDetails: cashAdvanceDetails });
  },
  setCashAdvanceData: (cashAdvanceData: ICashAdvanceData[]) =>
    set({ cashAdvanceData }),
}));

export default useCashAdvanceStore;
