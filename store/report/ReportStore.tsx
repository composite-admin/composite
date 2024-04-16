import { create } from "zustand";

interface ReportData {
  reportData: any;
  setData: (reportData: any) => void;
  clearData: () => void;
}

const useGetAllReport = create<ReportData>((set: any) => ({
  reportData: null,
  setData: (reportData: any) => set({ reportData }),
  clearData: () => set({ reportData: null }),
}));

export const useGetEachReport : any = create((set: any) => ({
  singleReportData: {},
  setSingleReportData: (singleReportData: any) => set({ singleReportData }),
  clearData: () => set({ singleReportData: {} }),
}));

export const useGetNewReport : any = create((set: any) => ({
  newReport: {},
  setNewReport: (newReport: any) => set({ newReport }),
  clearData: () => set({ newReport: {} }),
}));
  
  export default useGetAllReport;