export type FilterPreset = "today" | "yesterday" | "week" | "all";

export interface PresetOption {
  value: FilterPreset;
  label: string;
}

export const FILTER_PRESETS: PresetOption[] = [
  { value: "all", label: "All time" },
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "week", label: "Last 7 days" }
];
