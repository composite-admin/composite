import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import FormContainer from "@/components/shared/FormContainer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/config/api";
import { useProjectData } from "@/hooks/useSelectOptions";
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

export default function ToolsAndMachineStore() {
  const { projectsData } = useProjectData();
  const { formType, setFormType } = useStaffStore();
  const { userId } = userStore();
  const form = useForm<CreateCashAdvanceOfficeType>({
    resolver: zodResolver(createCashAdvanceOfficeSchema),
    defaultValues: {
      request_type: RequestType.ToolsAndMachineStore,
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
            <div className="flex flex-col lg:flex-row gap-4 items-center py-3">
              <div className="w-full">
                <div>
                  <CustomFormSelect
                    name="project"
                    labelText="Project"
                    control={form.control}
                    items={[" item1", " item2", " item3"]}
                  />
                </div>
                <div>
                  <CustomFormSelect
                    name="type"
                    labelText="Type"
                    control={form.control}
                    items={[" item1", " item2", " item3"]}
                  />
                </div>
              </div>
              <div className="w-full">
                <div>
                  <CustomFormField
                    name="quantity"
                    control={form.control}
                    label="Quantity"
                    placeholder="Enter Quantity"
                  />
                </div>
                <div>
                  <CustomFormField
                    name="unit_price"
                    control={form.control}
                    label="Unit Price"
                    placeholder="Enter Unit Price"
                  />
                </div>
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
