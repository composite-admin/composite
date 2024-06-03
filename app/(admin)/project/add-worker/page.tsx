"use client";
import GoBack from "@/components/shared/GoBack";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useAddWorkerModal, useSuccessModal } from "@/store/inventory/UseInventoryModal";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { HiHome } from "react-icons/hi";
import useWorkersActionsStore from "@/store/actions/worker/workersActions";
import { Form } from "@/components/ui/form";
import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/shared/FormComponent";
import { useForm } from "react-hook-form";
import {
  useProjectDetails,
  useProjectDetailsPageFormModal,
} from "@/store/project/useProjectModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { api } from "@/config/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IWorkerData, selectOtionsForWorkerServiceType } from "@/utils/types";
import { getStuffTyped, useGetAllProjectData } from "@/hooks/useSelectOptions";
import Link from "next/link";

const AddWorkerSchema = z.object({
  project_name: z.string({
    required_error: "Project name is required",
  }),
  service_type: z.string({
    required_error: "Service type is required",
  }),
  worker_name: z.string({
    required_error: "Worker name is required",
  }),
});
type AddWorkerSchemaType = z.infer<typeof AddWorkerSchema>;

const AddWorkerToProject = () => {
  const { projectName, onClose } = useProjectDetailsPageFormModal();
  const { projectCode } = useProjectDetails();

  const searchParams = useSearchParams();
  const name: any = searchParams.get("name");
  const form = useForm<AddWorkerSchemaType>({
    resolver: zodResolver(AddWorkerSchema),
    defaultValues: {
      project_name: name,
    },
  });
  const router = useRouter();
  const onOpenCreateWorker = useAddWorkerModal((state) => state.onOpen);
  const { toast } = useToast();

  let filteredWorkerNames;
  let workerCode: string | undefined;

  const { data } = useQuery({
    queryKey: ["get all worker"],
    queryFn: () => getStuffTyped<IWorkerData[]>("/worker"),
  });

  const { mutate } = useMutation({
    mutationKey: ["add worker to project"],
    mutationFn: async (values: AddWorkerSchemaType) => {
      try {
        const response = await api.post("/worker-projects", {
          ...values,
          project_code: projectCode,
          worker_code: workerCode,
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

  const watchServiceType = form.watch("service_type");
  const watchWorkerName = form.watch("worker_name");

  if (watchWorkerName) {
    workerCode = data?.find(
      (item) => item.worker_name === watchWorkerName
    )?.worker_code;
  }

  if (watchServiceType) {
    const workers = data?.filter(
      (item) => item.service_type === watchServiceType
    );
    filteredWorkerNames = workers?.map((item) => item.worker_name);
  }
  const handleSubmit = (data: AddWorkerSchemaType) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        onClose();
        toast({
          title: "Worker added successfully",
          variant: "success",
        });
        router.push("/project");
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
    <>
      <div className="flex items-center justify-between">
        <GoBack />

        <Button>
          <Link href="/workers/add">Create New Worker</Link>
        </Button>
      </div>
      <div className="max-w-3xl mx-auto w-full border border-borderColor bg-white rounded-lg p-7 my-16">
        <Form {...form}>
          <div className="flex gap-2 items-center">
            <div className="p-2 rounded-full bg-[#52a7f226] w-[50px] h-[50px] flex items-center justify-center">
              <HiHome />
            </div>
            <p className="text-[22px] font-[600] text-[#101928]">
              Add Worker to Project
            </p>
          </div>

          <form
            className="flex flex-col gap-5 py-8"
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
              name="worker_name"
              labelText="Worker"
              placeholder="Worker"
              items={filteredWorkerNames || ["Loading..."]}
            />

            <div className="flex gap-4 flex-col lg:flex-row">
              <Button
                variant={"secondary"}
                className="w-full"
                onClick={() => router.back()}
                type="button"
              >
                Cancel
              </Button>
              <Button className="w-full">Add</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddWorkerToProject;






