import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import FormContainer from "@/components/shared/FormContainer";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/config/api";
import {
  useGetAllInventoryItems,
  useGetAllInventoryTypes,
  useGetStaffDetails,
  useProjectData,
} from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import useStaffStore from "@/store/staff/useStaffStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RequestType } from "./CashAdvance";
import { useInventoryStore } from "@/store/project/useProjectStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";
import { useMutation, useQuery } from "@tanstack/react-query";

export const ToolsAndMachineStoreSchema = z.object({
  request_type: z.nativeEnum(RequestType),
  approved_quantity: z
    .string({
      required_error: "Quantity is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
  supervisor_comment: z.string().optional(),
});

type ToolsAndMachineStoreType = z.infer<typeof ToolsAndMachineStoreSchema>;

export default function ToolsAndMachineStore() {
  const { formDetails, onClose } = useUpdateRequestStore();
  const [isLoading, setIsLoading] = useState(false);
  const { inventory } = useGetAllInventoryItems();
  const inventoryItemID = inventory?.find(
    (item) => item.name === formDetails?.tool_machinery_type
  )?.inventory_id;

  const { userId, username } = userStore();
  const { staffDetails } = useGetStaffDetails(userId);
  const { toast } = useToast();
  const form = useForm<ToolsAndMachineStoreType>({
    resolver: zodResolver(ToolsAndMachineStoreSchema),
    defaultValues: {
      request_type: RequestType.ToolsAndMachineStore,
    },
  });

  const handleSubmit = async (data: ToolsAndMachineStoreType) => {
    console.log(inventoryItemID);
    try {
      setIsLoading(true);
      const res = await api.put(`/requests/${formDetails?.id}`, {
        ...data,
        approved_by: username,
        approved_on: new Date(),
        status: "APPROVED",
        approved_quantity: Number(data.approved_quantity),
      });
      if (res.status === 201 || res.status === 200) {
        try {
          setIsLoading(false);
          await api.put(`/inventory/${inventoryItemID}`, {
            quantity:
              Number(
                inventory?.find(
                  (item) => item.name === formDetails?.tool_machinery_type
                )?.quantity
              ) - Number(data.approved_quantity),
          });
          if (res.status === 200) {
            toast({
              title: "Request Approved",
              variant: "success",
            });
            form.reset();
            onClose();
            window.location.reload();
          }
        } catch (error) {
          console.log("error");
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Request creation failed",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          <CustomFormSelect
            name="request_type"
            control={form.control}
            labelText="Request Type"
            disabled
            items={Object.values(RequestType)}
          />
          <CustomFormField
            name="request_from"
            control={form.control}
            label="Request From"
            disabled
            value={formDetails?.staff_name}
          />
        </div>

        <CustomFormField
          name="tool_name"
          control={form.control}
          label="Tool Name"
          disabled
          placeholder={formDetails?.tool_machinery_type ?? "N/A"}
        />
        <div className="py-4 w-full">
          <div className="grid md:grid-cols-2 gap-4 py-3">
            <CustomFormField
              name="quantity"
              control={form.control}
              label="Quantity"
              disabled
              placeholder={String(formDetails?.quantity)}
            />
            <CustomFormField
              name="approved_quantity"
              control={form.control}
              label="Approved Quantity"
              placeholder="Enter Quantity"
            />
          </div>

          <div className="flex flex-col gap-4 py-4">
            <CustomFormTextareaField
              name="supervisor_comment"
              label="Approval Comment"
              control={form.control}
              placeholder="Enter Comment"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          <Button
            variant="secondary"
            className="w-full"
            type="button"
            onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="w-full"
            disabled={isLoading}
            type="submit">
            Approve Request
          </Button>
        </div>
      </form>
    </Form>
  );
}
