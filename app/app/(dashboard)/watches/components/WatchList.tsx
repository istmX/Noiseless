"use client";
 
import { useState, useDeferredValue, useEffect } from "react";
import { createPortal } from "react-dom";
import { Watch } from "../types";
import { WatchCard } from "./WatchCard";
import { WatchRow } from "./WatchRow";
import { 
  Calendar as CalendarIcon, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Activity, 
  Search,
  Grid,
  List,
  Sliders,
  CheckCircle,
  AlertCircle,
  Plus,
  X
} from "lucide-react";
import { WatchForm } from "./WatchForm";
import { Button } from "@/shared/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useAuthStore } from "@/shared/hooks/useAuthStore";
 
interface WatchListProps {
  watches: Watch[];
}

const getDynamicFindingsCount = (watch: Watch, selectedDay: number) => {
  const watchDay = new Date(watch.createdAt).getDate();
  if (selectedDay > 8) return 0;
  if (watchDay > selectedDay) return 0;
  
  const totalFindings = watch._count?.findings || 0;
  const daysDiff = 8 - watchDay;
  if (daysDiff <= 0) return totalFindings;
  
  const selectedDiff = selectedDay - watchDay;
  const fraction = selectedDiff / daysDiff;
  return Math.max(0, Math.min(totalFindings, Math.round(totalFindings * fraction)));
};
 
