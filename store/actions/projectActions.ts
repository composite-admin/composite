import { create } from 'zustand';
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from '../../api/projectRequests';


export interface ProjectStoreState {
    items: object[];
    selectedItem: object | null;
    error: string | null;
}

// Define the type for your actions
export interface ProjectStoreActions {
    setItems: (items: any) => void;
    setSelectedItem: (selectedItem: any) => void;
    setError: (error: any) => void;
    createProject: (data: any) => void;
    getAllProjects: () => void;
    // Add more action types here as needed
}

// Define the type for your store combining state and actions
export type ProjectStore = ProjectStoreState & ProjectStoreActions;

const useStore = create<ProjectStore>((set) => ({
    items: [],
    selectedItem: null,
    error: null,

    setItems: (items: any) => set({ items }),
    setSelectedItem: (selectedItem: any) => set({ selectedItem }),
    setError: (error: any) => set({ error }),

    createProject: async (data: any) => {
        try {
            const newItem = await createProject(data);
            set((state: any) => ({ items: [...state.items, newItem] }));
        } catch (error) {
            set((state: any) => ({ error: "" }));
        }
    },

    getAllProjects: async () => {
        try {
            const items = await getAllProjects();
            set({ items });
        } catch (error) {
            set((state: any) => ({ error: "" }));
        }
    },

    getProjectById: async (id: number) => {
        try {
            const item = await getProjectById(id);
            set({ selectedItem: item });
        } catch (error) {
            set((state: any) => ({ error: "" }));
        }
    },

    updateProject: async (id: number, data: any) => {
        try {
            const updatedItem = await updateProject(id, data);
            set((state: any) => ({
                items: state.items.map((item: any) => (item.id === id ? updatedItem : item)),
                selectedItem: updatedItem.id === state.selectedItem?.id ? updatedItem : state.selectedItem,
            }));
        } catch (error) {
            set((state: any) => ({ error: "" }));
        }
    },

    deleteProject: async (id: number) => {
        try {
            await deleteProject(id);
            set((state: any) => ({
                items: state.items.filter((item: any) => item.id !== id),
                selectedItem: state.selectedItem && state.selectedItem.id === id ? null : state.selectedItem,
            }));
        } catch (error) {
            set((state: any) => ({ error: "" }));
        }
    },
}));

export default useStore;
