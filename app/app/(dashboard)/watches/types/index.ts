import { z } from "zod";

export interface Watch {
  id: string;
  userId: string;
  topic: string;
  searchQueries: string[];
  frequency: string;
  significanceThreshold: number;
  notificationEmail: string | null;
  notificationSlackWebhook: string | null;
  lastRunAt: Date | null;
  runInProgress: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    findings: number;
    digests: number;
  };
}

export const watchFormSchema = z.object({
  topic: z.string().min(1, "Topic is required").max(100, "Topic is too long"),
  searchQueries: z
    .array(
      z.object({
        value: z.string().min(1, "Search query cannot be empty"),
      })
    )
    .min(1, "At least one search query is required"),
  frequency: z.enum(["hourly", "daily", "weekly"]),
  significanceThreshold: z.number().min(1).max(10),
  notificationEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  notificationSlackWebhook: z.string().url("Invalid Slack webhook URL").optional().or(z.literal("")),
  active: z.boolean(),
});

export type WatchFormValues = z.infer<typeof watchFormSchema>;

