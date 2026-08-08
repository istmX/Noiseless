"use client";

import { motion } from "motion/react";
import { CreateWatchDialog } from "./CreateWatchDialog";

export function WatchesPageHeader({ hasWatches }: { hasWatches: boolean }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 relative z-10">
      <div className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-display font-semibold text-ink tracking-tight"
        >
          Market Monitoring
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-sm font-sans text-ink-muted max-w-xl"
        >
          Track topics, industries, and competitors. Your watches run in the background to automatically capture and surface significant updates.
        </motion.p>
      </div>
      
      {hasWatches && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <CreateWatchDialog />
        </motion.div>
      )}
    </div>
  );
}
