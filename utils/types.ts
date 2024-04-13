import * as z from "zod";
import { data } from "../app/(admin)/cash-advance/data";

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
  data: T;
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

export interface IRequestData {
  id: number;
  request_code: string;
  carttemp_sess: string;
  staff_id: string;
  staff_name: string;
  staff_email: string;
  request_type: string;
  project_name: string;
  project_code: string;
  supplier_code: string;
  supplier_name: string;
  supplier_material: string;
  description: string;
  quantity: number;
  unit_price: string | number;
  total_price: number;
  worker_name: string;
  worker_code: string;
  worker_service: string;
  amount: number;
  job_code: string;
  comment: string;
  response: string;
  status: string;
  date: string;
  company: string;
  company_address: string;
  contact_person: string;
  contact_mobile: string;
  ofc_phone: string;
  cash_advance_purpose: string;
  tool_name: string;
  approved_by: string;
  approved_on: string;
  approved_amount: number;
  approved_quantity: number;
  approved_unit_price: string;
  approved_total_amount: string;
  tool_machinery_type: string;
  inventory_type_id: number;
  supervisor_comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICashAdvanceData {
  cash_id: number;
  project_code: string;
  project_name: string;
  cash_advance_type: string;
  request_code: string;
  staff_id: string;
  staff_name: string;
  amount_collected: string;
  amount_recorded: string;
  balance: string;
  status: string;
  purpose: string;
  bank_to: string;
  payment_method: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITenantData {
  tenant_id: number;
  tenant_code: string;
  title: string;
  full_name: string;
  phone_number: string;
  email: string;
  password: string;
  project_name: string;
  project_details: string;
  flat_description: string;
  flat_code: string;
  annual_rent: string;
  comment: string;
  status: string;
  rent_payment: string;
  reminder: string;
  createdAt: string;
  updatedAt: string;
  fees: string;
}

export interface ITenantDetails {
  data: {
    tenant_id: number;
    tenant_code: string;
    title: string;
    full_name: string;
    phone_number: string;
    email: string;
    password: string;
    project_name: string;
    project_details: string;
    flat_description: string;
    flat_code: string;
    annual_rent: string;
    comment: string;
    status: string;
    rent_payment: string;
    reminder: string;
    createdAt: string;
    updatedAt: string;
    fees: string;
  };
  message: string;
}

export interface IManageStaffData {
  id: number;
  userid: string;
  firstname: string;
  middlename: string;
  lastname: string;
  dob: string;
  stateOfOrigin: string;
  lga: string;
  sex: string;
  marital_status: string;
  address: string;
  home_phone: string;
  cell_phone: string;
  email: string;
  nextOfKin: string;
  relationship: string;
  addressOfNOK: string;
  emailOfNOK: string;
  phoneOfNOK: string;
  date_employed: string;
  deptid: string;
  gradeid: string;
  branchcode: string;
  employee_status: string;
  role: string;
  staff_type: string;
  createdAt: string;
  updatedAt: string;
  bank_name: string | null;
  account_name: string | null;
  account_number: string | null;
  image: string | null;
}

export interface IFlatData {
  flat_id: number;
  flat_code: string;
  project_name: string;
  project_code: string;
  flat_desc: string;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}


export interface IConsultantData {
  id: number;
  consultant_code: string;
  name: string;
  type: string;
  contact: string;
  email: string;
  website: string;
  createdAt: string;
  updatedAt: string;
}

export interface IConsultantDetailsData {
  data: {
    id: number;
    consultant_code: string;
    name: string;
    type: string;
    contact: string;
    email: string;
    website: string;
    createdAt: string;
    updatedAt: string;
  };
  message?: string;
}

export const AddConsultantSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Full name must be at least 3 characters" }),
    contact: z
      .string()
      .min(10, { message: "Phone number must be at least 10 characters" }),
    email: z.string().email({ message: "Invalid email" }),
    type: z.string().optional(),
    website: z
      .string()
      .min(6, { message: "This website might not be valid, please try again" }),
  })
  .required();

export type AddConsultantType = z.infer<typeof AddConsultantSchema>;


export interface IProjectData {
  id: number;
  project_name: string;
  project_description: string;
  project_code: string;
  project_location: string;
  address: string;
  city: string;
  state: string;
  lga: string;
  project_duration: string;
  start_date: string;
  end_date: string;
  comment: string;
  status: string;
  date_added: string;
  project_supervisor: string;
  supervisor_id: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface EntityCount {
  count: string;
}

export interface IEntityData {
  totalProject: EntityCount;
  totalContractor: EntityCount;
  totalStakeholder: EntityCount;
  totalStaff: EntityCount;
  totalWorker: EntityCount;
  totalClient: EntityCount;
  totalSuppliers: EntityCount;
}

export interface IProjectReport {
  id: number;
  report_code: string;
  report_type: string;
  created_for: string;
  project_name: string;
  project_code: string;
  project_supervisor: string;
  report_summary: string;
  challenges: string;
  solutions: string;
  recommendation: string;
  weekly_projection: string;
  materials_required_for_projection: string;
  materials_on_site: string;
  status: string;
  submitted_by: string;
  submitted_on: string;
  visitor: string;
  weather: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  photograph_id: number | null;
  name: string;
}
