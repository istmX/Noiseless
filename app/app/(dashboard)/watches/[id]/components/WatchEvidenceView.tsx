"use client";

import { useState, useMemo } from "react";
import { Layers, Calendar, Search, Filter, ArrowUpDown, ChevronDown, ChevronUp, ExternalLink, Globe, AlertTriangle, ArrowRight, List, Clock } from "lucide-react";
import Link from "next/link";
import { Watch } from "../../types";
import { Finding } from "../findings/types";
import { WatchTimeScrubber } from "./WatchTimeScrubber";
import { WatchFilterBar } from "./WatchFilterBar";
import { FilterPreset } from "./constants";
import { motion, AnimatePresence } from "motion/react";

interface WatchEvidenceViewProps {
  watch: Watch;
  findings: Finding[];
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "source";
  }
}

function formatRelativeTime(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const diffMs = Date.now() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export function WatchEvidenceView({ watch, findings }: WatchEvidenceViewProps) {
  // Filters state
  const [activePreset, setActivePreset] = useState<FilterPreset>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"relevance" | "newest" | "oldest">("relevance");
  const [filterSourceType, setFilterSourceType] = useState<string>("all");
  const [filterCredibility, setFilterCredibility] = useState<"all" | "high" | "medium">("all");
  
  // Expanded cards state
  const [expandedFindingIds, setExpandedFindingIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedFindingIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Preset changer
  const handlePresetChange = (preset: FilterPreset) => {
    setActivePreset(preset);
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;

    if (preset === "all") {
      setStartDate("");
      setEndDate("");
    } else if (preset === "today") {
      const todayStr = new Date(now.getTime() - offset).toISOString().split("T")[0];
      setStartDate(todayStr);
      setEndDate(todayStr);
    } else if (preset === "yesterday") {
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000 - offset);
      setStartDate(yesterday.toISOString().split("T")[0]);
      setEndDate(yesterday.toISOString().split("T")[0]);
    } else if (preset === "week") {
      const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 - offset);
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(now.toISOString().split("T")[0]);
    }
  };

  // Handle custom date edits
  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    setActivePreset("all");
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    setActivePreset("all");
  };

  // Unique source categories/types
  const sourceTypes = useMemo(() => {
    const types = new Set(findings.map((f) => f.category));
    return Array.from(types);
  }, [findings]);

  // Conflict classification helper
  const isConflictingFinding = (finding: Finding) => {
    const text = (finding.summary + " " + finding.title).toLowerCase();
    const conflictKeywords = ["conflict", "contradict", "disagree", "oppose", "denies", "however", "refutes", "dispute", "incorrect", "false"];
    return conflictKeywords.some(kw => text.includes(kw));
  };

  // Process filters, sorting, and search on findings
  const processedFindings = useMemo(() => {
    let result = [...findings];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.summary.toLowerCase().includes(q) ||
          getHostname(f.url).includes(q)
      );
    }

    if (startDate) {
      const start = new Date(startDate + "T00:00:00");
      result = result.filter((f) => new Date(f.publishedAt) >= start);
    }
    if (endDate) {
      const end = new Date(endDate + "T23:59:59.999");
      result = result.filter((f) => new Date(f.publishedAt) <= end);
    }

    if (filterSourceType !== "all") {
      result = result.filter((f) => f.category === filterSourceType);
    }

    if (filterCredibility === "high") {
      result = result.filter((f) => f.significanceScore >= 8);
    } else if (filterCredibility === "medium") {
      result = result.filter((f) => f.significanceScore >= 5);
    }

    if (sortBy === "relevance") {
      result.sort((a, b) => b.significanceScore - a.significanceScore);
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    }

    return result;
  }, [findings, searchQuery, startDate, endDate, filterSourceType, filterCredibility, sortBy]);

  // Grouping processed findings by day for the Timeline view
  const groupedFindings = useMemo(() => {
    if (sortBy === "relevance") return null; // Only group when sorted chronologically
    
    const groups: Record<string, Finding[]> = {};
    processedFindings.forEach((finding) => {
      try {
        const dateKey = new Date(finding.publishedAt).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        });
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(finding);
      } catch {
        if (!groups["Unknown Date"]) groups["Unknown Date"] = [];
        groups["Unknown Date"].push(finding);
      }
    });
    return groups;
  }, [processedFindings, sortBy]);

  return (
    <div className="flex flex-col gap-5 pb-8">
      {/* Search & Filter Controls Bar */}
      <div className="shrink-0 flex flex-col gap-3">
        <WatchFilterBar
          activePreset={activePreset}
          onPresetChange={handlePresetChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          startDate={startDate}
          onStartDateChange={handleStartDateChange}
          endDate={endDate}
          onEndDateChange={handleEndDateChange}
        />
        
        {/* Scrubber activity panel */}
        <WatchTimeScrubber
          findings={findings}
          selectedStartDate={startDate}
          selectedEndDate={endDate}
          onSelectDateRange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
            setActivePreset("all");
          }}
        />

        {/* Dynamic Facet Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-surface border border-hairline rounded-md">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <ArrowUpDown className="w-3.5 h-3.5 text-ink-faint" />
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-surface-inset text-ink border border-hairline rounded px-2 py-1 text-[11px] outline-none"
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <Filter className="w-3.5 h-3.5 text-ink-faint" />
              <span>Source Type:</span>
              <select
                value={filterSourceType}
                onChange={(e) => setFilterSourceType(e.target.value)}
                className="bg-surface-inset text-ink border border-hairline rounded px-2 py-1 text-[11px] outline-none capitalize"
              >
                <option value="all">All Sources</option>
                {sourceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <span>Credibility:</span>
              <select
                value={filterCredibility}
                onChange={(e) => setFilterCredibility(e.target.value as any)}
                className="bg-surface-inset text-ink border border-hairline rounded px-2 py-1 text-[11px] outline-none"
              >
                <option value="all">All levels</option>
                <option value="high">High signal (&gt;=8)</option>
                <option value="medium">Med signal (&gt;=5)</option>
              </select>
            </div>
          </div>

          <span className="text-[10px] font-mono text-ink-faint">
            Matches: {processedFindings.length} of {findings.length}
          </span>
        </div>
      </div>

      {/* Main Evidence Explorer Feed */}
      <div className="space-y-4">
        {processedFindings.length === 0 ? (
          <div className="py-16 text-center bg-surface border border-hairline rounded-lg">
            <Layers className="w-8 h-8 text-ink-faint mx-auto mb-3" />
            <p className="text-xs text-ink-muted">No evidence matches your filters.</p>
          </div>
        ) : groupedFindings ? (
          /* CHRONOLOGICAL GROUPED TIMELINE VIEW */
          <div className="space-y-6">
            {Object.entries(groupedFindings).map(([dayLabel, dayFindings]) => (
              <div key={dayLabel} className="space-y-3">
                <div className="flex items-center gap-3 shrink-0">
                  <h3 className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider">
                    {dayLabel}
                  </h3>
                  <div className="flex-1 h-px bg-hairline" />
                </div>

                <div className="space-y-2">
                  {dayFindings.map((finding) => (
                    <EvidenceRowCard
                      key={finding.id}
                      finding={finding}
                      watchId={watch.id}
                      isExpanded={!!expandedFindingIds[finding.id]}
                      isConflict={isConflictingFinding(finding)}
                      onToggleExpand={() => toggleExpand(finding.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* RELEVANCE FLAT LIST VIEW */
          <div className="space-y-2">
            {processedFindings.map((finding) => (
              <EvidenceRowCard
                key={finding.id}
                finding={finding}
                watchId={watch.id}
                isExpanded={!!expandedFindingIds[finding.id]}
                isConflict={isConflictingFinding(finding)}
                onToggleExpand={() => toggleExpand(finding.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface EvidenceRowCardProps {
  finding: Finding;
  watchId: string;
  isExpanded: boolean;
  isConflict: boolean;
  onToggleExpand: () => void;
}

function EvidenceRowCard({
  finding,
  watchId,
  isExpanded,
  isConflict,
  onToggleExpand,
}: EvidenceRowCardProps) {
  const domain = getHostname(finding.url);
  
  return (
    <div className={`border rounded bg-surface transition-all flex flex-col ${
      isConflict 
        ? "border-warning/30 hover:border-warning/50" 
        : "border-hairline hover:border-hairline-strong"
    }`}>
      {/* Header compact line row */}
      <div 
        onClick={onToggleExpand}
        className="p-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-surface-inset/40"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[10px] font-mono text-ink-muted truncate font-bold">
            {domain}
          </span>
          <span className="text-xs font-sans font-semibold text-ink leading-none truncate">
            {finding.title}
          </span>
          {isConflict && (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-warning-soft text-warning border border-warning/10 text-[9px] font-mono shrink-0 leading-none">
              <AlertTriangle className="w-2.5 h-2.5" />
              <span>Conflict</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[9px] font-mono text-ink-faint">
            {formatRelativeTime(finding.publishedAt)}
          </span>
          <span className="text-[9px] font-mono font-semibold text-ink-muted bg-surface-inset px-1.5 py-0.5 rounded border border-hairline" title={`Relevance score: ${finding.significanceScore}/10`}>
            {finding.significanceScore}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-ink-muted" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-ink-muted" />
          )}
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="border-t border-hairline bg-surface-inset/10 overflow-hidden text-[11px] font-sans"
          >
            <div className="p-3.5 space-y-3">
              <div className="p-3 bg-surface border border-hairline rounded text-ink-body leading-relaxed">
                {finding.summary}
              </div>

              {/* Collapsible Source details details */}
              <details className="group border border-hairline rounded bg-surface">
                <summary className="px-2.5 py-1.5 text-[9px] font-mono uppercase tracking-wider text-ink-muted cursor-pointer hover:bg-surface-inset list-none flex items-center justify-between">
                  <span>Source details</span>
                  <ChevronDown className="w-2.5 h-2.5" />
                </summary>
                <div className="p-2 border-t border-hairline text-[9px] font-mono text-ink-muted bg-surface-inset/40 space-y-1">
                  <div className="truncate"><span className="text-ink-faint">URL:</span> <a href={finding.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{finding.url}</a></div>
                  <div><span className="text-ink-faint">Category:</span> {finding.category}</div>
                  <div><span className="text-ink-faint">Date Published:</span> {new Date(finding.publishedAt).toLocaleString()}</div>
                </div>
              </details>

              <div className="flex justify-end gap-2 pt-1 border-t border-hairline/40">
                <Link
                  href={`/watches/${watchId}/evidence/${finding.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-mono text-accent border border-hairline rounded bg-surface hover:bg-surface-inset"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <a
                  href={finding.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono text-ink-muted border border-hairline rounded bg-surface hover:bg-surface-inset"
                >
                  <span>Visit ↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
