"use client";
import Material from "./Material";
import Labour from "./Labour";
import CashAdvance from "./CashAdvance";
import CashAdvanceOffice from "./CashAdvanceOffice";
import ToolsAndMachineBuy from "./ToolsAndMachineBuy";
import ToolsAndMachineRent from "./ToolsAndMachineRent";
import ToolAndMachineStore from "./ToolAndMachineStore";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";

export default function EditRequestForm() {
  const { isOpen, onClose, formType, isEdit } = useUpdateRequestStore();

  return (
    <>
      {formType === "Material" && <Material />}
      {formType === "Labour" && <Labour />}
      {formType === "Cash Advance Project" && <CashAdvance />}
      {formType === "Cash Advance Office" && <CashAdvanceOffice />}
      {formType === "Tools and Machine Buy" && <ToolsAndMachineBuy />}
      {formType === "Tools and Machine Rent" && <ToolsAndMachineRent />}
      {formType === "Tools and Machine Store" && <ToolAndMachineStore />}
    </>
  );
}
