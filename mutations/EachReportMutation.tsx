import { api } from '@/config/api';
import { useGetEachReport } from '@/store/report/ReportStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useFetchEachReportData = () => {
    const {setSingleReportData} = useGetEachReport()
    const { mutate, isSuccess, isError, error } = useMutation({
        mutationFn: async (id) => {
            try {
                const response = await api.get(`/project_report/${id}`);
                return response.data.data;
            }
            catch (err) {
                if (axios.isAxiosError(error) && error.response) {
                    throw new Error(error.response.data.message);
                } else {
                    throw error;
                }
            }
        },
        onSuccess: (data) => {
            console.log(data)
            setSingleReportData(data)
        },
        onError: (error: Error) => {
            return error;
        }
    });

    return { eachReportAction: mutate, isSuccess, isError, error };
};

export default useFetchEachReportData;
