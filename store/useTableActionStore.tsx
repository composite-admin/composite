import { create } from "zustand";

export type ProjectPageFormType =
  | "start-up-cost-edit"
  | "material-edit"
  | "worker-job-edit"
  | null;

interface TableAction {
  isOpen: boolean;
  tableActions: ProjectPageFormType;
  isEditOrDelete: "edit" | "delete" | false;
  rowID: number | null;
  deleteUrl: string | null;
  query: string | null;
  setDeleteUrl: (deleteUrl: string | null) => void;
  setRowID: (rowID: number) => void;
  setEditOrDelete: (editOrDelete: "edit" | "delete" | false) => void;
  setTableActions: (tableActions: ProjectPageFormType) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useTableActionStore = create<TableAction>((set) => ({
  tableActions: "start-up-cost-edit",
  isEditOrDelete: false,
  isOpen: false,
  rowID: null,
  query: null,
  deleteUrl: null,
  setDeleteUrl: (deleteUrl) => set({ deleteUrl }),
  setRowID: (rowID) => set({ rowID }),
  setEditOrDelete: (editOrDelete) => set({ isEditOrDelete: editOrDelete }),
  setTableActions: (tableActions) => set({ tableActions }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, rowID: null, isEditOrDelete: false }),
}));
