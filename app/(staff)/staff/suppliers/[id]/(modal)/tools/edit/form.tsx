"use client";
import { SubmitHandler } from "react-hook-form";
import useSupplierToolsAndMachineriesStore from "@/store/actions/materials-and-tools/toolsAndMachineryActions";
import {
  ISupplierMaterialTypesData,
  IToolAndMachineryData,
  IUpdateToolAndMachineryData,
} from "@/utils/types";
import React, { ChangeEvent } from "react";
import { Row } from "@tanstack/react-table";
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
import { useEffect, useState } from "react";
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

type Props = { row: Row<IToolAndMachineryData>; finish: () => void };

const EditToolsFormContent: React.FC<Props> = ({ row, finish }) => {
  const { hideModal } = useModal();
  const { tool_id } = row.original;
  const { selectedItem } = useSuppliersActionsStore();
  const form = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      supplier_name: selectedItem?.supplier_name,
      tool_type: row.original.tool_type,
      procurement_type: row.original.procurement_type,
      description: row.original.description,
      comment: row.original.comment,
    },
  });
  const { watch } = form;
  const watchTools = watch("tool_type");
  const { inventories } = useGetAllInventoryTypes();
  const { setToolData, toolData } = useInventoryStore();
  const { toast } = useToast();

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
    mutationKey: ["update supplier tool and machinery"],
    mutationFn: async (data: any) => {
      try {
        const response = await api.put(
          `/suppliers/tools/machinery/${tool_id}`,
          {
            ...data,
            supplier_code: selectedItem?.supplier_code,
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
        title: "Supplier tools updated successfully",
        variant: "success",
      });
      hideModal();
      window.location.reload();
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating tools",
        variant: "destructive",
      });
    },
  });

  const submit = (data: FormDataType) => {
    mutate(data);
  };

  return (
    <div className="lg:min-w-[50rem] md:min-w-[40rem] max-w-[60rem] max-h-[35rem] lg:max-h-[38rem] gap-4 overflow-y-auto w-full bg-white rounded-lg p-10 md:grid space-y-6 md:space-y-0 grid-cols-[1.5fr_4fr]">
      <div className="space-y-2">
        <p className="lg:text-3xl md:text-2xl font-bold">
          Edit Tools and Machinery
        </p>
        <p className="text-zinc-500">Make changes to tools and machinery</p>
        <Button
          title="Submit Changes"
          onClick={form.handleSubmit(submit)}>
          Submit Changes
        </Button>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="space-y-4">
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
            <CustomFormField
              name="description"
              label="Description"
              control={form.control}
              placeholder="Choose description"
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
              <Button
                type="button"
                variant={"secondary"}
                onClick={hideModal}>
                Cancel
              </Button>
              <Button className="w-full">Edit tools & Machinery</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditToolsFormContent;
