export type Material = {
  mat_id: number;
  mat_code: string;
  supplier_code: string;
  supplier_name: string;
  mat_desc: string;
  project_code: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type AddMaterialData = {
  supplier_code: string;
  supplier_name: string;
  mat_desc: string;
  project_code: string;
  quantity: number;
  unit_price: number;
};

export type UpdateMaterialData = {
  mat_desc: string;
  quantity: number;
  unit_price: number;
};
