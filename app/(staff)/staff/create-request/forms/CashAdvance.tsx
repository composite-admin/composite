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
import useStaffStore from "@/store/staff/useStaffStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export enum RequestType {
  Material = "Material",
  Labour = "labour",
  CashAdvanceProject = "Cash Advance Project",
  CashAdvanceOffice = "Cash Advance Office",
  ToolsAndMachineryBuy = "Tools and Machinery Buy",
  ToolsAndMachineryRent = "Tools and Machinery Rent",
  ToolsAndMachineryStore = "Tools and Machinery Store",
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
  const { toast } = useToast();
  const router = useRouter();
  const { projectsData } = useProjectData();
  const projectName = projectsData?.map((item: any) => item.project_name);
  const { setFormType } = useStaffStore();
  const form = useForm<CreateCashAdvanceOfficeType>({
    resolver: zodResolver(createCashAdvanceOfficeSchema),
    defaultValues: {
      request_type: RequestType.CashAdvanceProject,
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
      console.log(error);
      toast({
        title: "Request creation failed",
        variant: "destructive",
      });
    }
  };

  const { mutate } = useMutation({
    mutationFn: handleSubmit,
  });

  const onSubmit = (data: CreateCashAdvanceOfficeType) => {
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
            defaultValue="Cash Advance Project"
            onChange={(e: any) => setFormType(e.target.value)}
          >
            <option value="Material">Material</option>
            <option value="labour">Labour</option>
            <option value="Cash Advance Project">Cash Advance - Project</option>
            <option value="Cash Advance Office">Cash Advance - Office</option>
            <option value="Tools and Machinery Buy">
              Tools and Machinery - Buy
            </option>
            <option value="Tools and Machinery Rent">
              Tools and Machinery - Rent
            </option>
            <option value="Tools and Machinery Store">
              Tools and Machinery - Store
            </option>
          </select>
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
            <Button variant="secondary" className="w-full" type="button">
              Cancel
            </Button>
            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
}
