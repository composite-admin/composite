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
import { useProjectData } from "@/hooks/useSelectOptions";
import { api } from "@/config/api";

type Inputs = z.infer<typeof ProjectReportSchema>;
export default function NewReportForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

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
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const response = await api.put("/project_report/images/9", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Add other necessary headers here
        },
      });

      if (response.status === 201) {
        console.log("Files uploaded successfully");
        setFiles([]);
      } else {
        console.error("Failed to upload files");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const { projectsData } = useProjectData();
  const projectName = projectsData?.map((item: any) => item.project_name);
  const { toast } = useToast();

  const form = useForm<ProjectReportFormType>({
    resolver: zodResolver(ProjectReportSchema),
    defaultValues: {
      report_type: "Daily",
      project_name: "",
      photograph_id: [],
      project_supervisor: "",
      report_summary: "",
      challenges: "",
      solutions: "",
      recommendation: "",
      weekly_projection: "",
      equipment_on_site: "",
      materials_required_for_projection: "",
      materials_on_site: "",
      visitors: "",
      weather: "",
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
    // // const response = await api.post("/project_report", data);
    // if (response.status === 201) {
    //   toast({
    //     title: "Report created successfully",
    //     description: "Report has been created successfully",
    //     variant: "success",
    //   });
    // }
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
                {/* report type should be a radio input with options of Daily, weekly Monthly */}
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
                      labelText="Report Summary"
                      placeholder="Select Summary"
                      name="report_summary"
                      items={
                        ["report summary", "report summary"] || [
                          "Loading Projects.... 🏠",
                        ]
                      }
                      control={form.control}
                    />
                  </div>
                </div>
                <div>
                  <CustomFormSelect
                    labelText="Project Supervisor"
                    placeholder=" Select Project Supervisor"
                    name="project_supervisor"
                    items={
                      ["project supervisor 1", "project supervisor 2"] || [
                        "Loading Projects.... 🏠",
                      ]
                    }
                    control={form.control}
                  />
                </div>
                <div className="flex flex-col lg:flex-row py-5 gap-5">
                  <div className="w-full">
                    <div className="space-y-5">
                      <CustomFormTextareaField
                        name="chanllenges"
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
                        name="visitors"
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
              >
                <div>
                  <div className="flex flex-col items-center">
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed ${
                        isDragOver ? "border-blue-500" : "border-gray-300"
                      } p-6 rounded-md w-full max-w-md`}
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
                        <span className="text-lg font-semibold">
                          Drag and drop files here or click to select
                        </span>
                        <p className="text-sm">
                          Maximum {5} files allowed. Supported types: images.
                        </p>
                      </label>
                    </div>

                    <div className="mt-4">
                      <ul className="list-disc list-inside">
                        {files.map((file, index) => (
                          <li key={index} className="text-sm text-gray-500">
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {files.length > 0 && (
                      <button
                        onClick={handleUpload}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                      >
                        Upload Files
                      </button>
                    )}
                  </div>
                </div>
                <div className="py-5 flex flex-col lg:flex-row gap-6">
                  <Button className="w-full" variant="secondary" onClick={prev}>
                    Cancel
                  </Button>
                  <Button className="w-full">Done</Button>
                </div>
              </FormContainer>
            </motion.div>
          )}
        </form>
      </Form>

      <StepBottomNav
        steps={steps}
        currentStep={currentStep}
        next={next}
        prev={prev}
        className="max-w-4xl mx-auto w-full"
      />
    </section>
  );
}
