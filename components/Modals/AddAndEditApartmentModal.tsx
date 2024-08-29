"use client";

import { useTestModalStore } from "@/hooks/UseTestModal";
import { Modal } from "../shared/Modal";
import { useAddNewApartmentModal } from "@/store/modals/useCreateModal";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "../shared/FormComponent";
import { Button } from "../ui/button";
import { useProjectData } from "@/hooks/useSelectOptions";
import { optional, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import useFacilityStore from "@/store/facility/useFacilityStore";
import { useToast } from "../ui/use-toast";
import { useProjectDetailsPageFormModal } from "@/store/project/useProjectModal";
import { usePathname } from "next/navigation";

const FormSchema = z.object({
  project_name: z.string().optional(),
  flat_desc: z.string({
    required_error: "Flat Description is required",
  }),
  comment: z.string().optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export const AddAndEditApartmentModal = ({ children }: any) => {
  const { isOpen, onClose } = useAddNewApartmentModal();
  const { toast } = useToast();
  const { flatProjectCode, setFlatProjectCode } =
    useProjectDetailsPageFormModal();
  const { flatFormType } = useFacilityStore();
  const { projectsData } = useProjectData();
  const projectName = projectsData?.find(
    (project: any) => project.project_code === flatProjectCode
  )?.project_name;
  const projectList = projectsData?.map((project: any) => {
    return project.project_name;
  });
  const pathname = usePathname();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      project_name: projectName,
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["apartment"],
    mutationFn: async (data: FormSchemaType) => {
      if (flatFormType === "add") {
        const response = await api.post("/project-flats", {
          ...data,
          project_name: pathname.includes("all-flats")
            ? data.project_name
            : projectName,
          project_code: projectsData?.find(
            (project: any) => project.project_name === projectName
          )?.project_code,
          status: "Vacant",
        });

        if (response.status === 201 || response.status === 200) {
          toast({
            title: "Apartment added successfully",
            variant: "success",
          });
          onClose();
          setFlatProjectCode("");
          window.location.reload();
        }
      } else {
        const response = await api.put(`/project-flats/${flatFormType}`, {
          ...data,
          project_code: projectsData?.find(
            (project: any) => project.project_name === data.project_name
          )?.project_code,
          status: "Vacant",
        });
        if (response.status === 201 || response.status === 200) {
          toast({
            title: "Apartment updated successfully",
            variant: "success",
          });
          onClose();
          window.location.reload();
        }
        return response.data;
      }
    },
  });

  const onSubmit = (data: FormSchemaType) => {
    mutate(data);
  };

  return (
    <Modal
      title="Add New Apartment"
      description="Add A New Apartment"
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-2xl">
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}>
          {pathname.includes("/all-flats") ? (
            <CustomFormSelect
              control={form.control}
              name="project_name"
              placeholder="Select project"
              items={projectList || []}
              label="Project Name"
            />
          ) : (
            <CustomFormField
              control={form.control}
              name="project_name"
              placeholder={projectName}
              defaultValue={projectName}
              disabled
              label="Project Name"
            />
          )}
          <CustomFormField
            control={form.control}
            name="flat_desc"
            label="Flat Description"
            placeholder="Enter description"
          />
          <CustomFormTextareaField
            control={form.control}
            name="comment"
            label="Comment"
            placeholder="Enter Comment"
          />

          <div className="grid grid-cols-2 gap-5 pt-4">
            <Button
              variant="secondary"
              onClick={onClose}
              type="button">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
