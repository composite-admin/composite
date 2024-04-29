"use client";
import z from "zod";
import Material from "./Material";
import Labour from "./Labour";
import CashAdvance from "./CashAdvance";
import CashAdvanceOffice from "./CashAdvanceOffice";
import ToolsAndMachineBuy from "./ToolsAndMachineBuy";
import ToolsAndMachineRent from "./ToolsAndMachineRent";
import ToolAndMachineStore from "./ToolAndMachineStore";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";
import { Modal } from "@/components/shared/Modal";

export default function RequestApprovalModal() {
  const { isOpen, onClose, formType } = useUpdateRequestStore();

  return (
    <Modal
      title="Update Request"
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-3xl"
    >
      {formType === "Material" && <Material />}
      {formType === "Labour" && <Labour />}
      {formType === "Cash Advance Project" && <CashAdvance />}
      {formType === "Cash Advance Office" && <CashAdvanceOffice />}
      {formType === "Tools and Machine Buy" && <ToolsAndMachineBuy />}
      {formType === "Tools and Machine Rent" && <ToolsAndMachineRent />}
      {formType === "Tools and Machine Store" && <ToolAndMachineStore />}
    </Modal>
  );
}

// export default function RequestForm() {
//   const { formType } = useUpdateRequestStore();
//   return (
//     <>
//       {formType === "Material" && (
//         <div>
//           {" "}
//           <p>Hello</p>{" "}
//         </div>
//       )}
//       {formType === "Labour" && <Labour />}
//       {formType === "Cash Advance Project" && <CashAdvance />}
//       {formType === "Cash Advance Office" && <CashAdvanceOffice />}
//       {formType === "Tools and Machine Buy" && <ToolsAndMachineBuy />}
//       {formType === "Tools and Machine Rent" && <ToolsAndMachineRent />}
//       {formType === "Tools and Machine Store" && <ToolAndMachineStore />}
//     </>
//   );
// }