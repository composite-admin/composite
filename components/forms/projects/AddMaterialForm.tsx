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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  useGetAllSuppliers,
  useGetMaterialDetails,
} from "@/hooks/useSelectOptions";
import { ISupplierData } from "@/utils/types";
import { useEffect, useState } from "react";
import { useTableActionStore } from "@/store/useTableActionStore";

const AddMaterialSchema = z.object({
  supplier_code: z.string().optional(),
  supplier_name: z.string().optional(),
  description: z.string({
    required_error: "Description is required",
  }),
  project_code: z.string().optional(),
  payment_mode: z.string({
    required_error: "Payment Mode is required",
  }),
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
  comment: z.string().optional().nullish().nullable(),
});
type AddMaterialType = z.infer<typeof AddMaterialSchema>;
export default function AddMaterialForm() {
  const [matDesc, setMatDesc] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const [suplierCode, setSuplierCode] = useState<string | undefined>("");
  const {
    isEditOrDelete,
    rowID,
    onClose: onCloseModal,
  } = useTableActionStore();
  const { toast } = useToast();
  const { onClose } = useProjectDetailsPageFormModal();
  const { projectName, projectCode } = useProjectDetails();
  const { suppliers, supplierList } = useGetAllSuppliers();

  const { materialDetails, isLoading: isMaterialLoading } =
    useGetMaterialDetails(Number(rowID));
  let values;
  if (isEditOrDelete) {
    values = {
      supplier_code: materialDetails?.supplier_code,
      supplier_name: materialDetails?.supplier_name as string,
      payment_mode: materialDetails?.payment_mode as string,
      description: materialDetails?.description!,
      quantity: String(materialDetails?.quantity),
      unit_price: String(materialDetails?.unit_price),
      comment: materialDetails?.comment,
    };
  }
  const form = useForm<AddMaterialType>({
    resolver: zodResolver(AddMaterialSchema),
    values: values,
  });

  useEffect(() => {
    if (isEditOrDelete) {
      form.setValue("description", materialDetails?.description!);
      form.setValue("supplier_name", materialDetails?.supplier_name!);
    }
  }, [
    form,
    isEditOrDelete,
    materialDetails?.description,
    materialDetails?.supplier_name,
  ]);

  const watchSupplier = form.watch("supplier_name");
  useEffect(() => {
    if (watchSupplier) {
      const supplier_code = suppliers?.find(
        (supplier: ISupplierData) => supplier.supplier_name === watchSupplier
      )?.supplier_code;
      setSuplierCode(supplier_code);
      const materialDescription = async () => {
        try {
          const response = await api.get(
            `/suppliers-materials/supplier/description?supplierCode=${supplier_code}`
          );
          const descriptions = response.data?.data?.map(
            (item: any) => item.mat_desc
          );
          const uniqueDescriptions = Array.from(new Set(descriptions));
          setMatDesc(uniqueDescriptions as string[]);
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
    if (isEditOrDelete) {
      form.setValue("description", materialDetails?.description!);
    }
  }, [
    watchSupplier,
    suppliers,
    isEditOrDelete,
    form,
    materialDetails?.description,
  ]);

  const { mutate } = useMutation({
    mutationKey: ["add-material"],
    mutationFn: async (values: AddMaterialType) => {
      try {
        const response = isEditOrDelete
          ? await api.put(`/materials/${rowID}`, {
              ...values,
              project_code: projectCode,
              supplier_code: suplierCode,
              quantity: Number(values.quantity),
              unit_price: Number(values.unit_price),
            })
          : await api.post("/materials", {
              ...values,
              project_code: projectCode,
              supplier_code: suplierCode,
              quantity: Number(values.quantity),
              unit_price: Number(values.unit_price),
            });
        if (response.status === 200 || response.status === 201) {
          form.reset();
          onClose();
          toast({
            title: "Material added successfully",
            variant: "success",
          });
          onCloseModal();
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

  const handleSubmit = (data: AddMaterialType) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["get all materials by project code", projectCode],
        });
      },
      onError: () => {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      },
    });
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(handleSubmit)}>
        <CustomFormField
          control={form.control}
          name="project_name"
          label="Project Name"
          placeholder={projectName}
          disabled
        />
        <div className=" grid lg:grid-cols-2 gap-5">
          <div className="space-y-5">
            <CustomFormSelect
              control={form.control}
              name="supplier_name"
              labelText="Supplier"
              placeholder="Select Supplier"
              items={supplierList || []}
            />
            <CustomFormField
              control={form.control}
              name="unit_price"
              label="Unit Price"
              placeholder="Enter Amount"
            />
          </div>
          <div className="space-y-5">
            {isEditOrDelete ? (
              <CustomFormSelect
                control={form.control}
                name="description"
                labelText="Material Description"
                defaultValue={materialDetails?.description}
                items={matDesc || []}
                disabled={isMaterialLoading}
              />
            ) : (
              <CustomFormSelect
                control={form.control}
                name="description"
                labelText="Material Description"
                items={matDesc || []}
              />
            )}

            <CustomFormSelect
              control={form.control}
              name="payment_mode"
              labelText="Payment Mode"
              placeholder={materialDetails?.payment_mode || "Payment Mode"}
              items={["Online Transfer", "Paid at the Bank", "Cash", "Cheque"]}
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
            type="button"
            onClick={() => {
              isEditOrDelete ? onCloseModal() : onClose();
            }}>
            Cancel
          </Button>
          <Button className="w-full">
            {isEditOrDelete ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
