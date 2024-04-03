import * as z from "zod";

export interface UserData {
  id: number;
  userid: string;
  email: string;
  username: string | null;
  password: string;
  menu_right: string | null;
  user_type: string | undefined;
  status: string;
  lastlogdate: string;
  pwd_status: number;
  pwd_date_created: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export interface LoginResponse {
  data: UserData;
  token: string;
  message: string;
}

export interface IClientData {
  client_id?: number;
  userid?: string;
  first_name?: string;
  last_name: string;
  email?: string;
  phone_number?: string;
  mobile_number: string;
  address: string;
  state: string;
  activation_code: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
}
export interface IClientDetails {
  data: {
    client_id?: number;
    userid?: string;
    first_name?: string;
    last_name: string;
    email?: string;
    phone_number?: string;
    mobile_number: string;
    address: string;
    state: string;
    activation_code: string;
    createdAt: string;
    updatedAt: string;
    image: string | null;
  };
}

export interface ApiResponse<T> {
  data: T[];
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
  childLabel?: string;
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

export const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];