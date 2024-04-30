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
  useGetAllSuppliers,
  useGetStaffDetails,
  useProjectData,
} from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import useStaffStore from "@/store/staff/useStaffStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RequestType } from "./CashAdvance";
import { ISupplierData } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";

export const createCashAdvanceOfficeSchema = z.object({
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
  bank_name: z.string({
    required_error: "Bank name is required",
  }),
  supervisor_comment: z.string({
    required_error: "Comment is required",
  }),
});

type CreateCashAdvanceOfficeType = z.infer<
  typeof createCashAdvanceOfficeSchema
>;

export default function Material() {
  const { projectsData } = useProjectData();
  const { formDetails } = useUpdateRequestStore();

  const { formType, setFormType } = useStaffStore();
  const { toast } = useToast();
  const router = useRouter();
  const [matDesc, setMatDesc] = useState<string[]>([]);
  const { userId } = userStore();
  const { staffDetails } = useGetStaffDetails(userId);
  const form = useForm<CreateCashAdvanceOfficeType>({
    resolver: zodResolver(createCashAdvanceOfficeSchema),
    defaultValues: {
      request_type: RequestType.Material,
    },
  });

  const description = matDesc?.map((item: any) => item.description);

  const handleSubmit = async (data: CreateCashAdvanceOfficeType) => {
    try {
      const res = await api.put(`/requests/${formDetails?.id}`, {
        ...data,
        status: "APPROVED",
        approved_unit_price: Number(data.approved_unit_price),
        approved_quantity: Number(data.approved_quantity),
        approved_total_price:
          Number(data.approved_unit_price) * Number(data.approved_quantity),
      });
      console.log(res);
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
        <div className="py-4 w-full">
          <div className="flex flex-col lg:flex-row gap-4 w-full pb-3">
            <div className="w-full">
              <CustomFormField
                name="supplier_name"
                control={form.control}
                placeholder={formDetails?.supplier_name}
                label="Supplier Name"
                disabled
              />
            </div>
            <div className="w-full">
              <CustomFormField
                name="supplier_material"
                control={form.control}
                placeholder={formDetails?.supplier_material}
                label="Material Description"
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="w-full">
              <CustomFormField
                name="quantity"
                control={form.control}
                placeholder={String(formDetails?.quantity)}
                label="Requested Quantity"
                disabled
              />
            </div>
            <div className="w-full">
              <CustomFormField
                name="unit_price"
                control={form.control}
                placeholder={String(formDetails?.unit_price)}
                label="Requested Unit Price"
                disabled
              />
            </div>
          </div>

          <div className="flex flex-col py-3 gap-5 w-full">
            <div className="flex items-center gap-3 w-full flex-col lg:flex-row">
              <div className="w-full">
                <CustomFormField
                  name="approved_quantity"
                  placeholder="Enter Quantity"
                  control={form.control}
                  label="Approved Quantity"
                />
              </div>
              <div className="w-full">
                <CustomFormField
                  name="approved_unit_price"
                  placeholder="Enter amount"
                  control={form.control}
                  label="Approved Unit Price"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 pb-3">
            <CustomFormSelect
              name="payment_method"
              control={form.control}
              labelText="Select Payment Method"
              items={["Online Transfer", "Paid at the Bank", "Cash", "Cheque"]}
            />
            <CustomFormField
              name="bank_name"
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
