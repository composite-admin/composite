import {
  CustomFormField,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useGetClientDetails } from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import useClientStore, {
  useClientStoreModal,
} from "@/store/client/useClientStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormDataSchema = z.object({
  comment: z.string(),
  description: z.string(),
});

type Formtype = z.infer<typeof FormDataSchema>;
export default function AddCommentForm() {
  const { onClose } = useClientStoreModal();
  const { projectDetails } = useClientStore();
  const { userId } = userStore();
  const { toast } = useToast();

  const { details, isClientDetailsLoading } = useGetClientDetails(userId!);

  const form = useForm<Formtype>({
    resolver: zodResolver(FormDataSchema),
  });

  const { mutate } = useMutation({
    mutationKey: ["Add client comment to project"],
    mutationFn: async (data: Formtype) => {
      try {
        const res = await api.post("/project-comments", {
          ...data,
          project_code: projectDetails?.project_code,
          sender_name: details?.first_name! + " " + details?.last_name,
        });
        if (res.status === 200) {
          onClose();
          toast({
            title: "Comment Added to Project",
            variant: "success",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const submit = (data: Formtype) => {
    mutate(data);
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
          <CustomFormTextareaField
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
