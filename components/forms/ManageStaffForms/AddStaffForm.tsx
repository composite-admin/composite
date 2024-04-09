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
  CustomFormField,
  CustomFormSelect,
} from "@/components/shared/FormComponent";
import { AddStaffFormSchema, addStaffType } from "./addStaffFormtypes";
import { nigerianStates } from "@/utils/types";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";

type Inputs = z.infer<typeof AddStaffFormSchema>;

export default function AddStaffForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const form = useForm<addStaffType>({
    resolver: zodResolver(AddStaffFormSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      typeOfStaff: "Admin",
      homePhone: "",
      cellPhone: "",
      email: "",
      address: "",
      stateOfOrigin: "",
      lga: "",
      gender: "Male",
      maritalStatus: "Married",
      nextOfKinFullName: "",
      emailnextOfKin: "",
      relationship: "Father",
      addressOfNextOfKin: "",
      homePhoneOfNextOfKin: "",
      cellPhoneOfNextOfKin: "",
      userName: "",
      role: "Admin",
      password: "",
      confirmPassword: "",
      bankName: "",
      accountName: "",
      accountNumber: "",
    },
  });

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ["add consultant"],
    mutationFn: async (data: { [Key in keyof addStaffType]: string }) => {
      try {
        const response = await api.post("/staffs", {
          firstname: data.firstName,
          middlename: data.middleName,
          lastname: data.lastName,
          dob: "test date",
          stateOfOrigin: data.stateOfOrigin,
          lga: data.lga,
          sex: data.gender,
          marital_status: data.maritalStatus,
          address: data.address,
          home_phone: data.homePhone,
          cell_phone: data.cellPhone,
          email: data.email,
          nextOfKin: data.nextOfKinFullName,
          relationship: data.relationship,
          addressOfNOK: data.addressOfNextOfKin,
          emailOfNOK: data.emailnextOfKin,
          phoneOfNOK: data.cellPhoneOfNextOfKin,
          date_employed: "2022-01-01",
          deptid: "test0001 ",
          gradeid: "testgrade0001",
          branchcode: "testbranch0001",
          employee_status: "Active",
          role: "Plumber", // this exists, need to know the type
          staff_type: "Contractor", //this exists, need to know the type
          bank_name: data.bankName,
          account_name: data.accountName,
          account_number: data.accountNumber,
          password: data.password,
          user_type: data.typeOfStaff,
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
  });

  const processForm: SubmitHandler<Inputs> = (data, event) => {
    console.log(data);
    const { password, confirmPassword } = form.getValues();

    if (password !== confirmPassword) {
      console.log("passwords do not match");
      return;
    }
    mutate(data);
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
                      name="typeOfStaff"
                      items={["Admin", "Staff"]}
                      placeholder=" select type of staff"
                      control={form.control}
                      labelText="Type of Staff"
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
                <div className="flex flex-col lg:flex-row justify-between gap-5">
                  <div className="flex flex-col gap-5 w-full lg:w-1/2 ">
                    <CustomFormField
                      name="userName"
                      control={form.control}
                      placeholder="Enter username"
                      label="Username"
                    />
                    <CustomFormSelect
                      name="role"
                      control={form.control}
                      placeholder="Enter role"
                      labelText="Role"
                      items={["Admin", "Staff", "Client"]}
                    />
                  </div>
                  <div className="flex flex-col gap-5 w-full lg:w-1/2 ">
                    <CustomFormField
                      name="password"
                      control={form.control}
                      placeholder="Enter password"
                      label="Password"
                    />
                    <CustomFormField
                      name="confirmPassword"
                      control={form.control}
                      placeholder="Enter confirm password"
                      label="Confirm password"
                    />
                  </div>
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
                <div className="my-7 ">
                  <Button type="submit" className="mt-4">
                    Submit
                  </Button>
                </div>
              </FormContainer>
            </motion.div>
          )}
        </form>
      </Form>
      <StepBottomNav
        next={next}
        prev={prev}
        currentStep={currentStep}
        steps={steps}
      />
    </section>
  );
}
