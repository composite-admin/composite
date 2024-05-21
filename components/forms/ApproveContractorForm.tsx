import { useGetContractorProject } from "@/hooks/useSelectOptions";
import GoBack from "../shared/GoBack";
import FormContainer from "../shared/FormContainer";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "../shared/FormComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";
import { useToast } from "../ui/use-toast";

const EditContractorSchema = z.object({
  approved_amount: z.string().optional(),
  comment: z.string().optional(),
  status: z.string().optional(),
});

type IEditContractorForm = z.infer<typeof EditContractorSchema>;

export default function ApproveContractorForm({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const { projectDetails } = useGetContractorProject(id);
  const form = useForm<IEditContractorForm>({
    resolver: zodResolver(EditContractorSchema),
    defaultValues: {
      status: "pending",
    },
  });


const { mutate, error } = useMutation({
  mutationKey: ["editContractorForm", id],
  mutationFn: async (data: IEditContractorForm) => {
    try {
      const response = await api.put(`/contractor-projects/${id}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  },
  onSuccess: () => {
    toast({
      title: "Contractor approved successfully",
      variant: "success",
    });
    router.push("/contractors");
  },
  onError: (error: Error) => {
    toast({
      title: error.toString(),
      variant: "destructive",
    });
  },
});

const onSubmit = (data: IEditContractorForm) => {
  mutate(data);
};
return (
  <div>
    <GoBack />
    <FormContainer isColumn title="Pending Contractor Project">
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <CustomFormField
            control={form.control}
            name="project_name"
            placeholder={projectDetails?.contractor_project_code}
            disabled
            className="placeholder:uppercase"
            label="Project Name"
          />
          <CustomFormField
            control={form.control}
            name="contractor_name"
            placeholder={projectDetails?.contractor_code}
            disabled
            className="placeholder:uppercase"
            label="Contractor Name/Code"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <CustomFormField
              control={form.control}
              name="contractor_amount"
              placeholder={projectDetails?.contractor_amount}
              disabled
              className="placeholder:uppercase"
              label="Official amount"
            />{" "}
            <CustomFormField
              control={form.control}
              name="approved_amount"
              label="Approved amount"
            />
          </div>
          <CustomFormSelect
            name="status"
            control={form.control}
            items={["Pending", "Approved", "Declined"]}
            placeholder="Status"
            labelText="Status"
          />
          <CustomFormTextareaField
            name="comment"
            control={form.control}
            placeholder="Enter comment"
            label="Comment"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Button onClick={() => router.back()} variant="secondary">
              Cancel
            </Button>
            <Button>Submit</Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  </div>
);
}
