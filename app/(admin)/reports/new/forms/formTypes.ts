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
      "visitors",
      "weather",
    ],
  },
  {
    id: "2",
    name: "Upload Images",
    fields: ["photograph_id"],
  },
];

export const ProjectReportSchema = z.object({
  report_type: z.enum(["Daily", "Weekly", "Monthly"], {
    required_error: "Report type required",
  }),
  project_name: z.string().optional(),
  project_supervisor: z.string().optional(),
  report_summary: z.string().optional(),
  challenges: z.string().optional(),
  solutions: z.string().optional(),
  recommendation: z.string().optional(),
  weekly_projection: z.string().optional(),
  materials_required_for_projection: z.string().optional(),
  equipment_on_site: z.string().optional(),
  materials_on_site: z.string().optional(),
  visitors: z.string().optional(),
  weather: z.string().optional(),
  photograph_id: z.array(z.string()).optional(),
});

export type ProjectReportFormType = z.infer<typeof ProjectReportSchema>;
