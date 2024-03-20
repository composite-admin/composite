"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { AddTenantFormSteps, FormDataSchema } from "./formtypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import StepNavigation from "./StepBottomNav";
import StepTopNav from "./StepTopNav";
import FormContainer from "../../shared/FormContainer";
import InputComponent from "./InputComponent";

type Inputs = z.infer<typeof FormDataSchema>;

export default function AddTenantForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = AddTenantFormSteps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < AddTenantFormSteps.length - 1) {
      if (currentStep === AddTenantFormSteps.length - 2) {
        await handleSubmit(processForm)();
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
        steps={AddTenantFormSteps}
        currentStep={currentStep}
        next={next}
        prev={prev}
      />
      {/* Form */}
      <form className="" onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <FormContainer
              title="Add Tenant"
              description="Create a new staff profile here"
              isColumn={false}
            >
              <div className="space-y-9">
          <div className="space-y-9">
          <select
                className="w-full p-2 border border-borderColor h-[56px] rounded-md"
                {...register("selectProject")}  >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
                <select
                className="w-full p-2 border border-borderColor h-[56px] rounded-md"
                {...register("selectFlat")}  >
                  <option value="option1">Option we</option>
                  <option value="option2">Option wo</option>
                  <option value="option3">Option we</option>
                </select>
          </div>
                <div className="flex flex-col md:flex-row gap-5 ">
                  <div className=' flex-1 md:w-1/2 space-y-9'>
                    <InputComponent
                      placeholder="Select Title"
                      label="Title"
                      name="title"
                      register={register}
                      errors={errors}
                    />
                    <InputComponent
                      label="Last Name"
                      name="tenatFullName"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  <div className=' flex-1 md:w-1/2 space-y-9'>
                    <InputComponent
                      label="Phone number"
                      name="phoneNumber"
                      register={register}
                      errors={errors}
                    />
                    <InputComponent
                      label="Email"
                      name="email"
                      register={register}
                      errors={errors}
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
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Address
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
          </motion.div>
        )}
      </form>
      {/* Navigation */}
      <StepNavigation
        steps={AddTenantFormSteps}
        currentStep={currentStep}
        next={next}
        prev={prev}
      />
    </section>
  );
}
