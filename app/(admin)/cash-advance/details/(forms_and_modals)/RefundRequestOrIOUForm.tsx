import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";

export default function RefundRequestOrIOUForm() {
  const form = useForm({});
  return (
    <Form {...form}>
      <form>
        <div className="grid md:grid-cols-2 gap-5">
          <CustomFormField name="type" control={form.control} label="Type" />
          <CustomFormField
            name="staff_name"
            control={form.control}
            label="Requested by"
          />
        </div>
        <CustomFormField
          name="returned_amount"
          control={form.control}
          label={"Approved Amount"}
        />
        <CustomFormSelect
          name="decision"
          control={form.control}
          labelText={"Decision"}
          items={["Approve", "Reject", "Pending"]}
        />
        <CustomFormTextareaField
          name="Reason"
          control={form.control}
          label={"Decision Reason"}
        />
        <CustomFormTextareaField
          name="Description"
          control={form.control}
          label={"Description"}
        />
        <div className="grid md:grid-cols-2 gap-5">
          <Button variant={"secondary"}>Cancel</Button>
          <Button>Submit</Button>
        </div>
      </form>
    </Form>
  );
}
