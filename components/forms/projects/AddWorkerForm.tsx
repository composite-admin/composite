import {
  CustomFormField,
  CustomFormSelect,
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
import { selectOtionsForWorkerServiceType } from "@/utils/types";

const AddWorkerSchema = z.object({});
type AddWorkerSchemaType = z.infer<typeof AddWorkerSchema>;

export default function AddWorkerForm() {
  const form = useForm<AddWorkerSchemaType>({
    resolver: zodResolver(AddWorkerSchema),
  });

  const { toast } = useToast();
  const { onClose } = useProjectDetailsPageFormModal();
  const { projectName, projectId, projectCode } = useProjectDetails();

console.log(projectCode);

const { mutate } = useMutation({
  mutationKey: ["add-stakeholder"],
  mutationFn: async (values: AddWorkerSchemaType) => {
    try {
      const response = await api.post("/stakeholder-project", {
        ...values,
        project_code: projectCode,
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

  const handleSubmit = (data: AddWorkerSchemaType) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        onClose();
        toast({
          title: "Worker has been added successfully",
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
          name="service_type"
          labelText="Service Type"
          placeholder="Service Type"
          items={selectOtionsForWorkerServiceType || ["Loading..."]}
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
