"use client";
import { RiMailCloseLine } from "react-icons/ri";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { CustomFormField } from "../shared/FormComponent";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/config/api";
import axios from "axios";
import { useToast } from "../ui/use-toast";

const FormSchema = z.object({
  email: z.string({ required_error: "Please Enter your email" }),
});

type FormType = z.infer<typeof FormSchema>;

export default function ForgottenPassword() {
  const { toast } = useToast();
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate } = useMutation({
    mutationKey: ["forgot password"],
    mutationFn: async (credentials: { email: string }) => {
      try {
        const response = await api.post("/forgot-password", {
          ...credentials,
          link: "https://composite-portal-dusky.vercel.app/set-password",
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
        title: "Submission Successfully",
        description: "Please check your mail",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Submission Error",
        description: "Please check the email input and try again",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
    mutate(values);
  }
  return (
    <div className="loginScreen flex flex-col text-start w-full lg:w-3/5 m-auto gap-10">
      <div>
        <h1 className="text-[#101928] text-[36px] font-[600] ">
          Forgot Password
        </h1>
        <p className="text-[#645D5D] ">Enter your email to reset password</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col w-full gap-2">
            <CustomFormField
              name="email"
              control={form.control}
              placeholder="Email Address"
              icon={<RiMailCloseLine className=" text-primaryLight-500" />}
              withIcon
            />
          </div>

          <Button type="submit" className=" p-3 py-6 rounded-l">
            Proceed
          </Button>
        </form>
      </Form>
      <p>
        Remember Password? <Link href={"/login"}>Login</Link>
      </p>
    </div>
  );
}
