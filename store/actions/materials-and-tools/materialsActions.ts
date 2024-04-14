import { create } from "zustand";
import { AddMaterialData, Material, UpdateMaterialData } from "./types";
import {
  createMaterial,
  deleteMaterial,
  getAllMaterials,
  getMaterialById,
  updateMaterial,
} from "@/api/materialsRequests";
import { ID } from "@/utils/types";
import { toast } from "@/components/ui/use-toast";

export type SupplierMaterialsStoreState = {
  materials: Material[];
  singleMaterial: Material | null;
  error: string | null;

  // for requests
  requestLoading: boolean;
};

export type SupplierMaterialsActions = {
  setMaterials: (materials: Material[]) => void;
  setSingleMaterial: (material: Material) => void;
  setError: (error: string) => void;

  // ops
  createMaterial: (data: AddMaterialData) => void;
  getAllMaterials: () => void;
  getMaterialById: (id: ID) => void;
  updateMaterial: (id: ID, data: UpdateMaterialData) => void;
  deleteMaterial: (id: ID) => void;
};

export type SupplierMaterialsStore = SupplierMaterialsStoreState & SupplierMaterialsActions;

const useSupplierMaterialsStore = create<SupplierMaterialsStore>((set) => ({
  materials: [],
  singleMaterial: null,
  error: null,
  requestLoading: false,

  setMaterials: (materials) => set((state) => ({ ...state, materials })),
  setSingleMaterial: (material) => set((state) => ({ ...state, singleMaterial: material })),
  setError: (error) => set(() => ({ error })),

  createMaterial: async (data: AddMaterialData) => {
    try {
      // loading state
      set((state) => ({ ...state, requestLoading: true }));

      // request
      const newMaterial = await createMaterial<Material>(data);

      if (newMaterial) {
        set((state) => ({ ...state, materials: [...state.materials, newMaterial] }));
        toast({ title: "Material Added Successfully" });
      }
    } catch (err) {
      // do something with error
      console.log("error", err);
      toast({ title: "An error occurred", variant: "destructive" });
    } finally {
      set((state) => ({ ...state, requestLoading: false }));
    }
  },
  getAllMaterials: async () => {
    set((state) => ({ ...state, requestLoading: true }));

    try {
      const materials = await getAllMaterials<Material[]>();
      set((state) => ({ ...state, materials: materials ?? [] }));
    } catch (err) {
      // do something with error
      console.log("error", err);
    } finally {
      set((state) => ({ ...state, requestLoading: false }));
    }
  },
  getMaterialById: async (id) => {
    set((state) => ({ ...state, requestLoading: true }));

    try {
      const material = await getMaterialById<Material>(id);
      set((state) => ({ ...state, singleMaterial: material }));
    } catch (err) {
      // do something with error
      console.log("error", err);
    } finally {
      set((state) => ({ ...state, requestLoading: false }));
    }
  },
  updateMaterial: async (id: ID, data: UpdateMaterialData) => {
    set((state) => ({ ...state, requestLoading: true }));

    try {
      const updatedMaterial = await updateMaterial<Material>(id, data);
      if (updatedMaterial)
        set((state) => ({
          ...state,
          materials: state.materials.map((mat) => (mat.mat_id === id ? updatedMaterial : mat)),
          singleMaterial: updatedMaterial,
        }));
    } catch (err) {
      // do something with error
      console.log("error", err);
    } finally {
      set((state) => ({ ...state, requestLoading: false }));
    }
  },
  deleteMaterial: async (id: ID) => {
    set((state) => ({ ...state, requestLoading: true }));

    try {
      await deleteMaterial(id);
    } catch (err) {
      // do something with error
      console.log("error", err);
    } finally {
      set((state) => ({ ...state, requestLoading: false }));
    }
  },
}));

export default useSupplierMaterialsStore;
