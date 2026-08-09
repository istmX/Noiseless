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
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[10px] font-mono font-medium tracking-wide bg-success-soft text-success border border-success/20 uppercase shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        Active
      </span>
    );
  }
  if (!watch.active) {
    return (
      <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-medium tracking-wide bg-surface-inset text-ink-faint border border-hairline uppercase shrink-0">
        Paused
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-medium tracking-wide bg-surface-inset text-ink-muted border border-hairline uppercase shrink-0">
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
      className="group cursor-pointer grid grid-cols-12 items-center gap-4 py-3.5 px-5 hover:bg-surface-inset transition-colors duration-100"
    >
      {/* Topic + Status */}
      <div className="col-span-6 flex items-center gap-3 min-w-0">
        <StatusDot watch={watch} />
        <span className="font-sans text-sm font-medium text-ink truncate group-hover:text-success transition-colors duration-100">
          {watch.topic}
        </span>
      </div>

      {/* Frequency */}
      <div className="col-span-2 hidden md:flex items-center">
        <span className="text-[11px] font-mono text-ink-muted uppercase tracking-widest">
          {watch.frequency}
        </span>
      </div>

      {/* Score */}
      <div className="col-span-2 hidden md:flex items-center">
        <span className="text-[11px] font-mono text-ink-muted">
          {watch.significanceThreshold} / 10
        </span>
      </div>

      {/* Findings count + arrow */}
      <div className="col-span-2 flex items-center justify-end gap-2">
        <span className="text-[11px] font-mono font-medium text-ink bg-surface-inset px-2 py-0.5 border border-hairline rounded-sm">
          {watch._count?.findings ?? 0}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-ink-faint group-hover:text-ink group-hover:translate-x-0.5 transition-all" />
      </div>
    </motion.div>
  );
}
