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

// FOR TOOLS AND MACHINERIES
export type ToolAndMachinery = {
  tool_id: number;
  tool_code: string;
  supplier_code: string;
  supplier_name: string;
  tool_type: string;
  description: string;
  others: string;
  procurement_type: string;
  created_by: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export type AddToolData = {
  supplier_code: string;
  supplier_name: string;
  tool_type: string;
  description: string;
  others: string;
  procurement_type: string;
  comment: string;
};

export type UpdateToolData = {
  tool_type: string;
  description: string;
  others: string;
  procurement_type: string;
  comment: string;
};
