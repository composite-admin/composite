"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { z } from "zod";
import { addTenantType, FormDataSchema } from "./formtypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import StepTopNav from "./StepTopNav";
import StepBottomNav from "./StepBottomNav";
import FormContainer from "@/components/shared/FormContainer";
import { Form } from "@/components/ui/form";
import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/shared/FormComponent";

type Inputs = z.infer<typeof FormDataSchema>;

const steps = [
  {
    id: "1",
    name: "Basic Information",
    fields: [
      "selectProject",
      "selectFlat",
      "title",
      "tenatFullName",
      "phoneNumber",
      "email",
    ],
  },
  {
    id: "2",
    name: "Address",
    field: ["anualRentCost", "rentPayment", "setReminder", "feeType", "value"],
  },
  { id: "3", name: "Complete" },
];

export default function AddTenantForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const form = useForm<addTenantType>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      selectProject: "",
      selectFlat: "",
      title: "",
      tenatFullName: "",
      phoneNumber: "",
      email: "",
      annualRentCost: "",
      rentPayment: "",
      setReminder: "",
      feeType: "",
      value: "",
    },
  });

  const processForm: SubmitHandler<Inputs> = (values: addTenantType) => {
    console.log(values);
    form.reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(processForm)();
      }
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

  return (
    <section className="flex flex-col justify-between">
      {/* steps */}
      <StepTopNav
        steps={steps}
        currentStep={currentStep}
        next={next}
        prev={prev}
      />
      {/* Form */}
      <Form {...form}>
        <form className="mt-12 py-12" onSubmit={form.handleSubmit(processForm)}>
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FormContainer
                title="Add tenant"
                isColumn={false}
                description="Create a new client profile here"
              >
                <div className="flex flex-col gap-5">
                  <CustomFormSelect
                    control={form.control}
                    name="selectProject"
                    items={["Project 1", "Project 2"]}
                    labelText="Select Project"
                  />
                  <CustomFormSelect
                    control={form.control}
                    name="selectFlat"
                    items={["Flat 1", "Flat 2"]}
                    labelText="Select Flat"
                  />
                  <div></div>
                  <div className="flex gap-5 flex-col lg:flex-row">
                    <div className="lg:w-full">
                      <CustomFormField
                        control={form.control}
                        name="title"
                        placeholder="Enter title"
                        label="Title"
                      />

                      <CustomFormField
                        control={form.control}
                        name="tenatFullName"
                        placeholder="Enter full name"
                        label="Full name"
                      />
                    </div>
                    <div className="lg:w-full">
                      <CustomFormField
                        control={form.control}
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        label="Phone number"
                      />
                      <CustomFormField
                        control={form.control}
                        name="email"
                        placeholder="Enter email"
                        label="Email"
                      />
                    </div>
                  </div>
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
                title="Address"
                isColumn={false}
                description="Create a new staff profile here"
              >
                <div className="flex flex-col gap-5">
                  <CustomFormField
                    control={form.control}
                    name="annualRentCost"
                    placeholder="Enter annual rent cost"
                    label="Annual rent cost"
                  />
                  <CustomFormField
                    control={form.control}
                    name="rentPayment"
                    placeholder="Enter rent payment"
                    label="Rent payment"
                  />
                  <CustomFormField
                    control={form.control}
                    name="setReminder"
                    placeholder="Enter set reminder"
                    label="Set reminder"
                  />

                  <div className="flex gap-5 flex-col lg:flex-row">
                    <div className="lg:w-full">
                      <CustomFormSelect
                        control={form.control}
                        name="feeType"
                        items={["Type 1", "Type 2"]}
                        labelText="Fee type"
                      />
                    </div>
                    <div className="lg:w-full">
                      <CustomFormField
                        control={form.control}
                        name="value"
                        placeholder="Enter value"
                        label="Value"
                      />
                    </div>
                  </div>
                </div>
              </FormContainer>
            </motion.div>
          )}

          {currentStep === 2 && (
            <>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Complete
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Thank you for your submission.
              </p>
            </>
          )}
        </form>
      </Form>
      {/* Navigation */}
      <StepBottomNav
        steps={steps}
        currentStep={currentStep}
        next={next}
        prev={prev}
      />
    </section>
  );
}
