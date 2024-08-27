import useConsultantStore from "@/store/consultants/useConsultantStore";
import { AvatarComponent } from "../shared/AvatarComponent";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFormSelect } from "../shared/FormComponent";
import { useFlats, useProjectData } from "../../hooks/useSelectOptions";
import { IProjectData } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useAddToProjectModal } from "@/store/modals/useCreateModal";
import useManageClientStore from "@/store/manage-client/useManageClientStore";
import { data } from "../Project/ToolsAndMachine/data";

const AddConsultantToProjectSchema = z.object({
  flat: z.string({
    required_error: "Select A flat",
  }),
  project_name: z.string({
    required_error: "Select A project",
  }),
});

export type AddConsultantToProjectFormSchema = z.infer<
  typeof AddConsultantToProjectSchema
>;

export default function AddClientToProject({
  id,
}: {
  id: number | string | undefined;
}) {
  const form = useForm({
    resolver: zodResolver(AddConsultantToProjectSchema),
    defaultValues: {
      flat: "",
      project_name: "",
    },
  });
  const { toast } = useToast();
  const { onClose } = useAddToProjectModal();

  const router = useRouter();
  const { clientDetailsData } = useManageClientStore();
  const query = useQueryClient();
  const { projectsData } = useProjectData();
  const { flats } = useFlats();
  const flatList = flats?.map((item) => item?.flat_code);
  const watchProject = form.watch("project_name");

  const flatByProjectName = flats
    ?.filter((flat: any) => flat.project_name === watchProject)
    .map((flat: any) => flat.flat_code);

  const projectList = projectsData?.map((project: IProjectData) => {
    return project.project_name;
  });
  const projectId = projectsData?.find(
    (project: IProjectData) => project.project_name === watchProject
  )?.id;
  const projectCode = projectsData?.find(
    (project: IProjectData) => project.project_name === watchProject
  )?.project_code;

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-consultant-to-project"],
    mutationFn: async (values: AddConsultantToProjectFormSchema) => {
      try {
        const response = await api.post("/client_project", {
          ...values,
          id: id,
          project_id: projectId,
          project_code: projectCode,
          client_id: clientDetailsData?.userid,
        });
        query.invalidateQueries({
          queryKey: ["get client project"],
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
        description: "Client added to project successfully",
        variant: "success",
      });
      onClose();
      router.refresh();
    },
  });

  const submit = (data: AddConsultantToProjectFormSchema) => {
    mutate(data);
  };

  return (
    <div className="relative py-4">
      <div>
        <div className="flex items-center gap-2 absolute -top-10">
          <AvatarComponent
            height="h-14"
            width="w-14"
          />
          <div className="flex flex-col">
            <span>
              {clientDetailsData?.first_name} {clientDetailsData?.last_name}
            </span>
            <span className="uppercase">{clientDetailsData?.userid}</span>
          </div>
        </div>
        <div className="pt-10">
          <p className="font-semibold md:text-xl">Add to Project</p>
          <p>This will add the project to the client portfolio</p>
        </div>
      </div>
      <Form {...form}>
        <form
          className="pt-5 space-y-4"
          onSubmit={form.handleSubmit(submit)}>
          <CustomFormSelect
            name="project_name"
            control={form.control}
            items={projectList || []}
            labelText="Project Name"
            placeholder="Select Project Name"
          />

          <CustomFormSelect
            control={form.control}
            name="flat_code"
            placeholder={
              flatByProjectName?.length === 0
                ? "No flats assigned yet"
                : "Select flat"
            }
            items={flatByProjectName || []}
            labelText="Select Flat"
            disabled={flatByProjectName?.length === 0}
          />
          <div className="grid md:grid-cols-2 gap-4 pt-9">
            <Button
              variant={"secondary"}
              onClick={onClose}
              type="button">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}>
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
