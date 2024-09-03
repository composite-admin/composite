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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { selectOptionsForConsultantsType } from "@/utils/types";
import { useGetAllConsultants } from "@/hooks/useSelectOptions";

const AddConsultantSchema = z.object({
  consultant_type: z.string().min(1, { message: "Select A Consultant Type" }),
  consultant: z.string().min(1, { message: "Select A Consultant" }),
});
type AddConsultantSchemaType = z.infer<typeof AddConsultantSchema>;

export default function AddConsultantForm() {
  const form = useForm<AddConsultantSchemaType>({
    resolver: zodResolver(AddConsultantSchema),
  });
  const queryClient = useQueryClient();
  const { watch } = form;
  const watchType = watch("consultant_type");
  const { consultants } = useGetAllConsultants();
  const filteredConsultants = consultants?.filter(
    (consultant: any) => consultant.type === watchType
  );
  const filteredConsultantNames = filteredConsultants?.map(
    (consultant: any) => consultant.name
  );
  const { toast } = useToast();
  const { onClose } = useProjectDetailsPageFormModal();
  const { projectName, projectId, projectCode } = useProjectDetails();
  const { mutate } = useMutation({
    mutationKey: ["add-consultant"],
    mutationFn: async (values: AddConsultantSchemaType) => {
      try {
        const response = await api.post("/consultant-projects", {
          ...values,
          project_id: projectId,
          project_code: projectCode,
          project_name: projectName,
          consultant_id: filteredConsultants?.find(
            (consultant: any) => consultant.name === values.consultant
          )?.consultant_code,
        });
        if (response.status === 201 || response.status === 200) {
          toast({
            title: "Consultant added successfully",
            variant: "success",
          });
        }
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        toast({
          variant: "destructive",
          title: "Error",
          description: axiosError.message || "An error occurred",
        });
      }
    },
  });
  const handleSubmit = (data: AddConsultantSchemaType) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        onClose();
        queryClient.invalidateQueries({
          queryKey: ["get all consultants by project code"],
        });
      },
    });
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(handleSubmit)}>
        <CustomFormField
          control={form.control}
          name="project_name"
          label="Project Name"
          placeholder={projectName}
          disabled
        />
        <CustomFormSelect
          control={form.control}
          name="consultant_type"
          labelText="Consultant Type"
          placeholder="Select Consultant Type"
          items={selectOptionsForConsultantsType || ["Loading..."]}
        />

        <CustomFormSelect
          control={form.control}
          name="consultant"
          labelText="consultant"
          placeholder="Select Consultant"
          items={filteredConsultantNames || [" "]}
          disabled={!watchType}
        />

        <div className="flex gap-4 flex-col lg:flex-row">
          <Button
            variant={"secondary"}
            className="w-full"
            type="button"
            onClick={onClose}>
            Cancel
          </Button>
          <Button className="w-full">Add</Button>
        </div>
      </form>
    </Form>
  );
}
