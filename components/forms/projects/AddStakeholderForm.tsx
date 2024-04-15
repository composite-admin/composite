"use client";

import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useProjectDetailsPageFormModal } from "@/store/project/useProjectModal";
import { selectOptionsForStartUpCostType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {}

const AddStartUpCostSchema = z.object({
  project_name: z.string().optional(),
  startup_desc: z.string().optional(),
  startup_type: z.string().optional(),
  startup_cost: z.string().optional(),
  comment: z.string().optional(),
});

type AddStartUpCostType = z.infer<typeof AddStartUpCostSchema>;

export default function AddStakeHolderForm() {
  const { projectName, projectCode, onClose } =
    useProjectDetailsPageFormModal();
  const { toast } = useToast();

  const form = useForm<AddStartUpCostType>({
    resolver: zodResolver(AddStartUpCostSchema),
    defaultValues: {
      project_name: projectName,
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["add-startup-cost"],
    mutationFn: async (values: AddStartUpCostType) => {
      try {
        const response = await api.post("/startup-costs", {
          ...values,
          startup_cost: Number(values.startup_cost),
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

  const handleSubmit = (data: AddStartUpCostType) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        onClose();
        toast({
          title: "Start up cost added successfully",
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
          placeholder="Project Name"
          disabled
        />

        <CustomFormField
          control={form.control}
          name="startup_desc"
          label="Project Description"
          placeholder="Project Description"
        />

        <CustomFormSelect
          control={form.control}
          name="startup_type"
          labelText="Startup Type"
          items={selectOptionsForStartUpCostType || []}
          placeholder="Startup Type"
        />

        <CustomFormField
          control={form.control}
          name="startup_cost"
          label="Startup Cost"
          placeholder="Startup Cost"
        />

        <CustomFormTextareaField
          control={form.control}
          name="comment"
          label="Comment"
          placeholder="Comment"
        />

        <div className="flex gap-4 flex-col lg:flex-row">
          <Button variant={"secondary"} className="w-full">
            Cancel
          </Button>
          <Button className="w-full">Add</Button>
        </div>
      </form>
    </Form>
  );
}
