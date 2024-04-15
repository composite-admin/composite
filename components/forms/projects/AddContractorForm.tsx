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

const AddContractorSchema = z.object({});

type AddContractorType = z.infer<typeof AddContractorSchema>;
export default function AddContractorForm() {
  const { projectName, projectCode, onClose } =
    useProjectDetailsPageFormModal();
  const { toast } = useToast();

  const form = useForm<AddContractorType>({
    resolver: zodResolver(AddContractorSchema),
    defaultValues: {
      project_name: projectName,
    },
  });

  const handleSubmit = async (values: AddContractorType) => {
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
          placeholder="Project Name"
          disabled
        />
        <CustomFormSelect
          control={form.control}
          name="contractor"
          labelText="Contractor"
          placeholder="Contractor"
          items={["Option 1", "Option 2", "Option 3"]}
        />

        <CustomFormField
          name="amount"
          control={form.control}
          label="Amount"
          placeholder="Enter Amount"
        />

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
