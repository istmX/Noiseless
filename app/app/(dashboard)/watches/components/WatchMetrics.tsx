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
  indicatorColor: string;
}

function MetricBar({ label, value, total, indicatorColor }: MetricBarProps) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="bg-surface/80 backdrop-blur-md border border-hairline rounded-xl p-4.5 flex flex-col justify-between gap-3 shadow-low hover:border-hairline-strong hover:shadow-medium transition-all group">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-ink-muted flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${indicatorColor} animate-pulse`} />
          {label}
        </span>
        <span className="text-[11px] font-mono text-ink-faint bg-surface-inset px-2 py-0.5 rounded-md border border-hairline">
          {percentage}%
        </span>
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <span className="text-2xl font-sans font-bold text-ink tracking-tight group-hover:text-accent transition-colors">
          {value}
          <span className="text-xs font-normal text-ink-faint ml-1.5">/ {total}</span>
        </span>
      </div>

      <div className="w-full bg-surface-inset h-1.5 rounded-full overflow-hidden border border-hairline/50 p-0.5">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
      <MetricBar
        label="ACTIVE WATCHES"
        value={activeCount}
        total={totalCount}
        indicatorColor="bg-success"
      />
      <MetricBar
        label="AGENTS RUNNING"
        value={runningCount}
        total={totalCount}
        indicatorColor="bg-accent"
      />
      <MetricBar
        label="TIMEFRAME MATCHES"
        value={filteredCount}
        total={totalCount}
        indicatorColor="bg-amber-500"
      />
    </div>
  );
}
