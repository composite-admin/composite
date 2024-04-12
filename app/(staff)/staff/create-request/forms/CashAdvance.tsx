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

export const createCashAdvanceOfficeSchema = z.object({
  requestType: z.enum([
    "material",
    "labour",
    "cash_advance_project",
    "cash_advance_office",
    "tools_and_machine_buy",
    "tools_and_machine_rent",
    "tools_and_machine_store",
  ]),
  project_name: z.string().optional(),
  amount: z.number().optional(),
  purpose: z.string().optional(),
  description: z.string().optional(),
  comment: z.string().optional(),
});

type CreateCashAdvanceOfficeType = z.infer<
  typeof createCashAdvanceOfficeSchema
>;

export default function CashAdvance() {
  const { projectsData } = useProjectData();
  const { formType, setFormType } = useStaffStore();
  const { userId } = userStore();
  const form = useForm<CreateCashAdvanceOfficeType>({
    resolver: zodResolver(createCashAdvanceOfficeSchema),
    defaultValues: {
      requestType: "cash_advance_project",
      project_name: "",
      amount: 0,
      purpose: "",
      description: "",
      comment: "",
    },
  });

  const projectName = projectsData?.map((item: any) => item.project_name);

  const handleSubmit = async (data: CreateCashAdvanceOfficeType) => {
    try {
      const res = await api.post("/requests", {
        ...data,
        staff_id: "10",
        staff_name: "bola@composite",
        status: "PENDING",
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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
            id="requestType"
            {...form.register("requestType")}
            defaultValue="cash_advance_project"
            onChange={(e: any) => setFormType(e.target.value)}
          >
            <option value="material">Material</option>
            <option value="labour">Labour</option>
            <option value="cash_advance_project">Cash Advance - Project</option>
            <option value="cash_advance_office">Cash Advance - Office</option>
            <option value="tools_and_machine_buy">
              Tools and Machines - Buy
            </option>
            <option value="tools_and_machine_rent">
              Tools and Machines - Rent
            </option>
            <option value="tools_and_machine_store">
              Tools and Machines - Store
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
                  type="number"
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
