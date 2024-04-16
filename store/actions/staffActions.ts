import { create } from 'zustand';
import { getAllStaffByRoles, getAllRoles } from '../../api/staffRequests';


export interface StaffStoreState {
    items: object[];
    selectedItem: object | null;
    error: string | null;
}

// Define the type for your actions
export interface StaffStoreActions {
    setItems: (items: any) => void;
    setSelectedItem: (selectedItem: any) => void;
    setError: (error: any) => void;
    getAllRoles: () => void;
    getAllStaffByRoles: (roleType: string) => void;
    // Add more action types here as needed
}

// Define the type for your store combining state and actions
export type StaffStore = StaffStoreState & StaffStoreActions;

const useStore = create<StaffStore>((set) => ({
    items: [],
    selectedItem: null,
    error: null,

    setItems: (items: any) => set({ items }),
    setSelectedItem: (selectedItem: any) => set({ selectedItem }),
    setError: (error: any) => set({ error }),


    getAllRoles: async () => {
        try {
            const items = await getAllRoles();
            set({ items });
        } catch (error) {
            set((state: any) => ({ error: "" }));
        }
    },

    getAllStaffByRoles: async (roleType: string) => {
        try {
            const item = await getAllStaffByRoles(roleType);
            set({ selectedItem: item.data });
        } catch (error) {
            set((state: any) => ({ error: "" }));
        }
    },
    
}));

export default useStore;
