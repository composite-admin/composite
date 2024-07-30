import { api } from '@/config/api';
import useGetAllInventory from '@/store/inventory/InventoryStore';
import useGetAllReport from '@/store/report/ReportStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useFetchInventoryData = () => {
    const {setData} = useGetAllInventory()
    const { mutate, isSuccess, isError, error } = useMutation({
      mutationFn: async () => {
        try {
          const response = await api.get("/inventory");
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
        setData(data);
      },
      onError: (error: Error) => {
        return error;
      },
    });

    return { action: mutate, isSuccess, isError, error };
};

export default useFetchInventoryData;
