import z from "zod";
import { data } from "../app/(admin)/cash-advance/data";

export type ID = string | number;

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
  bank_to: string;
  payment_method: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  decision: string;
  decision_reason: string;
  action_type: string;
  action_by: string;
  image: string;
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

export interface IDeuDates {
  annual_rent: string;
  comment: string;
  createdAt: string;
  due_date: string;
  email: string;
  fees: null | number;
  flat_code: string;
  flat_description: string;
  full_name: string;
  password: string;
  phone_number: string;
  project_code: null | string;
  project_details: string;
  project_name: string;
  reminder: string;
  rent_payment: string;
  status: string;
  tenant_code: string;
  tenant_id: number;
  title: string;
  updatedAt: string;
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

// SUPPLIER AND TOOLS=======================
export type ISupplierData = {
  id: ID;
  supplier_code: string;
  supplier_name: string;
  supplier_address: string;
  supplier_ofc_phone: string;
  contact_person: string;
  contact_mobile: string;
  contact_home_phone: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export type ISupplierMaterialTypesData = {
  material_type_id: ID;
  material_type_desc: string;
};

export type ISupplierMaterialSubTypesData = {
  sub_type_desc: string;
};

export type ISupplierMaterialDescriptionData = {
  description: string;
};

export type IToolAndMachineryData = {
  tool_id: number;
  tool_code: string;
  supplier_code: string;
  supplier_name: string;
  tool_type: string;
  description: string;
  others: string;
  procurement_type: string;
  created_by: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export type IAddToolsAndMachineryData = {
  supplier_code: string;
  supplier_name: string;
  tool_type: string;
  description: string;
  others: string;
  procurement_type: string;
  comment: string;
};

export const feeTypes = [
  "Electricty",
  "Facility Management",
  "Disel",
  "others",
];

export type IUpdateToolAndMachineryData = {
  tool_type: string;
  description: string;
  others: string;
  procurement_type: string;
  comment: string;
};

// WORKER AND WORKER-JOBS===================
export type IWorkerData = {
  id: number;
  worker_code: string;
  worker_name: string;
  worker_company: string;
  worker_address: string;
  worker_email: string;
  worker_mobile: string;
  worker_home_phone: string;
  worker_ofc_phone: string;
  service_type: string;
  section: string;
  worker_source: string;
  site_management: string;
  project_code: string;
  worker_service: string;
  worker_service_charge: number;
  amount_paid: string;
  outstanding_balance: number;
  date_assigned_to_project: string;
  comment: string;
  createdAt: string;
  updatedAt: string;

  // BANK
  bank_name: string;
  account_name: string;
  account_number: string;
};

export type IWorkerJobData = {
  id: number;
  job_code: string;
  worker_code: string;
  project_code: string;
  worker_service: string;
  worker_service_charge: string;
  amount_paid: string;
  outstanding_balance: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export type IWorkerJobCreateData = {
  worker_code: string;
  project_code: string;
  worker_service: string;
  worker_service_charge: number;
  amount_paid: number;
  outstanding_balance: number;
  comment: string;
};

export type IWorkerJobUpdateData = {
  worker_code: string;
  worker_service: string;
  worker_service_charge: number;
  amount_paid: number;
  outstanding_balance: number;
  comment: string;
};

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


export interface PendingProjectDetails {
  project_code: string;
  startup_cost: string;
  stakeholder_amount: string;
  project_name: string;
  contractor_amount: string;
  material_amount: string;
  machinery_approved_amount: string;
  labour_approved_amount: string;
  cash_advance_approved_amount: string;
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

export const selectOptionForRoles = [
  "Project Manager",
  "Architect",
  "Structural",
  "HR",
  "Mechanical",
  "Engineer",
  "Electrical",
  "Quantity Surveyor",
  "Site Superintendent",
];

export const selectOptionsForProjectStatus = [
  "Site Prep",
  "On-going",
  "Finishing Stage",
  "Completed",
];

export const selectoptionsForUserType = ["Admin", "Supervisor", "Staff"];

export const selectOptionsForType = ["In-house", "Contractor"];

export const selectOptionsForStartUpCostType = [
  "Agency",
  "Community Relation",
  "Design & Approval Drawing",
  "Geophysical Survey",
  "Geotechnical Survey",
  "Land Acquisition",
  "Local Government PR",
  "Omo Onile",
  "Regulatory Agency PR",
  "Regulatory Approval Fee",
  "Security",
];

export const selectOptionsForStaffRole = [
  "Project Manager",
  "Architect",
  "Structural",
  "HR",
  "Mechanical",
  "Engineer",
  "Electrical",
  "Quantity Surveyor",
  "Site Superintendent",
];

export const selectOptionsForConsultantsType = [
  "Structural Engineers",
  "Mechanical and Electrical Engineers",
  "Architects",
  "Land Surveyors",
  "Quantity Surveyor",
  "Estate Surveyors",
  "Legal Practitioners",
  "Geo Technical",
  "Type 1",
];

export const selectOtionsForWorkerServiceType = [
  "Borehole Drilling",
  "Carpentry",
  "Cabinetry / Furniture",
  "Cable TV Installation",
  "Cleaning",
  "Concret Casting",
  "CCTV / Security Installation",
  "Data / Video / Voice Cabling",
  "Electrical",
  "House Painting",
  "Gardening",
  "Mable Work",
  "Masonry",
  "Paving",
  "Piling Work",
  "Plumbing",
  "PoP Work",
  "Roofing",
  "Scaffolding",
  "Spray Painting",
  "Steel Bending",
  "Tiling",
  "Welding",
];

export interface ISupplierMaterial {
  mat_id: number;
  mat_code: string;
  supplier_code: string;
  supplier_name: string;
  mat_desc: string;
  project_code: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  createdAt: string;
  updatedAt: string;
}

export interface IStartupCostProjectData {
  id: number;
  startup_code: string;
  project_code: string;
  startup_desc: string;
  startup_type: string;
  startup_cost: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface IContractorProjectData {
  id: number;
  contractor_code: string;
  contractor_project_code: string;
  contractor_amount: string;
  approved_amount: string;
  project_name: string;
  service: string;
  createdBy: string;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  contractor_name: string;
  created_by: string;
}

export interface IStakeholderProjectData {
  id: number;
  stakeholder_code: string;
  stakeholder_project_code: string;
  stakeholder_amount: string;
  approved_amount: string;
  other_amount: string;
  createdBy: string;
  project_name: string;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  stakeholder_name: string;
  created_by: string;
}

export interface IMaterialsByProjectData {
  id: number;
  project_code: string;
  supplier_code: string;
  supplier_name: string;
  material_code: string;
  company: string;
  address: string;
  contact_person: string;
  contact_mobile: string;
  ofc_phone: string;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  payment_mode: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface IWorkerByProjectData {
  id: number;
  project_code: string;
  project_name: string;
  service_type: string;
  worker_code: string;
  worker_name: string;
  createdAt: string;
  updatedAt: string;
  worker_email: string;
  worker_home_phone: string;
  worker_ofc_phone: string;
}

export interface IProjectTeamMemberByProjectData {
  id: number;
  project_name: string;
  project_code: string;
  role: string;
  staff_id: string;
  staff_name: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  image: string | null;
}

export interface IConsultantProjectData {
  id: number | string;
  consultant_id: string;
  project_id: string;
  project_code: string;
  type: string;
  project_name: string;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface InventoryItemData {
  inventory_id: number;
  inventory_code: string;
  name: string;
  type: string;
  unit_price: string;
  quantity: string;
  total_price: number;
  total_quantity: number;
  remaining_quantity: number;
  created_by: string;
  updated_by: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface IContractorProjectData {
  id: number;
  contractor_code: string;
  contractor_project_code: string;
  contractor_amount: string;
  approved_amount: string;
  service: string;
  createdBy: string;
  comment: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  created_by: string;
}

export interface IClientProjectData {
  id: number;
  client_id: string;
  project_id: string;
  project_code: string;
  project_name: string;
  createdAt: string;
  updatedAt: string;
  project_duration: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface IStaffDetailsData {
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
  bank_name: string;
  account_name: string;
  account_number: string;
  image: string | null;
}

export interface ICashAdvanceBreakdownData {
  id: number;
  request_code: string;
  description: string;
  amount: string;
  added_by: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}