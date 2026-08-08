"use client";

import { Watch } from "../types";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface WatchRowProps {
  watch: Watch;
  onSelect?: () => void;
}

export function WatchRow({ watch, onSelect }: WatchRowProps) {
  const router = useRouter();
  const isRunning = watch.runInProgress;
  const isPaused = !watch.active;
  
  let StatusBadge = (
    <span className="px-2 py-0.5 rounded text-xs font-mono tracking-wider bg-surface-inset text-ink border border-hairline uppercase font-medium shrink-0">
      MONITORING
    </span>
  );
  
  if (isRunning) {
    StatusBadge = (
      <span className="px-2 py-0.5 rounded text-xs font-mono tracking-wider bg-primary-soft text-primary border border-primary/20 uppercase font-medium animate-pulse shrink-0">
        AGENT ACTIVE
      </span>
    );
  } else if (isPaused) {
    StatusBadge = (
      <span className="px-2 py-0.5 rounded text-xs font-mono tracking-wider bg-surface-inset text-ink-faint border border-hairline uppercase font-medium shrink-0">
        PAUSED
      </span>
    );
  }

  const handleClick = () => {
    if (onSelect) {
      onSelect();
    } else {
      router.push(`/watches/${watch.id}`);
    }
  };

  return (
    <motion.div 
      onClick={handleClick}
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer grid grid-cols-1 md:grid-cols-12 items-center gap-4 py-4 px-6 hover:bg-surface-inset/80 transition-colors duration-150 text-xs font-sans"
    >
      <div className="col-span-1 md:col-span-5 flex items-center gap-3 min-w-0 pr-4">
        {StatusBadge}
        <h2 className="font-sans font-medium text-ink truncate group-hover:text-primary transition-colors">
          {watch.topic}
        </h2>
      </div>

      <div className="hidden md:flex col-span-2 items-center">
        <span className="uppercase tracking-wider text-xs font-mono text-ink-muted">{watch.frequency}</span>
      </div>
      
      <div className="hidden md:flex col-span-2 items-center">
        <span className="font-mono text-xs text-ink-muted">{watch.significanceThreshold} / 10</span>
      </div>
      
      <div className="hidden md:flex col-span-2 items-center">
        <span className="font-mono text-xs text-ink-muted truncate" suppressHydrationWarning>
          {watch.lastRunAt 
            ? new Date(watch.lastRunAt).toISOString().split('T')[0] 
            : "Never"}
        </span>
      </div>
      
      <div className="hidden md:flex col-span-1 items-center justify-end gap-2">
        <span className="font-mono text-xs font-medium text-ink bg-surface-inset px-2.5 py-1 border border-hairline rounded">
          {watch._count?.findings || 0}
        </span>
        <ChevronRight className="w-4 h-4 text-ink-faint group-hover:text-ink group-hover:translate-x-0.5 transition-all" />
      </div>
    </motion.div>
  );
}
