"use client";
import useStaffStore, { FormType } from "@/store/staff/useStaffStore";
import Material from "./Material";
import Labour from "./Labour";
import CashAdvance from "./CashAdvance";
import CashAdvanceOffice from "./CashAdvanceOffice";
import ToolsAndMachineBuy from "./ToolsAndMachineBuy";
import ToolsAndMachineRent from "./ToolsAndMachineRent";
import ToolAndMachineStore from "./ToolAndMachineStore";

export default function NewRequestForm() {
  const { formType, setFormType } = useStaffStore();
  return (
    <>
      {formType === "Material" && <Material />}
      {formType === "labour" && <Labour />}
      {formType === "Cash Advance Project" && <CashAdvance />}
      {formType === "Cash Advance Office" && <CashAdvanceOffice />}
      {formType === "Tools and Machinery Buy" && <ToolsAndMachineBuy />}
      {formType === "Tools and Machinery Rent" && <ToolsAndMachineRent />}
      {formType === "Tools and Machinery Store" && <ToolAndMachineStore />}
    </>
  );
}
