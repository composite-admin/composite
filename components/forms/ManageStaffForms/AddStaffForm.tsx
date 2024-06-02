"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import StepTopNav from "../MultiStepFoms/StepTopNav";
import StepBottomNav from "../MultiStepFoms/StepBottomNav";
import FormContainer from "@/components/shared/FormContainer";
import { Form } from "@/components/ui/form";
import { AddStaffSteps as steps } from "./addStaffFormtypes";
import {
  CustomDatePicker,
  CustomFormField,
  CustomFormSelect,
} from "@/components/shared/FormComponent";
import { AddStaffFormSchema, addStaffType } from "./addStaffFormtypes";
import { nigerianStates, selectOptionForRoles } from "@/utils/types";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

type Inputs = z.infer<typeof AddStaffFormSchema>;

export default function AddStaffForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<addStaffType>({
    resolver: zodResolver(AddStaffFormSchema),
    defaultValues: {
      typeOfStaff: "Admin",
      gender: "Male",
      maritalStatus: "Married",
      relationship: "Father",
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["add consultant"],
    mutationFn: async (data: { [Key in keyof addStaffType]: string }) => {
      try {
        const response = await api.post("/staffs", {
          ...data,
          firstname: data.firstName,
          middlename: data.middleName,
          deptid: "1",
          gradeid: "1",
          branchcode: "CPD20",
          lastname: data.lastName,
          sex: data.gender,
          marital_status: data.maritalStatus,
          home_phone: data.homePhone,
          cell_phone: data.cellPhone,
          nextOfKin: data.nextOfKinFullName,
          addressOfNOK: data.addressOfNextOfKin,
          emailOfNOK: data.emailnextOfKin,
          phoneOfNOK: data.cellPhoneOfNextOfKin,
          employee_status: "Active",
          bank_name: data.bankName,
          account_name: data.accountName,
          account_number: data.accountNumber,
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
    onSuccess: () => {
      toast({
        title: "Staff added successfully",
        variant: "success",
      });
      form.reset();
      router.push("/manage-staff");
    },
    onError: (error: Error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });

  const processForm: SubmitHandler<Inputs> = (data, event) => {
    const { password, confirmPassword } = form.getValues();
    const birth = data.dob
      ? data.dob.toISOString().slice(0, 19).replace("T", " ")
      : "";
    const employed = data.date_employed
      ? data.date_employed.toISOString().slice(0, 19).replace("T", " ")
      : "";

    if (password !== confirmPassword) {
      console.log("passwords do not match");
      return;
    }
    mutate({
      ...data,
      dob: birth,
      date_employed: employed,
    });
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
    <section>
      <StepTopNav
        steps={steps}
        currentStep={currentStep}
        next={next}
        prev={prev}
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
                title="Add staff"
                isColumn={false}
                description="Create a new staff profile here"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-5">
                  <div className="flex flex-col gap-5 w-full lg:w-1/2 ">
                    <CustomFormField
                      control={form.control}
                      placeholder="Enter first name"
                      label="First name"
                      name="firstName"
                    />
                    <CustomFormField
                      control={form.control}
                      placeholder="Enter last name"
                      label="Last name"
                      name="lastName"
                    />
                    <CustomDatePicker
                      control={form.control}
                      name="dob"
                      label="Date of Birth"
                      placeholder="Date of birth"
                    />

                    <CustomFormField
                      control={form.control}
                      placeholder="Enter phone number"
                      label="Home phone"
                      name="homePhone"
                    />
                    <CustomFormField
                      control={form.control}
                      placeholder="Enter email"
                      label="Email"
                      type="email"
                      name="email"
                    />

                    <CustomFormSelect
                      name="stateOfOrigin"
                      items={nigerianStates}
                      placeholder="select state"
                      control={form.control}
                      labelText="State of Origin"
                    />
                    <CustomFormSelect
                      name="gender"
                      items={["Male", "Female"]}
                      placeholder="select gender"
                      control={form.control}
                    />
                  </div>
                  <div className="flex flex-col gap-5 w-full lg:w-1/2 ">
                    <CustomFormField
                      control={form.control}
                      placeholder="Enter middle name"
                      label="Middle name"
                      name="middleName"
                    />
                    <CustomFormSelect
                      name="role"
                      items={selectOptionForRoles || []}
                      placeholder="Select Staff Role"
                      control={form.control}
                      labelText="Role"
                    />
                    <CustomDatePicker
                      control={form.control}
                      name="date_employed"
                      label="Date Employed"
                      placeholder="Date Employed"
                    />

                    <CustomFormField
                      control={form.control}
                      name="cellPhone"
                      placeholder="Enter cell phone number"
                      label="Cell phone"
                    />

                    <CustomFormField
                      control={form.control}
                      name="address"
                      placeholder="Enter address"
                      label="Address"
                    />

                    <CustomFormField
                      control={form.control}
                      name="lga"
                      placeholder="Enter lga"
                      label="LGA"
                    />
                    <CustomFormSelect
                      name="maritalStatus"
                      items={["Married", "Single"]}
                      placeholder="select marital status"
                      control={form.control}
                    />
                  </div>
                </div>
                <div className="grid pt-4 md:grid-cols-2 gap-5 ">
                  <Button
                    type="button"
                    variant={"secondary"}
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button onClick={next}>Next</Button>
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
                title="Add staff"
                isColumn={false}
                description="Create a new staff profile here"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-5">
                  <div className="flex flex-col gap-5 w-full lg:w-1/2 ">
                    <CustomFormField
                      name="nextOfKinFullName"
                      control={form.control}
                      placeholder="Enter full name"
                      label="Full name of next of kin"
                    />
                    <CustomFormSelect
                      name="relationship"
                      items={[
                        "Father",
                        "Mother",
                        "Brother",
                        "Sister",
                        "Relative",
                      ]}
                      placeholder="select relationship"
                      control={form.control}
                      labelText="Relationship of next of kin"
                    />
                    <CustomFormField
                      name="homePhoneOfNextOfKin"
                      control={form.control}
                      placeholder="Enter home phone number"
                      label="Home phone of next of kin"
                    />
                  </div>
                  <div className="flex flex-col gap-5 w-full lg:w-1/2 ">
                    <CustomFormField
                      name="emailnextOfKin"
                      control={form.control}
                      placeholder="Enter email"
                      label="Email of next of kin"
                    />
                    <CustomFormField
                      name="addressOfNextOfKin"
                      control={form.control}
                      placeholder="Enter address"
                      label="Address of next of kin"
                    />
                    <CustomFormField
                      name="cellPhoneOfNextOfKin"
                      control={form.control}
                      placeholder="Enter cell phone number"
                      label="Cell phone of next of kin"
                    />
                  </div>
                </div>
                <div className="grid pt-4 md:grid-cols-2 gap-5 ">
                  <Button type="button" variant={"secondary"} onClick={prev}>
                    Back
                  </Button>
                  <Button onClick={next}>Next</Button>
                </div>
              </FormContainer>
            </motion.div>
          )}
          {currentStep === 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FormContainer
                title="Add staff"
                isColumn={false}
                description="Create a new staff profile here"
              >
                <div className="flex flex-col  justify-between gap-5">
                  <div className="flex flex-col md:flex-row gap-5 w-full">
                    <div className="w-full">
                      <CustomFormField
                        name="userName"
                        control={form.control}
                        placeholder="Enter username"
                        label="Username"
                      />
                    </div>
                    <div className="w-full">
                      <CustomFormSelect
                        name="user_type"
                        control={form.control}
                        placeholder="Select user type"
                        labelText="User type"
                        items={["Admin", "Staff", "Supervisor"]}
                      />
                    </div>
                  </div>
                  <div>
                    <CustomFormSelect
                      name="staff_type"
                      control={form.control}
                      placeholder="Select type"
                      labelText="Type"
                      items={["In house", "Contractor"]}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-5 w-full">
                    <div className="w-full">
                      <CustomFormField
                        name="password"
                        control={form.control}
                        placeholder="Enter password"
                        label="Password"
                      />
                    </div>
                    <div className="w-full">
                      <CustomFormField
                        name="confirmPassword"
                        control={form.control}
                        placeholder="Enter confirm password"
                        label="Confirm password"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid pt-4 md:grid-cols-2 gap-5 ">
                  <Button type="button" variant={"secondary"} onClick={prev}>
                    Back
                  </Button>
                  <Button onClick={next}>Next</Button>
                </div>
              </FormContainer>
            </motion.div>
          )}
          {currentStep === 3 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FormContainer
                title="Add staff"
                isColumn={false}
                description="Create a new staff profile here"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-5">
                  <div className="flex flex-col gap-5 w-full ">
                    <CustomFormField
                      name="bankName"
                      control={form.control}
                      placeholder="Enter bank name"
                      label="Bank name"
                    />
                    <CustomFormField
                      name="accountName"
                      control={form.control}
                      placeholder="Enter account name"
                      label="Account name"
                    />
                    <CustomFormField
                      name="accountNumber"
                      control={form.control}
                      placeholder="Enter account number"
                      label="Account number"
                    />
                  </div>
                </div>
                <div className="gap-5 grid md:grid-cols-2 mt-5">
                  <Button type="button" variant={"secondary"} onClick={prev}>
                    Back
                  </Button>
                  <Button type="submit">
                    {isPending ? "Saving..." : "Submit"}
                  </Button>
                </div>
              </FormContainer>
            </motion.div>
          )}
        </form>
      </Form>
    </section>
  );
}
