"use client";

import { Watch } from "../types";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { Clock, TrendingUp } from "lucide-react";

interface WatchCardProps {
  watch: Watch;
}

function StatusChip({ watch }: { watch: Watch }) {
  if (watch.runInProgress) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm bg-success-soft px-1.5 py-1 text-[10px] font-mono font-semibold tracking-wider text-success uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-success status-dot--running" />
        ACTIVE
      </span>
    );
  }
  if (!watch.active) {
    return (
      <span className="rounded-sm bg-surface-inset px-1.5 py-1 text-[10px] font-mono font-medium tracking-wider text-ink-faint uppercase">
        PAUSED
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-surface-inset px-1.5 py-1 text-[10px] font-mono font-medium tracking-wider text-ink-muted uppercase">
      <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
      MONITORING
    </span>
  );
}

function formatLastRun(date: Date | string | null | undefined): string {
  if (!date) return "Never run";
  const d = new Date(date);
  const now = Date.now();
  const diff = now - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function WatchCard({ watch }: WatchCardProps) {
  const router = useRouter();
  const findingCount = watch._count?.findings ?? 0;

  return (
    <motion.div
      onClick={() => router.push(`/watches/${watch.id}`)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="workspace-panel group relative flex cursor-pointer flex-col gap-4 overflow-hidden p-5 transition-colors hover:border-hairline-strong"
    >
      <div className="flex items-center justify-between">
        <StatusChip watch={watch} />
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">{watch.frequency}</span>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base font-sans font-semibold text-ink leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {watch.topic}
        </h3>
        <p className="truncate font-mono text-[10px] text-ink-faint">{watch.searchQueries.length} query terms <span aria-hidden="true">·</span> threshold {watch.significanceThreshold}/10</p>
      </div>

      {/* Footer row */}
      <div className="mt-auto pt-3.5 border-t border-hairline flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-mono text-ink-faint" suppressHydrationWarning>
          <Clock className="w-3.5 h-3.5" />
          {formatLastRun(watch.lastRunAt)}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-ink-muted">
          <TrendingUp className="w-3.5 h-3.5 text-success" />
          <span className="font-semibold text-ink font-sans">{findingCount}</span>
          <span className="text-ink-faint text-[11px]">signals</span>
        </div>
      </div>
    </motion.div>
  );
}
