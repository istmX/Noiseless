"use client";

import { Search, Calendar, List, Link as LinkIcon } from "lucide-react";
import { FilterPreset, FILTER_PRESETS } from "./constants";

interface WatchFilterBarProps {
  activePreset: FilterPreset;
  onPresetChange: (preset: FilterPreset) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
}

export function WatchFilterBar({
  activePreset,
  onPresetChange,
  searchQuery,
  onSearchChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: WatchFilterBarProps) {
  const formatDateDisplay = (dateStr: string, placeholder: string) => {
    if (!dateStr) return placeholder;
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const d = new Date(year, month, day);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        }
      }
      const d = new Date(dateStr + "T00:00:00");
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-hairline bg-surface rounded-lg">
      {/* Search and preset filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative min-w-[200px] flex-1 sm:flex-initial">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-ink-faint" />
          <input
            type="text"
            placeholder="Search findings..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-surface-inset border border-hairline rounded-md text-ink focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Preset Selector */}
        <div className="flex items-center bg-surface-inset p-0.5 rounded-md border border-hairline">
          {FILTER_PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => onPresetChange(preset.value)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-sm transition-all ${
                activePreset === preset.value
                  ? "bg-surface text-ink shadow-sm border border-hairline"
                  : "text-ink-muted hover:text-ink border border-transparent"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Date picker inputs and View Toggle */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Custom Date Range Picker */}
        <div className="flex items-center gap-2">
          {/* Start Date Container */}
          <div className="relative flex items-center gap-2 bg-surface-inset px-2.5 py-1.5 rounded-md border border-hairline hover:border-hairline-strong transition-colors min-w-[130px] h-[28px]">
            <Calendar className="w-3.5 h-3.5 text-ink-faint shrink-0" />
            <span className="text-[11px] text-ink-body font-mono leading-none">
              {formatDateDisplay(startDate, "Start date")}
            </span>
            <input
              type="date"
              value={startDate}
              aria-label="Start date"
              onChange={(e) => onStartDateChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <span className="text-[10px] text-ink-faint font-mono">to</span>

          {/* End Date Container */}
          <div className="relative flex items-center gap-2 bg-surface-inset px-2.5 py-1.5 rounded-md border border-hairline hover:border-hairline-strong transition-colors min-w-[130px] h-[28px]">
            <Calendar className="w-3.5 h-3.5 text-ink-faint shrink-0" />
            <span className="text-[11px] text-ink-body font-mono leading-none">
              {formatDateDisplay(endDate, "End date")}
            </span>
            <input
              type="date"
              value={endDate}
              aria-label="End date"
              onChange={(e) => onEndDateChange(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
