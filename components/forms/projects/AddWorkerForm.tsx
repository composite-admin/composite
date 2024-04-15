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

const AddWorkerSchema = z.object({});
type AddWorkerSchemaType = z.infer<typeof AddWorkerSchema>;

export default function AddWorkerForm() {
  const form = useForm<AddWorkerSchemaType>({
    resolver: zodResolver(AddWorkerSchema),
  });

  const { toast } = useToast();
  const { projectName, onClose } = useProjectDetailsPageFormModal();

  const handleSubmit = async (values: AddWorkerSchemaType) => {
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
        <CustomFormSelect
          control={form.control}
          name="service_type"
          labelText="Service Type"
          placeholder="Service Type"
          items={["Option 1", "Option 2", "Option 3"]}
        />

        <CustomFormSelect
          control={form.control}
          name="worker"
          labelText="Worker"
          placeholder="Worker"
          items={["Option 1", "Option 2", "Option 3"]}
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
