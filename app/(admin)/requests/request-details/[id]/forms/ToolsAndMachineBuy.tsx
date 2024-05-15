import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import FormContainer from "@/components/shared/FormContainer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/config/api";
import {
  useGetAllInventoryTypes,
  useGetStaffDetails,
  useProjectData,
} from "@/hooks/useSelectOptions";
import useAuthStore, { userStore } from "@/store/auth/AuthStore";
import useStaffStore from "@/store/staff/useStaffStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RequestType } from "./CashAdvance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";

export const ToolsAndMachineBuySchema = z.object({
  request_type: z.nativeEnum(RequestType),
  approved_quantity: z.string({
    required_error: "Amount is required",
  }),
  approved_unit_price: z.string({
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

type ToolsAndMachineBuyType = z.infer<typeof ToolsAndMachineBuySchema>;

export default function ToolsAndMachineBuy() {
  const { formDetails, onClose } = useUpdateRequestStore();
  const { projectsData } = useProjectData();
  const router = useRouter();
  const { toast } = useToast();
  const { userId } = userStore();
  const { staffDetails } = useGetStaffDetails(userId);
  const form = useForm<ToolsAndMachineBuyType>({
    resolver: zodResolver(ToolsAndMachineBuySchema),
    defaultValues: {
      request_type: RequestType.ToolsAndMachineBuy,
    },
  });

  const handleSubmit = async (data: ToolsAndMachineBuyType) => {
    try {
      const res = await api.put(`/requests/${formDetails?.id}`, {
        ...data,
        status: "APPROVED",
        approved_unit_price: Number(data.approved_unit_price),
        approved_quantity: Number(data.approved_quantity),
        approved_total_amount:
          Number(data.approved_unit_price) * Number(data.approved_quantity),
      });
      if (res.status === 201) {
        toast({
          title: "Request Approved",
          variant: "success",
        });
        form.reset();
        router.refresh();
        onClose();
      }
    } catch (error) {
      toast({
        title: "Request creation failed",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid md:grid-cols-2 gap-5 ">
          <CustomFormSelect
            name="request_type"
            control={form.control}
            labelText="Request Type"
            disabled
            items={[RequestType.ToolsAndMachineBuy]}
          />
          <CustomFormField
            name="request_from"
            control={form.control}
            label="Request From"
            disabled
            value={formDetails?.staff_name}
          />
          <CustomFormField
            name="supplier_name"
            control={form.control}
            placeholder={formDetails?.supplier_name}
            label="Supplier Name"
            disabled
          />
          <CustomFormField
            name="supplier_material"
            control={form.control}
            placeholder={formDetails?.supplier_material}
            label="Material Description"
            disabled
          />
          <CustomFormField
            name="quantity"
            control={form.control}
            placeholder={String(formDetails?.quantity)}
            label="Requested Quantity"
            disabled
          />
          <CustomFormField
            name="unit_price"
            control={form.control}
            placeholder={String(formDetails?.unit_price)}
            label="Requested Unit Price"
            disabled
          />
          <CustomFormField
            name="approved_quantity"
            placeholder="Enter Quantity"
            control={form.control}
            label="Approved Quantity"
          />
          <CustomFormField
            name="approved_unit_price"
            placeholder="Enter amount"
            control={form.control}
            label="Approved Unit Price"
          />
          <CustomFormSelect
            name="payment_method"
            control={form.control}
            labelText="Select Payment Method"
            items={["Online Transfer", "Paid at the Bank", "Cash", "Cheque"]}
          />
          <CustomFormField
            name="bank"
            control={form.control}
            label="Bank Name"
            placeholder="Enter Bank Name"
          />
        </div>
        <div className="py-6">
          <CustomFormTextareaField
            className=""
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
          <Button className="w-full">Approve request</Button>
        </div>
      </form>
    </Form>
  );
}
