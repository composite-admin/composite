"use client";
import FormContainer from "@/components/shared/FormContainer";
import useStaffStore, { FormType } from "@/store/staff/useStaffStore";
import Material from "./Material";
import Labour from "./Labour";
import CashAdvance from "./CashAdvance";
import CashAdvanceOffice from "./CashAdvanceOffice";
import ToolsAndMachineBuy from "./ToolsAndMachineBuy";
import ToolsAndMachineRent from "./ToolsAndMachineRent";
import ToolAndMachineStore from "./ToolAndMachineStore";
import { CustomFormSelect } from "@/components/shared/FormComponent";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

const createRequestSchema = z.object({
  requestType: z.enum([
    "material",
    "labour",
    "cash_advance_project",
    "cash_advance_office",
    "tools_and_machine_buy",
    "tools_and_machine_rent",
    "tools_and_machine_store",
  ]),
});

type CreateRequestType = z.infer<typeof createRequestSchema>;

export default function NewRequestForm() {
  const { formType, setFormType } = useStaffStore();
  return (
    <>
      {formType === "material" && <Material />}
      {formType === "labour" && <Labour />}
      {formType === "cash_advance_project" && <CashAdvance />}
      {formType === "cash_advance_office" && <CashAdvanceOffice />}
      {formType === "tools_and_machine_buy" && <ToolsAndMachineBuy />}
      {formType === "tools_and_machine_rent" && <ToolsAndMachineRent />}
      {formType === "tools_and_machine_store" && <ToolAndMachineStore />}
    </>
  );
}
