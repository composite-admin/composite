import { RequestType } from "@/app/(staff)/staff/create-request/forms/CashAdvance";
import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useGetStaffDetails } from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
export const DeleteSchema = z.object({
  request_type: z.nativeEnum(RequestType),
  description: z.string().optional(),
  request_from: z.string().optional(),
  response: z.string().optional(),
});

type DeleteFormType = z.infer<typeof DeleteSchema>;

export default function DeleteRequest() {
  const { formDetails, onClose } = useUpdateRequestStore();
  console.log(formDetails);
  const { userId } = userStore();
  const { staffDetails } = useGetStaffDetails(userId);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<DeleteFormType>({
    resolver: zodResolver(DeleteSchema),
    defaultValues: {
      request_type: formDetails?.request_type as RequestType,
    },
  });

  const handleSubmit = async (data: DeleteFormType) => {
    try {
      const res = await api.put(`/requests/${formDetails?.id}`, {
        ...data,
        status: "DECLINED",
      });
      if (res.status === 200) {
        toast({
          title: "Request Declined",
          variant: "success",
        });
        router.push("/requests");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
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

        <CustomFormTextareaField
          name="description"
          label="Description"
          control={form.control}
          placeholder="Enter Description"
        />
        <CustomFormTextareaField
          name="response"
          label="Reply"
          control={form.control}
          placeholder="Enter Comment"
        />
        <div className="flex flex-col lg:flex-row gap-5">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="w-full" variant="destructive">
            Decline
          </Button>
        </div>
      </form>
    </Form>
  );
}
