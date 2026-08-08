"use client";

import { useState, useDeferredValue } from "react";
import { Watch } from "../types";
import { WatchCard } from "./WatchCard";
import { WatchRow } from "./WatchRow";
import { Eye, Search, LayoutGrid, List, X, ArrowUpRight, Clock, Hash, FileText } from "lucide-react";
import { CreateWatchDialog } from "./CreateWatchDialog";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";

interface WatchListProps {
  watches: Watch[];
}

export function WatchList({ watches }: WatchListProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);

  const filteredWatches = watches.filter((w) =>
    w.topic.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  if (!watches || watches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center max-w-md w-full"
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full" />
            <div className="relative w-16 h-16 bg-surface border border-hairline shadow-xs rounded-2xl flex items-center justify-center">
              <Eye className="w-7 h-7 text-ink" />
            </div>
          </div>
          
          <h2 className="text-xl font-display font-semibold text-ink mb-2 tracking-tight">
            No watches configured
          </h2>
          <p className="text-xs text-ink-muted mb-6 leading-relaxed">
            The background agent is currently idle. Create your first watch to begin monitoring topics, competitors, or keywords.
          </p>
          
          <div className="relative">
            <CreateWatchDialog />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Control Bar: Search and View Mode Toggles */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-hairline">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter watches by keyword..."
            className="w-full bg-surface-inset border border-hairline rounded-md pl-9 pr-8 py-2 text-xs font-sans text-ink placeholder:text-ink-muted focus:outline-none focus:border-ink transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink cursor-pointer p-0.5"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2">
          <div className="flex items-center bg-surface-inset border border-hairline rounded-lg p-1 relative">
            <button
              onClick={() => setViewMode("table")}
              className={`relative z-10 px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors ${
                viewMode === "table" ? "text-ink font-semibold" : "text-ink-muted hover:text-ink"
              }`}
              title="Table Matrix View"
            >
              {viewMode === "table" && (
                <motion.div
                  layoutId="view-toggle-pill"
                  className="absolute inset-0 bg-surface rounded-md shadow-xs border border-hairline"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <List className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Table</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`relative z-10 px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors ${
                viewMode === "grid" ? "text-ink font-semibold" : "text-ink-muted hover:text-ink"
              }`}
              title="Card Grid View"
            >
              {viewMode === "grid" && (
                <motion.div
                  layoutId="view-toggle-pill"
                  className="absolute inset-0 bg-surface rounded-md shadow-xs border border-hairline"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <LayoutGrid className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredWatches.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 text-center text-ink-muted text-xs font-mono"
        >
          No watches found matching &quot;{search}&quot;
        </motion.div>
      ) : viewMode === "table" ? (
        <div className="border border-hairline rounded-lg bg-surface overflow-hidden shadow-xs">
          <div className="hidden md:grid grid-cols-12 items-center bg-surface-inset border-b border-hairline py-2.5 px-5 text-xs font-mono uppercase tracking-widest text-ink-muted">
            <div className="col-span-5">Topic</div>
            <div className="col-span-2">Frequency</div>
            <div className="col-span-2">Threshold</div>
            <div className="col-span-2">Last Run</div>
            <div className="col-span-1 text-right">Findings</div>
          </div>
          <div className="divide-y divide-hairline">
            {filteredWatches.map((watch) => (
              <WatchRow
                key={watch.id}
                watch={watch}
                onSelect={() => setSelectedWatch(watch)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWatches.map((watch) => (
            <WatchCard
              key={watch.id}
              watch={watch}
              onSelect={() => setSelectedWatch(watch)}
            />
          ))}
        </div>
      )}

      {/* Side Preview Drawer */}
      <AnimatePresence>
        {selectedWatch && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedWatch(null)}
              className="fixed inset-0 bg-ink/30 backdrop-blur-xs z-40 cursor-pointer"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm sm:max-w-md bg-surface border-l border-hairline shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-hairline">
                  <span className="text-xs font-mono uppercase tracking-widest text-ink-muted">
                    Watch Quick Preview
                  </span>
                  <button
                    onClick={() => setSelectedWatch(null)}
                    className="p-1 rounded-md hover:bg-surface-inset text-ink-muted hover:text-ink cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${selectedWatch.runInProgress ? "bg-primary animate-pulse" : "bg-success"}`} />
                    <span className="text-xs font-mono uppercase tracking-wider text-ink-muted">
                      {selectedWatch.runInProgress ? "Agent Active" : selectedWatch.active ? "Monitoring" : "Paused"}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-semibold text-ink leading-snug">
                    {selectedWatch.topic}
                  </h3>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="bg-surface-inset p-3.5 rounded-md border border-hairline flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-ink-muted" />
                      <span className="text-xs font-sans text-ink-muted">Total Findings</span>
                    </div>
                    <span className="text-xs font-mono font-medium text-ink">
                      {selectedWatch._count?.findings || 0}
                    </span>
                  </div>

                  <div className="bg-surface-inset p-3.5 rounded-md border border-hairline flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-ink-muted" />
                      <span className="text-xs font-sans text-ink-muted">Frequency</span>
                    </div>
                    <span className="text-xs font-mono capitalize text-ink">
                      {selectedWatch.frequency}
                    </span>
                  </div>

                  <div className="bg-surface-inset p-3.5 rounded-md border border-hairline flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Hash className="w-4 h-4 text-ink-muted" />
                      <span className="text-xs font-sans text-ink-muted">Significance Threshold</span>
                    </div>
                    <span className="text-xs font-mono text-ink">
                      {selectedWatch.significanceThreshold} / 10
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-hairline">
                <button
                  onClick={() => router.push(`/watches/${selectedWatch.id}`)}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-on-primary py-2.5 px-4 rounded-md text-xs font-sans font-medium cursor-pointer transition-colors shadow-xs"
                >
                  <span>Open Full Watch Workstation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
