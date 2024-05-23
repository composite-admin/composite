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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const ReturnCashAdvanceSchema = z
  .object({
    cash_advance_type: z.string().optional(),
    amount_collected: z.string().optional(),
    balance: z.string({
      required_error: " Balance is required",
    }),
    unused_cash: z
      .string({
        required_error: " Amount is required",
      })
      .refine(
        (val) => {
          return val.length > 0;
        },
        {
          message: "Amount is required",
        }
      ),
    description: z
      .string({
        required_error: " Description is required",
      })
      .refine(
        (val) => {
          return val.length > 0;
        },
        {
          message: "Description is required",
          params: {
            min: 0,
            max: 500,
          },
        }
      ),
  })
  // Unused cash must not be greater than amount collected
  .refine(
    (data) => {
      return Number(data.unused_cash) <= Number(data.amount_collected);
    },
    {
      message: "Unused cash CANNOT be more than the Approved amount",
      path: ["unused_cash"],
    }
  );

type ReturnCashAdvanceFormType = z.infer<typeof ReturnCashAdvanceSchema>;

export default function ReturnCashAdvance() {
  const { CashAdvanceDetails, onClose } = useCashAdvanceStore();
  const { toast } = useToast();

  const form = useForm<ReturnCashAdvanceFormType>({
    resolver: zodResolver(ReturnCashAdvanceSchema),
    values: {
      cash_advance_type: CashAdvanceDetails?.cash_advance_type || "",
      balance: CashAdvanceDetails?.balance || "",
      amount_collected: CashAdvanceDetails?.amount_collected || "",
      unused_cash:
        CashAdvanceDetails?.unused_cash ||
        CashAdvanceDetails?.decision === "Approved"
          ? ""
          : "",
      description:
        CashAdvanceDetails?.description ||
        CashAdvanceDetails?.decision === "Approved"
          ? ""
          : "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["request iou", CashAdvanceDetails?.cash_id],
    mutationFn: async (data: ReturnCashAdvanceFormType) => {
      try {
        const response = await api.put(
          `/cash-advances/${CashAdvanceDetails?.cash_id}`,
          {
            ...data,
            decision: "Pending",
            unused_cash: Number(data.unused_cash),
          }
        );

        if (response.status === 200) {
          toast({
            title: "Cash Advance Returned",
            description: "Cash Advance Returned Successfully",
            variant: "success",
          });

          onClose();
        }

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
          name="amount_collected"
          control={form.control}
          label={"Approved Amount"}
          disabled
          placeholder={CashAdvanceDetails?.amount_collected}
        />
        <CustomFormField
          name="balance"
          control={form.control}
          label={"Balance"}
          disabled
          placeholder={CashAdvanceDetails?.balance}
        />
        <CustomFormField
          name="unused_cash"
          control={form.control}
          label={"Unused Cash Amount"}
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
