"use client";

import { DataTable } from "@/components/shared/DataTable";
import { materialsColumns } from "./columns";
import { materialsData } from "./data";
import { motion } from "framer-motion";
import { opacityVariant } from "@/utils/variants";
import { useEffect, useState } from "react";
import useSupplierMaterialsStore from "@/store/actions/materials-and-tools/materialsActions";
import { useGetAllSuppliers } from "@/hooks/useSelectOptions";

const MaterialsTable = ({ supplier }: any) => {
  const store = useSupplierMaterialsStore();
  const supplierMat = store.materials.filter(
    (mat) =>
      mat.supplier_name === supplier?.supplier_name ||
      mat.supplier_code === supplier?.supplier_code
  );
  useEffect(() => {
    store.getAllMaterials();
  }, []);

  return (
    <motion.div {...opacityVariant}>
      <DataTable
        showSearch={false}
        columns={materialsColumns}
        data={supplierMat ?? []}
        isLoading={store.requestLoading}
        withTitle={{ title: "Materials", data: store.materials.length }}
      />
    </motion.div>
  );
};

export default MaterialsTable;
