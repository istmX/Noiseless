"use client";

import { useState, useDeferredValue, useEffect } from "react";
import { createPortal } from "react-dom";
import { Watch } from "../types";
import { WatchCard } from "./WatchCard";
import { WatchRow } from "./WatchRow";
import { WatchForm } from "./WatchForm";
import { Button } from "@/shared/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Search, Grid, List, Sliders, Plus, X } from "lucide-react";

interface AllWatchesListProps {
  watches: Watch[];
}

export function AllWatchesList({ watches }: AllWatchesListProps) {
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const deferredSearchQuery = useDeferredValue(searchQuery.trim());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    setSearchQuery(""); // clear initial spacing value to trigger deferred search correctly
  }, []);

  const filteredWatches = watches.filter((watch) => {
    const isRunning = watch.runInProgress;
    const isPaused = !watch.active;
    const isMonitoring = watch.active && !watch.runInProgress;

    if (statusFilter === "MONITORING" && !isMonitoring) return false;
    if (statusFilter === "AGENT ACTIVE" && !isRunning) return false;
    if (statusFilter === "PAUSED" && !isPaused) return false;

    if (deferredSearchQuery) {
      const query = deferredSearchQuery.toLowerCase();
      const matchesTopic = watch.topic.toLowerCase().includes(query);
      const matchesQueries = watch.searchQueries.some((q) => q.toLowerCase().includes(query));
      if (!matchesTopic && !matchesQueries) return false;
    }

    return true;
  });

  const totalCount = watches.length;
  const activeCount = watches.filter((w) => w.active).length;
  const runningCount = watches.filter((w) => w.runInProgress).length;

  return (
    <div className="flex-1 w-full flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sans font-bold text-ink">Watches Workstation</h1>
          <p className="text-xs text-ink-muted mt-1">Manage and track all continuous monitoring streams.</p>
        </div>
        <Button 
          onClick={() => setIsCreateOpen(true)}
          className="bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium rounded-full px-4 py-2.5 shadow-sm transition-all flex items-center gap-2 cursor-pointer text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create Watch</span>
        </Button>
      </div>

      {totalCount === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] p-8 text-center max-w-md mx-auto border border-hairline bg-surface rounded-xl shadow-xs">
          <Sliders className="w-12 h-12 text-ink-faint mb-4" />
          <h2 className="text-xl font-sans font-semibold text-ink mb-2">Create Your First Watch</h2>
          <p className="text-sm text-ink-muted mb-6">
            Get started by creating your first Watch. We will monitor your topic and score significance.
          </p>
          <Button 
            onClick={() => setIsCreateOpen(true)}
            className="bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium rounded-full px-6 py-3 shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Create Watch</span>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface border border-hairline rounded-xl p-4 flex flex-col justify-between shadow-xs">
              <span className="text-[10px] font-mono uppercase text-ink-muted">Total Monitors</span>
              <span className="text-2xl font-bold text-ink mt-2">{totalCount}</span>
            </div>
            <div className="bg-surface border border-hairline rounded-xl p-4 flex flex-col justify-between shadow-xs">
              <span className="text-[10px] font-mono uppercase text-ink-muted">Active Streamers</span>
              <span className="text-2xl font-bold text-ink mt-2">{activeCount}</span>
            </div>
            <div className="bg-surface border border-hairline rounded-xl p-4 flex flex-col justify-between shadow-xs">
              <span className="text-[10px] font-mono uppercase text-ink-muted">Running Agents</span>
              <span className="text-2xl font-bold text-ink mt-2">{runningCount}</span>
            </div>
          </div>

          <div className="bg-surface border border-hairline rounded-xl p-6 shadow-xs flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-hairline">
              <div className="flex flex-wrap items-center gap-2">
                {["ALL", "MONITORING", "AGENT ACTIVE", "PAUSED"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-1 text-xs font-sans font-semibold rounded-full border transition-all cursor-pointer ${
                      statusFilter === status
                        ? "bg-primary text-on-primary border-primary"
                        : "bg-surface-inset text-ink-muted border-hairline hover:text-ink"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search watches..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-1.5 text-xs bg-surface-inset border border-hairline rounded-full focus:border-primary focus:outline-hidden w-[200px] transition-all font-sans text-ink"
                  />
                </div>

                <div className="flex items-center border border-hairline rounded-full bg-surface-inset overflow-hidden p-0.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-full cursor-pointer transition-colors ${viewMode === "grid" ? "bg-primary text-on-primary" : "text-ink-muted hover:text-ink"}`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-full cursor-pointer transition-colors ${viewMode === "list" ? "bg-primary text-on-primary" : "text-ink-muted hover:text-ink"}`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {filteredWatches.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <Sliders className="w-10 h-10 text-ink-faint mb-3" />
                <h3 className="text-base font-sans font-semibold text-ink mb-1">No matching watches found</h3>
                <p className="text-xs text-ink-muted max-w-sm">Try adjusting your filters or search query.</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWatches.map((watch) => (
                  <WatchCard key={watch.id} watch={watch} />
                ))}
              </div>
            ) : (
              <div className="border border-hairline rounded-xl divide-y divide-hairline overflow-hidden bg-surface">
                {filteredWatches.map((watch) => (
                  <WatchRow key={watch.id} watch={watch} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {mounted && typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {isCreateOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsCreateOpen(false)}
                    className="fixed inset-0 bg-ink/30 backdrop-blur-xs z-50 cursor-pointer"
                  />
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 250 }}
                    className="fixed right-0 top-0 h-full w-full md:w-[520px] bg-surface border-l border-hairline shadow-high flex flex-col gap-6 p-6 z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-hairline bg-primary-soft -mx-6 -mt-6 p-6">
                      <h2 className="text-xl font-sans font-semibold text-ink">Create New Watch</h2>
                      <button 
                        onClick={() => setIsCreateOpen(false)}
                        className="p-1 hover:bg-primary/10 rounded-full text-ink-muted hover:text-ink transition-colors cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto overflow-x-hidden pr-1 scrollbar-hide">
                      <WatchForm onSuccess={() => setIsCreateOpen(false)} />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>,
            document.body
          )
        : null}
    </div>
  );
}
