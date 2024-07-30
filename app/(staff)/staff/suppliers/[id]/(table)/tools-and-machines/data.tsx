import { IToolAndMachineryData } from "@/utils/types";

export const materialsData: IToolAndMachineryData[] = [
  {
    tool_id: 1,
    tool_code: "tool-0001",
    supplier_code: "supp-0001",
    supplier_name: "ABC Supplies",
    tool_type: "Drill",
    description: "Electric drill with adjustable speed",
    others: "Includes a set of drill bits",
    procurement_type: "Purchase",
    created_by: "John Smith",
    comment: "Updated Sample comment for Tool 001",
    createdAt: "2024-02-28T23:19:53.510Z",
    updatedAt: "2024-02-28T23:34:59.039Z",
  },
  {
    tool_id: 3,
    tool_code: "tool-0002",
    supplier_code: "SUP-002",
    supplier_name: "XYZ Tools",
    tool_type: "Saw",
    description: "Circular saw with 12-inch blade",
    others: "Comes with a carrying case",
    procurement_type: "Lease",
    created_by: "John Smith",
    comment: "Sample comment for Tool 002",
    createdAt: "2024-03-27T13:43:05.178Z",
    updatedAt: "2024-03-27T13:43:05.178Z",
  },
];
