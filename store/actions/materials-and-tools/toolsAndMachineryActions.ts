import { create } from "zustand";
import {
  createTool,
  deleteTool,
  getAllTools,
  getMaterialDescription,
  getMaterialSubTypes,
  getMaterialTypes,
  getToolById,
  updateTool,
} from "@/api/suppliers-and-tools/toolsAndMachineriesRequests";
import {
  IAddToolsAndMachineryData,
  ID,
  ISupplierMaterialDescriptionData,
  ISupplierMaterialSubTypesData,
  ISupplierMaterialTypesData,
  IToolAndMachineryData,
  IUpdateToolAndMachineryData,
} from "@/utils/types";
import { toast } from "@/components/ui/use-toast";

export type SupplierMaterialsStoreState = {
  tools: IToolAndMachineryData[];
  singleTool: IToolAndMachineryData | null;
  error: string | null;

  // MATERIALS
  materialTypes: ISupplierMaterialTypesData[];
  materialSubTypes: ISupplierMaterialSubTypesData[];
  materialDescription: ISupplierMaterialDescriptionData[];

  // REQUEST
  requestLoading: boolean;
};

export type SupplierMaterialsActions = {
  setTools: (materials: IToolAndMachineryData[]) => void;
  setSingleMaterial: (material: IToolAndMachineryData) => void;
  setError: (error: string) => void;

  // SUPPLIER ACTIONS
  createTool: (data: IAddToolsAndMachineryData) => void;
  getAllTools: () => void;
  getToolById: (id: ID) => void;
  updateTool: (id: ID, data: IUpdateToolAndMachineryData) => void;
  deleteTool: (id: ID) => void;

  // MATERIAL ACTIONS
  getMaterialTypes: () => void;
  getMaterialSubTypes: (id: ID) => void;
  getMaterialDescription: (subType: string) => void;
};

export type SupplierMaterialsStore = SupplierMaterialsStoreState & SupplierMaterialsActions;

const useSupplierToolsAndMachineriesStore = create<SupplierMaterialsStore>((set) => ({
  tools: [],
  singleTool: null,
  error: null,
  requestLoading: false,

  materialTypes: [],
  materialSubTypes: [],
  materialDescription: [],

  setTools: (tool) => set((state) => ({ ...state, tools: tool })),
  setSingleMaterial: (tool) => set((state) => ({ ...state, singleTool: tool })),
  setError: (error) => set(() => ({ error })),

  createTool: async (data: IAddToolsAndMachineryData) => {
    try {
      // loading state
      set((state) => ({ ...state, requestLoading: true }));

      // request
      const newTool = await createTool<IToolAndMachineryData>(data);

      if (newTool) set((state) => ({ ...state, tools: [...state.tools, newTool] }));
      toast({ title: "Tool Added Successfully" });
    } catch (err) {
      // do something with error
      console.log("error", err);
      toast({ title: "An error occurred", variant: "destructive" });
    } finally {
      set((state) => ({ ...state, requestLoading: false }));
    }
  },

  getAllTools: async () => {
    set((state) => ({ ...state, requestLoading: true }));

    try {
      const tools = await getAllTools<IToolAndMachineryData[]>();
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
      const tool = await getToolById<IToolAndMachineryData>(id);
      set((state) => ({ ...state, singleTool: tool }));
    } catch (err) {
      // do something with error
      console.log("error", err);
    } finally {
      set((state) => ({ ...state, requestLoading: false }));
    }
  },

  updateTool: async (id: ID, data: IUpdateToolAndMachineryData) => {
    set((state) => ({ ...state, requestLoading: true }));

    try {
      const updatedTool = await updateTool<IToolAndMachineryData>(id, data);
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

  // MATERIALS
  getMaterialTypes: async () => {
    try {
      const materialTypes = await getMaterialTypes<ISupplierMaterialTypesData[]>();
      set((state) => ({ ...state, materialTypes: materialTypes ?? [] }));
    } catch (err) {}
  },

  getMaterialSubTypes: async (id) => {
    try {
      const subTypes = await getMaterialSubTypes<ISupplierMaterialSubTypesData[]>(id);
      set((state) => ({ ...state, materialSubTypes: subTypes ?? [] }));
    } catch (err) {}
  },

  getMaterialDescription: async (subType) => {
    try {
      const description = await getMaterialDescription<ISupplierMaterialDescriptionData[]>(subType);
      set((state) => ({ ...state, materialDescription: description ?? [] }));
    } catch (err) {}
  },
}));

export default useSupplierToolsAndMachineriesStore;
