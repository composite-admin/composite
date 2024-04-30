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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";
// use teh names in the form
export const ToolsAndMachineRentSchema = z.object({
  request_type: z.nativeEnum(RequestType),
  project_name: z.string({
    required_error: "Project name is required",
  }),
  tool_name: z.string({
    required_error: "Tool type is required",
  }),
  company: z.string({
    required_error: "Company name is required",
  }),
  company_address: z.string({
    required_error: "Company address is required",
  }),
  contact_mobile: z.string({
    required_error: "Contact number is required",
  }),
  ofc_phone: z.string({
    required_error: "Office phone is required",
  }),
  contact_person: z.string({
    required_error: "Contact person is required",
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

type ToolsAndMachineRentType = z.infer<typeof ToolsAndMachineRentSchema>;

export default function ToolsAndMachineRent() {
  const { projectsData } = useProjectData();
  const { formDetails, onClose } = useUpdateRequestStore();
  const projectName = projectsData?.map((item: any) => item.project_name);
  const { userId } = userStore();
  const router = useRouter();
  const { toast } = useToast();
  const { staffDetails } = useGetStaffDetails(userId);
  const { inventories } = useGetAllInventoryTypes();
  const toolType = inventories?.map((item: any) => item?.type);
  const { setFormType } = useStaffStore();
  const form = useForm<ToolsAndMachineRentType>({
    resolver: zodResolver(ToolsAndMachineRentSchema),
    defaultValues: {
      request_type: RequestType.ToolsAndMachineRent,
      project_name: formDetails?.project_name,
      tool_name: formDetails?.tool_name,
      company: formDetails?.company,
      company_address: formDetails?.company_address,
      contact_mobile: formDetails?.contact_mobile,
      ofc_phone: formDetails?.ofc_phone,
      contact_person: formDetails?.contact_person,
      description: formDetails?.description,
      quantity: formDetails?.quantity as unknown as string,
      unit_price: formDetails?.unit_price as unknown as string,
      comment: formDetails?.comment,
    },
  });

  const handleSubmit = async (data: ToolsAndMachineRentType) => {
    try {
      const res = await api.put(`/requests/${formDetails?.id}`, {
        ...data,
        status: "PENDING",
        staff_id: staffDetails?.userid,
        staff_name: staffDetails?.firstname + " " + staffDetails?.lastname,
        quantity: Number(data.quantity),
        unit_price: Number(data.unit_price),
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
      toast({
        title: "Request creation failed",
        variant: "destructive",
      });
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
          items={[RequestType.ToolsAndMachineRent]}
        />
        <div className="py-4 w-full">
          <div className="flex flex-col lg:flex-row gap-4 items-center py-3">
            <div className="w-full flex flex-col gap-5">
              <CustomFormSelect
                name="project_name"
                control={form.control}
                labelText="Project"
                items={projectName || [" "]}
              />
              <CustomFormField
                name="company"
                control={form.control}
                label="Company"
                placeholder="Enter Company"
              />
              <CustomFormField
                name="ofc_phone"
                control={form.control}
                label="Company Phone"
                placeholder="Enter number"
              />
              <CustomFormField
                name="contact_mobile"
                control={form.control}
                label="Contact Number"
                placeholder="Enter number"
              />
              <CustomFormField
                name="quantity"
                control={form.control}
                label="quantity"
                placeholder="Enter quantity"
              />
            </div>

            <div className="w-full flex flex-col gap-5">
              <CustomFormSelect
                name="tool_name"
                control={form.control}
                labelText="Tool Type"
                items={toolType || [" "]}
              />

              <CustomFormField
                name="company_address"
                control={form.control}
                label="Company Address"
                placeholder="Enter Company Address"
              />
              <CustomFormField
                name="contact_person"
                control={form.control}
                label="Contact Person"
                placeholder="Enter full name"
              />
              <CustomFormField
                name="description"
                control={form.control}
                label="Item Description"
                placeholder="Enter description"
              />
              <CustomFormField
                name="unit_price"
                control={form.control}
                label="Unit Price"
                placeholder="Enter description"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 py-4">
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
