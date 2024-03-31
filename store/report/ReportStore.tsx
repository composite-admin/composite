import { create } from "zustand";

const useGetAllReport : any = create((set: any) => ({
    reportData: null,
    setData: (reportData: any) => set({ reportData }),
    clearData: () => set({ reportData: null }),
  }));
  
  export default useGetAllReport;