"use client";

import { Watch } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Pause, Check } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export function WatchCard({ watch }: { watch: Watch }) {
  const isRunning = watch.runInProgress;
  const isPaused = !watch.active;
  
  let statusText = "Active";
  let statusClass = "text-success bg-success/10 border-success/20";
  let StatusIcon = Check;
  
  if (isRunning) {
    statusText = "Running";
    statusClass = "text-primary bg-primary/10 border-primary/20";
    StatusIcon = Activity;
  } else if (isPaused) {
    statusText = "Paused";
    statusClass = "text-warning bg-warning/10 border-warning/20";
    StatusIcon = Pause;
  }

  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.01, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      whileTap={{ scale: 0.99 }}
      className="group cursor-pointer relative flex flex-col bg-surface border border-hairline rounded-2xl px-6 py-8 hover:border-hairline-strong transition-all duration-300 hover:shadow-high overflow-hidden"
    >
      
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top Section: Status and Title */}
      <div className="flex flex-col items-start mb-8 relative z-10">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={statusText}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${statusClass} mb-5 backdrop-blur-md`}
          >
            <StatusIcon className={`w-3.5 h-3.5 ${isRunning ? 'animate-pulse' : ''}`} />
            <span className="text-label uppercase tracking-widest font-semibold text-[10px]">{statusText}</span>
          </motion.div>
        </AnimatePresence>
        <h2 className="text-h2 font-sans font-bold text-ink line-clamp-2 leading-tight tracking-tight group-hover:text-primary transition-colors duration-300" title={watch.topic}>
          {watch.topic}
        </h2>
      </div>

      {/* Center Section: Hero Metric */}
      <div className="flex items-baseline gap-2 mb-10 relative z-10">
        <motion.span 
          initial={false}
          className="text-5xl leading-none font-mono font-bold text-ink tracking-tighter"
        >
          {watch._count?.findings || 0}
        </motion.span>
        <span className="text-body-sm text-ink-muted uppercase tracking-widest font-semibold">Findings</span>
      </div>

      {/* Bottom Section: Metadata */}
      <div className="flex flex-wrap items-center justify-between mt-auto pt-6 border-t border-hairline/60 gap-4 relative z-10">
        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-ink-muted uppercase tracking-widest font-semibold">Frequency</span>
            <span className="text-body-sm text-ink capitalize font-sans font-medium">{watch.frequency}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-ink-muted uppercase tracking-widest font-semibold">Threshold</span>
            <span className="text-body-sm text-ink font-mono font-medium">{watch.significanceThreshold}/10</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5 text-left sm:text-right">
          <span className="text-[10px] text-ink-muted uppercase tracking-widest font-semibold">Last Run</span>
          <span className="text-body-sm text-ink-muted font-mono truncate">
            {watch.lastRunAt ? new Date(watch.lastRunAt).toLocaleDateString() : "Never"}
          </span>
        </div>
      </div>
      
    </motion.div>
  );
}
