import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import useCashAdvanceStore from "@/store/cash-advance/useCashAdvanceStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";

const RefundRequestOrIOUSchema = z.object({
  cash_advance_type: z.string().optional(),
  description: z.string().optional(),
  amount_recorded: z.string().optional(),
  decison: z.string().optional(),
  decision_reason: z.string().optional(),
  staff_name: z.string().optional(),
});

type RefundRequestOrIOUFormType = z.infer<typeof RefundRequestOrIOUSchema>;

export default function RefundRequestOrIOUForm() {
  const { CashAdvanceDetails } = useCashAdvanceStore();

  const form = useForm<RefundRequestOrIOUFormType>({
    resolver: zodResolver(RefundRequestOrIOUSchema),
    defaultValues: {
      cash_advance_type: CashAdvanceDetails?.cash_advance_type,
      amount_recorded: CashAdvanceDetails?.amount_recorded,
      staff_name: CashAdvanceDetails?.staff_name,
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["request iou", CashAdvanceDetails?.cash_id],
    mutationFn: async (data: RefundRequestOrIOUFormType) => {
      try {
        const response = await api.put(
          `/cash-advancess/${CashAdvanceDetails?.cash_id}`,
          {
            ...data,
            amount: Number(data.amount_recorded),
            amount_recorded: Number(data.amount_recorded),
          }
        );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
  });

  const submit = (data: RefundRequestOrIOUFormType) => {
    console.log(data);
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className="grid md:grid-cols-2 gap-5 pb-3">
          <CustomFormField
            name="type"
            control={form.control}
            label="Type"
            disabled
            placeholder={CashAdvanceDetails?.cash_advance_type}
          />
          <CustomFormField
            name="staff_name"
            control={form.control}
            label="Requested by"
            disabled
            placeholder={CashAdvanceDetails?.staff_name}
          />
          <CustomFormField
            name="returned_amount"
            control={form.control}
            label={"Returned Amount"}
            placeholder={CashAdvanceDetails?.amount_collected}
            disabled
          />
          <CustomFormSelect
            name="decision"
            control={form.control}
            labelText={"Decision"}
            items={["Approve", "Pending"]}
          />
        </div>

        <CustomFormTextareaField
          name="decision_reason"
          control={form.control}
          label={"Decision Reason"}
        />
        <CustomFormTextareaField
          name="description"
          control={form.control}
          label={"Description"}
        />
        <div className="grid md:grid-cols-2 gap-5 pt-6">
          <Button variant={"secondary"}>Cancel</Button>
          <Button>Submit</Button>
        </div>
      </form>
    </Form>
  );
}