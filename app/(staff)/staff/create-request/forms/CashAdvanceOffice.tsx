import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import FormContainer from "@/components/shared/FormContainer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/config/api";
import { useProjectData } from "@/hooks/useTenantsAndFlat";
import useAuthStore, { userStore } from "@/store/auth/AuthStore";
import useStaffStore from "@/store/staff/useStaffStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RequestType } from "./CashAdvance";

export const createCashAdvanceOfficeSchema = z.object({
  request_type: z.nativeEnum(RequestType),
  project_name: z.string().optional(),
  amount: z.string().optional(),
  purpose: z.string().optional(),
  description: z.string().optional(),
  comment: z.string().optional(),
});

type CreateCashAdvanceOfficeType = z.infer<
  typeof createCashAdvanceOfficeSchema
>;

export default function CashAdvanceOffice() {
  const { projectsData } = useProjectData();
  const { formType, setFormType } = useStaffStore();
  const { userId } = userStore();
  const form = useForm<CreateCashAdvanceOfficeType>({
    resolver: zodResolver(createCashAdvanceOfficeSchema),
    defaultValues: {
      request_type: RequestType.CashAdvanceOffice,
      project_name: "",
      amount: "",
      purpose: "",
      description: "",
      comment: "",
    },
  });

  const projectName = projectsData?.map((item: any) => item.project_name);

  const handleSubmit = async (data: CreateCashAdvanceOfficeType) => {
    // try {
    //   const res = await api.post("/requests", {
    //     ...data,
    //     staff_id: "10",
    //     staff_name: "bola@composite",
    //     status: "PENDING",
    //     amount: Number(data.amount),
    //   });
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
    console.log(data);
  };

  return (
    <FormContainer
      title="New Request"
      description=""
      isColumn={true}
      className="w-full max-w-[50rem]"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <select
            id="request_type"
            {...form.register("request_type")}
            defaultValue="Cash Advance Office"
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
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <div className="w-full">
                <CustomFormField
                  name="project_name"
                  label="Project Name"
                  control={form.control}
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
                name="purpose"
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
    </FormContainer>
  );
}
