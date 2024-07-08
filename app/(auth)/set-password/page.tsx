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
import { ForgotPasswordStore, userStore } from "@/store/auth/AuthStore";
import { useRouter } from "next/navigation";
import { ChangePasswordSchema, ChangePasswordSchemaType } from "@/components/forms/ChangePasswordForm";

const FormSchema = z.object({
  password: z.string({ required_error: "Please Enter your new password" }),
});

type FormType = z.infer<typeof FormSchema>;

export default function ForgottenPassword() {
  const { toast } = useToast();
  const router = useRouter();
  const { logOut } = userStore();
  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async (data: ChangePasswordSchemaType) => {
      try {
        if (data.new_password === data.confirm_new_password) {
          const response = await api.put("/users/change-password", {
            oldPassword: data.current_password,
            newPassword: data.new_password,
          });
          return response.data;
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "Password changed successfully, please login again",
        variant: "success",
      });
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

  const submit = (data: ChangePasswordSchemaType) => {
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
            name="current_password"
            control={form.control}
            placeholder="Enter current password"
          />

          <CustomFormField
            type="password"
            name="new_password"
            control={form.control}
            placeholder="Enter new Password"
          />

          <CustomFormField
            type="password"
            name="confirm_new_password"
            control={form.control}
            placeholder="Enter new password again"
          />

          <div >
            <Button className="w-full">Proceed</Button>
          </div>
        </div>
      </form>
    </Form>
      {/* <p>
        Remember Password? <Link href={"/login"}>Login</Link>
      </p> */}
    </div>
  );
}


//   return (

//   );
// }
