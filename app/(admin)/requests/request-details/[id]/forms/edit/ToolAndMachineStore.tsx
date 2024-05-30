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
import { union, z } from "zod";
import { RequestType } from "./CashAdvance";
import { useInventoryStore } from "@/store/project/useProjectStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";

export const ToolsAndMachineStoreSchema = z.object({
  request_type: z.nativeEnum(RequestType),
  project_name: z.string({
    required_error: "Project name is required",
  }),

  quantity: z
    .string({
      required_error: "Quantity is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
  unit_price: z
    .string({
      required_error: "Unit price is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
  tool_machinery_type: z.string({
    required_error: "Tool description is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  tool_name: z.string({
    required_error: "Type is required",
  }),
  comment: z.string().optional(),
});

type ToolsAndMachineStoreType = z.infer<typeof ToolsAndMachineStoreSchema>;

export default function ToolsAndMachineStore() {
  const { projectsData } = useProjectData();
  const { formDetails, onClose } = useUpdateRequestStore();
  const { setFormType } = useStaffStore();
  const { userId } = userStore();
  const { staffDetails } = useGetStaffDetails(userId);
  const projectName = projectsData?.map((item: any) => item.project_name);
  const router = useRouter();
  const { inventories } = useGetAllInventoryTypes();
  const toolType = inventories?.map((item: any) => item?.type);
  const { setToolData, toolData } = useInventoryStore();
  const { toast } = useToast();
  const ToolDescription = toolData?.map((item: any) => item?.description);
  const form = useForm<ToolsAndMachineStoreType>({
    resolver: zodResolver(ToolsAndMachineStoreSchema),
    defaultValues: {
      request_type: RequestType.ToolsAndMachineryStore,
      project_name: formDetails?.project_name,
      quantity: formDetails?.quantity as unknown as string,
      unit_price: formDetails?.unit_price as unknown as string,
      tool_machinery_type: formDetails?.tool_machinery_type,
      description: formDetails?.description,
      tool_name: formDetails?.tool_name,
      comment: formDetails?.comment,
    },
  });
  const { watch } = form;
  const watchTools = watch("tool_name");

  useEffect(() => {
    const fetchToolDescription = async () => {
      if (watchTools) {
        try {
          const res = await api.get(`/inventory/type/all?type=${watchTools}`);
          if (res) {
            setToolData(res.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchToolDescription();
  }, [setToolData, watchTools]);

  const handleSubmit = async (data: ToolsAndMachineStoreType) => {
    try {
      const res = await api.put(`/requests/${formDetails?.id}`, {
        ...data,
        status: "PENDING",
        quantity: Number(data.quantity),
        unit_price: Number(data.unit_price),
      });
      if (res.status === 200 || res.status === 201) {
        toast({
          title: "Request Approved",
          variant: "success",
        });
        form.reset();
        onClose();
        window.location.reload();
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
          items={[RequestType.ToolsAndMachineryStore]}
        />
        <div className="py-4 w-full">
          <div className="grid md:grid-cols-2 gap-4 py-3">
            <CustomFormSelect
              name="project_name"
              labelText="Project"
              control={form.control}
              items={projectName || [" "]}
            />
            <CustomFormSelect
              name="tool_name"
              labelText="Type"
              control={form.control}
              items={toolType || [" "]}
            />
          </div>
          <CustomFormSelect
            name="tool_machinery_type"
            className="col-span-full"
            labelText="Tool Description"
            control={form.control}
            items={ToolDescription || [" "]}
          />
          <div className="grid md:grid-cols-2 gap-4 py-3">
            <CustomFormField
              name="quantity"
              control={form.control}
              label="Quantity"
              placeholder="Enter Quantity"
            />
            <CustomFormField
              name="unit_price"
              control={form.control}
              label="Unit Price"
              placeholder="Enter Unit Price"
            />
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
