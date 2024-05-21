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
import {
  useProjectDetails,
  useProjectDetailsPageFormModal,
} from "@/store/project/useProjectModal";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useGetContractor } from "../../../hooks/useSelectOptions";

const AddContractorSchema = z.object({
  contractor_amount: z.string().optional(),
  contractor_name: z.string().optional(),
  createdBy: z.string().optional(),
  comment: z.string().optional(),
});

type AddContractorType = z.infer<typeof AddContractorSchema>;
export default function AddContractorForm() {
  const { onClose } = useProjectDetailsPageFormModal();
  const { projectName, projectId, projectCode } = useProjectDetails();
  const { toast } = useToast();
  const { contractors } = useGetContractor();
  const form = useForm<AddContractorType>({
    resolver: zodResolver(AddContractorSchema),
    defaultValues: {},
  });

  const contractorName = contractors?.map(
    (contractor: any) => contractor.contractor_name
  );
  const { mutate } = useMutation({
    mutationKey: ["add-stakeholder"],
    mutationFn: async (values: AddContractorType) => {
      try {
        const response = await api.post("/contractor-projects", {
          ...values,
          contractor_amount: Number(values.contractor_amount),
          contractor_code: contractors.find(
            (item: any) => item.contractor_name === values.contractor_name
          )?.contractor_code,
          contractor_project_code: projectCode,
          service: contractors.find(
            (item: any) => item.contractor_name === values.contractor_name
          )?.contractor_service,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log(error.response.data);
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
  });

  const handleSubmit = (data: AddContractorType) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        onClose();
        toast({
          title: "Contactor added successfully",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      },
    });
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
          name="contractor_name"
          labelText="Contractor"
          placeholder="Contractor"
          items={contractorName || ["fetching contractors..."]}
        />

        <CustomFormField
          name="contractor_amount"
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
