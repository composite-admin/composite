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
import { DragDrop, ProgressBar } from "@uppy/react";
import { Dashboard } from "@uppy/react";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import { api } from "@/config/api";

const uppy = new Uppy({
  meta: { type: "avatar" },
  restrictions: { maxNumberOfFiles: 3 },
  autoProceed: false,
}).use(XHRUpload, {
  endpoint: "https://your-upload-endpoint.com/upload",
  formData: true,
  bundle: true,
});

type Inputs = z.infer<typeof ProjectReportSchema>;
export default function NewReportForm() {
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
    const response = await api.post("/project_report", data);
    if (response.status === 201) {
      toast({
        title: "Report created successfully",
        description: "Report has been created successfully",
        variant: "success",
      });
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
                  <Dashboard
                    showProgressDetails={true}
                    height={350}
                    className="w-full mx-auto flex justify-center items-center"
                    note={
                      "SVG, PNG, JPG or GIF (max. 800x400px) maximum of 5 files"
                    }
                    uppy={uppy}
                    plugins={["DragDrop"]}
                  >
                    <ProgressBar uppy={uppy} />
                  </Dashboard>
                </div>

                <div className="py-5">
                  <Button className="w-full">Submit</Button>
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
