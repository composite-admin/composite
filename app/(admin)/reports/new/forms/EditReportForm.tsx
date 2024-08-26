"use client";

import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import FormContainer from "@/components/shared/FormContainer";
import { Input } from "@/components/ui/input";
import { ProjectReportFormType, ProjectReportSchema } from "./formTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAllStaffs, useProjectData } from "@/hooks/useSelectOptions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useGetEachReport } from "@/store/report/ReportStore";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { useEditReportMutation } from "@/mutations/AddReportMutation";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";

export default function EditReportForm() {
  const { singleReportData } = useGetEachReport();
  const [formData, setFormData] = useState(singleReportData);

  const { projectsData } = useProjectData();
  const { staffs } = useGetAllStaffs();
  const projectName = projectsData?.map((item: any) => item.project_name);
  const projectSupervisor = staffs?.map(
    (item: any) => item.firstname + " " + item.middlename + " " + item.lastname
  );
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ProjectReportFormType>({
    resolver: zodResolver(ProjectReportSchema),
    defaultValues: {
      report_type: formData?.report_type,
      project_name: formData?.project_name,
      report_summary: formData?.report_summary,
      challenges: formData?.challenges,
      solutions: formData?.solutions,
      recommendation: formData?.recommendation,
      project_supervisor: formData?.project_supervisor,
      equipment_on_site: formData?.equipment_on_site,
      weekly_projection: formData?.weekly_projection,
      materials_required_for_projection:
        formData?.materials_required_for_projection,
      materials_on_site: formData?.materials_on_site,
      visitor: formData?.visitor,
      weather: formData?.weather,
    },
  });


  const { mutate } = useMutation({
    mutationKey: ["editReport"],
    mutationFn: async (data: ProjectReportFormType) => {
      const res = await api.put(`/project_report/${singleReportData.id}`, data);
      if (res.status === 200) {
        router.push(`/reports/${singleReportData.id}`);
      }
      return res.data.data;
    },
    onSuccess: (data) => {
      toast({
        title: "Report edited successfully",
        variant: "success",
      });
    },
  });
  const handleSubmit = (data: ProjectReportFormType) => {
    mutate(data);
  };
  return (
    <div className="my-5 rounded-lg border border-outline bg-white p-[29px]">
      <div className="grid grid-cols-[1fr_3fr] gap-10 pb-10">
        <div className="flex gap-3 flex-col">
          <div className="">
            <h2 className="text-textColor2 text-[16px] font-[600]">
              Edit Report
            </h2>
            <p className="text-sm text-textColor">
              Update report details here.
            </p>
          </div>

          <button
            className="bg-primaryLight text-sm text-white rounded-md py-2 px-5 w-fit"
            onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
            Submit Changes
          </button>
        </div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
              <div className="flex gap-5 ">
                {["Daily", "Weekly", "Monthly"].map((option) => (
                  <span
                    className="flex gap-2 items-center"
                    key={option}>
                    <Input
                      key={option}
                      className="size-4"
                      placeholder="Enter report type"
                      type="radio"
                      value={option}
                      {...form.register("report_type")}
                    />

                    <label htmlFor={option}>{option}</label>
                  </span>
                ))}
              </div>
              <div className="flex gap-5 w-full flex-col lg:flex-row py-4">
                <div className="w-full">
                  <CustomFormSelect
                    labelText="Project Name"
                    placeholder="Select Project Name"
                    name="project_name"
                    items={projectName || ["Loading Projects.... 🏠"]}
                    control={form.control}
                  />
                </div>
                <div className="w-full">
                  <CustomFormSelect
                    labelText="Project Supervisor"
                    placeholder=" Select Project Supervisor"
                    name="project_supervisor"
                    items={projectSupervisor || []}
                    control={form.control}
                    defaultValue={projectSupervisor}
                  />
                </div>
              </div>

              <div className="w-full">
                <CustomFormTextareaField
                  label="Report Summary"
                  placeholder="Add report Summary"
                  name="report_summary"
                  control={form.control}
                />
              </div>
              <div className="flex flex-col lg:flex-row py-5 gap-5">
                <div className="w-full">
                  <div className="space-y-5">
                    <CustomFormTextareaField
                      name="challenges"
                      control={form.control}
                      label="Challenges Encountered"
                      placeholder="Enter Challenges Encountered"
                    />
                    <CustomFormTextareaField
                      name="recommendation"
                      control={form.control}
                      placeholder="Enter Recommendation"
                      label="Future Recommendation"
                    />
                    <CustomFormTextareaField
                      name="materials_required_for_projection"
                      control={form.control}
                      placeholder="Enter Materials"
                      label="Materials Required For Projection"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="space-y-5">
                    <CustomFormTextareaField
                      name="solutions"
                      control={form.control}
                      placeholder="Enter Solutions"
                      label="Proffered Solutions"
                    />
                    <CustomFormTextareaField
                      control={form.control}
                      name="weekly_projection"
                      placeholder="Enter Weekly Projection"
                      label="Weekly Projection"
                    />
                    <CustomFormTextareaField
                      name="materials_on_site"
                      placeholder="Enter Materials On Site"
                      label="Materials On Site"
                      control={form.control}
                    />
                  </div>
                </div>
              </div>
              <div>
                <CustomFormTextareaField
                  name="visitor"
                  placeholder="Enter Visitors"
                  label="List Visitors"
                  control={form.control}
                />
                <CustomFormTextareaField
                  name="weather"
                  control={form.control}
                  placeholder="Enter Report"
                  label="Weather Report"
                />
              </div>
              <div className="py-5 flex flex-col lg:flex-row gap-6 ">
                <Button
                  className="w-full"
                  variant="secondary"
                  type="button"
                  onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button className="w-full">Done</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
