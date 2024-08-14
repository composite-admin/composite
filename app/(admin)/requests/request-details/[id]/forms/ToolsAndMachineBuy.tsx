import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import FormContainer from "@/components/shared/FormContainer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/config/api";
import { useGetStaffDetails } from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RequestType } from "./CashAdvance";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const ToolsAndMachineBuySchema = z.object({
  request_type: z.nativeEnum(RequestType),
  approved_quantity: z
    .string({
      required_error: "Amount is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
  approved_unit_price: z
    .string({
      required_error: "Amount is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
  payment_method: z.string({
    required_error: "Payment method is required",
  }),
  bank: z.string({
    required_error: "Bank name is required",
  }),
  account_number: z
    .string({
      required_error: "Account number is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
  account_name: z.string({
    required_error: "Account name is required",
  }),
  supervisor_comment: z.string().optional(),
});

type ToolsAndMachineBuyType = z.infer<typeof ToolsAndMachineBuySchema>;

export default function ToolsAndMachineBuy() {
  const { formDetails, onClose } = useUpdateRequestStore();
  const { toast } = useToast();
  const [isloading, setIsLoading] = useState(false);
  const { staffDetails } = useGetStaffDetails(formDetails?.staff_id!);
  const { username } = userStore();
  const query = useQueryClient();

  const form = useForm<ToolsAndMachineBuyType>({
    resolver: zodResolver(ToolsAndMachineBuySchema),
    defaultValues: {
      request_type: RequestType.ToolsAndMachineBuy,
      bank: staffDetails?.bank_name,
      account_number: staffDetails?.account_number,
      account_name: staffDetails?.account_name,
    },
  });

  const handleSubmit = async (data: ToolsAndMachineBuyType) => {
    try {
      setIsLoading(true);
      const res = await api.put(`/requests/${formDetails?.id}`, {
        ...data,
        approved_by: username,
        approved_on: new Date(),
        status: "APPROVED",
        approved_unit_price: Number(data.approved_unit_price),
        approved_quantity: Number(data.approved_quantity),
        approved_amount:
          Number(data.approved_unit_price) * Number(data.approved_quantity),
        approved_total_amount:
          Number(data.approved_unit_price) * Number(data.approved_quantity),
      });
      if (res.status === 200 || res.status === 201) {
        setIsLoading(false);
        toast({
          title: "Request Approved",
          variant: "success",
        });
        // query.invalidateQueries({
        //   queryKey: ["get request details", formDetails?.id],
        // });
        window.location.reload();
        form.reset();
        onClose();
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Request creation failed",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    if (staffDetails) {
      form.setValue("bank", staffDetails?.bank_name);
      form.setValue("account_number", staffDetails?.account_number);
      form.setValue("account_name", staffDetails?.account_name);
    }
  }, [form, staffDetails]);

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
            placeholder={formDetails?.tool_machinery_type}
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
            items={["Online Transfer", "Pay to the Bank", "Cash", "Cheque"]}
          />
          <CustomFormField
            name="bank"
            control={form.control}
            label="Bank Name"
            disabled
            placeholder={staffDetails?.bank_name}
          />
          <CustomFormField
            name="account_name"
            control={form.control}
            label="Account Name"
            disabled
            placeholder={staffDetails?.account_name}
          />{" "}
          <CustomFormField
            name="account_number"
            control={form.control}
            label="Account number"
            disabled
            placeholder={staffDetails?.account_number}
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
          <Button
            variant="secondary"
            className="w-full"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full" disabled={isloading}>
            Approve request
          </Button>
        </div>
      </form>
    </Form>
  );
}
