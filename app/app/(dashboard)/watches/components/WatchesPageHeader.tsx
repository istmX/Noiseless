"use client";

import { motion } from "motion/react";
import { CreateWatchDialog } from "./CreateWatchDialog";

export function WatchesPageHeader({ hasWatches }: { hasWatches: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10"
    >
      <div className="space-y-3">
        <motion.h1 
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-display font-[family-name:var(--font-display)] font-semibold text-ink tracking-tight"
        >
          Market Monitoring
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-body text-ink-muted max-w-xl leading-relaxed"
        >
          Track topics, industries, and competitors. Your watches run in the background to automatically capture and surface significant updates.
        </motion.p>
      </div>
      
      {hasWatches && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <CreateWatchDialog />
        </motion.div>
      )}
    </motion.div>
  );
}
