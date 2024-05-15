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
import { useMutation } from "@tanstack/react-query";
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
  contact_mobile: z
    .string({
      required_error: "Contact number is required",
    })
    .regex(/^\d*$/, "Please enter a valid phone number"),
  ofc_phone: z
    .string({
      required_error: "Office phone is required",
    })
    .regex(/^\d*$/, "Please enter a valid phone number"),
  contact_person: z.string({
    required_error: "Contact person is required",
  }),
  tool_machinery_type: z.string({
    required_error: "Item description is required",
  }),
  quantity: z
    .string({
      required_error: "Quantity is required",
    })
    .regex(/^\d+$/, "Must be a number"),
  unit_price: z
    .string({
      required_error: "Unit price is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
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
    },
  });

  const handleSubmit = async (data: ToolsAndMachineRentType) => {
    try {
      const res = await api.post("/requests", {
        ...data,
        status: "PENDING",
        staff_id: staffDetails?.userid,
        staff_name: staffDetails?.firstname + " " + staffDetails?.lastname,
        quantity: Number(data.quantity),
        unit_price: Number(data.unit_price),
        project_code: projectsData?.find(
          (item: any) => item.project_name === data.project_name
        )?.project_code,
      });
      if (res.status === 201) {
        toast({
          title: "Request created successfully",
          variant: "success",
        });
        form.reset();
        router.push("/staff/requests");
      }
    } catch (error) {
      toast({
        title: "Request creation failed",
        variant: "destructive",
      });
    }
  };

  const { mutate } = useMutation({
    mutationFn: handleSubmit,
  });

  const onSubmit = (data: ToolsAndMachineRentType) => {
    mutate(data);
  };

  return (
    <FormContainer
      title="New Request"
      description=""
      isColumn={true}
      className="w-full max-w-[50rem]"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <select
            id="request_type"
            {...form.register("request_type")}
            defaultValue="Tools and Machine Rent"
            onChange={(e: any) => setFormType(e.target.value)}
          >
            <option value="Material">Material</option>
            <option value="Labour">Labour</option>
            <option value="Cash Advance Project">Cash Advance - Project</option>
            <option value="Cash Advance Office">Cash Advance - Office</option>
            <option value="Tools and Machine Buy">
              Tools and Machines - Buy
            </option>
            <option value="Tools and Machine Rent">
              Tools and Machines - Rent
            </option>
            <option value="Tools and Machine Store">
              Tools and Machines - Store
            </option>
          </select>
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
                  name="tool_machinery_type"
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
    </FormContainer>
  );
}
