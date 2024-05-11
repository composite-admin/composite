"use client";

import { AvatarComponent } from "@/components/shared/AvatarComponent";
import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useGetClientDetails } from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import { nigerianStates } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  first_name: z.string({
    required_error: "First name is required",
  }),
  last_name: z.string({
    required_error: "Last name is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }),
  phone_number: z.string({
    required_error: "Phone is required",
  }),
  mobile_number: z.string({
    required_error: "Mobile is required",
  }),
  state: z.string({
    required_error: "State is required",
  }),
  address: z.string({
    required_error: "City is required",
  }),
});

type FormDataType = z.infer<typeof FormSchema>;

export default function Information() {
  const { userId } = userStore();
  const { toast } = useToast();
  const router = useRouter();
  const idString = userId?.replace("cli-", "");
  const { details, isClientDetailsLoading } = useGetClientDetails(userId!);
  const form = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
  });

  // @ts-ignore
  useEffect(() => {
    form.setValue("first_name", details?.first_name || "");
    form.setValue("last_name", details?.last_name || "");
    form.setValue("email", details?.email || "");
    form.setValue("phone_number", details?.phone_number || "");
    form.setValue("mobile_number", details?.mobile_number || "");
    form.setValue("state", details?.state || "");
    form.setValue("address", details?.address || "");
  }, [details, form]);

  const { mutate } = useMutation({
    mutationKey: ["client-details update"],
    mutationFn: async (data: FormDataType) => {
      try {
        const res = api.put(`/client/${userId!}`, data);
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      toast({
        title: "Client details updated successfully",
        variant: "success",
      });

      router.push("/client/dashboard");
    },
  });

  const onSubmit = (data: FormDataType) => {
    mutate(data);
    form.reset();
  };
  return (
    <div className="md:grid grid-cols-6 space-y-8 md:space-y-0 rounded-xl p-5 py-9 bg-white border border-borderColor mt-8">
      <div className="col-span-2 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <p className="text-textColor">Update your personal information</p>
        </div>
        <div>
          <AvatarComponent height="h-28" width="w-28" />
        </div>
        <div>
          <Button
            className="text-sm text-primaryLight gap-2 font-semibold rounded-xl border border-primaryLight w-max p-1"
            variant={"outline"}
          >
            <Upload />
            Change Photo
          </Button>
        </div>
      </div>
      <div className="col-span-4">
        <Form {...form}>
          <form
            className="flex flex-col gap-5 pb-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-2 gap-4">
              <CustomFormField
                control={form.control}
                label="First name"
                placeholder={details?.first_name}
                name="first_name"
              />
              <CustomFormField
                control={form.control}
                label="Last name"
                placeholder={details?.last_name}
                name="last_name"
              />{" "}
              <CustomFormField
                control={form.control}
                label="Phone Number"
                placeholder={details?.phone_number}
                name="phone_number"
              />
              <CustomFormField
                control={form.control}
                label="Mobile Number"
                placeholder={details?.mobile_number}
                name="mobile_number"
              />
            </div>
            <CustomFormField
              control={form.control}
              label="Email address"
              placeholder={details?.email}
              name="email"
              disabled
            />{" "}
            <CustomFormField
              control={form.control}
              label="Address"
              placeholder={details?.address}
              name="address"
            />
            <CustomFormSelect
              control={form.control}
              labelText="State"
              items={nigerianStates || details?.state}
              placeholder={details?.state}
              name="state"
            />
            <div className="pt-5">
              <Button className="w-full">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
