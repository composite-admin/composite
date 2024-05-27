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

const stringSchema = z
  .string({
    required_error: "This field is required",
  })
  .min(0)
  .max(1000);

export const ProjectReportSchema = z.object({
  report_type: z.enum(["Daily", "Weekly", "Monthly", "Yearly"], {
    required_error: "Report type required",
  }),
  project_name: stringSchema,
  report_summary: stringSchema,
  project_supervisor: stringSchema,
  challenges: stringSchema,
  solutions: stringSchema,
  recommendation: stringSchema,
  equipment_on_site: stringSchema.optional(),
  weekly_projection: stringSchema,
  materials_required_for_projection: stringSchema,
  materials_on_site: stringSchema,
  visitor: stringSchema,
  weather: stringSchema,
  // photograph_id: z.string().array().optional(),
});

export type ProjectReportFormType = z.infer<typeof ProjectReportSchema>;


// schema with all values optional 

