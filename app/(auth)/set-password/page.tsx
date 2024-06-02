"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/config/api";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  // oldPassword: z.string({ required_error: "Please Enter your old password" }),
  newPassword: z.string({ required_error: "Please Enter your new password" }),
});

type FormType = z.infer<typeof FormSchema>;

export default function ForgottenPassword() {
  const { toast } = useToast();
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate } = useMutation({
    mutationKey: ["forgot password"],
    mutationFn: async (credentials: FormType) => {
      try {
        const response = await api.put("/users/change-password", credentials);
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
        title: "Submission Successfully",
        description: "You can now login with your new password",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Submission Error",
        description: "Please check the password input and try again",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
    mutate(values);
  }
  return (
    <div className="loginScreen flex flex-col text-start w-full lg:w-4/5 m-auto gap-10">
      <div>
        <h1 className="text-[#101928] text-[36px] font-[600] ">
          Set A New Password
        </h1>
        <p className="text-[#645D5D] ">Enter your new password</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col w-full gap-2">
            {/* <CustomFormField
              name="oldPassword"
              control={form.control}
              placeholder="Please enter your old password"
              type="password"
            /> */}
            <CustomFormField
              name="newPassword"
              control={form.control}
              placeholder="Please enter your new password"
              type="password"
            />
          </div>

          <Button type="submit" className=" p-3 py-6 rounded-l">
            Proceed
          </Button>
        </form>
      </Form>
      {/* <p>
        Remember Password? <Link href={"/login"}>Login</Link>
      </p> */}
    </div>
  );
}
