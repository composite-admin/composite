import { api } from '@/config/api';
import { useGetEachinventory } from '@/store/inventory/InventoryStore';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useFetchEachInventoryData = () => {
    const {setSingleInventoryData} = useGetEachinventory()
    // const { mutate, isSuccess, isError, error } = useMutation({
    //     mutationFn: async (id) => {
    //         try {
    //             const response = await api.get(`/inventory/${id}`);
    //             return response.data.data;
    //         }
    //         catch (err) {
    //             if (axios.isAxiosError(error) && error.response) {
    //                 throw new Error(error.response.data.message);
    //             } else {
    //                 throw error;
    //             }
    //         }
    //     },
    //     onSuccess: (data) => {
    //         console.log(data)
    //         setSingleInventoryData(data)
    //     },
    //     onError: (error: Error) => {
    //         return error;
    //     }
    // });

    // return { action: mutate, isSuccess, isError, error };
};

export default useFetchEachInventoryData;
