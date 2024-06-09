import {
  CustomFormField,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/config/api";
import useCashAdvanceStore from "@/store/cash-advance/useCashAdvanceStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RequestAndIOUSchema = z
  .object({
    balance: z.string().optional(),
    description: z
      .string({
        required_error: "Description is required",
      })
      .refine(
        (val) => {
          return val.length > 0;
        },
        {
          message: "Description is required",
        }
      ),
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
  })
  .refine(
    (data) => {
      return Number(data.unused_cash) <= Number(data.balance);
    },
    {
      message: "Unused cash CANNOT be greater than balance",
      path: ["unused_cash"],
    }
  );

type RequestAndIOUFomType = z.infer<typeof RequestAndIOUSchema>;

export default function RequestIOUForm() {
  const { CashAdvanceDetails, onClose } = useCashAdvanceStore();
  const query = useQueryClient();
  const form = useForm<RequestAndIOUFomType>({
    resolver: zodResolver(RequestAndIOUSchema),
    values: {
      balance: CashAdvanceDetails?.balance || "",

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
    mutationFn: async (data: RequestAndIOUFomType) => {
      try {
        const response = await api.put(
          `/cash-advances/${CashAdvanceDetails?.cash_id}`,
          {
            ...data,
            decision: "Pending",
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
    mutate(data, {
      onSuccess: () => {
        onClose();
        query.invalidateQueries({
          queryKey: ["get cash advance"],
        });
      },
    });
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
          placeholder={CashAdvanceDetails?.amount_collected}
        />
        <CustomFormField
          name="balance"
          control={form.control}
          label={"Remaining Balance"}
          disabled
          placeholder={CashAdvanceDetails?.balance}
        />
        <CustomFormField
          name="unused_cash"
          control={form.control}
          label={" Amount"}
          placeholder={"Amount"}
        />
        <CustomFormTextareaField
          name="description"
          control={form.control}
          label={"Description"}
        />
        <div className="grid md:grid-cols-2 gap-5">
          <Button variant={"secondary"} type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
