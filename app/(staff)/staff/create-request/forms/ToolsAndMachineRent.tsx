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

export default function ToolsAndMachineRent() {
  const { projectsData } = useProjectData();
  const { formType, setFormType } = useStaffStore();
  const { userId } = userStore();
  const form = useForm<CreateCashAdvanceOfficeType>({
    resolver: zodResolver(createCashAdvanceOfficeSchema),
    defaultValues: {
      request_type: RequestType.ToolsAndMachineRent,
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
            defaultValue="Tools and Machine Rent"
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
              <div className="w-full flex flex-col gap-5">
                <CustomFormSelect
                  name="project"
                  control={form.control}
                  labelText="Project"
                  items={["item1", "item2"]}
                />
                <CustomFormField
                  name="company"
                  control={form.control}
                  label="Company"
                  placeholder="Enter Company"
                />
                <CustomFormField
                  name="company_phone"
                  control={form.control}
                  label="Company Phone"
                  placeholder="Enter number"
                />
                <CustomFormField
                  name="contact_number"
                  control={form.control}
                  label="Contact Number"
                  placeholder="Enter number"
                />
                <CustomFormField
                  name="quantity"
                  control={form.control}
                  label="quantity"
                  placeholder="Enter quantity"
                />
              </div>

              <div className="w-full flex flex-col gap-5">
                <CustomFormSelect
                  name="tool_type"
                  control={form.control}
                  labelText="Tool Type"
                  items={["item1", "item2"]}
                />

                <CustomFormField
                  name="company_address"
                  control={form.control}
                  label="Company Address"
                  placeholder="Enter Company Address"
                />
                <CustomFormField
                  name="contact_person"
                  control={form.control}
                  label="Contact Person"
                  placeholder="Enter full name"
                />
                <CustomFormField
                  name="item_description"
                  control={form.control}
                  label="Item Description"
                  placeholder="Enter description"
                />
                <CustomFormField
                  name="unit_person"
                  control={form.control}
                  label="Unit Price"
                  placeholder="Enter description"
                />
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
