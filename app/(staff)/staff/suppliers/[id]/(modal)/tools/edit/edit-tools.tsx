import FramerModal from "@/components/shared/FramerModal";
import { useModal } from "@/utils/modalContext";
import { IToolAndMachineryData } from "@/utils/types";
import { Row } from "@tanstack/react-table";
import EditToolsFormContent from "./form";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import EditToolsSuccessContent from "./success";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

type Props = { row: Row<IToolAndMachineryData> };

const EditToolsModal: React.FC<Props> = ({ row }) => {
  const { hideModal } = useModal();
  const [tab, setTab] = useState<"form" | "success">("form");

  const finish = () => setTab("success");
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_EDIT = staffPrivilege?.find(
    (item: any) => item.type === "supplier"
  )?.can_edit;
  const renderContent = () => {
    switch (tab) {
      case "form":
        return (
          <EditToolsFormContent
            row={row}
            finish={finish}
            key="form"
          />
        );
      case "success":
        return <EditToolsSuccessContent key="success" />;
    }
  };

  return (
    <FramerModal
      isOpen={true}
      isAutomatic={false}
      onClose={hideModal}>
      <AnimatePresence
        mode="wait"
        initial={false}>
        {!CAN_EDIT ? (
          <div className="md:min-w-[30rem] w-[98%] bg-white rounded-lg p-10">
            <div className="space-y-4">
              <p className="text-xl font-bold">
                You do not have permission to do this
              </p>
              <button
                role="button"
                className="w-full py-3 font-semibold rounded-lg bg-zinc-300"
                onClick={hideModal}>
                Close
              </button>
            </div>
          </div>
        ) : (
          renderContent()
        )}
      </AnimatePresence>
    </FramerModal>
  );
};

export default EditToolsModal;
