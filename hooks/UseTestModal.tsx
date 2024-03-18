import {create} from "zustand";

interface useTestModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useTestModalStore = create<useTestModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))