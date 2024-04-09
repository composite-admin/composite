import { z } from "zod";
import { IFormSteps } from "../MultiStepFoms/formtypes";

export const AddStaffSteps: IFormSteps[] = [
  {
    id: "1",
    name: "Basic Information",
    fields: [
      "firstName",
      "middleName",
      "lastName",
      "typeOfStaff",
      "homePhone",
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
    fields: ["userName", "role", "password", "confirmPassword"],
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
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name is required"),
  typeOfStaff: z.enum(["Admin", "Staff"]),
  homePhone: z.string().optional(),
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
  userName: z.string().min(5, "User name is required"),
  role: z.enum(["Admin", "Staff"]),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters long"),
  bankName: z.string().min(3, "Bank name is required"),
  accountName: z.string().min(3, "Account name is required"),
  accountNumber: z
    .string()
    .min(10, "Account number is required, must be at least 10 digits"),
});

// if (currentStep < steps.length - 1) {
//   if (currentStep === steps.length - 2) {
//     await form.handleSubmit(processForm)();
//   }
//   setPreviousStep(currentStep);
//   setCurrentStep((step) => step + 1);
// }

// export const AddStaffFormSchema = z.object({
//   firstName: z.string().min(2, { message: "First name is required" }),
//   middleName: z.string().optional(),
//   lastName: z.string().min(2, "Last name is required"),
//   typeOfStaff: z.enum(["Admin", "Staff"]),
//   homePhone: z.string().optional(),
//   cellPhone: z.string().optional(),
//   email: z.string().email("Invalid email address"),
//   address: z.string().min(5, "Address is required"),
//   stateOfOrigin: z.string().min(1, "State of origin is required"),
//   lga: z.string().optional(),
//   gender: z.enum(["Male", "Female"]),
//   maritalStatus: z.enum(["Married", "Single"]),
//   dateOfBirth: z.string().min(1, "Date of birth is required"),
//   // addressOfNextOfKin: z.string().optional(),
//   // cellPhoneOfNextOfKin: z.string().optional(),
//   // homePhoneOfNextOfKin: z.string().optional(),
//   // nextOfKinFullName: z.string().min(1, "Next of kin full name is required"),
//   // emailnextOfKin: z.string().email("Invalid email address"),
//   // relationship: z.enum(["Sibling", "Parent", "Spouse"]),
//   // userName: z.string().min(1, "Username is required"),
//   // role: z.enum(["Admin", "Staff", "Client"]),
//   // password: z.string().min(8, "Password must be at least 8 characters long"),
//   // confirmPassword: z
//   //   .string()
//   //   .min(8, "Confirm password must be at least 8 characters long"),
//   // bankName: z.string().min(1, "Bank name is required"),
//   // accountName: z.string().min(1, "Account name is required"),
//   // accountNumber: z.string().min(1, "Account number is required"),
// });
