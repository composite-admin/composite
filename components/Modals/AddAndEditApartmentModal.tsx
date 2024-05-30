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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import useFacilityStore from "@/store/facility/useFacilityStore";

const FormSchema = z.object({
  project_name: z.string({
    required_error: "Project Name is required",
  }),
  flat_desc: z.string({
    required_error: "Flat Description is required",
  }),
  comment: z.string().optional(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export const AddAndEditApartmentModal = ({ children }: any) => {
  const { isOpen, onClose } = useAddNewApartmentModal();
  const { flatFormType } = useFacilityStore();
  const { projectsData } = useProjectData();
  const projectName = projectsData?.map((item: any) => item.project_name);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate } = useMutation({
    mutationKey: ["apartment"],
    mutationFn: async (data: FormSchemaType) => {
      if (flatFormType === "add") {
        const response = await api.post("/project-flats", {
          ...data,
          project_code: projectsData?.find(
            (project: any) => project.project_name === data.project_name
          )?.project_code,
          status: "Vacant",

        });

      } else {
        const response = await api.put(`/project-flats/${flatFormType}`, {
          ...data,
          project_code: projectsData?.find(
            (project: any) => project.project_name === data.project_name
          )?.project_code,
          status: "Vacant",
        });
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
      classname="max-w-2xl"
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <CustomFormSelect
            control={form.control}
            name="project_name"
            placeholder="Select Project"
            labelText="Project Name"
            items={projectName || []}
          />
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
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
