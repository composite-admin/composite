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
  useGetAllWorkers,
  useGetStaffDetails,
  useProjectData,
} from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import useStaffStore from "@/store/staff/useStaffStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RequestType } from "./CashAdvance";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { IWorkerData } from "@/utils/types";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";

export const LabourSchema = z.object({
  request_type: z.nativeEnum(RequestType),
  approved_amount: z
    .string({
      required_error: "Amount is required",
    })
    .regex(/^\d*\.?\d*$/, "Please enter a valid number"),
  description: z.string({
    required_error: "Description is required",
  }),
  supervisor_comment: z.string({
    required_error: "Comment is required",
  }),
});

type labourFormType = z.infer<typeof LabourSchema>;

export default function Labour() {
  const { formDetails, onClose } = useUpdateRequestStore();
  const { projectsData } = useProjectData();
  const { userId, username } = userStore();
  const { staffDetails } = useGetStaffDetails(userId);
  const { toast } = useToast();
  const router = useRouter();
  const { workers } = useGetAllWorkers();
  const workList = workers?.map((item: IWorkerData) => item.worker_name);
  const form = useForm<labourFormType>({
    resolver: zodResolver(LabourSchema),
    defaultValues: {
      request_type: RequestType.Labour,
    },
  });

  const projectName = projectsData?.map((item: any) => item.project_name);

  const handleSubmit = async (data: labourFormType) => {
    try {
      const res = await api.put(`/requests/${formDetails?.id}`, {
        ...data,
        status: "APPROVED",
        approved_total_amount: Number(data.approved_amount),
        approved_on: new Date(),
        approved_by: username,
      });
      if (res.status === 200 || res.status === 201) {
        toast({
          title: "Request Approved",
          variant: "success",
        });
        form.reset();
        onClose();
        window.location.reload();
      }
    } catch (error) {
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
        <div className="py-4 w-full">
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            <div className="w-full">
              <CustomFormField
                name="amount"
                label="Amount"
                control={form.control}
                placeholder={String(formDetails?.amount)}
                disabled
              />
            </div>
            <div className="w-full">
              <CustomFormField
                name="approved_amount"
                label="Approved Amount"
                control={form.control}
                placeholder="Enter Approved Amount"
                className="py-2"
              />
            </div>
          </div>
          <div className="flex flex-col py-3 gap-4 w-full">
            <CustomFormTextareaField
              name="description"
              label="Description"
              control={form.control}
              placeholder="Enter Description"
            />
            <CustomFormTextareaField
              name="supervisor_comment"
              label="Comment"
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
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="w-full">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
