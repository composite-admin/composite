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
import { useGetStartupCostDetails } from "@/hooks/useSelectOptions";
import {
  useProjectDetails,
  useProjectDetailsPageFormModal,
} from "@/store/project/useProjectModal";
import { useTableActionStore } from "@/store/useTableActionStore";
import useRefetchQuery from "@/utils/refetchQuery";
import { selectOptionsForStartUpCostType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
const AddStartUpCostSchema = z.object({
  startup_desc: z
    .string({ required_error: "Startup description is required" })
    .min(1),
  startup_type: z.string({ required_error: "Startup type is required" }).min(1),
  startup_cost: z
    .string({ required_error: "Startup cost is required" })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number")
    .min(1),
  comment: z.string().optional(),
});

type AddStartUpCostType = z.infer<typeof AddStartUpCostSchema>;

export default function AddStartUpForm() {
  const queryClient = useQueryClient();
  const { projectCode, projectName } = useProjectDetails();
  const { refetchQuery } = useRefetchQuery();
  const {
    isEditOrDelete,
    rowID,
    onClose: onCloseModal,
  } = useTableActionStore();
  const { isLoading, startupCostDetails } = useGetStartupCostDetails(
    Number(rowID)
  );

  const { onClose } = useProjectDetailsPageFormModal();
  const { toast } = useToast();

  const form = useForm<AddStartUpCostType>({
    resolver: zodResolver(AddStartUpCostSchema),
    values: {
      startup_desc: startupCostDetails?.startup_desc!,
      startup_type: startupCostDetails?.startup_type!,
      startup_cost: startupCostDetails?.startup_cost!,
      comment: startupCostDetails?.comment! || "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["add-startup-cost", rowID],
    mutationFn: async (values: AddStartUpCostType) => {
      try {
        const response = isEditOrDelete
          ? await api.put(`/startup-costs/${rowID}`, {
              ...values,
              startup_cost: Number(values.startup_cost),
              project_code: projectCode,
            })
          : await api.post("/startup-costs", {
              ...values,
              startup_cost: Number(values.startup_cost),
              project_code: projectCode,
            });
        toast({
          title: `Start up cost ${
            isEditOrDelete ? "updated" : "added"
          } successfully`,
          variant: "success",
        });

        onClose();
        onCloseModal();
        refetchQuery({
          predicate: (query) =>
            query.queryKey[0] === "get startup cost by project code",
        });
        queryClient.invalidateQueries({
          queryKey: ["get startup cost details"],
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

        <CustomFormField
          control={form.control}
          name="startup_desc"
          disabled={isLoading}
          label="Description"
          placeholder={startupCostDetails?.startup_desc || "Description"}
        />

        <div className="grid grid-cols-2 gap-5">
          <CustomFormSelect
            control={form.control}
            name="startup_type"
            labelText="Startup Type"
            disabled={isLoading}
            items={selectOptionsForStartUpCostType || []}
            placeholder={startupCostDetails?.startup_type || "Startup Type"}
          />

          <CustomFormField
            control={form.control}
            name="startup_cost"
            label="Startup Cost"
            disabled={isLoading}
            placeholder={startupCostDetails?.startup_cost || "Startup Cost"}
          />
        </div>
        <CustomFormTextareaField
          control={form.control}
          name="comment"
          label="Comment"
          disabled={isLoading}
          placeholder={startupCostDetails?.comment || "Comment"}
        />

        <div className="flex gap-4 flex-col lg:flex-row">
          <Button
            variant={"secondary"}
            className="w-full"
            type="button"
            onClick={() => {
              isEditOrDelete ? onCloseModal() : onClose();
            }}
          >
            Cancel
          </Button>
          <Button className="w-full">
            {isEditOrDelete ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
