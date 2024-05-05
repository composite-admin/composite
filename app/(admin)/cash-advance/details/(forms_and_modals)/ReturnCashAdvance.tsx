import {
  CustomFormField,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCashAdvanceStore from "@/store/cash-advance/useCashAdvanceStore";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";

const ReturnCashAdvanceSchema = z.object({
  cash_advance_type: z.string().optional(),
  approved_amounnt: z.string().optional(),
  unused_cash_amount: z.string().optional(),
  description: z.string().optional(),
});

type ReturnCashAdvanceFormType = z.infer<typeof ReturnCashAdvanceSchema>;

export default function ReturnCashAdvance() {
  const { CashAdvanceDetails } = useCashAdvanceStore();

  const form = useForm<ReturnCashAdvanceFormType>({
    resolver: zodResolver(ReturnCashAdvanceSchema),
    defaultValues: {
      cash_advance_type: CashAdvanceDetails?.cash_advance_type,
      approved_amounnt: CashAdvanceDetails?.amount_collected,
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["request iou", CashAdvanceDetails?.cash_id],
    mutationFn: async (data: ReturnCashAdvanceFormType) => {
      try {
        const response = await api.put(
          `/cash-advancess/${CashAdvanceDetails?.cash_id}`,
          {
            ...data,
            amount_recorded: Number(data.approved_amounnt),
            unused_cash_amount: Number(data.unused_cash_amount),
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

  const submit = (data: ReturnCashAdvanceFormType) => {
    console.log(data);
    mutate(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(submit)}>
        <CustomFormField
          name="type"
          control={form.control}
          label="Type"
          placeholder={CashAdvanceDetails?.cash_advance_type}
          disabled
        />
        <CustomFormField
          name="approved_amounnt"
          control={form.control}
          label={"Approved Amount"}
          disabled
          placeholder={CashAdvanceDetails?.amount_collected}
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
        <div className="grid md:grid-cols-2 gap-5">
          <Button variant={"secondary"}>Cancel</Button>
          <Button>Submit</Button>
        </div>
      </form>
    </Form>
  );
}
