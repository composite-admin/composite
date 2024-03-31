"use client";
import { RiLock2Fill, RiMailCloseLine } from "react-icons/ri";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { LoginType, loginSchema } from "@/utils/types";
import { CustomFormField } from "../shared/FormComponent";

export default function ForgottenPassword() {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginType) {
    console.log(values);
  }
  return (
    <div className="loginScreen flex flex-col text-start w-full lg:w-3/5 m-auto gap-10">
      <div>
        <h1 className="text-[#101928] text-[36px] font-[600] ">
          Forgot Password
        </h1>
        <p className="text-[#645D5D] ">
          Enter your email to reset password
        </p>
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
         Remember Password?{" "}
        <Link href={"/login"}>Login</Link>
      </p>
    </div>
  );
}
