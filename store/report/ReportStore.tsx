import { create } from "zustand";

const useGetAllReport : any = create((set: any) => ({
    reportData: null,
    setData: (reportData: any) => set({ reportData }),
    clearData: () => set({ reportData: null }),
  }));

export const useGetEachReport : any = create((set: any) => ({
  singleReportData: null,
  setSingleReportData: (singleReportData: any) => set({ singleReportData }),
  clearData: () => set({ singleReportData: null }),
}));

export const useGetNewReport : any = create((set: any) => ({
  newReport: {},
  setNewReport: (newReport: any) => set({ newReport }),
  clearData: () => set({ newReport: {} }),
}));
  
  export default useGetAllReport;