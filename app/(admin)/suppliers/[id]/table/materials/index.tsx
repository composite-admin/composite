import { DataTable } from "@/components/shared/DataTable";
import { materialsColumns } from "./columns";
import { materialsData } from "./data";
import { motion } from "framer-motion";
import { opacityVariant } from "@/utils/variants";
import { useEffect, useState } from "react";
import useSupplierMaterialsStore from "@/store/actions/materials/materialsActions";

const MaterialsTable = () => {
  const store = useSupplierMaterialsStore();

  useEffect(() => {
    store.getAllMaterials();
  }, []);

  return (
    <motion.div {...opacityVariant}>
      <DataTable
        showSearch={false}
        columns={materialsColumns}
        data={store.materials ?? []}
        isLoading={store.requestLoading}
      />
    </motion.div>
  );
};

export default MaterialsTable;
