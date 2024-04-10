"use client";

import { useForm } from "react-hook-form";
import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/shared/FormComponent";
import FormContainer from "@/components/shared/FormContainer";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { api } from "@/config/api";
import { IConsultantDetailsData } from "@/utils/types";
const EditConsultantSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Email is invalid" }),
    website: z.string().min(1, { message: "Website is required" }),
  })
  .required();

type EditConsultantType = z.infer<typeof EditConsultantSchema>;

export default function EditConsultantForm({ data }: IConsultantDetailsData) {
  const form = useForm<EditConsultantType>({
    resolver: zodResolver(EditConsultantSchema),
    defaultValues: {
      email: "",
      website: "",
    },
  });

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ["edit consultant", data.id],
    mutationFn: async (args: { formData: EditConsultantType; id: number }) => {
      try {
        const response = await api.put(
          `/consultants/${args.id}`,
          args.formData
        );
        return response.data.data;
      } catch (err) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
  });

  const onSubmit = (formData: EditConsultantType) => {
    mutate({ formData, id: data.id });
  };
  return (
    <FormContainer
      title="Edit Consultant"
      description=""
      isColumn={true}
      className="w-full lg:max-w-3xl px-8"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-5 flex-col justify-center lg:items-center lg:flex-row">
            <div className="lg:w-1/2 flex flex-col gap-5">
              <CustomFormField
                name="name"
                placeholder="Enter full name"
                control={form.control}
                label="Full name"
                disabled
                value={data.name}
              />
              <CustomFormField
                control={form.control}
                name="contact"
                placeholder="Enter phone number"
                label="contact"
                disabled
                value={data.contact}
              />
            </div>
            <div className="lg:w-1/2 flex flex-col gap-5">
              <CustomFormSelect
                name="type"
                items={["Type 1", "Type 2"]}
                placeholder={data.type}
                disabled
                control={form.control}
                labelText="Type"
                value={data.type}
              />
              <CustomFormField
                name="email"
                placeholder="Enter email"
                control={form.control}
                label="Email"
              />
            </div>
          </div>
          <CustomFormField
            name="website"
            placeholder="Enter website"
            control={form.control}
            label="Website"
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
