"use client";

import { useMemo } from "react";
import { Finding } from "../findings/types";

interface WatchTimeScrubberProps {
  findings: Finding[];
  selectedStartDate: string;
  selectedEndDate: string;
  onSelectDateRange: (start: string, end: string) => void;
}

export function WatchTimeScrubber({
  findings,
  selectedStartDate,
  selectedEndDate,
  onSelectDateRange,
}: WatchTimeScrubberProps) {
  // Generate the last 30 days of data
  const daysData = useMemo(() => {
    const data = [];
    const offset = new Date().getTimezoneOffset() * 60000;
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const dateStr = new Date(date.getTime() - offset).toISOString().split("T")[0];
      
      // Count findings on this day
      const count = findings.filter((f) => {
        try {
          const fDateStr = new Date(f.publishedAt).toISOString().split("T")[0];
          return fDateStr === dateStr;
        } catch {
          return false;
        }
      }).length;

      data.push({
        dateStr,
        label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        count,
      });
    }
    return data;
  }, [findings]);

  // Find max count to scale bars
  const maxCount = useMemo(() => {
    const counts = daysData.map((d) => d.count);
    return Math.max(...counts, 1);
  }, [daysData]);

  return (
    <div className="flex flex-col gap-2 p-4 border border-hairline bg-surface rounded-lg">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-semibold text-ink-muted uppercase tracking-wider">
          Capture Activity (Last 30 Days)
        </span>
        {(selectedStartDate || selectedEndDate) && (
          <button
            onClick={() => onSelectDateRange("", "")}
            className="text-[10px] font-mono text-accent hover:underline"
          >
            Clear scrubber filter
          </button>
        )}
      </div>

      {/* Bar Chart Grid */}
      <div className="flex items-end justify-between gap-1 h-14 pt-2 border-b border-hairline">
        {daysData.map((day) => {
          const isSelected = selectedStartDate === day.dateStr && selectedEndDate === day.dateStr;
          const barHeightPercentage = (day.count / maxCount) * 100;
          
          return (
            <button
              key={day.dateStr}
              onClick={() => onSelectDateRange(day.dateStr, day.dateStr)}
              className="flex-1 flex flex-col items-center group relative focus:outline-none"
              title={`${day.label}: ${day.count} findings`}
            >
              {/* Bar */}
              <div
                style={{ height: `${Math.max(barHeightPercentage, 4)}%` }}
                className={`w-full rounded-t-sm transition-all ${
                  day.count === 0
                    ? "bg-hairline hover:bg-hairline-strong"
                    : isSelected
                    ? "bg-accent"
                    : "bg-accent-soft hover:bg-accent"
                }`}
              />

              {/* Tooltip */}
              <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block bg-surface-elevated text-ink text-[10px] font-mono px-2 py-0.5 rounded border border-hairline shadow-md whitespace-nowrap z-10">
                {day.label}: {day.count} {day.count === 1 ? "finding" : "findings"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between text-[9px] font-mono text-ink-faint px-1">
        <span>{daysData[0].label}</span>
        <span>{daysData[14].label}</span>
        <span>Today</span>
      </div>
    </div>
  );
}
