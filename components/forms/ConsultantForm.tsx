"use client";

import { useForm } from "react-hook-form";
import { CustomFormField, CustomFormSelect } from "../shared/FormComponent";
import FormContainer from "../shared/FormContainer";
import { Form } from "../ui/form";

export default function ConsultantForm() {
  const form = useForm();
  return (
    <FormContainer title="Add new consultant" description="" isColumn={true}>
      <Form {...form}>
        <form className="flex gap-5 flex-col justify-center lg:items-center lg:flex-row">
          <div className="lg:w-1/2">
            <CustomFormField name="Full name" placeholder="Enter full name" />
            <CustomFormField
              name="Phone number"
              placeholder="Enter phone number"
            />
          </div>
          <div className="lg:w-1/2">
            <CustomFormSelect name="Type" items={["Type 1", "Type 2"]} placeholder="select"/>
            <CustomFormField name="Email" placeholder="Enter email" />
          </div>
        </form>
      </Form>
    </FormContainer>
  );
}
