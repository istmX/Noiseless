import { WatchFormValues } from "../types";

export const WATCH_POLLING_INTERVAL_MS = 5000;

export const DEFAULT_WATCH_FORM_VALUES: WatchFormValues = {
  topic: "",
  searchQueries: [{ value: "" }],
  frequency: "daily",
  significanceThreshold: 5,
  notificationEmail: "",
  notificationSlackWebhook: "",
  active: true,
};

