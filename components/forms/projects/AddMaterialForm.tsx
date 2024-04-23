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
import { useProjectDetailsPageFormModal } from "@/store/project/useProjectModal";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useGetAllSuppliers } from "@/hooks/useSelectOptions";
import { ISupplierData } from "@/utils/types";
import { useEffect, useState } from "react";

const AddMaterialSchema = z.object({
  supplier_code: z.string().optional(),
  supplier_name: z.string().optional(),
  mat_desc: z.string().optional(),
  project_code: z.string().optional(),
  quantity: z.string().optional(),
  unit_price: z.string().optional(),
});
type AddMaterialType = z.infer<typeof AddMaterialSchema>;
export default function AddMaterialForm() {
  const [matDesc, setMatDesc] = useState<string[]>([]);
  const [suplierCode, setSuplierCode] = useState<string | undefined>("");
  const form = useForm<AddMaterialType>({
    resolver: zodResolver(AddMaterialSchema),
  });
  const { toast } = useToast();
  const { projectName, onClose, projectCode } =
    useProjectDetailsPageFormModal();
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
    mutationKey: ["add-stakeholder"],
    mutationFn: async (values: AddMaterialType) => {
      try {
        const response = await api.post("/suppliers-materials", {
          ...values,
          project_code: projectCode,
          supplier_code: suplierCode,
          mat_desc: matDesc,
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
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
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
              name="mat_desc"
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
              items={["Online Transfer", "Paid at the Bank", "Cash", "Cheque"]}
            />
          </div>
        </div>
        <CustomFormTextareaField
          control={form.control}
          name="comment"
          label="Comment"
          placeholder="Comment"
        />

        <div className="flex gap-4 flex-col lg:flex-row">
          <Button variant={"secondary"} className="w-full" onClick={onClose}>
            Cancel
          </Button>
          <Button className="w-full">Add</Button>
        </div>
      </form>
    </Form>
  );
}
