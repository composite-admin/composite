"use client";
import useStaffStore, { FormType } from "@/store/staff/useStaffStore";
import Material from "./Material";
import Labour from "./Labour";
import CashAdvance from "./CashAdvance";
import CashAdvanceOffice from "./CashAdvanceOffice";
import ToolsAndMachineBuy from "./ToolsAndMachineBuy";
import ToolsAndMachineRent from "./ToolsAndMachineRent";
import ToolAndMachineStore from "./ToolAndMachineStore";
import z from "zod";



export default function NewRequestForm() {
  const { formType, setFormType } = useStaffStore();
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
