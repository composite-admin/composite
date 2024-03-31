import { api } from '@/config/api';
import { useMutation } from '@tanstack/react-query';

const useFetchReportData = () => {
    const { mutate, isPending, isSuccess, isError, error } = useMutation({
        mutationFn: async () => {
            try {
                const response = await api.post("/project_report");
                return response.data;
            }
            catch(err){
                console.log(err)
            }
        },
        onSuccess: (data) => { 
            console.log(data)
        },
        onError: (error: Error) => {
            return error;
         }
    });

    return { response: mutate, isPending, isSuccess, isError, error};
};

export default useFetchReportData;
