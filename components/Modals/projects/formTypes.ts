import * as z from "zod";

export const AddProjectFormSchema = z.object({
  project_name: z.string().optional(),
  project_description: z.string().optional(),
  project_code: z.string().optional(),
  project_location: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  lga: z.string().optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  project_supervisor: z.string().optional(),
});

export type AddProjectFormType = z.infer<typeof AddProjectFormSchema>;
