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
  project_name: z.string({
    required_error: "Project Name is required",
  }),
  supplier_name: z.string({
    required_error: "Supplier is required",
  }),
  supplier_material: z.string({
    required_error: "Material description is required",
  }),
  quantity: z.string({
    required_error: "Quantity is required",
  }),
  unit_price: z.string({
    required_error: "Unit price is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  comment: z.string({
    required_error: "Comment is required",
  }),
});

type CreateCashAdvanceOfficeType = z.infer<
  typeof createCashAdvanceOfficeSchema
>;

export default function Material() {
  const { projectsData } = useProjectData();
  const { formDetails, onClose } = useUpdateRequestStore();
  const projectName = projectsData?.map((item: any) => item.project_name);
  const { suppliers } = useGetAllSuppliers();
  const supplierList = suppliers?.map(
    (item: ISupplierData) => item.supplier_name
  );
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
      project_name: formDetails?.project_name,
      supplier_name: formDetails?.supplier_name,
      supplier_material: formDetails?.supplier_material,
      quantity: formDetails?.quantity as unknown as string,
      unit_price: formDetails?.unit_price as unknown as string,
      description: formDetails?.description,
      comment: formDetails?.comment,
    },
  });

  const watchSupplier = form.watch("supplier_name");
  const supplierCode = suppliers?.find(
    (item: any) => item.supplier_name === watchSupplier
  )?.supplier_code;

  const description = matDesc?.map((item: any) => item.description);

  useEffect(() => {
    if (watchSupplier) {
      const materialDescription = async () => {
        try {
          const response = await api.get(
            `/suppliers-materials/supplier/description?supplierCode=${supplierCode}`
          );

          setMatDesc(response.data.data);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
          } else {
            throw error;
          }
        }
      };

      materialDescription();
    }
  }, [supplierCode, watchSupplier]);

  const handleSubmit = async (data: CreateCashAdvanceOfficeType) => {
    try {
      const res = await api.put(`/requests/${formDetails?.id}`, {
        ...data,
        status: "PENDING",
        staff_id: staffDetails?.userid,
        staff_name: staffDetails?.firstname + " " + staffDetails?.lastname,
        unit_price: Number(data.unit_price),
        quantity: Number(data.quantity),
        total_price: Number(data.unit_price) * Number(data.quantity),
      });
      if (res.status === 200) {
        toast({
          title: "Request edited successfully",
          variant: "success",
        });
        form.reset();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CustomFormSelect
          name="request_type"
          control={form.control}
          labelText="Request Type"
          disabled
          items={[RequestType.Material]}
        />
        <div className="py-4 w-full">
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="w-full">
              <CustomFormSelect
                name="project_name"
                control={form.control}
                labelText="Project"
                items={projectName || ["Loading Projects"]}
              />
            </div>
            <div className="w-full">
              <CustomFormSelect
                name="supplier_name"
                control={form.control}
                labelText="Supplier"
                items={supplierList || ["Loading Suppliers"]}
              />
            </div>
          </div>
          <div className="flex flex-col py-3 gap-4 w-full">
            <CustomFormSelect
              name="supplier_material"
              control={form.control}
              labelText="Material Description"
              items={description || ["Loading Description"]}
              disabled={watchSupplier ? false : true}
            />
          </div>

          <div className="flex flex-col py-3 gap-5 w-full">
            <div className="flex items-center gap-3 w-full flex-col lg:flex-row">
              <div className="w-full">
                <CustomFormField
                  name="quantity"
                  placeholder="Enter Quantity"
                  control={form.control}
                  label="Quantity"
                />
              </div>
              <div className="w-full">
                <CustomFormField
                  name="unit_price"
                  placeholder="Enter amount"
                  control={form.control}
                  label="Unit Price"
                />
              </div>
            </div>
            <CustomFormTextareaField
              name="description"
              label="Description"
              control={form.control}
              placeholder="Enter Description"
            />
            <CustomFormTextareaField
              name="comment"
              label="Comment"
              control={form.control}
              placeholder="Enter Comment"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          <Button variant="secondary" className="w-full">
            Cancel
          </Button>
          <Button className="w-full">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
