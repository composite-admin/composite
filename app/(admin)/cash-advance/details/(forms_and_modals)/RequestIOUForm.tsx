import {
  CustomFormField,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/config/api";
import useCashAdvanceStore from "@/store/cash-advance/useCashAdvanceStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RequestAndIOUSchema = z
  .object({
    cash_advance_type: z.string().optional(),
    description: z.string().optional(),
    amount_recorded: z.string().optional(),
    balance: z.string().optional(),
    amount: z.string().optional(),
    staff_name: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.amount && data.balance) {
        return Number(data.amount) <= Number(data.balance);
      }
      return true;
    },
    {
      message: "Amount must be less than or equal to approved amount",
      path: ["amount"], // Specify the field associated with the error
    }
  );

type RequestAndIOUFomType = z.infer<typeof RequestAndIOUSchema>;

export default function RequestIOUForm() {
  const { CashAdvanceDetails } = useCashAdvanceStore();
  const form = useForm<RequestAndIOUFomType>({
    resolver: zodResolver(RequestAndIOUSchema),
    defaultValues: {
      cash_advance_type: CashAdvanceDetails?.cash_advance_type,
      amount_recorded: CashAdvanceDetails?.amount_recorded,
      balance: CashAdvanceDetails?.balance,
      staff_name: CashAdvanceDetails?.staff_name,
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["request iou", CashAdvanceDetails?.cash_id],
    mutationFn: async (data: RequestAndIOUFomType) => {
      try {
        const response = await api.put(
          `/cash-advances/${CashAdvanceDetails?.cash_id}`,
          {
            ...data,
            decision: "Pending",
            amount: Number(data.amount),
            balance: Number(data.balance),
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

  const submit = (data: RequestAndIOUFomType) => {
    console.log(data);
    mutate(data);
  };
  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(submit)}>
        <div className="grid md:grid-cols-2 gap-5">
          <CustomFormField
            name="cash_advance_type"
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
        </div>
        <CustomFormField
          name="amount_recorded"
          control={form.control}
          label={"Approved Amount"}
          disabled
          placeholder={CashAdvanceDetails?.amount_recorded}
        />
        <CustomFormField
          name="balance"
          control={form.control}
          label={"Remaining Balance"}
          disabled
          placeholder={CashAdvanceDetails?.balance}
        />
        <CustomFormField
          name="amount_collected"
          control={form.control}
          label={" Amount"}
        />
        <CustomFormTextareaField
          name="description"
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
