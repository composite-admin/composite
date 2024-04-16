import { Material } from "@/store/actions/materials-and-tools/types";

export const materialsData: Material[] = [
  {
    mat_id: 1,
    mat_code: "mat-0001",
    supplier_code: "sup-0001",
    supplier_name: "ABC Supplies",
    mat_desc: "Updated Concrete blocks",
    project_code: "PRJ-001",
    quantity: 1000,
    unit_price: 1,
    total_price: 1000,
    createdAt: "2024-02-28T23:41:16.410Z",
    updatedAt: "2024-02-29T00:03:11.592Z",
  },
  {
    mat_id: 2,
    mat_code: "mat-0002",
    supplier_code: "sup-0001",
    supplier_name: "ABC Supplies",
    mat_desc: "Concrete blocks",
    project_code: "PRJ-001",
    quantity: 1000,
    unit_price: 1,
    total_price: 1000,
    createdAt: "2024-03-27T13:51:33.929Z",
    updatedAt: "2024-03-27T13:51:33.929Z",
  },
];
