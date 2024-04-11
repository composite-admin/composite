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
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useFlats, useProjectData } from "@/hooks/useTenantsAndFlat";
import { useRouter } from "next/navigation";

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
];

export default function EditTenantForm({ id }: { id: string }) {
  const router = useRouter();
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const { flats } = useFlats();
  const { projectsData } = useProjectData();
  const { toast } = useToast();
  const projects = projectsData?.map((item: any) => item.project_name);
  const flatList = flats?.map((item) => item.flat_code);

  const form = useForm<addTenantType>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      project_name: "",
      flat_code: "",
      title: "Mr.",
      full_name: "",
      phone_number: "",
      email: "",
      annual_rent: "",
      rent_payment: "",
      reminder: "",
      fees: "",
      value: "",
    },
  });

  const processForm: SubmitHandler<Inputs> = async (values: addTenantType) => {
    try {
      const res = await api.put(`/tenants/${id}`, {
        project_details: projectsData?.find(
          (item: any) => item.project_name === values.project_name
        )?.project_description,
        flat_description: flats?.find(
          (item) => item.flat_code === values.flat_code
        )?.flat_desc,
        comment: projectsData?.find(
          (item: any) => item.project_name === values.project_name
        )?.comment,
        status: projectsData?.find(
          (item: any) => item.project_name === values.project_name
        )?.status,
        // ...values,
        // fees: {
        //   value: values.value,
        //   fees: values.fees,
        // },
        fees: values.fees,
        project_name: values.project_name,
        flat_code: values.flat_code,
        title: values.title,
        full_name: values.full_name,
        phone_number: values.phone_number,
        email: values.email,
        annual_rent: values.annual_rent,
        rent_payment: values.rent_payment,
        reminder: values.reminder,
      });
      if (res.status === 200) {
        toast({
          title: "Tenant Updated",
          description: "Tenant Updated Successfully",
          variant: "success",
        });
        router.push("/facility");
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
    // form.reset();
  };

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
        <form className="mt-2 py-2" onSubmit={form.handleSubmit(processForm)}>
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
                    name="project_name"
                    items={projects || []}
                    labelText="Select Project"
                  />
                  <CustomFormSelect
                    control={form.control}
                    name="flat_code"
                    items={flatList || []}
                    labelText="Select Flat"
                  />
                  <div></div>
                  <div className="flex gap-5 flex-col lg:flex-row">
                    <div className="lg:w-full">
                      <CustomFormSelect
                        control={form.control}
                        name="title"
                        placeholder="Enter title"
                        items={["Mr.", "Mrs.", "Miss"]}
                        labelText="Title"
                      />

                      <CustomFormField
                        control={form.control}
                        name="full_name"
                        placeholder="Enter full name"
                        label="Full name"
                      />
                    </div>
                    <div className="lg:w-full">
                      <CustomFormField
                        control={form.control}
                        name="phone_number"
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
                <div className=" flex flex-col lg:flex-row justify-between items-center gap-8 pt-7">
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
                title="Address"
                isColumn={false}
                description="Create a new staff profile here"
              >
                <div className="flex flex-col gap-5">
                  <CustomFormField
                    control={form.control}
                    name="annual_rent"
                    placeholder="Enter annual rent cost"
                    label="Annual rent cost"
                  />
                  <CustomFormField
                    control={form.control}
                    name="rent_payment"
                    placeholder="Enter rent payment"
                    label="Rent payment"
                  />
                  <CustomFormField
                    control={form.control}
                    name="reminder"
                    placeholder="Enter set reminder"
                    label="Set reminder"
                  />

                  <div className="flex gap-5 flex-col lg:flex-row">
                    <div className="lg:w-full">
                      <CustomFormSelect
                        control={form.control}
                        name="fees"
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
                  <div className=" flex flex-col lg:flex-row justify-between items-center gap-8 pt-7">
                    <Button
                      className="w-full"
                      variant={"secondary"}
                      onClick={prev}
                    >
                      Back
                    </Button>
                    <Button className="w-full" onClick={next}>
                      Next
                    </Button>
                  </div>
                </div>
              </FormContainer>
            </motion.div>
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