import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import FormContainer from "@/components/shared/FormContainer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
});

type CreateCashAdvanceOfficeType = z.infer<
  typeof createCashAdvanceOfficeSchema
>;

export default function ToolsAndMachineStore() {
  const { formType, setFormType } = useStaffStore();
  const form = useForm<CreateCashAdvanceOfficeType>({
    resolver: zodResolver(createCashAdvanceOfficeSchema),
    defaultValues: {
      requestType: "tools_and_machine_store",
    },
  });

  return (
    <FormContainer
      title="New Request"
      description=""
      isColumn={true}
      className="w-full max-w-[50rem]"
    >
      <Form {...form}>
        <form>
          <select
            id="requestType"
            {...form.register("requestType")}
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
