"use client";

import {
  CustomFormField,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useGetCashAdvanceBreakdownByCode } from "@/hooks/useSelectOptions";
import useCashAdvanceStore from "@/store/cash-advance/useCashAdvanceStore";
import { useAddAndEditBreakDownModal } from "@/store/modals/useCreateModal";
import { ApiResponse, ICashAdvanceBreakdownData } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddOrEditBreakdownSchema = z.object({
  description: z.string({
    required_error: "Description is required",
  }),
  amount: z.string({
    required_error: "Amount is required",
  }),
  comment: z.string().optional(),
});

type AddOrEditBreakdownType = z.infer<typeof AddOrEditBreakdownSchema>;

export default function AddAndEditBreakdownModal() {
  const { isOpen, onClose, breakdownModalType, action } =
    useAddAndEditBreakDownModal();
  const { CashAdvanceDetails } = useCashAdvanceStore();
  const { toast } = useToast();
  const { cashAdvanceBreakdown, isBreakDownLoading } =
    useGetCashAdvanceBreakdownByCode(CashAdvanceDetails?.request_code!);
  const rowInfo = cashAdvanceBreakdown?.find(
    (row) => row.id === Number(action)
  );

  const form = useForm<AddOrEditBreakdownType>({
    resolver: zodResolver(AddOrEditBreakdownSchema),
    values: {
      description: rowInfo?.description!,
      amount: rowInfo?.amount!,
      comment: rowInfo?.comment || "",
    },
  });

  // const { mutate } = useMutation({
  //   mutationKey: ["add-or-edit-breakdown", CashAdvanceDetails?.cash_id],

  //   mutationFn: async (data: AddOrEditBreakdownType) => {
  //     console.log(breakdownModalType);
  //     try {
  //       const response =
  //         breakdownModalType === "edit"
  //           ? await api.put<ApiResponse<ICashAdvanceBreakdownData>>(
  //               `/cash-advance-breakdowns/${rowInfo?.id}`,
  //               data
  //             )
  //           : await api.post<ApiResponse<ICashAdvanceBreakdownData>>(
  //               "/cash-advance-breakdowns",
  //               {
  //                 ...data,
  //                 cash_id: CashAdvanceDetails?.cash_id,
  //                 request_code: CashAdvanceDetails?.request_code,
  //                 added_by: CashAdvanceDetails?.action_by,
  //                 amount: Number(data.amount),
  //               }
  //             );
  //       return response.data;
  //     } catch (error) {
  //       if (axios.isAxiosError(error) && error.response) {
  //         throw new Error(error.response.data.message);
  //       } else {
  //         throw error;
  //       }
  //     }
  //   },
  //   onSuccess: () => {
  //     // onClose();
  //     // window.location.reload();
  //     toast({
  //       title: "Breakdown added successfully",
  //       variant: "success",
  //     });
  //   },
  // });

  // const onSubmit = (data: AddOrEditBreakdownType) => {
  //   mutate(data);
  //   onClose();
  // };

  const onSubmit = async (data: AddOrEditBreakdownType) => {
    if (breakdownModalType === "edit") {
      try {
        const res = await api.put<ApiResponse<ICashAdvanceBreakdownData>>(
          `/cash-advance-breakdowns/${rowInfo?.id}`,
          {
            ...data,
            request_code: CashAdvanceDetails?.request_code,
            // added_by: CashAdvanceDetails?.staff_name,
            amount: Number(data.amount),
          }
        );
        if (res.status === 200) {
          toast({
            title: "Breakdown updated successfully",
            variant: "success",
          });
          onClose();
          window.location.reload();
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        toast({
          variant: "destructive",
          title: "Error",
          description: axiosError.message || "An error occurred",
        });
      }
    }

    if (breakdownModalType === "add") {
      try {
        const res = await api.post<ApiResponse<ICashAdvanceBreakdownData>>(
          "/cash-advance-breakdowns",
          {
            ...data,
            cash_id: CashAdvanceDetails?.cash_id,
            request_code: CashAdvanceDetails?.request_code,
            added_by: CashAdvanceDetails?.staff_name,
            amount: Number(data.amount),
          }
        );
        if (res.status === 201) {
          toast({
            title: "Breakdown added successfully",
            variant: "success",
          });
          onClose();
          window.location.reload();
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        toast({
          variant: "destructive",
          title: "Error",
          description: axiosError.message || "An error occurred",
        });
      }
    }
  };

  if (breakdownModalType === "add") {
    return (
      <Modal
        title="Add Breakdown"
        description="Add to the cash advance breakdown here."
        isOpen={isOpen}
        onClose={onClose}
        classname="max-w-xl">
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-7">
              <CustomFormField
                control={form.control}
                name="amount"
                label="Amount"
                placeholder="Add Amount"
              />
              <CustomFormField
                control={form.control}
                name="description"
                label="Description"
                placeholder="eg: For cememt"
              />
              <CustomFormTextareaField
                control={form.control}
                name="comment"
                label="Comment"
                placeholder="Enter A Comment"
              />

              <div className="flex flex-col lg:flex-row gap-8">
                <Button
                  variant={"secondary"}
                  className="w-full"
                  type="button"
                  onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </Modal>
    );
  }

  if (breakdownModalType === "edit") {
    return (
      <Modal
        title="Edit Breakdown"
        isOpen={isOpen}
        onClose={onClose}
        classname="max-w-xl">
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-7">
              <CustomFormField
                control={form.control}
                name="amount"
                label="Amount"
                placeholder="Add Amount"
                defaultValue={rowInfo?.amount}
              />
              <CustomFormField
                control={form.control}
                name="description"
                label="Description"
                placeholder="eg: For cememt"
                defaultValue={rowInfo?.description}
              />
              <CustomFormTextareaField
                control={form.control}
                name="comment"
                label="Comment"
                placeholder="Enter A Comment"
                defaultValue={rowInfo?.comment}
              />

              <div className="flex flex-col lg:flex-row gap-8">
                <Button
                  variant={"secondary"}
                  className="w-full"
                  type="button"
                  onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </Modal>
    );
  }
}