export function WatchList({ watches }: WatchListProps) {
  const [selectedDate, setSelectedDate] = useState<number>(8); // Highlighted August 8th
  const [statusFilter, setStatusFilter] = useState<string>("ALL"); // ALL, MONITORING, AGENT ACTIVE, PAUSED
  const [searchQuery, setSearchQuery] = useState<string>("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
 
  // Generate simple day grid for August 2026 (Starts on Saturday, August 1st)
  const daysInMonth = 31;
  const calendarDays = [];
  
  // Previous month padding
  for (let i = 27; i <= 31; i++) {
    calendarDays.push({ day: i, isCurrentMonth: false });
  }
  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, isCurrentMonth: true });
  }
  // Next month padding
  for (let i = 1; i <= 6; i++) {
    calendarDays.push({ day: i, isCurrentMonth: false });
  }

  // Filter watches based on status, search, and date
  // Changing date updates the list of watches by showing watches created on or before that date
  const filteredWatches = watches.filter((watch) => {
    // 1. Status Filter
    const isRunning = watch.runInProgress;
    const isPaused = !watch.active;
    const isMonitoring = watch.active && !watch.runInProgress;

    if (statusFilter === "MONITORING" && !isMonitoring) return false;
    if (statusFilter === "AGENT ACTIVE" && !isRunning) return false;
    if (statusFilter === "PAUSED" && !isPaused) return false;

    // 2. Search Query Filter
    if (deferredSearchQuery) {
      const query = deferredSearchQuery.toLowerCase();
      const matchesTopic = watch.topic.toLowerCase().includes(query);
      const matchesQueries = watch.searchQueries.some((q) => q.toLowerCase().includes(query));
      if (!matchesTopic && !matchesQueries) return false;
    }

    // 3. Date Filter (simulating activity or creation limit for August 2026)
    if (selectedDate > 8) return false; // Future date is empty

    const watchDay = new Date(watch.createdAt).getDate();
    // If watch is created in the current month, only show if day is <= selectedDate
    if (watchDay > selectedDate) return false;

    return true;
  });

  // Percentage calculations
  const totalCount = watches.length;
  const activeCount = watches.filter((w) => w.active).length;
  const runningCount = watches.filter((w) => w.runInProgress).length;
  
  const activePercentage = totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0;
  const runningPercentage = totalCount > 0 ? Math.round((runningCount / totalCount) * 100) : 0;
  
  // Calculate percentage of matching watches
  const matchPercentage = totalCount > 0 ? Math.round((filteredWatches.length / totalCount) * 100) : 0;

  const userName = useAuthStore((state) => state.userName);

  return (
    <div className="flex w-full gap-8 relative items-start">
      {/* Left side: Main dashboard content */}
      <div className="flex-1 min-w-0 flex flex-col gap-8">
        {/* Hello Analyst Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-sans font-bold text-ink">Hello {userName}</h1>
          <div className="flex items-center gap-3">
            {totalCount > 0 && (
              <Button 
                onClick={() => setIsCreateOpen(true)}
                className="bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium rounded-full px-4 py-2.5 shadow-sm transition-all flex items-center gap-2 cursor-pointer text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create Watch</span>
              </Button>
            )}
          </div>
        </div>

        {totalCount === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] p-8 text-center max-w-md mx-auto border border-hairline bg-surface rounded-xl shadow-xs">
            <Sliders className="w-12 h-12 text-ink-faint mb-4" />
            <h2 className="text-xl font-sans font-semibold text-ink mb-2">Create Your First Watch</h2>
            <p className="text-sm text-ink-muted mb-6">
              Get started by creating your first Watch. We will monitor your topic, score significance, and notify you of key updates.
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
            {/* Top Grid Row: Calendar and Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Side: Calendar Component */}
              <div className="lg:col-span-5 bg-surface border border-hairline rounded-xl p-6 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                  <button className="p-1 hover:bg-primary-soft rounded-full text-ink-muted hover:text-ink transition-colors cursor-pointer">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-sans font-semibold text-sm text-ink">
                    August 2026
                  </span>
                  <button className="p-1 hover:bg-primary-soft rounded-full text-ink-muted hover:text-ink transition-colors cursor-pointer">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 text-center text-xs font-medium text-ink-muted mb-3 gap-y-2">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>

                <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
                  {calendarDays.map((item, idx) => {
                    const isSelected = item.isCurrentMonth && item.day === selectedDate;
                    return (
                      <button
                        key={idx}
                        onClick={() => item.isCurrentMonth && setSelectedDate(item.day)}
                        className={`py-1.5 rounded-md flex flex-col items-center justify-center relative transition-colors ${
                          !item.isCurrentMonth ? "text-ink-faint" : "text-ink hover:bg-primary-soft"
                        } ${isSelected ? "bg-primary-soft font-bold text-ink" : ""}`}
                      >
                        <span>{item.day}</span>
                        {/* Activity Dot */}
                        {item.isCurrentMonth && (item.day === 8 || item.day === 12 || item.day === 21) && (
                          <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-success" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Side: Analytics and Progress Cards */}
              <div className="lg:col-span-7 bg-surface border border-hairline rounded-xl p-6 shadow-xs flex flex-col justify-between min-h-[250px]">
                <div>
                  <h2 className="text-xl font-sans font-semibold text-ink mb-1">Intelligence Matrix Metrics</h2>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Automated analysis execution metrics and coverage for the selected calendar timeframe.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="bg-surface-inset border border-hairline rounded-xl p-4 flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase text-ink-muted">Active watches</span>
                    <div className="flex flex-col mt-2">
                      <span className="text-2xl font-bold text-ink">{activeCount} / {totalCount}</span>
                      <div className="w-full bg-hairline h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-success h-full rounded-full transition-all duration-500" style={{ width: `${activePercentage}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-inset border border-hairline rounded-xl p-4 flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase text-ink-muted">Agent execution</span>
                    <div className="flex flex-col mt-2">
                      <span className="text-2xl font-bold text-ink">{runningCount} / {totalCount}</span>
                      <div className="w-full bg-hairline h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${runningPercentage}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-inset border border-hairline rounded-xl p-4 flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase text-ink-muted">Timeframe match</span>
                    <div className="flex flex-col mt-2">
                      <span className="text-2xl font-bold text-ink">{filteredWatches.length} / {totalCount}</span>
                      <div className="w-full bg-hairline h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-success h-full rounded-full transition-all duration-500" style={{ width: `${matchPercentage}%`, backgroundColor: "var(--color-pulse)" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Table Workstation Section */}
            <div className="bg-surface border border-hairline rounded-xl p-6 shadow-xs flex flex-col gap-6">
              
              {/* Filters and Search Bar Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-hairline">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-ink-muted mr-2">Filter status:</span>
                  {["ALL", "MONITORING", "AGENT ACTIVE", "PAUSED"].map((status) => {
                    const isSelected = statusFilter === status;
                    return (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-1 text-xs font-sans font-semibold rounded-full border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-primary text-on-primary border-primary"
                            : "bg-surface-inset text-ink-muted border-hairline hover:text-ink"
                        }`}
                      >
                        {status}
                      </button>
                    );
                  })}
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

              {/* Dynamic Watch List Rendering */}
              {filteredWatches.length === 0 ? (
                <div className="py-16 text-center flex flex-col items-center justify-center">
                  <Sliders className="w-10 h-10 text-ink-faint mb-3" />
                  <h3 className="text-base font-sans font-semibold text-ink mb-1">No matching watches found</h3>
                  <p className="text-xs text-ink-muted max-w-sm">
                    Try adjusting your status filters, search queries, or select a different date on the calendar.
                  </p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWatches.map((watch) => {
                    const dynamicCount = getDynamicFindingsCount(watch, selectedDate);
                    const modifiedWatch = {
                      ...watch,
                      _count: {
                        ...watch._count,
                        findings: dynamicCount,
                        digests: watch._count?.digests || 0
                      }
                    };
                    return <WatchCard key={watch.id} watch={modifiedWatch} />;
                  })}
                </div>
              ) : (
                <div className="border border-hairline rounded-xl divide-y divide-hairline overflow-hidden bg-surface">
                  {filteredWatches.map((watch) => {
                    const dynamicCount = getDynamicFindingsCount(watch, selectedDate);
                    const modifiedWatch = {
                      ...watch,
                      _count: {
                        ...watch._count,
                        findings: dynamicCount,
                        digests: watch._count?.digests || 0
                      }
                    };
                    return <WatchRow key={watch.id} watch={modifiedWatch} />;
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Slide-out Create Watch Drawer Overlay */}
      {mounted && typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {isCreateOpen && (
                <>
                  {/* Backdrop Mask */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsCreateOpen(false)}
                    className="fixed inset-0 bg-ink/30 backdrop-blur-xs z-50 cursor-pointer"
                  />
                  {/* Drawer side panel */}
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
                        title="Close"
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

