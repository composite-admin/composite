import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import FormContainer from "@/components/shared/FormContainer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useGetStaffDetails, useProjectData } from "@/hooks/useSelectOptions";
import useAuthStore, { userStore } from "@/store/auth/AuthStore";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";
import useStaffStore from "@/store/staff/useStaffStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export enum RequestType {
  Material = "Material",
  Labour = "Labour",
  CashAdvanceProject = "Cash Advance Project",
  CashAdvanceOffice = "Cash Advance Office",
  ToolsAndMachineBuy = "Tools and Machine Buy",
  ToolsAndMachineRent = "Tools and Machine Rent",
  ToolsAndMachineStore = "Tools and Machine Store",
}

export const createCashAdvanceOfficeSchema = z.object({
  request_type: z.nativeEnum(RequestType),
  project_name: z.string({
    required_error: "Project Name is required",
  }),
  amount: z.string({
    required_error: "Amount is required",
  }),
  cash_advance_purpose: z.string({
    required_error: "Purpose is required",
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

export default function CashAdvance() {
  const { userId } = userStore();
  const { staffDetails } = useGetStaffDetails(userId);
  const { formDetails, onClose } = useUpdateRequestStore();
  const { toast } = useToast();
  const router = useRouter();
  const { projectsData } = useProjectData();
  const projectName = projectsData?.map((item: any) => item.project_name);
  const form = useForm<CreateCashAdvanceOfficeType>({
    resolver: zodResolver(createCashAdvanceOfficeSchema),
    defaultValues: {
      request_type: RequestType.CashAdvanceProject,
      project_name: formDetails?.project_name,
      amount: formDetails?.amount as unknown as string,
      cash_advance_purpose: formDetails?.cash_advance_purpose,
      description: formDetails?.description,
      comment: formDetails?.comment,
    },
  });

  const handleSubmit = async (data: CreateCashAdvanceOfficeType) => {
    try {
      const res = await api.put(`/requests/${formDetails?.id}`, {
        ...data,
        status: "PENDING",
        amount: Number(data.amount),
      });
      if (res.status === 200) {
        toast({
          title: "Request edited successfully",
          variant: "success",
        });
        form.reset();
        router.refresh();
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
          items={[RequestType.CashAdvanceProject]}
        />
        <div className="py-4 w-full">
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="w-full">
              <CustomFormSelect
                name="project_name"
                labelText="Project Name"
                control={form.control}
                items={projectName || []}
                placeholder="Enter Project Name"
              />
            </div>
            <div className="w-full">
              <CustomFormField
                name="amount"
                label="Amount"
                control={form.control}
                placeholder="Enter Amount"
              />
            </div>
          </div>
          <div className="flex flex-col py-3 gap-4 w-full">
            <CustomFormField
              name="cash_advance_purpose"
              label="Purpose"
              control={form.control}
              placeholder="Enter Purpose"
            />
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
