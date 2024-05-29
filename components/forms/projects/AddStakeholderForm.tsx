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
import { useGetStakeHolders } from "@/hooks/useSelectOptions";
import {
  useProjectDetails,
  useProjectDetailsPageFormModal,
} from "@/store/project/useProjectModal";
import useRefetchQuery from "@/utils/refetchQuery";
import { selectOptionsForStartUpCostType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddStakeHolderSchema = z.object({
  stakeholder_name: z.string({
    required_error: "Stakeholder name is required",
  }),
  stakeholder_amount: z.string({
    required_error: "Add a stakeholder amount",
  }),

  other_amount: z.string({
    required_error: "This field is required",
  }),
  comment: z.string().optional(),
});

type AddStakeHolderType = z.infer<typeof AddStakeHolderSchema>;

export default function AddStakeHolderForm() {
  const { stakeholders } = useGetStakeHolders();
  const { onClose } = useProjectDetailsPageFormModal();
  const { refetchQuery } = useRefetchQuery();
  const { projectCode, projectName } = useProjectDetails();
  const { toast } = useToast();
  const stakeHolderName = stakeholders?.map(
    (item: any) => item.stakeholder_name
  );
  const form = useForm<AddStakeHolderType>({
    resolver: zodResolver(AddStakeHolderSchema),
    defaultValues: {},
  });

  const { mutate } = useMutation({
    mutationKey: ["add-stakeholder"],
    mutationFn: async (values: AddStakeHolderType) => {
      try {
        const response = await api.post("/stakeholder-project", {
          ...values,
          stakeholder_code: stakeholders.find(
            (item: any) => item.stakeholder_name === values.stakeholder_name
          )?.stakeholder_code,
          status: "PENDING",
          stakeholder_project_code: projectCode,
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

  const handleSubmit = (data: AddStakeHolderType) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        onClose();
        toast({
          title: "Stakeholder added successfully",
          variant: "success",
        });
        refetchQuery({
          predicate: (query) =>
            query.queryKey[0] === "get stakeholders by project code",
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
          name="stakeholder_name"
          labelText="Stakeholder Name"
          items={stakeHolderName || []}
          placeholder="Select stakeholder"
        />

        <div className="grid lg:grid-cols-2 gap-2">
          <CustomFormField
            name="stakeholder_amount"
            control={form.control}
            label="Official Amount"
            placeholder="Official Amount"
          />
          <CustomFormField
            name="other_amount"
            control={form.control}
            label="Other Amount"
            placeholder="Other Amount"
          />
        </div>

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
