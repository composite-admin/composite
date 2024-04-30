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
  approved_quantity: z.string({
    required_error: "Quantity is required",
  }),
  supervisor_comment: z.string({
    required_error: "Comment is required",
  }),
});

type ToolsAndMachineStoreType = z.infer<typeof ToolsAndMachineStoreSchema>;

export default function ToolsAndMachineStore() {
  const { projectsData } = useProjectData();
  const { formDetails } = useUpdateRequestStore();
  const { userId } = userStore();
  const { staffDetails } = useGetStaffDetails(userId);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<ToolsAndMachineStoreType>({
    resolver: zodResolver(ToolsAndMachineStoreSchema),
    defaultValues: {
      request_type: RequestType.ToolsAndMachineStore,
    },
  });

  const handleSubmit = async (data: ToolsAndMachineStoreType) => {
    try {
      const res = await api.put(`/requests/${formDetails?.id}`, {
        ...data,
        status: "APPROVED",
        approved_quantity: Number(data.approved_quantity),
      });
      if (res.status === 201) {
        toast({
          title: "Request Approved",
          variant: "success",
        });
        form.reset();
        router.refresh();
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

        <CustomFormField
          name="tool_name"
          control={form.control}
          label="Tool Name"
          disabled
          placeholder={formDetails?.tool_name}
        />
        <div className="py-4 w-full">
          <div className="grid md:grid-cols-2 gap-4 py-3">
            <CustomFormField
              name="quantity"
              control={form.control}
              label="Quantity"
              placeholder="Enter Quantity"
            />
            <CustomFormField
              name="approved_quantity"
              control={form.control}
              label="Approved Quantity"
              placeholder="Enter Quantity"
            />
          </div>

          <div className="flex flex-col gap-4 py-4">
            <CustomFormTextareaField
              name="supervisor_comment"
              label="Approval Comment"
              control={form.control}
              placeholder="Enter Comment"
            />
          </div>
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
