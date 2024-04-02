import axiosInstance from "./index";

export const createStakeholder = async (data: any) => {
    try {
        const response = await axiosInstance.post('/stakeholder', data);
        return response.data;
    } catch (error: any) {
        throw new Error("");
    }
};

export const getAllStakeholders = async () => {
    try {
        const response = await axiosInstance.get('/stakeholder');
        return response.data;
    } catch (error: any) {
        throw new Error("");
    }
};

export const getStakeholderById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/stakeholder/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error("");
    }
};

export const updateStakeholder = async (id: number, data: any) => {
    try {
        const response = await axiosInstance.put(`/stakeholder/${id}`, data);
        return response.data;
    } catch (error: any) {
        throw new Error("");
    }
};

export const deleteStakeholder = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/stakeholder/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error("");
    }
};