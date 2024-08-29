import { z } from "zod";
import { IFormSteps } from "../MultiStepFoms/formtypes";

export const AddStaffSteps: IFormSteps[] = [
  {
    id: "1",
    name: "Basic Information",
    fields: [
      "firstName",
      "middleName",
      "date_employed",
      "dob",
      "lastName",
      "typeOfStaff",
      "homePhone",
      "role",
      "cellPhone",
      "email",
      "address",
      "stateOfOrigin",
      "lga",
      "gender",
      "maritalStatus",
    ],
  },
  {
    id: "2",
    name: "Next of Kin",
    fields: [
      "nextOfKinFullName",
      "emailnextOfKin",
      "relationship",
      "addressOfNextOfKin",
      "homePhoneOfNextOfKin",
      "cellPhoneOfNextOfKin",
    ],
  },
  {
    id: "3",
    name: "Role and Password",
    fields: [
      "userName",
      "user_type",
      "staff_type",
      "password",
      "confirmPassword",
    ],
  },
  {
    id: "4",
    name: "Bank Account",
    fields: ["bankName", "accountName", "accountNumber"],
  },
];

export type addStaffType = z.infer<typeof AddStaffFormSchema>;

export const AddStaffFormSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  dob: z.date({ required_error: "Please select a date of birth" }),
  date_employed: z.date({
    required_error: "Please select an employment date",
  }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name is required"),
  typeOfStaff: z.enum(["Admin", "Staff"]),
  homePhone: z.string().optional(),
  staff_type: z.string().min(2, "Staff type is required"),
  user_type: z.string().min(2, "User type is required"),
  cellPhone: z.string().min(11, "Phone number is invalid").max(11),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  stateOfOrigin: z.string().min(3, "State of origin is required"),
  lga: z.string().min(3, "Lga is required"),
  gender: z.enum(["Male", "Female"]),
  maritalStatus: z.enum(["Married", "Single"]),
  addressOfNextOfKin: z.string().min(5, "Address is required"),
  cellPhoneOfNextOfKin: z.string().min(11, "Phone number is invalid").max(11),
  homePhoneOfNextOfKin: z.string().min(11, "Phone number is invalid").max(11),
  nextOfKinFullName: z.string().min(2, "Full name is required"),
  emailnextOfKin: z.string().min(5, "Email is required").email(),
  relationship: z.enum(["Father", "Mother", "Brother", "Sister", "Relative"]),
  username: z.string().min(5, "User name is required"),
  role: z.string().min(2, "Role is required"),
  password: z.string().min(9, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(9, "Confirm password must be at least 8 characters long"),
  bankName: z.string().min(3, "Bank name is required"),
  accountName: z.string().min(3, "Account name is required"),
  accountNumber: z
    .string()
    .min(10, "Account number is required, must be at least 10 digits"),
}).refine((data) => data.confirmPassword === data.password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});;
