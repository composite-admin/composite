import { z } from "zod";
// field names
  // "selectProject",
  //     "selectFlat",
  //     "title",
  //     "tenatFullName",
  //     "phoneNumber",
  //     "email",

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
  selectProject: z.string().min(1, "Project is required"),
  selectFlat: z.string().min(1, "Flat is required"),
  title: z.string().min(1, "Title is required"),
  tenatFullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  annualRentCost: z.string().min(1, "Annual rent cost is required"),
  rentPayment: z.string().min(1, "Rent payment is required"),
  setReminder: z.string().min(1, "Set reminder is required"),
  feeType: z.string().min(1, "Fee type is required"),
  value: z.string().min(1, "Value is required"),
  
});
