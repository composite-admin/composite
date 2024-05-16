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
import { useMutation } from "@tanstack/react-query";

export const ToolsAndMachineStoreSchema = z.object({
  request_type: z.nativeEnum(RequestType),
  project_name: z.string({
    required_error: "Project name is required",
  }),

  quantity: z.string({
    required_error: "Quantity is required",
  }),

  tool_machinery_type: z.string({
    required_error: "Tool description is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  tool_name: z.string({
    required_error: "Type is required",
  }),
  comment: z.string({
    required_error: "Comment is required",
  }),
});

type ToolsAndMachineStoreType = z.infer<typeof ToolsAndMachineStoreSchema>;

export default function ToolsAndMachineStore() {
  const { projectsData } = useProjectData();
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
      const res = await api.post("/requests", {
        ...data,
        status: "PENDING",
        staff_id: staffDetails?.userid,
        staff_name: staffDetails?.firstname + " " + staffDetails?.lastname,
        quantity: Number(data.quantity),
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

  const onSubmit = (data: ToolsAndMachineStoreType) => {
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
            defaultValue="Tools and Machine Store"
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
            <CustomFormField
              name="quantity"
              control={form.control}
              label="Quantity"
              placeholder="Enter Quantity"
            />

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
