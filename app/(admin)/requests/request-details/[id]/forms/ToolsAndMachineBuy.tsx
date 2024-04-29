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
  request_from: z.string({
    required_error: "Request from is required",
  }),
  project_name: z.string({
    required_error: "Project name is required",
  }),
  tool_type: z.string({
    required_error: "Tool type is required",
  }),
  company: z.string({
    required_error: "Company name is required",
  }),
  company_address: z.string({
    required_error: "Company address is required",
  }),
  contact_number: z.string({
    required_error: "Contact number is required",
  }),
  ofc_phone: z.string({
    required_error: "Office phone is required",
  }),
  contact_person: z.string({
    required_error: "Contact person is required",
  }),
  item_description: z.string({
    required_error: "Item description is required",
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

type ToolsAndMachineBuyType = z.infer<typeof ToolsAndMachineBuySchema>;

export default function ToolsAndMachineBuy() {
  const { formDetails } = useUpdateRequestStore();
  console.log(formDetails);
  const { projectsData } = useProjectData();
  const router = useRouter();
  const { toast } = useToast();
  const projectName = projectsData?.map((item: any) => item.project_name);
  const { userId } = userStore();
  const { staffDetails } = useGetStaffDetails(userId);
  const { inventories } = useGetAllInventoryTypes();
  const toolType = inventories?.map((item: any) => item?.type);
  const { formType, setFormType } = useStaffStore();
  const form = useForm<ToolsAndMachineBuyType>({
    resolver: zodResolver(ToolsAndMachineBuySchema),
    defaultValues: {
      request_type: RequestType.ToolsAndMachineBuy,
      project_name: formDetails?.project_name,
      tool_type: formDetails?.tool_name,
      description: formDetails?.description,
    },
  });

  const handleSubmit = async (data: ToolsAndMachineBuyType) => {
    try {
      const res = await api.post("/requests", {
        ...data,
        status: "PENDING",
        staff_id: staffDetails?.userid,
        staff_name: staffDetails?.firstname + " " + staffDetails?.lastname,
        quantity: Number(data.quantity),
        unit_price: Number(data.unit_price),
      });
      if (res.status === 201) {
        toast({
          title: "Request created successfully",
          variant: "success",
        });
        form.reset();
        router.push("/staff/create-request");
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
        <div className="grid md:grid-cols-2 gap-5">
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
        </div>
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
                name="contact_number"
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
                name="tool_type"
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
                name="item_description"
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
