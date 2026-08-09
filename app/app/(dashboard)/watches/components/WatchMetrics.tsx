"use client";

import { Watch } from "../types";

interface WatchMetricsProps {
  watches: Watch[];
  filteredCount: number;
}

interface MetricBarProps {
  label: string;
  value: number;
  total: number;
  color: "success" | "primary" | "pulse";
}

function MetricBar({ label, value, total, color }: MetricBarProps) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  const barColor =
    color === "success"
      ? "bg-success"
      : color === "primary"
      ? "bg-primary"
      : "bg-success";

  return (
    <div className="bg-surface-inset border border-hairline rounded-lg p-4 flex flex-col gap-3">
      <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted">
        {label}
      </span>
      <div className="flex items-end justify-between">
        <span className="text-xl font-sans font-semibold text-ink">
          {value}
          <span className="text-sm font-normal text-ink-muted ml-1">/ {total}</span>
        </span>
        <span className="text-xs font-mono text-ink-faint">{percentage}%</span>
      </div>
      <div className="w-full bg-hairline h-1 rounded-full overflow-hidden">
        <div
          className={`${barColor} h-full rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function WatchMetrics({ watches, filteredCount }: WatchMetricsProps) {
  const totalCount = watches.length;
  const activeCount = watches.filter((w) => w.active).length;
  const runningCount = watches.filter((w) => w.runInProgress).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <MetricBar label="Active watches" value={activeCount} total={totalCount} color="success" />
      <MetricBar label="Agent running" value={runningCount} total={totalCount} color="primary" />
      <MetricBar label="In timeframe" value={filteredCount} total={totalCount} color="pulse" />
    </div>
  );
}
