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
import useCashAdvanceStore from "@/store/cash-advance/useCashAdvanceStore";
import { useAddAndEditBreakDownModal } from "@/store/modals/useCreateModal";
import { ApiResponse, ICashAdvanceBreakdownData } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddOrEditBreakdownSchema = z.object({
  description: z.string({
    required_error: "Description is required",
  }),
  amount: z.string({
    required_error: "Amount is required",
  }),
  comment: z.string({
    required_error: "Comment is required",
  }),
});

type AddOrEditBreakdownType = z.infer<typeof AddOrEditBreakdownSchema>;

export default function AddAndEditBreakdownModal() {
  const { isOpen, onClose, breakdownModalType } = useAddAndEditBreakDownModal();
  const { CashAdvanceDetails } = useCashAdvanceStore();
  const { toast } = useToast();

  const form = useForm<AddOrEditBreakdownType>({
    resolver: zodResolver(AddOrEditBreakdownSchema),
  });

  const { mutate } = useMutation({
    mutationKey: ["add-or-edit-breakdown", CashAdvanceDetails?.cash_id],

    mutationFn: async (data: AddOrEditBreakdownType) => {
      try {
        const response = await api.post<ApiResponse<ICashAdvanceBreakdownData>>(
          "/cash-advance-breakdowns",
          {
            ...data,
            cash_id: CashAdvanceDetails?.cash_id,
            request_code: CashAdvanceDetails?.request_code,
            added_by: CashAdvanceDetails?.action_by,
            amount: Number(data.amount),
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
    onSuccess: () => {
      toast({
        title: "Breakdown added successfully",
        variant: "success",
      });
    },
  });

  const onSubmit = (data: AddOrEditBreakdownType) => {
    mutate(data);
    onClose();
  };

  if (breakdownModalType === "add") {
    return (
      <Modal
        title="Add Breakdown"
        description="Add to the cash advance breakdown here."
        isOpen={isOpen}
        onClose={onClose}
        classname="max-w-xl"
      >
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
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
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-full">
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
        title="Add Comment"
        isOpen={isOpen}
        onClose={onClose}
        classname="max-w-xl"
      >
        <form className="space-y-5">
          <div className="space-y-7">
            <div className="space-y-2">
              <Label htmlFor="amount">Request Code</Label>
              <Input
                placeholder="CPD141906"
                name="Request Code"
                value="CPD141906"
                disabled
                className="disabled:bg-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Description</Label>
              <Input placeholder="eg: For cememtEnter " name="description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input placeholder="Enter amount" name="amount" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="commet">Comment</Label>
              <Textarea
                placeholder="Lorem ipsum dolor sit amet consectetur. 
                Ac id vulputate accumsan arcu venenatis t
                ellus nulla eu
                Placeholder"
                name="description"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <Button
                variant={"secondary"}
                className="w-full"
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}
