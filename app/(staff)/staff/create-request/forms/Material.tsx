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
  supplier: z.string().optional(),
  material_description: z.string().optional(),
  quantity: z.string().optional(),
  unit_price: z.string().optional(),
  description: z.string().optional(),
  comment: z.string().optional(),
});

type CreateCashAdvanceOfficeType = z.infer<
  typeof createCashAdvanceOfficeSchema
>;

export default function Material() {
  const { projectsData } = useProjectData();
  const projectName = projectsData?.map((item: any) => item.project_name);
  const { formType, setFormType } = useStaffStore();
  const { userId } = userStore();
  const form = useForm<CreateCashAdvanceOfficeType>({
    resolver: zodResolver(createCashAdvanceOfficeSchema),
    defaultValues: {
      request_type: RequestType.Material,
      project_name: "",
      supplier: "",
      material_description: "",
      quantity: "",
      unit_price: "",
      description: "",
      comment: "",
    },
  });

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
    <FormContainer title="New Request" description="" isColumn={true}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <select
            id="request_type"
            {...form.register("request_type")}
            defaultValue="Material"
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
                <CustomFormSelect
                  name="project"
                  control={form.control}
                  labelText="Project"
                  items={projectName && projectName}
                />
              </div>
              <div className="w-full">
                <CustomFormSelect
                  name="worker"
                  control={form.control}
                  labelText="Worker"
                  items={["item1", "item2"]}
                />
              </div>
            </div>
            <div className="flex flex-col py-3 gap-4 w-full">
              <CustomFormSelect
                name="material_description"
                control={form.control}
                labelText="Material Description"
                items={["item1", "item2"]}
              />
            </div>

            <div className="flex flex-col py-3 gap-5 w-full">
              <div className="flex items-center gap-3 w-full flex-col lg:flex-row">
                <div className="w-full">
                  <CustomFormField
                    name="qunatity"
                    placeholder="Enter Quantity"
                    control={form.control}
                    label="Quantity"
                  />
                </div>
                <div className="w-full">
                  <CustomFormField
                    name="unit_price"
                    placeholder="Enter amount"
                    control={form.control}
                    label="Unit Price"
                  />
                </div>
              </div>
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
