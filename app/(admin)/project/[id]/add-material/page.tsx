"use client";

import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useProjectDetails,
  useProjectDetailsPageFormModal,
} from "@/store/project/useProjectModal";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  useGetAllSuppliers,
  useGetProjectById,
} from "@/hooks/useSelectOptions";
import { ISupplierData } from "@/utils/types";
import { useEffect, useState } from "react";
import { Params } from "../edit/page";
import GoBack from "@/components/shared/GoBack";

const AddMaterialSchema = z.object({
  supplier_code: z.string().optional(),
  supplier_name: z.string().optional(),
  description: z.string().optional(),
  project_code: z.string().optional(),
  payment_mode: z.string({
    required_error: "Payment Mode is required",
  }),
  //regex only numbers
  quantity: z
    .string({
      required_error: "Quantity is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
  unit_price: z
    .string({
      required_error: "Unit price is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
});
type AddMaterialType = z.infer<typeof AddMaterialSchema>;
export default function AddMaterialFormPage({ params: { id } }: Params) {
  const [matDesc, setMatDesc] = useState<string[]>([]);
  const [suplierCode, setSuplierCode] = useState<string | undefined>("");
  const form = useForm<AddMaterialType>({
    resolver: zodResolver(AddMaterialSchema),
  });
  const { toast } = useToast();
  const { onClose } = useProjectDetailsPageFormModal();
  const { projectDetails } = useGetProjectById(id);

  // const { projectName, projectId, projectCode } = useProjectDetails();
  const { suppliers } = useGetAllSuppliers();
  const supplierName = suppliers?.map(
    (supplier: ISupplierData) => supplier.supplier_name
  );
  const watchSupplier = form.watch("supplier_name");

  useEffect(() => {
    if (watchSupplier) {
      const supplier_code = suppliers?.find(
        (supplier: ISupplierData) => supplier.supplier_name === watchSupplier
      )?.supplier_code;
      setSuplierCode(supplier_code);
      // /suppliers-materials/supplier/description?supplierCode
      const materialDescription = async () => {
        try {
          const response = await api.get(
            `/suppliers-materials/supplier/description?supplierCode=${supplier_code}`
          );
          setMatDesc(response.data.data?.map((item: any) => item.description));
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
          } else {
            throw error;
          }
        }
      };
      materialDescription();
    }
  }, [watchSupplier, suppliers]);

  const { mutate } = useMutation({
    mutationKey: ["add-material"],
    mutationFn: async (values: AddMaterialType) => {
      try {
        const response = await api.post("/materials", {
          ...values,
          project_code: projectDetails?.project_code,
          supplier_code: suplierCode,
          quantity: Number(values.quantity),
          unit_price: Number(values.unit_price),
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
  });

  const handleSubmit = (data: AddMaterialType) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        onClose();
        toast({
          title: "Material added successfully",
          variant: "success",
        });
      },
      onError: () => {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      },
    });
    console.log(data);
  };
  return (
    <>
      <GoBack />
      <div className="max-w-4xl bg-white p-5 rounded-lg mx-auto">
        <div className="pb-5 font-semibold md:text-lg">
          <h1>Add Material to A Project</h1>
        </div>
        <Form {...form}>
          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <CustomFormField
              control={form.control}
              name="project_name"
              label="Project Name"
              placeholder={projectDetails?.project_name}
              disabled
            />
            <div className=" grid lg:grid-cols-2 gap-5">
              <div className="space-y-5">
                <CustomFormSelect
                  control={form.control}
                  name="supplier_name"
                  labelText="Supplier"
                  placeholder="Select Supplier"
                  items={supplierName || []}
                />
                <CustomFormField
                  control={form.control}
                  name="unit_price"
                  label="Unit Price"
                  placeholder="Enter Amount"
                />
              </div>
              <div className="space-y-5">
                <CustomFormSelect
                  control={form.control}
                  name="description"
                  labelText="Material Description"
                  placeholder="Material Description"
                  items={matDesc ?? ["Loading..."]}
                  disabled={!watchSupplier}
                />

                <CustomFormSelect
                  control={form.control}
                  name="payment_mode"
                  labelText="Payment Mode"
                  placeholder="Payment Mode"
                  items={[
                    "Online Transfer",
                    "Paid at the Bank",
                    "Cash",
                    "Cheque",
                  ]}
                />
              </div>
            </div>
            <CustomFormField
              control={form.control}
              name="quantity"
              label="Quantity"
              placeholder="Enter a Quantity"
            />
            <CustomFormTextareaField
              control={form.control}
              name="comment"
              label="Comment"
              placeholder="Comment"
            />

            <div className="flex gap-4 flex-col lg:flex-row">
              <Button
                variant={"secondary"}
                className="w-full"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button className="w-full">Add</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
