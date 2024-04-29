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
import { object, z } from "zod";

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
  amount: z.number({
    required_error: "Amount is required",
  }),
  purpose: z.string({
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
  const { formDetails } = useUpdateRequestStore();
  console.log(formDetails);
  const { userId } = userStore();
  const { staffDetails } = useGetStaffDetails(userId);
  const { toast } = useToast();
  const router = useRouter();
  const { projectsData } = useProjectData();
  const projectName = projectsData?.map((item: any) => item.project_name);
  const { setFormType } = useStaffStore();
  const form = useForm<CreateCashAdvanceOfficeType>({
    resolver: zodResolver(createCashAdvanceOfficeSchema),
    defaultValues: {
      request_type: RequestType.CashAdvanceProject,
      amount: formDetails?.amount,
    },
  });

  const handleSubmit = async (data: CreateCashAdvanceOfficeType) => {
    try {
      const res = await api.post("/requests", {
        ...data,
        status: "PENDING",
        staff_id: staffDetails?.userid,
        staff_name: staffDetails?.firstname + " " + staffDetails?.lastname,
        amount: Number(data.amount),
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
          <div className="w-full space-y-4">
            <CustomFormField
              name="amount"
              label="Amount"
              control={form.control}
              placeholder="Enter Amount"
              disabled
            />

            <CustomFormField
              name="approved_amount"
              label="Approved Amount"
              control={form.control}
              placeholder="Enter Amount"
            />
          </div>
          <div className="flex flex-col py-3 gap-4 w-full">
            <CustomFormTextareaField
              name="reply"
              label="Description"
              control={form.control}
              placeholder="Enter Description"
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
