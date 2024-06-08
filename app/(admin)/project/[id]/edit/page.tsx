"use client";
import React, { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { nigerianStates, selectOptionsForProjectStatus } from "@/utils/types";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CustomDatePicker,
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useGetProjectById, useStaffRoles } from "@/hooks/useSelectOptions";
import { useProjectStore } from "@/store/project/useProjectStore";
import { useRouter } from "next/navigation";
import {
  AddProjectFormSchema,
  AddProjectFormType,
} from "@/components/Modals/projects/formTypes";
import { formatDate } from "@/utils/formatDate";
import { z } from "zod";

const EditProjectSchema = z.object({
  project_name: z.string({
    required_error: "Project Name is required",
  }),
  status: z.string({
    required_error: "Project Status is required",
  }),
  project_description: z.string({
    required_error: "Project Description is required",
  }),
  start_date: z.date({
    required_error: "Start Date is required",
  }),
  end_date: z.date({
    required_error: "End Date is required",
  }),
  city: z.string({
    required_error: "City is required",
  }),
  state: z.string({
    required_error: "State is required",
  }),
  address: z.string({
    required_error: "Address is required",
  }),
  lga: z.string({
    required_error: "LGA is required",
  }),
});

type EditProjectFormType = z.infer<typeof EditProjectSchema>;

export type Params = {
  params: {
    id: string;
  };
};
const EditProjectPage = ({ params: { id } }: Params) => {
  const { projectDetails } = useGetProjectById(id);
  const { setTeamMemberData, teamMemberData } = useProjectStore();
  const { staffRoles } = useStaffRoles();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<EditProjectFormType>({
    resolver: zodResolver(EditProjectSchema),
  });

  useEffect(() => {
    if (projectDetails) {
      form.setValue("project_name", projectDetails?.project_name);
      form.setValue("status", projectDetails?.status);
      form.setValue("project_description", projectDetails?.project_description);
      form.setValue("city", projectDetails?.city);
      form.setValue("start_date", new Date(projectDetails?.start_date));
      form.setValue("end_date", new Date(projectDetails?.end_date));
      form.setValue("state", projectDetails?.state);
      form.setValue("address", projectDetails?.address);
      form.setValue("lga", projectDetails?.lga);
    }
  }, [form, projectDetails]);

  const { mutate } = useMutation({
    mutationKey: ["edit project", id],
    mutationFn: async (data: {
      [Key in keyof EditProjectFormType]: string;
    }) => {
      try {
        const response = await api.put(`/projects/${id}`, {
          ...data,
        });
        if (response.data) {
          router.push("/project");
        }
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    onSuccess: () => {
      toast({
        title: "Project updated successfully",
        variant: "success",
      });
      router.push("/project");
      router.refresh();
    },
    onError: (error: Error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });

  //watch for when role changes

  function onSubmit(formValues: EditProjectFormType) {
    const startDateString = formValues.start_date
      ? formValues.start_date.toISOString().slice(0, 19).replace("T", " ")
      : "";
    const endDateString = formValues.end_date
      ? formValues.end_date.toISOString().slice(0, 19).replace("T", " ")
      : "";

    mutate({
      ...formValues,
      start_date: startDateString,
      end_date: endDateString,
    });
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg p-5">
      <div className="flex items-center justify-between cursor-pointer">
        <div className="flex gap-2 items-center">
          <div className="p-2 rounded-full bg-[#52a7f226] w-[50px] h-[50px] flex items-center justify-center">
            <HiHome />
          </div>{" "}
          <p className="text-[22px] font-[600] text-[#101928]">
            Update Project
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <CustomFormField
            name="project_name"
            control={form.control}
            placeholder={projectDetails?.project_name}
            label="Project Name"
            disabled
          />

          <div className="grid grid-cols-2 gap-2 my-5  ">
            <div className="space-y-4">
              <CustomDatePicker
                control={form.control}
                name="start_date"
                label="Start Date"
                placeholder={formatDate(projectDetails?.start_date!)}
              />
              <CustomFormField
                name="address"
                control={form.control}
                placeholder={projectDetails?.address}
                label="Address"
              />{" "}
              <CustomFormField
                name="city"
                control={form.control}
                placeholder={projectDetails?.city}
                label="City"
              />{" "}
              <CustomFormField
                name="duration"
                control={form.control}
                placeholder={`${projectDetails?.project_duration} days`}
                label="Duration"
                disabled
              />
            </div>

            <div className="space-y-4">
              <CustomDatePicker
                control={form.control}
                name="end_date"
                label="End Date"
                placeholder={formatDate(projectDetails?.end_date!)}
              />
              <CustomFormSelect
                control={form.control}
                name="state"
                label="State"
                items={nigerianStates}
                placeholder={projectDetails?.state}
              />
              <CustomFormField
                name="lga"
                control={form.control}
                placeholder={projectDetails?.lga}
                label="LGA"
              />
              <CustomFormSelect
                control={form.control}
                name="status"
                label="Status"
                items={selectOptionsForProjectStatus}
                placeholder={projectDetails?.status}
              />
            </div>
          </div>
          <div>
            <CustomFormTextareaField
              label="Project Description"
              name="project_description"
              control={form.control}
              placeholder={projectDetails?.project_description}
            />
          </div>
          <div className="my-5 flex gap-6 justify-center items-center">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => router.back()}
              type="button"
            >
              Cancel
            </Button>
            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProjectPage;
