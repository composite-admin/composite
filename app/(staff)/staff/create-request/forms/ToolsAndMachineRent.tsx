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

export default function ToolsAndMachineRent() {
  const { formType, setFormType } = useStaffStore();
  const form = useForm<CreateCashAdvanceOfficeType>({
    resolver: zodResolver(createCashAdvanceOfficeSchema),
    defaultValues: {
      requestType: "tools_and_machine_rent",
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
