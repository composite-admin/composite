import { z } from "zod";
import { IFormSteps } from "@/components/forms/MultiStepFoms/formtypes";

export const ProjectReportSteps: IFormSteps[] = [
  {
    id: "1",
    name: "Fill Report",
    fields: [
      "report_type",
      "created_for",
      "project_name",
      "project_code",
      "project_supervisor",
      "report_summary",
      "challenges",
      "solutions",
      "recommendation",
      "equipment_on_site",
      "weekly_projection",
      "materials_required_for_projection",
      "materials_on_site",
      "visitor",
      "weather",
    ],
  },
  {
    id: "2",
    name: "Upload Images",
    fields: ["photograph_id"],
  },
];

// export const ProjectReportSchema = z.object({
//   report_type: z.enum(["Daily", "Weekly", "Monthly"], {
//     required_error: "Report type required",
//   }),
//   project_name: z.string({
//     required_error: "Project name required",
//   }),
//   created_for: z.string({
//     required_error: "Created for required",
//   }),
//   project_code: z.string({
//     required_error: "Project code required",
//   }),
//   project_supervisor: z.string({
//     required_error: "Project supervisor required",
//   }),
//   report_summary: z.string({
//     required_error: "Report summary required",
//   }),
//   challenges: z.string({
//     required_error: "Challenges required",
//   }),
//   solutions: z.string({
//     required_error: "Solutions required",
//   }),
//   recommendation: z.string({
//     required_error: "Recommendation required",
//   }),
//   equipment_on_site: z.string({
//     required_error: "Equipment on site required",
//   }),
//   weekly_projection: z.string({
//     required_error: "Weekly projection required",
//   }),
//   materials_required_for_projection: z.string({
//     required_error: "Materials required for projection required",
//   }),
//   materials_on_site: z.string({
//     required_error: "Materials on site required",
//   }),
//   visitors: z.string({
//     required_error: "Visitors required",
//   }),
//   weather: z.string({
//     required_error: "Weather required",
//   }),
//   // photograph_id: z.string().array().optional(),
// });

export const ProjectReportSchema = z.object({
  report_type: z.enum(["Daily", "Weekly", "Monthly", "Yearly"], {
    required_error: "Report type required",
  }),
  project_name: z.string({
    required_error: "Project name required",
  }),
  report_summary: z.string({
    required_error: "Report summary required",
  }),
  project_supervisor: z.string({
    required_error: "Project supervisor required",
  }),
  challenges: z.string({
    required_error: "Challenges required",
  }),
  solutions: z.string({
    required_error: "Solutions required",
  }),
  recommendation: z.string({
    required_error: "Recommendation required",
  }),
  equipment_on_site: z
    .string({
      required_error: "Equipment on site required",
    })
    .optional(),
  weekly_projection: z.string({
    required_error: "Weekly projection required",
  }),

  materials_required_for_projection: z.string({
    required_error: "Materials required for projection required",
  }),
  materials_on_site: z.string({
    required_error: "Materials on site required",
  }),
  visitor: z.string({
    required_error: "Visitors required",
  }),
  weather: z.string({
    required_error: "Weather required",
  }),
  // photograph_id: z.string().array().optional(),
});

export type ProjectReportFormType = z.infer<typeof ProjectReportSchema>;


// schema with all values optional 

