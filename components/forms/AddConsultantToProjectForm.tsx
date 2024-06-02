import useConsultantStore from "@/store/consultants/useConsultantStore";
import { AvatarComponent } from "../shared/AvatarComponent";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormSelect } from "../shared/FormComponent";
import { useProjectData } from "../../hooks/useSelectOptions";
import { IProjectData } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useAddToProjectModal } from "@/store/modals/useCreateModal";

const AddConsultantToProjectSchema = z.object({
  project_name: z.string({
    required_error: "Select A project",
  }),
});
export type AddConsultantToProjectFormSchema = z.infer<
  typeof AddConsultantToProjectSchema
>;
export default function AddConsultantToProjectForm({
  id,
}: {
  id: number | string | undefined;
}) {
  const form = useForm({
    resolver: zodResolver(AddConsultantToProjectSchema),
    defaultValues: {
      project_name: "",
    },
  });
  const { toast } = useToast();
  const { onClose } = useAddToProjectModal();
  const router = useRouter();
  const watchProjectName = form.watch("project_name");
  const { consultantDetailsData } = useConsultantStore();
  const qc = useQueryClient();
  const { projectsData } = useProjectData();
  const projectList = projectsData?.map((project: IProjectData) => {
    return project.project_name;
  });
  const projectId = projectsData?.find(
    (project: IProjectData) => project.project_name === watchProjectName
  )?.id;
  const projectCode = projectsData?.find(
    (project: IProjectData) => project.project_name === watchProjectName
  )?.project_code;

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-consultant-to-project"],
    mutationFn: async (values: AddConsultantToProjectFormSchema) => {
      try {
        const response = await api.post("/consultant-projects", {
          ...values,
          id: id,
          project_id: projectId,
          project_code: projectCode,
          consultant_id: consultantDetailsData?.data?.consultant_code,
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
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Consultant added to project successfully",
        variant: "success",
      });
      onClose();
      qc.invalidateQueries({
        queryKey: ["get all consultants projects"],
      });
    },
  });

  const submit = (data: AddConsultantToProjectFormSchema) => {
    mutate(data);
  };

  return (
    <div className="relative py-4">
      <div>
        <div className="flex items-center gap-2 absolute -top-10">
          <AvatarComponent height="h-14" width="w-14" />
          <div className="flex flex-col">
            <span>{consultantDetailsData?.data?.name}</span>
            <span>{consultantDetailsData?.data?.consultant_code}</span>
          </div>
        </div>
        <div className="pt-10">
          <p className="font-semibold md:text-xl">Add to Project</p>
          <p>This will add the project to the client portfolio</p>
        </div>
      </div>
      <Form {...form}>
        <form className="pt-5" onSubmit={form.handleSubmit(submit)}>
          <CustomFormSelect
            name="project_name"
            control={form.control}
            items={projectList ?? ["Loading Projects... 🏗🏗"]}
            labelText="Project Name"
            placeholder="Select Project Name"
          />
          <div className="grid md:grid-cols-2 gap-4 pt-9">
            <Button variant={"secondary"} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
