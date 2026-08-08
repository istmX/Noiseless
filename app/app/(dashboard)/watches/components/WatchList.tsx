"use client";

import { Watch } from "../types";
import { WatchCard } from "./WatchCard";
import { Eye } from "lucide-react";
import { CreateWatchDialog } from "./CreateWatchDialog";
import { motion } from "motion/react";

interface WatchListProps {
  watches: Watch[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

export function WatchList({ watches }: WatchListProps) {
  if (!watches || watches.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="w-16 h-16 bg-surface-inset rounded-full flex items-center justify-center mb-4">
          <Eye className="w-8 h-8 text-ink-muted" />
        </div>
        <h2 className="text-h2 font-sans font-semibold text-ink mb-2">No watches yet</h2>
        <p className="text-body text-ink-muted mb-6 max-w-sm">
          Create your first watch to start monitoring a topic.
        </p>
        <CreateWatchDialog />
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
    >
      {watches.map((watch) => (
        <WatchCard key={watch.id} watch={watch} />
      ))}
    </motion.div>
  );
}
