import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useProjectDetailsPageFormModal } from "@/store/project/useProjectModal";
import { Button } from "@/components/ui/button";

const AddMaterialSchema = z.object({});
type AddMaterialType = z.infer<typeof AddMaterialSchema>;

export default function AddMaterialForm() {
  const form = useForm<AddMaterialType>({
    resolver: zodResolver(AddMaterialSchema),
  });
  const { toast } = useToast();
  const { projectName, onClose } = useProjectDetailsPageFormModal();

  const handleSubmit = async (values: AddMaterialType) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <CustomFormField
          control={form.control}
          name="project_name"
          label="Project Name"
          placeholder={projectName}
          disabled
        />
        <div className=" grid lg:grid-cols-2 gap-5">
          <div className="space-y-5">
            <CustomFormSelect
              control={form.control}
              name="supplier"
              labelText="Supplier"
              placeholder="Select Supplier"
              items={["Option 1", "Option 2", "Option 3"]}
            />
            <CustomFormField
              control={form.control}
              name="unit_price"
              label="Unit Price"
              placeholder="Enter Amount"
            />
          </div>
          <div className="space-y-5">
            <CustomFormSelect
              control={form.control}
              name="material_description"
              labelText="Material Description"
              placeholder="Material Description"
              items={["Option 1", "Option 2", "Option 3"]}
            />

            <CustomFormSelect
              control={form.control}
              name="payment_mode"
              labelText="Payment Mode"
              placeholder="Payment Mode"
              items={["Option 1", "Option 2", "Option 3"]}
            />
          </div>
        </div>
        <CustomFormTextareaField
          control={form.control}
          name="comment"
          label="Comment"
          placeholder="Comment"
        />

        <div className="flex gap-4 flex-col lg:flex-row">
          <Button variant={"secondary"} className="w-full" onClick={onClose}>
            Cancel
          </Button>
          <Button className="w-full">Add</Button>
        </div>
      </form>
    </Form>
  );
}
