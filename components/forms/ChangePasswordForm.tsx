"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomFormField } from "../shared/FormComponent";
import { Button } from "../ui/button";

export default function ChangePasswordForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form>
        <div className="flex flex-col w-full gap-5 pt-10 lg:pt-0 lg:pr-10">
          <CustomFormField
            type="password"
            name="current password"
            control={form.control}
            placeholder="Enter current password"
          />

          <CustomFormField
            type="password"
            name="new password"
            control={form.control}
            placeholder="Enter new Password"
          />

          <CustomFormField
            type="password"
            name="confirm new password"
            control={form.control}
            placeholder="Enter new password again"
          />

          <div className="flex flex-col md:flex-row gap-5">
            <Button variant={"secondary"} className="w-full">
              Cancel
            </Button>
            <Button className="w-full">Submit</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
