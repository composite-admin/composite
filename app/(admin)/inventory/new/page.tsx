"use client"
import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import GoBack from "@/components/shared/GoBack";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useGetAllInventoryTypes } from "@/hooks/useSelectOptions";
import { useSuccessModal } from "@/store/inventory/UseInventoryModal";
import { useInventoryStore } from "@/store/project/useProjectStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiBellAlert } from "react-icons/hi2";
import z from "zod";

const newInventorySchema = z.object({
  type: z.string({
    required_error: "Please select a tool type",
  }),
  unit_price: z.string({
    required_error: "Unit price is required",
  }),
  name: z.string({
    required_error: "Please select a tool, then a description",
  }),
  quantity: z.string({
    required_error: "Quantity is required",
  }),
  comment: z.string({
    required_error: "Comment is required",
  }),
});

type newInventoryFormDataType = z.infer<typeof newInventorySchema>;

const NewInventory = () => {
  const onOpen = useSuccessModal((state) => state.onOpen);
  const router = useRouter();
  const { inventories } = useGetAllInventoryTypes();
  const { setToolData, toolData } = useInventoryStore();
  const { toast } = useToast();

  const ToolDescription = toolData?.map((item: any) => item?.description);

  const toolType = inventories?.map((item: any) => item?.type);
  const form = useForm<newInventoryFormDataType>({
    resolver: zodResolver(newInventorySchema),
  });
  const { watch } = form;
  const watchTools = watch("type");

  useEffect(() => {
    const fetchToolDescription = async () => {
      if (watchTools) {
        try {
          const res = await api.get(`/inventory/type/all?type=${watchTools}`);
          if (res) {
            setToolData(res.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchToolDescription();
  }, [setToolData, watchTools]);

  const { mutate } = useMutation({
    mutationKey: ["add inventory"],
    mutationFn: async (data: any) => {
      try {
        const response = await api.post("/inventory", {
          ...data,
          total_price: Number(data.unit_price) * Number(data.quantity),
          total_quantity: Number(data.quantity),
        });
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
        title: "Inventory created successfully",
        variant: "success",
      });

      router.push("/inventory");
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating inventory",
        variant: "destructive",
      });
    },
  });

  const submit = (data: newInventoryFormDataType) => {
    mutate(data);
  };

  return (
    <div>
      <GoBack />

      <div className="w-full max-w-4xl mx-auto my-10 rounded-lg border border-outline bg-white p-[29px]">
        <div className="flex gap-2 items-center border-b border-b-gray-200 py-3">
          <HiBellAlert />

          <h2 className="text-[#101928] font-[600] text-[22px]">
            New Inventory
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            // className="grid grid-cols-2 gap-5 my-5 edit"
          >
            <div className="grid  md:grid-cols-2 gap-5 my-5 edit">
              <CustomFormSelect
                name="type"
                labelText="Tool Type"
                control={form.control}
                items={toolType || ["Loading ..."]}
                placeholder="Select Tool Type"
              />
              <CustomFormSelect
                name="name"
                labelText="Description"
                control={form.control}
                items={ToolDescription || ["Loading ..."]}
                placeholder="Choose description"
                disabled={!watchTools}
              />
              <CustomFormField
                name="quantity"
                label="Quantity"
                control={form.control}
                placeholder="Enter Quantity"
              />
              <CustomFormField
                name="unit_price"
                label="Unit Price"
                control={form.control}
                placeholder="Enter Unit Price"
              />
            </div>
            <CustomFormTextareaField
              name="comment"
              label="Comment"
              control={form.control}
              placeholder="Enter Comment"
            />
            <div className="flex  gap-6 flex-col md:flex-row mt-5">
              <Button className="bg-[#EBEBEB] text-textColor w-full">
                Cancel
              </Button>
              <Button className="w-full">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewInventory;
