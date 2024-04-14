import * as z from "zod";

export const AddProjectFormSchema = z.object({
  project_name: z.string().optional(),
  project_description: z.string().optional(),
  project_code: z.string().optional(),
  project_location: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  lga: z.string().optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  comment: z.string().optional(),
  project_supervisor: z.string().optional(),
  team_members: z.string().optional(),
});

export type AddProjectFormType = z.infer<typeof AddProjectFormSchema>;

//  project_name": "Project A",
//     project_description": "Description of Project C",
//     project_code": "proj-0001",
//     project_location": "Location C",
//     address": "123 Main St",
//     city": "City A",
//     state": "State A",
//     lga
//     start_date
//     end_date
//     comment
//     project_supervisor
