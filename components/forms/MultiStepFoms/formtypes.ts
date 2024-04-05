import { z } from "zod";
// export const loginSchema = z.object({
//   email: z
//     .string()
//     .min(1, { message: "Email is required" })
//     .email({ message: "Email must be a valid email" }),
//   password: z
//     .string()
//     .min(1, { message: "Password is required" })
//     .min(8, { message: "Password must be at least 8 characters" }),
// });

// export type LoginType = z.infer<typeof loginSchema>;

interface IFormSteps {
  id: string;
  name: string;
  fields: string[];
}

export const AddTenantFormSteps: IFormSteps[] = [
  {
    id: "1",
    name: "Basic Information",
    fields: [ 'selectProject', 'selectFlat', 'title', 'tenatFullName', 'phoneNumber', 'email'],
  },
  {
    id: "2",
    name: "Address",
    fields: ["annualRentCost", 'rentPayment', 'setReminder', 'feeType', 'value'],
  },
];

export const FormDataSchema = z.object({
    selectProject: z.string().min(1, { message: "Project required" }),
    selectFlat: z.string().min(1, { message: "Flat required" }),
    title: z.string().min(1, { message: "Title required" }),
    tenatFullName: z.string().min(1, { message: "Name required" }),
    phoneNumber: z.string().min(1, { message: "Phone number required" }),
    email: z.string().email({ message: "Email is invalid" }),
    annualRentCost: z.string().min(1, { message: "Annual rent cost required" }),
    rentPayment: z.string().min(1, { message: "Rent payment required" }),
    setReminder: z.string().min(1, { message: "Set reminder required" }),
    feeType: z.string().min(1, { message: "Fee type required" }),
    value: z.string().min(1, { message: "Value required" }),
});

export type addTenantType = z.infer<typeof FormDataSchema>;

