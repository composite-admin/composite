import { api } from '@/config/api';
import { useGetEachinventory } from '@/store/inventory/InventoryStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useUpdateEachInventoryData = () => {

    const { mutate, isSuccess, isError, error } = useMutation({
        mutationFn: async (data: any) => {
            try {
                const response = await api.put(`/inventory/${data.inventory_id}`, data);
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
            console.log(data);
        },
        onError: (error: Error) => {
            return error;
        }
    });

    return { update: mutate, isSuccess, isError, error };
};

export default useUpdateEachInventoryData;
