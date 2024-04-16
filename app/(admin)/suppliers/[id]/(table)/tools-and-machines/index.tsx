import { DataTable } from "@/components/shared/DataTable";
import { materialsColumns } from "./columns";
import { motion } from "framer-motion";
import { opacityVariant } from "@/utils/variants";
import { useEffect, useState } from "react";
import useSupplierToolsStore from "@/store/actions/materials-and-tools/toolsAnMachineryActions";

const ToolsTable = () => {
  const store = useSupplierToolsStore();

  useEffect(() => {
    store.getAllTools();
  }, []);

  return (
    <motion.div {...opacityVariant}>
      <DataTable
        showSearch={false}
        columns={materialsColumns}
        data={store.tools ?? []}
        isLoading={store.requestLoading}
        withTitle={{ title: "Tools and Machine", data: store.tools.length }}
      />
    </motion.div>
  );
};

export default ToolsTable;
