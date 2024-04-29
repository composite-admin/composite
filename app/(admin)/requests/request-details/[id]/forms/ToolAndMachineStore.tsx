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
import { userStore } from "@/store/auth/AuthStore";
import useStaffStore from "@/store/staff/useStaffStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

  quantity: z.string({
    required_error: "Quantity is required",
  }),
  unit_price: z.string({
    required_error: "Unit price is required",
  }),
  tool_description: z.string({
    required_error: "Tool description is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  type: z.string({
    required_error: "Type is required",
  }),
  comment: z.string({
    required_error: "Comment is required",
  }),
});

type ToolsAndMachineStoreType = z.infer<typeof ToolsAndMachineStoreSchema>;

export default function ToolsAndMachineStore() {
  const { projectsData } = useProjectData();
  const { formDetails } = useUpdateRequestStore();
  console.log(formDetails);
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
      request_type: RequestType.ToolsAndMachineStore,
    },
  });
  const { watch } = form;
  const watchTools = watch("type");

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
          <div className="grid md:grid-cols-2 gap-4 py-3">
            <CustomFormSelect
              name="project_name"
              labelText="Project"
              control={form.control}
              items={projectName || [" "]}
            />
            <CustomFormSelect
              name="type"
              labelText="Type"
              control={form.control}
              items={toolType || [" "]}
            />
          </div>
          <CustomFormSelect
            name="tool_description"
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
