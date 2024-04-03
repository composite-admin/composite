import * as z from "zod";
export interface IAddClientFormType {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  mobileNumber: string;
  state: string;
  address: string;
}

export const createAddClientSchema = z.object({
  "First name": z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),

  "Last name": z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),

  Email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),

  "Phone number": z
    .string()
    .min(1, { message: "Phone number is required" })
    .min(11, { message: "Phone number is invalid" })
    .max(11, { message: "Phone number is invalid" }),

  "Mobile number": z
    .string()
    .min(1, { message: "Mobile number is required" })
    .min(11, { message: "Mobile number is invalid" })
    .max(11, { message: "Mobile number is invalid" }),

  State: z.string().min(1, { message: "State is required" }),

  Address: z.string().min(1, { message: "Address is required" }),
});

export type CreateAddClientType = z.infer<typeof createAddClientSchema>;