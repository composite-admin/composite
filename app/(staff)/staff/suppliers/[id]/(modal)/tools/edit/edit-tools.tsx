import FramerModal from "@/components/shared/FramerModal";
import { useModal } from "@/utils/modalContext";
import { IToolAndMachineryData } from "@/utils/types";
import { Row } from "@tanstack/react-table";
import EditToolsFormContent from "./form";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EditToolsSuccessContent from "./success";

type Props = { row: Row<IToolAndMachineryData> };

const EditToolsModal: React.FC<Props> = ({ row }) => {
  const { hideModal } = useModal();
  const [tab, setTab] = useState<"form" | "success">("form");

  const finish = () => setTab("success");

  const renderContent = () => {
    switch (tab) {
      case "form":
        return <EditToolsFormContent row={row} finish={finish} key="form" />;
      case "success":
        return <EditToolsSuccessContent key="success" />;
    }
  };

  return (
    <FramerModal isOpen={true} isAutomatic={false} onClose={hideModal}>
      <AnimatePresence mode="wait" initial={false}>
        {renderContent()}
      </AnimatePresence>
    </FramerModal>
  );
};

export default EditToolsModal;
