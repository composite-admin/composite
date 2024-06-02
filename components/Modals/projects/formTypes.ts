import * as z from "zod";

export const AddProjectFormSchema = z.object({
  project_name: z.string({ required_error: "Please enter a project name" }),
  project_description: z.string({
    required_error: "Please enter a project description",
  }),
  // project_code: z.string({ required_error: "Please enter a project code" }),
  project_location: z.string({
    required_error: "Please enter a project location",
  }),
  address: z.string({ required_error: "Please enter an address" }),
  city: z.string({ required_error: "Please enter a city" }),
  state: z.string({ required_error: "Please enter a state" }),
  role: z.string({ required_error: "Please enter a role" }),
  status: z.string({ required_error: "Please enter a status" }),
  lga: z.string({ required_error: "Please enter an LGA" }),
  start_date: z.date({ required_error: "Please select a start date" }),
  end_date: z.date({ required_error: "Please select an end date" }),
  project_supervisor: z.string({
    required_error: "Please enter a project supervisor",
  }),
});

export type AddProjectFormType = z.infer<typeof AddProjectFormSchema>;
