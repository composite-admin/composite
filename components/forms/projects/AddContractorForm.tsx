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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const AddContractorSchema = z.object({
  contractor_code: z.string().optional(),
  contractor_project_code: z.string().optional(),
  contractor_amount: z.string().optional(),
  service: z.string().optional(),
  createdBy: z.string().optional(),
  comment: z.string().optional(),
});

type AddContractorType = z.infer<typeof AddContractorSchema>;
export default function AddContractorForm() {
  const { projectName, projectCode, onClose } =
    useProjectDetailsPageFormModal();
  const { toast } = useToast();

  const form = useForm<AddContractorType>({
    resolver: zodResolver(AddContractorSchema),
    defaultValues: {},
  });

  const { mutate } = useMutation({
    mutationKey: ["add-stakeholder"],
    mutationFn: async (values: AddContractorType) => {
      try {
        const response = await api.post("/contractor-projects", {
          ...values,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
  });

  const handleSubmit = (data: AddContractorType) => {
    // mutate(data, {
    //   onSuccess: () => {
    //     form.reset();
    //     onClose();
    //     toast({
    //       title: "Start up cost added successfully",
    //       variant: "success",
    //     });
    //   },
    //   onError: () => {
    //     toast({
    //       title: "Something went wrong",
    //       variant: "destructive",
    //     });
    //   },
    // });
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
