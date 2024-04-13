import { api } from '@/config/api';
import useGetAllReport from '@/store/report/ReportStore';
import { ApiResponse, IProjectReport } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useFetchReportData = () => {
  const { setData } = useGetAllReport();
  const { mutate, isSuccess, isError, error } = useMutation({
    mutationFn: async () => {
      try {
        const response = await api.get<ApiResponse<IProjectReport>>(
          "/project_report"
        );
        return response.data.data;
      } catch (err) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    onSuccess: (data) => {
      console.log(data);
      setData(data);
    },
    onError: (error: Error) => {
      return error;
    },
  });

  return { response: mutate, isSuccess, isError, error };
};

export default useFetchReportData;
