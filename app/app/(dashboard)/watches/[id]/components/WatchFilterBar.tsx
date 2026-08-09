"use client";

import { Search, Calendar, List, Link as LinkIcon } from "lucide-react";
import { FilterPreset, FILTER_PRESETS } from "./constants";

interface WatchFilterBarProps {
  activePreset: FilterPreset;
  onPresetChange: (preset: FilterPreset) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeView: "links" | "detailed";
  onViewChange: (view: "links" | "detailed") => void;
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
  activeView,
  onViewChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: WatchFilterBarProps) {
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
      <div className="flex flex-wrap items-center gap-4">
        {/* Custom Date Range Picker */}
        <div className="flex items-center gap-2 bg-surface-inset p-1 rounded-md border border-hairline">
          <Calendar className="w-3.5 h-3.5 text-ink-faint ml-1" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="bg-transparent border-0 p-0 text-[11px] text-ink-body focus:ring-0 focus:outline-none w-[110px]"
          />
          <span className="text-[10px] text-ink-faint">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="bg-transparent border-0 p-0 text-[11px] text-ink-body focus:ring-0 focus:outline-none w-[110px]"
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-surface-inset p-0.5 rounded-md border border-hairline">
          <button
            onClick={() => onViewChange("links")}
            className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-sm transition-all ${
              activeView === "links"
                ? "bg-surface text-ink shadow-sm border border-hairline"
                : "text-ink-muted hover:text-ink border border-transparent"
            }`}
            title="Links Index View"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Links</span>
          </button>
          <button
            onClick={() => onViewChange("detailed")}
            className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium rounded-sm transition-all ${
              activeView === "detailed"
                ? "bg-surface text-ink shadow-sm border border-hairline"
                : "text-ink-muted hover:text-ink border border-transparent"
            }`}
            title="Detailed Timeline View"
          >
            <List className="w-3.5 h-3.5" />
            <span>Timeline</span>
          </button>
        </div>
      </div>
    </div>
  );
}
