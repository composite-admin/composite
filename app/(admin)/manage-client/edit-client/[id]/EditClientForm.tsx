"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { IClientDetails, nigerianStates } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import {
  createAddClientSchema,
  CreateAddClientType,
} from "@/components/forms/formTypes";
import FormContainer from "@/components/shared/FormContainer";
import { Form } from "@/components/ui/form";
import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/shared/FormComponent";
import { useGetClientDetails } from "@/hooks/useSelectOptions";
import { useEffect } from "react";
import useManageClientStore from "@/store/manage-client/useManageClientStore";

export default function EditClientForm(data: any) {
  console.log(data, "data");
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<CreateAddClientType>({
    resolver: zodResolver(createAddClientSchema),
  });

  useEffect(() => {
    form.setValue("First name", data?.data?.first_name);
    form.setValue("Last name", data?.data?.last_name);
    form.setValue("Email", data?.data?.email);
    form.setValue("Phone number", data?.data?.phone_number);
    form.setValue("Mobile number", data?.data?.mobile_number);
    form.setValue("State", data?.data?.state);
    form.setValue("Address", data?.data?.address);
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["Edit Client", data?.data?.id],
    mutationFn: async (values: CreateAddClientType) => {
      try {
        const response = await api.put(`/client/${data?.data?.userid}`, {
          first_name: values["First name"],
          last_name: values["Last name"],
          email: values.Email,
          phone_number: values["Phone number"],
          mobile_number: values["Mobile number"],
          state: values.State,
          address: values.Address,
          activation_code: "testing123",
        });
        return response.data;
      } catch (error) {}
    },
  });
  function onSubmit(values: CreateAddClientType) {
    mutate(values, {
      onSuccess: () => {
        toast({
          title: "Client ediited successfully",
          variant: "success",
        });

        router.push("/manage-client");
      },
      onError: () => {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      },
    });

    // form.reset();
  }
  return (
    <FormContainer
      title="Edit client"
      description="Edit an existing client here"
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
                placeholder={data?.data?.state}
                control={form.control}
                labelText="State"
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
            <Button
              variant={"secondary"}
              className="w-full"
              type="button"
              onClick={() => router.push(`/manage-client`)}
            >
              Cancel
            </Button>
            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
}
