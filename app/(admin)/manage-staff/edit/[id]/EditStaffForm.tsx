import { AvatarComponent } from "@/components/shared/AvatarComponent";
import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/shared/FormComponent";
import FormContainer from "@/components/shared/FormContainer";
import GoBack from "@/components/shared/GoBack";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import {
  IStaffDetailsData,
  nigerianStates,
  selectOptionForRoles,
} from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EditStaffFormSchema = z.object({
  firstname: z.string({
    required_error: "First name is required",
  }),
  lastname: z.string({
    required_error: "Last name is required",
  }),
  home_phone: z.string().optional(),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  stateOfOrigin: z.string({
    required_error: "State of origin is required",
  }),
  sex: z.string({
    required_error: "Gender is required",
  }),
  middlename: z.string().optional(),
  role: z.string({
    required_error: "Role is required",
  }),
  cell_phone: z.string().optional(),
  address: z.string({
    required_error: "Address is required",
  }),
  lga: z.string({
    required_error: "LGA is required",
  }),
  marital_status: z.string({
    required_error: "Marital status is required",
  }),
  nextOfKin: z.string({
    required_error: "Next of kin full name is required",
  }),
  relationship: z.string({
    required_error: "Relationship is required",
  }),
  phoneOfNOK: z.string().optional(),
  emailOfNOK: z.string().email("Invalid email address").optional(),
  addressOfNOK: z.string({
    required_error: "Next of kin address is required",
  }),
  bank_name: z.string({
    required_error: "Bank name is required",
  }),
  account_name: z.string({
    required_error: "Account name is required",
  }),
  account_number: z.string({
    required_error: "Account number is required",
  }),
});

type EditStaffType = z.infer<typeof EditStaffFormSchema>;

interface props {
  data: IStaffDetailsData | undefined;
}

export default function EditStaffForm({ data }: props) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<EditStaffType>({
    resolver: zodResolver(EditStaffFormSchema),
  });

  const staffId = data?.userid;

  useEffect(() => {
    if (data) {
      form.setValue("firstname", data?.firstname);
      form.setValue("lastname", data?.lastname);
      form.setValue("home_phone", data?.home_phone);
      form.setValue("email", data?.email);
      form.setValue("stateOfOrigin", data?.stateOfOrigin);
      form.setValue("sex", data?.sex);
      form.setValue("middlename", data?.middlename);
      form.setValue("role", data?.role);
      form.setValue("cell_phone", data?.cell_phone);
      form.setValue("address", data?.address);
      form.setValue("lga", data?.lga);
      form.setValue("marital_status", data?.marital_status);
      form.setValue("nextOfKin", data?.nextOfKin);
      form.setValue("relationship", data?.relationship);
      form.setValue("phoneOfNOK", data?.phoneOfNOK);
      form.setValue("emailOfNOK", data?.emailOfNOK);
      form.setValue("addressOfNOK", data?.addressOfNOK);
      form.setValue("cell_phone", data?.cell_phone);
      form.setValue("bank_name", data?.bank_name);
      form.setValue("account_name", data?.account_name);
      form.setValue("account_number", data?.account_number);
    }
  }, [data, form]);

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["edit staff"],
    mutationFn: async (data: { [Key in keyof EditStaffType]: string }) => {
      try {
        const response = await api.put(`/staffs/${staffId}`, {
          ...data,
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
        title: "Staff edited successfully",
        variant: "success",
      });
      form.reset();
      router.push("/manage-staff");
    },
    onError: (error: Error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EditStaffType) => {
    mutate(data);
  };
  return (
    <>
      <GoBack />
      <FormContainer
        isColumn
        title="Edit Staff"
        description="Edit staff details here"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-4 pt-4 pb-3">
              <CustomFormField
                control={form.control}
                placeholder="Enter first name"
                label="First name"
                name="firstname"
              />
              <CustomFormField
                control={form.control}
                placeholder="Enter last name"
                label="Last name"
                name="lastname"
              />
              <CustomFormField
                control={form.control}
                placeholder="Enter phone number"
                label="Home phone"
                name="home_phone"
              />
              <CustomFormField
                control={form.control}
                placeholder="Enter email"
                label="Email"
                type="email"
                name="email"
              />

              <CustomFormSelect
                name="stateOfOrigin"
                items={nigerianStates}
                placeholder={data?.stateOfOrigin}
                control={form.control}
                labelText="State of Origin"
              />
              <CustomFormSelect
                name="sex"
                items={["Male", "Female"]}
                placeholder="Select gender"
                control={form.control}
              />

              <CustomFormField
                control={form.control}
                placeholder="Enter middle name"
                label="Middle name"
                name="middlename"
              />
              <CustomFormSelect
                name="role"
                items={selectOptionForRoles || []}
                placeholder="Select Staff Role"
                control={form.control}
                labelText="Role"
              />

              <CustomFormField
                control={form.control}
                name="cell_phone"
                placeholder="Enter cell phone number"
                label="Cell phone"
              />

              <CustomFormField
                control={form.control}
                name="address"
                placeholder="Enter address"
                label="Address"
              />

              <CustomFormField
                control={form.control}
                name="lga"
                placeholder="Enter lga"
                label="LGA"
              />
              <CustomFormSelect
                name="marital_status"
                items={["Married", "Single"]}
                placeholder="select marital status"
                control={form.control}
              />
              <CustomFormField
                name="nextOfKin"
                control={form.control}
                placeholder="Enter full name"
                label="Full name of next of kin"
              />
              <CustomFormSelect
                name="relationship"
                items={["Father", "Mother", "Brother", "Sister", "Relative"]}
                placeholder="select relationship"
                control={form.control}
                labelText="Relationship of next of kin"
              />
              <CustomFormField
                name="phoneOfNOK"
                control={form.control}
                placeholder="Enter home phone number"
                label="Home phone of next of kin"
              />
              <CustomFormField
                name="emailOfNOK"
                control={form.control}
                placeholder="Enter email"
                label="Email of next of kin"
              />
              <CustomFormField
                name="addressOfNOK"
                control={form.control}
                placeholder="Enter address"
                label="Address of next of kin"
              />
              <CustomFormField
                name="cell_phone"
                control={form.control}
                placeholder="Enter cell phone number"
                label="Cell phone of next of kin"
              />

              <CustomFormField
                name="bank_name"
                control={form.control}
                placeholder="Enter bank name"
                label="Bank name"
              />

              <CustomFormField
                name="account_name"
                control={form.control}
                placeholder="Enter account name"
                label="Account name"
              />
            </div>

            <CustomFormField
              name="account_number"
              control={form.control}
              placeholder="Enter account number"
              label="Account number"
            />

            <div className="grid md:grid-cols-2 gap-4 pt-8 ">
              <Button
                variant={"secondary"}
                type="button"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </FormContainer>
    </>
  );
}
