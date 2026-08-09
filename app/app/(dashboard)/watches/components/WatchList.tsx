"use client";

import { useState, useDeferredValue, useEffect } from "react";
import { createPortal } from "react-dom";
import { Watch } from "../types";
import { WatchCard } from "./WatchCard";
import { WatchRow } from "./WatchRow";
import { WatchListHeader } from "./WatchListHeader";
import { WatchMetrics } from "./WatchMetrics";
import { WatchFilters, StatusFilter, ViewMode } from "./WatchFilters";
import { WatchForm } from "./WatchForm";
import { useAuthStore } from "@/shared/hooks/useAuthStore";
import { Eye, Plus, Sliders } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/shared/components/ui/button";
import { X } from "lucide-react";

interface WatchListProps {
  watches: Watch[];
}

function applyFilters(
  watches: Watch[],
  statusFilter: StatusFilter,
  query: string
): Watch[] {
  return watches.filter((watch) => {
    const isRunning = watch.runInProgress;
    const isPaused = !watch.active;
    const isMonitoring = watch.active && !watch.runInProgress;

    if (statusFilter === "MONITORING" && !isMonitoring) return false;
    if (statusFilter === "AGENT ACTIVE" && !isRunning) return false;
    if (statusFilter === "PAUSED" && !isPaused) return false;

    if (query) {
      const q = query.toLowerCase();
      const matchesTopic = watch.topic.toLowerCase().includes(q);
      const matchesQueries = watch.searchQueries.some((sq) => sq.toLowerCase().includes(q));
      if (!matchesTopic && !matchesQueries) return false;
    }

    return true;
  });
}

export function WatchList({ watches }: WatchListProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const userName = useAuthStore((s) => s.userName);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredWatches = applyFilters(watches, statusFilter, deferredSearch);

  if (watches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
        <Eye className="w-10 h-10 text-ink-faint" />
        <div>
          <h2 className="text-lg font-sans font-semibold text-ink">No watches yet</h2>
          <p className="text-sm text-ink-muted mt-1 max-w-xs">
            Create your first watch to start monitoring a topic.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium rounded-md px-5 py-2 text-sm flex items-center gap-2 cursor-pointer mt-2"
        >
          <Plus className="w-4 h-4" />
          Create Watch
        </Button>

        {mounted && typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {isCreateOpen && <CreateDrawer onClose={() => setIsCreateOpen(false)} />}
            </AnimatePresence>,
            document.body
          )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <WatchListHeader
        userName={userName}
        hasWatches={watches.length > 0}
        onCreateClick={() => setIsCreateOpen(true)}
      />

      <WatchMetrics watches={watches} filteredCount={filteredWatches.length} />

      <div className="bg-surface border border-hairline rounded-md">
        <div className="p-4 border-b border-hairline">
          <WatchFilters
            statusFilter={statusFilter}
            searchQuery={searchQuery}
            viewMode={viewMode}
            onStatusChange={setStatusFilter}
            onSearchChange={setSearchQuery}
            onViewModeChange={setViewMode}
          />
        </div>

        <div className="p-4">
          {filteredWatches.length === 0 ? (
            <div className="py-12 flex flex-col items-center gap-3 text-center">
              <Sliders className="w-8 h-8 text-ink-faint" />
              <p className="text-sm font-sans font-semibold text-ink">No matching watches</p>
              <p className="text-xs text-ink-muted max-w-xs">
                Try adjusting your status filter or search query.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredWatches.map((watch) => (
                <WatchCard key={watch.id} watch={watch} />
              ))}
            </div>
          ) : (
            <div className="border border-hairline rounded-md divide-y divide-hairline overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-2 bg-surface-inset text-[10px] font-mono uppercase tracking-widest text-ink-faint">
                <div className="col-span-6">Watch</div>
                <div className="col-span-2">Frequency</div>
                <div className="col-span-2">Score</div>
                <div className="col-span-2 text-right">Findings</div>
              </div>
              {filteredWatches.map((watch) => (
                <WatchRow key={watch.id} watch={watch} />
              ))}
            </div>
          )}
        </div>
      </div>

      {mounted && typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isCreateOpen && <CreateDrawer onClose={() => setIsCreateOpen(false)} />}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

function CreateDrawer({ onClose }: { onClose: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-ink/25 backdrop-blur-sm z-50 cursor-pointer"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 26, stiffness: 260 }}
        className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-surface border-l border-hairline shadow-high flex flex-col z-50"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline bg-surface-inset shrink-0">
          <h2 className="text-base font-sans font-semibold text-ink">Create New Watch</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-surface rounded-md text-ink-muted hover:text-ink transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-5 scrollbar-hide">
          <WatchForm onSuccess={onClose} />
        </div>
      </motion.div>
    </>
  );
}
