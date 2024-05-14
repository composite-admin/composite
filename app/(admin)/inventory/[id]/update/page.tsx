"use client";
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
import {
  useGetAllInventoryTypes,
  useGetInventoryData,
} from "@/hooks/useSelectOptions";
import { useInventoryStore } from "@/store/project/useProjectStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import z from "zod";
import { useSuccessModal } from "@/store/inventory/UseInventoryModal";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { HiBellAlert } from "react-icons/hi2";
import { useGetEachinventory } from "@/store/inventory/InventoryStore";
import { userStore } from "@/store/auth/AuthStore";

const EditInventorySchema = z.object({
  type: z.string({
    required_error: "Please select a tool type",
  }),
  unit_price: z
    .string({
      required_error: "Unit price is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
  name: z.string({
    required_error: "Please select a tool, then a description",
  }),
  quantity: z
    .string({
      required_error: "Quantity is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
  comment: z.string({
    required_error: "Comment is required",
  }),
});

type EditInventoryFormDataType = z.infer<typeof EditInventorySchema>;

const UpdateInventory = (props: any) => {
  let id: any = props.params.id;
  const onOpen = useSuccessModal((state) => state.onOpen);
  const router = useRouter();
  const { inventories } = useGetAllInventoryTypes();
  const { setToolData, toolData } = useInventoryStore();
  const { inventory } = useGetInventoryData(id);
  const { toast } = useToast();

  const { userId } = userStore();
  console.log(userId);
  const ToolDescription = toolData?.map((item: any) => item?.description);

  const toolType = inventories?.map((item: any) => item?.type);
  const form = useForm<EditInventoryFormDataType>({
    resolver: zodResolver(EditInventorySchema),
    defaultValues: {
      unit_price: inventory?.unit_price,
      quantity: inventory?.quantity,
      comment: inventory?.comment,
    },
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
    mutationKey: ["edit inventory", id],
    mutationFn: async (data: EditInventoryFormDataType) => {
      try {
        const response = await api.put(`/inventory/${id}`, {
          ...data,
          total_price: Number(data.unit_price) * Number(data.quantity),
          total_quantity: Number(data.quantity),
          updated_by: userId,
          created_by: userId,
        });
        if (response.status === 200) {
          router.push(`/inventory/${response.data.data.inventory_id}`);
          console.log(response.data.data.inventory_id);
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
    onSuccess: () => {
      toast({
        title: "Inventory edited successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error editting inventory",
        variant: "destructive",
      });
    },
  });
  const submit = (data: EditInventoryFormDataType) => {
    mutate(data);
  };

  return (
    <div>
      <GoBack />

      <div className="w-full max-w-4xl mx-auto my-10 rounded-lg border border-outline bg-white p-[29px]">
        <div className="flex gap-2 items-center border-b border-b-gray-200 py-3">
          <HiBellAlert />

          <h2 className="text-[#101928] font-[600] text-[22px]">
            Edit Inventory
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
                placeholder={inventory?.type && inventory?.type}
              />
              <CustomFormSelect
                name="name"
                labelText="Description"
                control={form.control}
                items={ToolDescription || ["Loading ..."]}
                placeholder={inventory?.name && inventory?.name}
                disabled={!watchTools}
              />
              <CustomFormField
                name="quantity"
                label="Quantity"
                control={form.control}
                placeholder={inventory?.quantity && inventory?.quantity}
              />
              <CustomFormField
                name="unit_price"
                label="Unit Price"
                control={form.control}
                placeholder={inventory?.unit_price && inventory?.unit_price}
              />
            </div>
            <CustomFormTextareaField
              name="comment"
              label="Comment"
              control={form.control}
              placeholder={inventory?.comment && inventory?.comment}
            />
            <div className="flex  gap-6 flex-col md:flex-row mt-5">
              <Button
                onClick={() => router.push(`/inventory/${id} `)}
                variant={"secondary"}
                className="w-full"
              >
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

export default UpdateInventory;
