"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { addTenantType, FormDataSchema } from "./formtypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
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
import { useFlats, useProjectData } from "@/hooks/useSelectOptions";
import { useRouter } from "next/navigation";
import { Plus, PlusCircle, Trash2 } from "lucide-react";
// import { DevTool } from "@hookform/devtools";

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
    name: "Rent and Bills",
    field: ["anualRentCost", "rentPayment", "setReminder", "feeType", "value"],
  },
];

export default function AddTenantForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const { flats } = useFlats();
  const { projectsData } = useProjectData();
  const { toast } = useToast();
  const router = useRouter();

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
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fees",
  });

  const processForm: SubmitHandler<Inputs> = async (values: addTenantType) => {
    try {
      const fees = [
        {
          type: values.facility_management,
          value: values.facility_management_value,
        },
        {
          type: values.diesel,
          value: values.diesel_value,
        },
        {
          type: values.electricity,
          value: values.electricity_value,
        },
        // Spread the existing fees from the form
        ...values.fees,
      ];
      const res = await api.post("/tenants", {
        project_details: projectsData?.find(
          (item: any) => item.project_name === values.project_name
        )?.project_description,
        flat_description: flats?.find(
          (item) => item.flat_code === values.flat_code
        )?.flat_desc,
        // comment: projectsData?.find(
        //   (item: any) => item.project_name === values.project_name
        // )?.comment,
        comment: "Testing Submission",
        status: projectsData?.find(
          (item: any) => item.project_name === values.project_name
        )?.status,
        ...values,
        fees: fees,
      });
      if (res) {
        toast({
          title: "Success",
          description: "Tenant added successfully",
          variant: "success",
        });
        router.push("/facility");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
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
                description="Create a new tenant profile here"
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
                    <div className="lg:w-full space-y-4">
                      <CustomFormSelect
                        control={form.control}
                        name="title"
                        placeholder="Enter title"
                        items={["Mr.", "Mrs.", "Miss"]}
                        labelText="Title"
                      />
                      <CustomFormField
                        control={form.control}
                        name="phone_number"
                        placeholder="Enter phone number"
                        label="Phone number"
                      />
                    </div>
                    <div className="lg:w-full space-y-4">
                      <CustomFormField
                        control={form.control}
                        name="full_name"
                        placeholder="Enter full name"
                        label="Tenant full name"
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
                title="Add tenant"
                isColumn={false}
                description="Create a new tenant profile here"
              >
                <div className="flex flex-col gap-5">
                  <CustomFormField
                    control={form.control}
                    name="annual_rent"
                    placeholder="Enter annual rent cost"
                    label="Annual rent cost"
                  />
                  <CustomFormSelect
                    control={form.control}
                    name="rent_payment"
                    placeholder="Select rent payment"
                    labelText="Select rent payment"
                    items={["Monthly", "Quarterly", "Yearly"] || []}
                  />
                  <CustomFormSelect
                    control={form.control}
                    name="reminder"
                    placeholder="Select reminder"
                    labelText="Select reminder"
                    items={
                      ["Monthly", "3 Months", "6 Months", "12 Months"] || []
                    }
                  />

                  <div className="flex gap-5 flex-col lg:flex-row">
                    <div className="lg:w-full">
                      <CustomFormSelect
                        control={form.control}
                        name="facility_management"
                        items={["Facility Management"] || []}
                        labelText="Fee type"
                      />
                    </div>
                    <div className="lg:w-full">
                      <CustomFormField
                        control={form.control}
                        name="facility_management_value"
                        placeholder="Enter value"
                        label="Value"
                      />
                    </div>
                  </div>
                  <div className="flex gap-5 flex-col lg:flex-row">
                    <div className="lg:w-full">
                      <CustomFormSelect
                        control={form.control}
                        name="diesel"
                        items={["Diesel"] || []}
                        labelText="Fee type"
                      />
                    </div>
                    <div className="lg:w-full">
                      <CustomFormField
                        control={form.control}
                        name="diesel_value"
                        placeholder="Enter value"
                        label="Value"
                      />
                    </div>
                  </div>
                  <div className="flex gap-5 flex-col lg:flex-row">
                    <div className="lg:w-full">
                      <CustomFormSelect
                        control={form.control}
                        name="electricity"
                        items={["Electricity"] || []}
                        labelText="Fee type"
                      />
                    </div>
                    <div className="lg:w-full">
                      <CustomFormField
                        control={form.control}
                        name="electricity_value"
                        placeholder="Enter value"
                        label="Value"
                      />
                    </div>
                  </div>

                  <div className=" relative">
                    {fields.map((field, index) => (
                      <div key={field.id} className=" mb-2 relative">
                        <div className="grid grid-cols-2  gap-4">
                          <CustomFormField
                            control={form.control}
                            name={`fees.${index}.type`}
                            placeholder="Enter type"
                            label="Type"
                          />
                          <CustomFormField
                            control={form.control}
                            name={`fees.${index}.value`}
                            placeholder="Enter value"
                            label="Value"
                          />
                        </div>
                        <div
                          onClick={() => remove(index)}
                          className="absolute top-11 right-1 text-red-500 cursor-pointer"
                        >
                          <Trash2 className="size-5" />
                        </div>
                      </div>
                    ))}
                    <div className="ml-auto w-max">
                      <div
                        onClick={() => append({ type: "", value: "" })}
                        className="text-xs text-primaryLight flex gap-1 font-semibold cursor-pointer"
                      >
                        <PlusCircle className="size-4" />
                        <p>Add Other Fees</p>
                      </div>
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
        {/* <DevTool control={form.control} /> */}
      </Form>
    </section>
  );
}
