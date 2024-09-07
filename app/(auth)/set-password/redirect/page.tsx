"use client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/config/api";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { ForgotPasswordStore, userStore } from "@/store/auth/AuthStore";
import { useRouter, useSearchParams } from "next/navigation";
import { decryptEmail } from "@/utils/encryption";

const FormSchema = z
  .object({
    password: z.string({ required_error: "Please Enter your new password" }),
    confirm_password: z.string({
      required_error: "Please Enter your new password",
    }),
  })
  .refine((data) => data.confirm_password === data.password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type FormType = z.infer<typeof FormSchema>;

export default function ForgottenPassword() {
  const searchParams = useSearchParams();
  const encryptedEmail = searchParams.get("email");
  let decryptedEmail = "";
  if (encryptedEmail) {
    decryptedEmail = decryptEmail(encryptedEmail);
  }

  console.log(decryptedEmail);
  console.log(encryptedEmail);
  const { toast } = useToast();
  const router = useRouter();
  const { email, setEmail } = ForgotPasswordStore();

  const { logOut } = userStore();
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (data: FormType) => {
      try {
        const response = await api.put("/users/password", {
          email: decryptedEmail,
          password: data.password,
        });
        console.log(encryptedEmail, decryptedEmail);
        if (response.status === 200) {
          toast({
            title: "Password changed successfully, please login again",
            variant: "success",
          });
        }
        return response.data;
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      logOut();
      router.push("/login");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const submit = (data: FormType) => {
    mutate(data);
  };

  return (
    <div className="loginScreen flex flex-col text-start w-full lg:w-4/5 m-auto gap-10">
      <div>
        <h1 className="text-[#101928] text-[36px] font-[600] ">
          Set A New Password
        </h1>
        <p className="text-[#645D5D] ">
          Please enter a new password before you can proceed
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <div className="flex flex-col w-full gap-5 pt-10 lg:pt-0 lg:pr-10">
            <CustomFormField
              type="password"
              name="password"
              control={form.control}
              placeholder="Enter new Password"
            />

            <CustomFormField
              type="password"
              name="confirm_password"
              control={form.control}
              placeholder="Enter new password again"
            />

            <div>
              <Button className="w-full">Proceed</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
