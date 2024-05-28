"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import StepTopNav from "@/components/forms/MultiStepFoms/StepTopNav";
import StepBottomNav from "@/components/forms/MultiStepFoms/StepBottomNav";
import FormContainer from "@/components/shared/FormContainer";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import {
  ProjectReportFormType,
  ProjectReportSchema,
  ProjectReportSteps as steps,
} from "./formTypes";
import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetAllStaffs, useProjectData } from "@/hooks/useSelectOptions";
import { api } from "@/config/api";
import { useRouter } from "next/navigation";
import { UploadCloud, X } from "lucide-react";

type Inputs = z.infer<typeof ProjectReportSchema>;
export default function NewReportForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const { projectsData } = useProjectData();
  const { staffs } = useGetAllStaffs();
  const projectName = projectsData?.map((item: any) => item.project_name);
  const projectSupervisor = staffs?.map(
    (item: any) => item.firstname + " " + item.middlename + " " + item.lastname
  );
  const { toast } = useToast();
  const router = useRouter();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = [...files, ...droppedFiles].slice(0, 5);
    setFiles(newFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = [...files, ...selectedFiles].slice(0, 5);
    setFiles(newFiles);
  };

  const form = useForm<ProjectReportFormType>({
    resolver: zodResolver(ProjectReportSchema),
    defaultValues: {
      report_type: "Daily",
    },
  });

  type FieldName = keyof Inputs;
  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };
  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const processForm: SubmitHandler<Inputs> = async (data, event) => {
    event?.preventDefault();
    try {
      const response = await api.post("/project_report", {
        ...data,
        created_for: data.project_supervisor,
        project_code: projectsData?.find(
          (project: any) => project.project_name === data.project_name
        ).project_code,
        project_name: data.project_name,
      });
      if (response.status === 201) {
        // Extract ID from the response data
        const { id } = response.data.data;
        handleUpload(id);
      }
      // window.location.reload();
      // router.push("/reports");
    } catch (error) {
      console.error("Error creating report:", error);
    }
  };

  const handleUpload = async (id: string) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const uploadUrl = `/project_report/images/${id}`;
      const response = await api.put(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setFiles([]);
        toast({
          title: "Report created successfully",
          variant: "success",
        });
        router.push(`/reports/${id}`);
      } else {
        console.error("Failed to upload files");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <section>
      <StepTopNav
        steps={steps}
        currentStep={currentStep}
        next={next}
        prev={prev}
        className="max-w-4xl mx-auto w-full"
      />

      <Form {...form}>
        <form className="py-2" onSubmit={form.handleSubmit(processForm)}>
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FormContainer
                title="New Report"
                isColumn={true}
                description="Create a new report here."
              >
                <div className="flex gap-5 ">
                  {["Daily", "Weekly", "Monthly"].map((option) => (
                    <span className="flex gap-2 items-center" key={option}>
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
                  <div className="grid md:grid-cols-2 w-full gap-5">
                    <CustomFormSelect
                      labelText="Project Name"
                      placeholder="Select Project Name"
                      name="project_name"
                      items={projectName || ["Loading Projects.... 🏠"]}
                      control={form.control}
                    />

                    <CustomFormSelect
                      labelText="Project Supervisor"
                      placeholder=" Select Project Supervisor"
                      name="project_supervisor"
                      items={projectSupervisor || ["Loading Staff.... 👷🏾‍♂️"]}
                      control={form.control}
                    />
                  </div>
                </div>
                <div>
                  <div className="w-full">
                    <CustomFormTextareaField
                      label="Report Summary"
                      placeholder="Add report Summary"
                      name="report_summary"
                      control={form.control}
                    />
                  </div>
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
                      <CustomFormTextareaField
                        name="equipment_on_site"
                        control={form.control}
                        placeholder="Enter Equipment On Site"
                        label="Equipment On Site"
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
                      <CustomFormTextareaField
                        name="visitor"
                        placeholder="Enter Visitors"
                        label="List Visitors"
                        control={form.control}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <CustomFormTextareaField
                    name="weather"
                    control={form.control}
                    placeholder="Enter Report"
                    label="Weather Report"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-5 pt-7">
                  <Button
                    className="w-full disabled:"
                    variant={"secondary"}
                    disabled={currentStep === 0}
                    onClick={prev}
                  >
                    Back
                  </Button>
                  <Button className="w-full" onClick={next}>
                    Next
                  </Button>
                </div>
              </FormContainer>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FormContainer
                title="New Report"
                isColumn={true}
                description="Create a new report here."
                className="relative"
              >
                <div>
                  <div className="flex flex-col items-center justify-between">
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed w-full ${
                        isDragOver ? "border-blue-500" : "border-gray-300"
                      } p-6 rounded-md w-full`}
                    >
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-input"
                      />
                      <label
                        htmlFor="file-input"
                        className="cursor-pointer text-gray-500 text-center"
                      >
                        <div className="flex flex-col items-center justify-center bg-gray-100 mx-auto rounded-full w-14 h-14 ">
                          <UploadCloud />
                        </div>
                        <p className="text-lg font-semibold ">
                          <span className="text-primaryLight font-semibold">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-sm">
                          SVG, PNG, JPG or GIF (max. 2MB)
                        </p>

                        <p className="text-sm">
                          Maximum {5} files allowed. Supported types: images.
                        </p>
                      </label>
                    </div>

                    <div className="my-8">
                      <ul className="list-none space-y-2 flex gap-3">
                        {files.map((file, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between text-sm text-gray-500 relative"
                          >
                            <img
                              src={URL.createObjectURL(file)}
                              alt=""
                              className="w-32 h-32 object-cover rounded-md aspect-square"
                            />
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700 absolute -top-1 -right-1"
                              onClick={() =>
                                setFiles(files.filter((_, i) => i !== index))
                              }
                            >
                              <X
                                color="white"
                                className="bg-red-500 rounded-full p-1"
                              />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="py-5 flex flex-col lg:flex-row gap-6 lg:absolute bottom-0 left-0 right-0 w-full px-6">
                  <Button className="w-full" variant="secondary" onClick={prev}>
                    Go Back
                  </Button>
                  {files.length > 0 && (
                    <Button className="w-full">Submit</Button>
                  )}
                </div>
              </FormContainer>
            </motion.div>
          )}
        </form>
      </Form>
    </section>
  );
}

{
  /* <img src={URL.createObjectURL(file)} alt="" /> */
}