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
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[11px] font-sans font-semibold tracking-wide bg-success-soft text-success border border-success/20 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        Active
      </span>
    );
  }
  if (!watch.active) {
    return (
      <span className="px-2 py-0.5 rounded-sm text-[11px] font-sans font-semibold tracking-wide bg-surface-inset text-ink-faint border border-hairline uppercase">
        Paused
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 rounded-sm text-[11px] font-sans font-semibold tracking-wide bg-surface-inset text-ink-muted border border-hairline uppercase">
      Monitoring
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group cursor-pointer flex flex-col bg-surface border border-hairline hover:border-hairline-strong rounded-md p-4 gap-3 transition-colors duration-150"
    >
      {/* Top row: status + frequency */}
      <div className="flex items-center justify-between">
        <StatusChip watch={watch} />
        <span className="text-[10px] font-mono text-ink-faint uppercase tracking-widest">
          {watch.frequency}
        </span>
      </div>

      {/* Topic */}
      <h3 className="text-sm font-sans font-semibold text-ink leading-snug line-clamp-2 group-hover:text-success transition-colors duration-150">
        {watch.topic}
      </h3>

      {/* Footer row */}
      <div className="mt-auto pt-3 border-t border-hairline flex items-center justify-between">
        <div className="flex items-center gap-1 text-[11px] font-mono text-ink-faint" suppressHydrationWarning>
          <Clock className="w-3 h-3" />
          {formatLastRun(watch.lastRunAt)}
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-ink-muted">
          <TrendingUp className="w-3 h-3 text-success" />
          <span className="font-semibold text-ink">{findingCount}</span>
          <span className="text-ink-faint">findings</span>
        </div>
      </div>
    </motion.div>
  );
}
