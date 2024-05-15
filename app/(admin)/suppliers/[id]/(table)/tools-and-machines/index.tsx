import { DataTable } from "@/components/shared/DataTable";
import { materialsColumns } from "./columns";
import { motion } from "framer-motion";
import { opacityVariant } from "@/utils/variants";
import { useEffect, useState } from "react";
import useSupplierToolsAndMachineriesStore from "@/store/actions/materials-and-tools/toolsAndMachineryActions";
import useSupplierMaterialsStore from "@/store/actions/materials-and-tools/materialsActions";

const ToolsTable = ({ supplier }: any) => {
  const store = useSupplierToolsAndMachineriesStore();
  const supplierTools = store.tools.filter(
    (tools) => tools.supplier_code === supplier.supplier_code
  );

  useEffect(() => {
    store.getAllTools();
  }, []);

  return (
    <motion.div {...opacityVariant}>
      <DataTable
        showSearch={false}
        columns={materialsColumns}
        data={supplierTools ?? []}
        isLoading={store.requestLoading}
        withTitle={{ title: "Tools and Machine", data: supplierTools.length }}
      />
    </motion.div>
  );
};

export default ToolsTable;
