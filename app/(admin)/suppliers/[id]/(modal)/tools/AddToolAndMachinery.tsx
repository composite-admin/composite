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
import useSuppliersActionsStore from "@/store/actions/suppliersActions";
import { useModal } from "@/utils/modalContext";

const FormSchema = z.object({
  supplier_name: z.string({
    required_error: "Supplier name is required",
  }),
  tool_type: z.string({
    required_error: "Please select a tool type",
  }),
  procurement_type: z.string({
    required_error: "Procument type is required",
  }),
  description: z.string({
    required_error: "Please select a tool, then a description",
  }),
  comment: z.string().optional(),
});

type FormDataType = z.infer<typeof FormSchema>;

export default function AddToolAndMachinery() {
  const { selectedItem } = useSuppliersActionsStore();
  const form = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      supplier_name: selectedItem?.supplier_name,
    },
  });
  const { watch } = form;
  const watchTools = watch("tool_type");
  const { inventories } = useGetAllInventoryTypes();
  const { setToolData, toolData } = useInventoryStore();
  const { toast } = useToast();
  const { hideModal } = useModal();

  const ToolDescription = toolData?.map((item: any) => item?.description);

  const toolType = inventories?.map((item: any) => item?.type);
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
    mutationKey: ["add supplier tool and machinery"],
    mutationFn: async (data: any) => {
      try {
        const response = await api.post("/suppliers/tools/machinery", {
          ...data,
          supplier_code: selectedItem?.supplier_code,
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
        title: "Supplier tools created successfully",
        variant: "success",
      });
      hideModal();
      window.location.reload();
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating tools",
        variant: "destructive",
      });
    },
  });

  const submit = (data: FormDataType) => {
    mutate(data);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <CustomFormField
            name="supplier_name"
            label="Supplier Name"
            control={form.control}
            disabled
          />
          <CustomFormSelect
            name="tool_type"
            labelText="Tool Type"
            control={form.control}
            items={toolType || ["Loading ..."]}
            placeholder="Select Tool Type"
          />
          <CustomFormSelect
            name="description"
            labelText="Description"
            control={form.control}
            items={ToolDescription || ["Loading ..."]}
            placeholder="Choose description"
            disabled={!watchTools}
          />
          <CustomFormSelect
            name="procurement_type"
            labelText="Procurement Type"
            control={form.control}
            items={["Lease", "Sale"] || ["Loading ..."]}
            placeholder="Select Procurement type"
          />

          <CustomFormTextareaField
            name="comment"
            label="Comment"
            control={form.control}
            placeholder="Enter Comment"
          />
          <div className="grid  gap-5  md:grid-cols-2 mt-5">
            <Button type="button" variant={"secondary"} onClick={hideModal}>
              Cancel
            </Button>
            <Button className="w-full">Add tools & Machinery</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
