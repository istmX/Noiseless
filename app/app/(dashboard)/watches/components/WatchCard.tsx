"use client";

import { Watch } from "../types";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

interface WatchCardProps {
  watch: Watch;
  onSelect?: () => void;
}

export function WatchCard({ watch, onSelect }: WatchCardProps) {
  const router = useRouter();
  const isRunning = watch.runInProgress;
  const isPaused = !watch.active;
  
  let StatusBadge = (
    <span className="px-2.5 py-0.5 rounded-sm text-xs font-sans tracking-wide bg-success-soft text-success border border-hairline uppercase font-semibold">
      MONITORING
    </span>
  );
  
  if (isRunning) {
    StatusBadge = (
      <span className="px-2.5 py-0.5 rounded-sm text-xs font-sans tracking-wide bg-sidebar-active text-success border border-success/30 uppercase font-semibold animate-pulse">
        AGENT ACTIVE
      </span>
    );
  } else if (isPaused) {
    StatusBadge = (
      <span className="px-2.5 py-0.5 rounded-sm text-xs font-sans tracking-wide bg-surface-inset text-ink-muted border border-hairline uppercase font-semibold">
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group cursor-pointer flex flex-col bg-surface border border-hairline hover:border-success transition-colors duration-300 rounded-md p-4 shadow-xs gap-4"
    >
      <div className="flex items-center justify-between">
        {StatusBadge}
        <span className="text-xs font-mono uppercase text-ink-faint">
          {watch.frequency}
        </span>
      </div>

      <h3 className="text-base font-sans font-semibold text-ink group-hover:text-success transition-colors line-clamp-2 leading-snug">
        {watch.topic}
      </h3>

      <div className="mt-auto pt-3 border-t border-hairline flex items-center justify-between font-mono text-xs text-ink-muted">
        <span>Score: {watch.significanceThreshold}/10</span>
        <span className="bg-sidebar-active px-3 py-0.5 rounded-sm border border-hairline text-success font-sans font-semibold">
          {watch._count?.findings || 0} findings
        </span>
      </div>
    </motion.div>
  );
}
