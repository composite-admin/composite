"use client";

import { useForm } from "react-hook-form";
import { CustomFormField, CustomFormSelect } from "../shared/FormComponent";
import FormContainer from "../shared/FormContainer";
import { Form } from "../ui/form";
import { Button } from "../ui/button";

export default function ConsultantForm() {
  const form = useForm();
  return (
    <FormContainer title="Add new consultant" description="" isColumn={true}>
      <Form {...form}>
        <form>
          <div className="flex gap-5 flex-col justify-center lg:items-center lg:flex-row">
            <div className="lg:w-1/2 flex flex-col gap-5">
              <CustomFormField
                name="Full name"
                placeholder="Enter full name"
                control={form.control}
              />
              <CustomFormField
                control={form.control}
                name="Phone number"
                placeholder="Enter phone number"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col gap-5">
              <CustomFormSelect
                name="Type"
                items={["Type 1", "Type 2"]}
                placeholder="select"
                control={form.control}
              />
              <CustomFormField
                name="Email"
                placeholder="Enter email"
                control={form.control}
              />
            </div>
          </div>
          <CustomFormField
            name="Website"
            placeholder="Enter website"
            control={form.control}
          />
          <div className="flex flex-col md:flex-row gap-8 pt-8">
            <Button variant={"secondary"} className="w-full">
              Cancel
            </Button>
            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
}
