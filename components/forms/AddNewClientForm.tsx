"use client";

import { useForm } from "react-hook-form";
import { CustomFormField, CustomFormSelect } from "../shared/FormComponent";
import FormContainer from "../shared/FormContainer";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { nigerianStates } from "@/utils/types";
import { createAddClientSchema, CreateAddClientType } from "./formTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";

export default function AddNewClientForm({ isEdit }: { isEdit?: boolean }) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<CreateAddClientType>({
    resolver: zodResolver(createAddClientSchema),
    defaultValues: {
      "First name": "",
      "Last name": "",
      Email: "",
      "Phone number": "",
      "Mobile number": "",
      State: "",
      Address: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["addClient"],
    mutationFn: async (values: CreateAddClientType) => {
      try {
        const response = await api.post("/client", {
          first_name: values["First name"],
          last_name: values["Last name"],
          email: values.Email,
          phone_number: values["Phone number"],
          mobile_number: values["Mobile number"],
          state: values.State,
          address: values.Address,
          activation_code: "testing123",
        });
        if (response.data) {
          toast({
            title: "Client created successfully",
            description: "Client created successfully",
          });
          router.push("/clients");
        }
        return response.data;
      } catch (error) {
        axios.isAxiosError(error) && error.response;
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      }
    },
  });
  function onSubmit(values: CreateAddClientType) {
    mutate(values);

    // form.reset();
  }
  return (
    <FormContainer
      title="Add new client"
      description="Add new client here"
      isColumn
      className="w-full lg:max-w-4xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" mb-5 flex gap-5 flex-col justify-center lg:items-center lg:flex-row">
            <div className="lg:w-1/2 flex flex-col gap-5">
              <CustomFormField
                name="First name"
                placeholder="Enter First name"
                control={form.control}
                label="First name"
              />
              <CustomFormField
                name="Email"
                placeholder="Enter email"
                control={form.control}
                label="Email"
              />
              <CustomFormField
                control={form.control}
                name="Phone number"
                placeholder="Enter phone number"
                label="Phone number"
              />
            </div>
            <div className="lg:w-1/2 flex flex-col gap-5">
              <CustomFormField
                name="Last name"
                placeholder="Enter Last name"
                control={form.control}
                label="Last name"
              />
              <CustomFormField
                control={form.control}
                name="Mobile number"
                placeholder="Enter mobile number"
                label="Mobile number"
              />
              <CustomFormSelect
                name="State"
                items={nigerianStates}
                placeholder="select"
                control={form.control}
                label="State"
              />
            </div>
          </div>
          <CustomFormField
            name="Address"
            placeholder="Enter address"
            control={form.control}
            label="Address"
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

