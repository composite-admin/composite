import { create } from "zustand";
import type { ToolAndMachinery, AddToolData, UpdateToolData } from "./types";
import { createTool, deleteTool, getAllTools, getToolById, updateTool } from "@/api/toolsAndMachineriesRequests";
import { ID } from "@/utils/types";

export type SupplierMaterialsStoreState = {
  tools: ToolAndMachinery[];
  singleTool: ToolAndMachinery | null;
  error: string | null;

  // for requests
  requestLoading: boolean;
};

export type SupplierMaterialsActions = {
  setTools: (materials: ToolAndMachinery[]) => void;
  setSingleMaterial: (material: ToolAndMachinery) => void;
  setError: (error: string) => void;

  // ops
  createTool: (data: AddToolData) => void;
  getAllTools: () => void;
  getToolById: (id: ID) => void;
  updateTool: (id: ID, data: UpdateToolData) => void;
  deleteTool: (id: ID) => void;
};

export type SupplierMaterialsStore = SupplierMaterialsStoreState & SupplierMaterialsActions;

const useSupplierToolsStore = create<SupplierMaterialsStore>((set) => ({
  tools: [],
  singleTool: null,
  error: null,
  requestLoading: false,

  setTools: (tool) => set((state) => ({ ...state, tools: tool })),
  setSingleMaterial: (tool) => set((state) => ({ ...state, singleTool: tool })),
  setError: (error) => set(() => ({ error })),

  createTool: async (data: AddToolData) => {
    try {
      // loading state
      set((state) => ({ ...state, requestLoading: true }));

      // request
      const newTool = await createTool<ToolAndMachinery>(data);

      if (newTool) set((state) => ({ ...state, tools: [...state.tools, newTool] }));
    } catch (err) {
      // do something with error
      console.log("error", err);
    } finally {
      set((state) => ({ ...state, requestLoading: false }));
    }
  },
  getAllTools: async () => {
    set((state) => ({ ...state, requestLoading: true }));

    try {
      const tools = await getAllTools<ToolAndMachinery[]>();
      set((state) => ({ ...state, tools: tools ?? [] }));
    } catch (err) {
      // do something with error
      console.log("error", err);
    } finally {
      set((state) => ({ ...state, requestLoading: false }));
    }
  },
  getToolById: async (id) => {
    set((state) => ({ ...state, requestLoading: true }));

    try {
      const tool = await getToolById<ToolAndMachinery>(id);
      set((state) => ({ ...state, singleTool: tool }));
    } catch (err) {
      // do something with error
      console.log("error", err);
    } finally {
      set((state) => ({ ...state, requestLoading: false }));
    }
  },
  updateTool: async (id: ID, data: UpdateToolData) => {
    set((state) => ({ ...state, requestLoading: true }));

    try {
      const updatedTool = await updateTool<ToolAndMachinery>(id, data);
      if (updatedTool)
        set((state) => ({
          ...state,
          tools: state.tools.map((tool) => (tool.tool_id === id ? updatedTool : tool)),
          singleTool: updatedTool,
        }));
    } catch (err) {
      // do something with error
      console.log("error", err);
    } finally {
      set((state) => ({ ...state, requestLoading: false }));
    }
  },
  deleteTool: async (id: ID) => {
    set((state) => ({ ...state, requestLoading: true }));

    try {
      await deleteTool(id);
    } catch (err) {
      // do something with error
      console.log("error", err);
    } finally {
      set((state) => ({ ...state, requestLoading: false }));
    }
  },
}));

export default useSupplierToolsStore;
