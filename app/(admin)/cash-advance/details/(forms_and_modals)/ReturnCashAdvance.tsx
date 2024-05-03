import {
  CustomFormField,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function ReturnCashAdvance() {
  const form = useForm({});
  return (
    <Form {...form}>
      <form>
        <CustomFormField name="type" control={form.control} label="Type" />
        <CustomFormField
          name="approved_amounnt"
          control={form.control}
          label={"Approved Amount"}
        />
        <CustomFormField
          name="unused_cash_amount"
          control={form.control}
          label={"Unused Cash Amount"}
        />
        <CustomFormTextareaField
          name="Description"
          control={form.control}
          label={"Description"}
        />
      </form>
    </Form>
  );
}
