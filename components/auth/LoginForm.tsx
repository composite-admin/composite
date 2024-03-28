"use client";
import { RiLock2Fill, RiMailCloseLine } from "react-icons/ri";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { LoginType, loginSchema } from "@/utils/types";
import { CustomFormField } from "../shared/FormComponent";
import useLogin from "@/mutations/LoginMutation";
import useAuthStore from "@/store/auth/AuthStore";

export default function LoginForm() {
  const {user} = useAuthStore();

  const {isPending, login} = useLogin();
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginType) {
    console.log(values);
    login(values);
  }
  return (
    <div className="loginScreen flex flex-col text-start w-3/5 m-auto gap-10">
      <div>
        <h1 className="text-[#101928] text-[36px] font-[600] ">
          Login to your account
        </h1>
        <p className="text-[#645D5D] ">
          Enter your email and password to login
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

            <CustomFormField
              type="password"
              control={form.control}
              name="password"
              placeholder="Enter Password"
              icon={<RiLock2Fill className=" text-primaryLight-500" />}
              withIcon
            />
          </div>
          <label className="flex gap-2">
            <input type="checkbox" name="" id="" />
            <p>Remember Me</p>
          </label>
          <Button type="submit" className=" p-3 py-6 rounded-l">
            Login
          </Button>
        </form>
      </Form>
      <p>
        Can&apos;t Remember Password?{" "}
        <Link href={"/forgot-password"}>Forgot Password</Link>
      </p>
    </div>
  );
}
