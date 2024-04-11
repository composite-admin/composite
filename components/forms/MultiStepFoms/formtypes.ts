import { z } from "zod";
export interface IFormSteps {
  id: string;
  name: string;
  fields: string[];
}
export const AddTenantFormSteps: IFormSteps[] = [
  {
    id: "1",
    name: "Basic Information",
    fields: [
      "project_name",
      "flat_code",
      "title",
      "full_name",
      "phone_number",
      "email",
    ],
  },
  {
    id: "2",
    name: "Address",
    fields: ["annual_rent", "rent_payment", "reminder", "fees", "value"],
  },
];

export const FormDataSchema = z.object({
  project_name: z.string().min(1, { message: "Project required" }),
  flat_code: z.string().min(1, { message: "Flat required" }),
  title: z.enum(["Mr.", "Mrs.", "Miss"], {
    required_error: "Title required",
  }),
  full_name: z.string().min(1, { message: "Name required" }),
  phone_number: z.string().min(1, { message: "Phone number required" }),
  email: z.string().email({ message: "Email is invalid" }),
  annual_rent: z.string().min(1, { message: "Annual rent cost required" }),
  rent_payment: z.string().min(1, { message: "Rent payment required" }),
  reminder: z.string().min(1, { message: "Set reminder required" }),
  fees: z.string().min(1, { message: "Fee type required" }),
  value: z.string().min(1, { message: "Value required" }),
});

export type addTenantType = z.infer<typeof FormDataSchema>;
