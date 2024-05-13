import {
  CustomFormField,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useClientStore, {
  useClientStoreModal,
} from "@/store/client/useClientStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormDataSchema = z.object({
  project_code: z.string(),
  project_name: z.string(),
  comment: z.string(),
  description: z.string(),
});

type Formtype = z.infer<typeof FormDataSchema>;
export default function AddCommentForm() {
  const { onClose } = useClientStoreModal();
  const { projectDetails } = useClientStore();

  const form = useForm<Formtype>({
    resolver: zodResolver(FormDataSchema),
  });

  const submit = (data: Formtype) => {
    console.log(data);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <CustomFormField
              name="project_code"
              control={form.control}
              label="Project Code"
              placeholder={projectDetails?.project_code}
              disabled
              className="placeholder:uppercase"
            />
            <CustomFormField
              name="project_name"
              control={form.control}
              label="Project Name"
              placeholder={projectDetails?.project_name}
              disabled
            />
          </div>
          <CustomFormField
            name="comment"
            control={form.control}
            label="Comment"
            placeholder="Comment"
          />
          <CustomFormTextareaField
            name="description"
            control={form.control}
            label="Description"
            placeholder="Description"
          />

          <div className="grid md:grid-cols-2 gap-5">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit"> Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
