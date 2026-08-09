"use client";

import { Watch } from "../types";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface WatchRowProps {
  watch: Watch;
}

function StatusDot({ watch }: { watch: Watch }) {
  if (watch.runInProgress) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm bg-success-soft px-1.5 py-1 text-[10px] font-mono font-medium tracking-wide text-success uppercase shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-success status-dot--running" />
        Active
      </span>
    );
  }
  if (!watch.active) {
    return (
      <span className="rounded-sm bg-surface-inset px-1.5 py-1 text-[10px] font-mono font-medium tracking-wide text-ink-faint uppercase shrink-0">
        Paused
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-surface-inset px-1.5 py-1 text-[10px] font-mono font-medium tracking-wide text-ink-muted uppercase shrink-0">
      <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
      Monitoring
    </span>
  );
}

export function WatchRow({ watch }: WatchRowProps) {
  const router = useRouter();

  return (
    <motion.div
      onClick={() => router.push(`/watches/${watch.id}`)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className="group cursor-pointer transition-colors duration-150"
    >
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-12 items-center gap-4 border border-transparent px-5 py-3 hover:border-hairline hover:bg-surface-inset">
        {/* Topic + Status */}
        <div className="col-span-6 flex items-center gap-3 min-w-0">
          <StatusDot watch={watch} />
          <span className="truncate font-sans text-sm font-medium text-ink transition-colors group-hover:text-accent">
            {watch.topic}
          </span>
        </div>

        {/* Frequency */}
        <div className="col-span-2 flex items-center">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            {watch.frequency}
          </span>
        </div>

        {/* Threshold */}
        <div className="col-span-2 flex items-center">
          <span className="text-[11px] font-mono text-ink-muted">
            Thresh: {watch.significanceThreshold}/10
          </span>
        </div>

        {/* Findings count + arrow */}
        <div className="col-span-2 flex items-center justify-end gap-2">
          <span className="font-mono text-[11px] font-semibold text-ink">
            {watch._count?.findings ?? 0}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-ink-faint group-hover:text-ink group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>

      {/* Mobile Layout (Stacked Card) */}
      <div className="flex md:hidden flex-col gap-2 p-4 border-b border-hairline hover:bg-surface-inset">
        <div className="flex items-center justify-between gap-2">
          <span className="font-sans text-sm font-medium text-ink transition-colors group-hover:text-accent truncate">
            {watch.topic}
          </span>
          <StatusDot watch={watch} />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted">
          <span>{watch.frequency} · Thresh: {watch.significanceThreshold}/10</span>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-ink">{watch._count?.findings ?? 0}</span>
            <span className="text-[10px] text-ink-faint">signals</span>
            <ChevronRight className="w-3.5 h-3.5 text-ink-faint" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
