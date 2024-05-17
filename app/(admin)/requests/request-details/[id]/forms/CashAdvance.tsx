import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useProjectData } from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export enum RequestType {
  Material = "Material",
  Labour = "labour",
  CashAdvanceProject = "Cash Advance Project",
  CashAdvanceOffice = "Cash Advance Office",
  ToolsAndMachineBuy = "Tools and Machinery Buy",
  ToolsAndMachineRent = "Tools and Machinery Rent",
  ToolsAndMachineStore = "Tools and Machinery Store",
}

export const createCashAdvanceOfficeSchema = z.object({
  approved_amount: z.string({
    required_error: "Amount is required",
  }),
  payment_method: z.string({
    required_error: "Payment method is required",
  }),
  bank: z.string({
    required_error: "Bank name is required",
  }),
  supervisor_comment: z.string({
    required_error: "Comment is required",
  }),
});

type CreateCashAdvanceOfficeType = z.infer<
  typeof createCashAdvanceOfficeSchema
>;

export default function CashAdvance() {
  const { formDetails, onClose } = useUpdateRequestStore();
  const { userId, username } = userStore();
  const { toast } = useToast();
  const { projectsData } = useProjectData();
  const form = useForm<CreateCashAdvanceOfficeType>({
    resolver: zodResolver(createCashAdvanceOfficeSchema),
  });

  const createCashAdvance = async (data: any) => {
    try {
      const res = await api.post("/cash-advances", {
        ...data,
        amount_collected: Number(data.approved_amount),
        amount_recorded: 0,
        balance: 0,
        project_code: formDetails?.project_code,
        project_name: formDetails?.project_name,
        cash_advance_type: "Cash Advance Office",
        request_code: formDetails?.request_code,
        bank_to: data.bank,
        payment_method: data.payment_method,
        status: "Approved",
        staff_name: formDetails?.staff_name,
        staff_id: formDetails?.staff_id,
      });
      if (res.status === 200 || res.status === 201) {
        window.location.reload();
      }
      return res.data.data;
    } catch (error) {}
  };

  const handleSubmit = async (data: CreateCashAdvanceOfficeType) => {
    try {
      const res = await api.put(`/requests/${formDetails?.id}`, {
        ...data,
        approved_by: username,
        approved_on: new Date(),
        status: "APPROVED",
        amount: Number(data.approved_amount),
      });
      if (res.status === 200 || res.status === 201) {
        toast({
          title: "Request Approved",
          variant: "success",
        });
        form.reset();
        onClose();
        createCashAdvance(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          <CustomFormSelect
            name="request_type"
            control={form.control}
            labelText="Request Type"
            disabled
            placeholder={formDetails?.request_type}
            items={Object.values(RequestType)}
          />
          <CustomFormField
            name="request_from"
            control={form.control}
            label="Request From"
            disabled
            value={formDetails?.staff_name}
          />
        </div>
        <div className="space-y-3 py-3 w-full">
          <div className="w-full">
            <CustomFormField
              name="amount"
              label="Amount"
              control={form.control}
              placeholder={String(formDetails?.amount)}
              disabled
            />
          </div>
          <CustomFormField
            name="approved_amount"
            label="Approved Amount"
            control={form.control}
            placeholder="Enter Approved Amount"
            className="py-2"
          />
          <div className="grid md:grid-cols-2 gap-5 pb-3">
            <CustomFormSelect
              name="payment_method"
              control={form.control}
              labelText="Select Payment Method"
              items={["Online Transfer", "Pay to Bank", "Cash", "Cheque"]}
            />
            <CustomFormField
              name="bank"
              control={form.control}
              label="Bank Name"
              placeholder="Enter Bank Name"
            />
          </div>
          <CustomFormTextareaField
            name="supervisor_comment"
            control={form.control}
            label="Comment"
            placeholder="Enter a comment"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          <Button variant="secondary" className="w-full">
            Cancel
          </Button>
          <Button className="w-full">Approve Request</Button>
        </div>
      </form>
    </Form>
  );
}
