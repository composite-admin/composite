"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomFormField } from "../shared/FormComponent";
import { Button } from "../ui/button";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/config/api";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useTableActionStore } from "@/store/useTableActionStore";
import { useGetWorkerJobById } from "@/hooks/useSelectOptions";

const FormSchema = z
  .object({
    worker_service: z.string({
      required_error: "Worker service is required",
    }),
    amount_paid: z.string({
      required_error: "Amount paid is required",
    }),
    outstanding_balance: z.string({
      required_error: "Outstanding balance is required",
    }),
    worker_service_charge: z.string({
      required_error: "Worker service charge is required",
    }),
    comment: z.string().optional(),
  })
  .refine(
    (data) => Number(data.amount_paid) <= Number(data.worker_service_charge),
    {
      message: "Amount paid cannot be greater than worker service charge",
      path: ["amount_paid"],
    }
  );

type FormData = z.infer<typeof FormSchema>;

export default function WorkerJobModalForm() {
  const { toast } = useToast();
  const { rowID, onClose } = useTableActionStore();
  const { workerJob } = useGetWorkerJobById(rowID!);
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    values: {
      worker_service: workerJob?.worker_service!,
      amount_paid: workerJob?.amount_paid!,
      outstanding_balance: workerJob?.outstanding_balance!,
      worker_service_charge: workerJob?.worker_service_charge!,
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["update-worker-job"],
    mutationFn: async (data: FormData) => {
      try {
        const res = await api.put(`/worker-jobs/${rowID}`, {
          ...data,
          worker_code: workerJob?.worker_code,
          outstanding_balance:
            Number(data.worker_service_charge) - Number(data.amount_paid),
        });
        if (res.status === 200 || res.status === 201) {
          queryClient.invalidateQueries({
            queryKey: ["get worker details"],
          });
        }
        return res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      toast({
        title: "Worker Job Edited successfully",
        variant: "success",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const submit = (data: FormData) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className="grid gap-3">
          <CustomFormField
            name="worker_service"
            label="Service"
            control={form.control}
            value={workerJob?.worker_service}
            disabled
          />
          <CustomFormField
            name="worker_service_charge"
            control={form.control}
            label="Worker Service Charge"
            value={workerJob?.worker_service_charge}
            disabled
          />{" "}
          <CustomFormField
            name="outstanding_balance"
            value={workerJob?.outstanding_balance}
            label="Current Balance"
            control={form.control}
            disabled
          />
          <CustomFormField
            name="amount_paid"
            control={form.control}
            label="Amount Paid"
          />
          <div className="flex flex-col md:flex-row gap-5 py-3">
            <Button
              variant={"secondary"}
              className="w-full"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button className="w-full" disabled={!workerJob}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
