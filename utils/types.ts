import * as z from "zod";

export interface UserData {
  id: number;
  userid: string;
  email: string;
  username: string | null;
  password: string;
  menu_right: string | null;
  user_type: string;
  status: string;
  lastlogdate: string;
  pwd_status: number;
  pwd_date_created: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  data: UserData;
  token: string;
  message: string;
}

export type gridDataType = {
  key: string;
  value: string;
};

export type GridDetailsType = {
  withHeader?: boolean;
  children?: React.ReactNode;
  data: gridDataType[];
};

export type NavLinkType = {
  href: string;
  label: string;
  icon: React.ReactNode;
  isCollapsible?: boolean;
  childLabel?: string[];
  childTitle?: string;
  childHref?: string;
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
  type: "text" | "email" | "select" | "textarea";
  options?: string[];
  required?: boolean;
}

export interface FormStep {
  id: string;
  name: string;
  fields: FormField[];
}
