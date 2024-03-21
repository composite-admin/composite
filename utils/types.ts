import * as z from "zod";
export type gridDataType = {
  key: string;
  value: string;
};

export type GridDetailsType = {
  withHeader?: boolean;
  children?: React.ReactNode;
  data: gridDataType[];
};



export type LoginForm = {
  email: string;
  password: string;
};



export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email must be a valid email" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginType = z.infer<typeof loginSchema>;


export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea';
  options?: string[];
  required?: boolean;
}

export interface FormStep {
  id: string;
  name: string;
  fields: FormField[];
}