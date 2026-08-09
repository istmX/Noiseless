"use client";

import { Search, Grid, List } from "lucide-react";

export type StatusFilter = "ALL" | "MONITORING" | "AGENT ACTIVE" | "PAUSED";
export type ViewMode = "grid" | "list";

const STATUS_FILTERS: StatusFilter[] = ["ALL", "MONITORING", "AGENT ACTIVE", "PAUSED"];

interface WatchFiltersProps {
  statusFilter: StatusFilter;
  searchQuery: string;
  viewMode: ViewMode;
  onStatusChange: (status: StatusFilter) => void;
  onSearchChange: (query: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export function WatchFilters({
  statusFilter,
  searchQuery,
  viewMode,
  onStatusChange,
  onSearchChange,
  onViewModeChange,
}: WatchFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-hairline">
      {/* Status Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {STATUS_FILTERS.map((status) => {
          const isActive = statusFilter === status;
          return (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-3 py-1 text-xs font-sans font-medium rounded-md border transition-colors cursor-pointer ${
                isActive
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-inset text-ink-muted border-hairline hover:text-ink hover:border-hairline-strong"
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>

      {/* Search + View Toggle */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-ink-faint absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search watches…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs bg-surface-inset border border-hairline rounded-md focus:border-primary focus:outline-none w-[180px] transition-colors font-sans text-ink placeholder:text-ink-faint"
          />
        </div>

        <div className="flex items-center border border-hairline rounded-md bg-surface-inset overflow-hidden p-0.5">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-1.5 rounded-sm cursor-pointer transition-colors ${
              viewMode === "grid" ? "bg-primary text-on-primary" : "text-ink-muted hover:text-ink"
            }`}
            title="Grid View"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-1.5 rounded-sm cursor-pointer transition-colors ${
              viewMode === "list" ? "bg-primary text-on-primary" : "text-ink-muted hover:text-ink"
            }`}
            title="List View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
