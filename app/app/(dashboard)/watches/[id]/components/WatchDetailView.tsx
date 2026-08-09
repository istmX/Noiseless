"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Layers, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Watch } from "../../types";
import { Finding } from "../findings/types";
import { Digest } from "../digests/types";
import { WatchDetailHeader } from "./WatchDetailHeader";
import { WatchSettings } from "./WatchSettings";
import { WatchFilterBar } from "./WatchFilterBar";
import { WatchTimeScrubber } from "./WatchTimeScrubber";
import { FilterPreset } from "./constants";
import { FindingTimeline } from "../findings/components/FindingTimeline";
import { FindingLinksList } from "../findings/components/FindingLinksList";
import { DigestHistory } from "../digests/components/DigestHistory";

interface WatchDetailViewProps {
  watch: Watch;
  findings: Finding[];
  digests: Digest[];
  selectedFindingId?: string;
}

export function WatchDetailView({ watch, findings, digests, selectedFindingId }: WatchDetailViewProps) {
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);

  // Filter and view state
  const [activePreset, setActivePreset] = useState<FilterPreset>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState<"links" | "detailed">("detailed");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Update dates when preset changes
  const handlePresetChange = (preset: FilterPreset) => {
    setActivePreset(preset);
    const now = new Date();
    
    if (preset === "all") {
      setStartDate("");
      setEndDate("");
      return;
    }

    const offset = now.getTimezoneOffset() * 60000;
    
    if (preset === "today") {
      const todayStr = new Date(now.getTime() - offset).toISOString().split("T")[0];
      setStartDate(todayStr);
      setEndDate(todayStr);
    } else if (preset === "yesterday") {
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const yesterdayStr = new Date(yesterday.getTime() - offset).toISOString().split("T")[0];
      setStartDate(yesterdayStr);
      setEndDate(yesterdayStr);
    } else if (preset === "week") {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const startStr = new Date(oneWeekAgo.getTime() - offset).toISOString().split("T")[0];
      const endStr = new Date(now.getTime() - offset).toISOString().split("T")[0];
      setStartDate(startStr);
      setEndDate(endStr);
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

  // Poll for updates when agent is running
  useEffect(() => {
    if (!watch.runInProgress) return;
    const interval = setInterval(() => router.refresh(), 3000);
    return () => clearInterval(interval);
  }, [watch.runInProgress, router]);

  // Toast when run completes
  const prevRunning = useRef(watch.runInProgress);
  const [initialCount] = useState(findings.length);

  useEffect(() => {
    if (!watch.runInProgress && prevRunning.current) {
      if (findings.length === initialCount) {
        toast.info("Scan complete. No new findings detected.");
      } else {
        toast.success(`Scan complete. Found ${findings.length - initialCount} new findings.`);
      }
    }
    prevRunning.current = watch.runInProgress;
  }, [watch.runInProgress, findings.length, initialCount]);

  // Client side filtering calculations
  const filteredFindings = useMemo(() => {
    return findings.filter((finding) => {
      // 1. Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = finding.title.toLowerCase().includes(query);
        const matchesSummary = finding.summary?.toLowerCase().includes(query);
        const matchesUrl = finding.url.toLowerCase().includes(query);
        const matchesCategory = finding.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSummary && !matchesUrl && !matchesCategory) {
          return false;
        }
      }

      // 2. Date range filter
      const itemDate = new Date(finding.publishedAt);
      if (startDate) {
        const start = new Date(startDate + "T00:00:00");
        if (itemDate < start) return false;
      }
      if (endDate) {
        const end = new Date(endDate + "T23:59:59.999");
        if (itemDate > end) return false;
      }

      return true;
    });
  }, [findings, searchQuery, startDate, endDate]);

  const filteredDigests = useMemo(() => {
    return digests.filter((digest) => {
      // 1. Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        if (!digest.summary.toLowerCase().includes(query)) {
          return false;
        }
      }

      // 2. Date range filter
      const itemDate = new Date(digest.createdAt);
      if (startDate) {
        const start = new Date(startDate + "T00:00:00");
        if (itemDate < start) return false;
      }
      if (endDate) {
        const end = new Date(endDate + "T23:59:59.999");
        if (itemDate > end) return false;
      }

      return true;
    });
  }, [digests, searchQuery, startDate, endDate]);

  // Handle citation click to scroll and highlight finding
  const handleCitationClick = (url: string) => {
    const finding = findings.find((f) => f.url === url);
    if (finding) {
      setHighlightedId(finding.id);
      
      // Auto-toggle to timeline view if in links view to make highlighting visible
      if (activeView === "links") {
        setActiveView("detailed");
      }

      setTimeout(() => {
        const el = document.querySelector(`[data-finding-id="${finding.id}"]`);
        if (el) {
          el.scrollIntoView({ block: "center", behavior: "smooth" });
          el.classList.add("border-accent", "bg-accent-soft");
          setTimeout(() => {
            el.classList.remove("border-accent", "bg-accent-soft");
            setHighlightedId(null);
          }, 3000);
        }
      }, 200);
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-[calc(100vh-10rem)] md:h-[calc(100vh-8.5rem)] min-h-0">
      <div className="shrink-0">
        <WatchDetailHeader
          watch={watch}
          findingsCount={findings.length}
          digestsCount={digests.length}
          onSettingsToggle={() => setShowSettings((s) => !s)}
          showSettings={showSettings}
        />
      </div>

      <WatchSettings watch={watch} open={showSettings} onClose={() => setShowSettings(false)} />

      {/* Filter and Scrubber Controls */}
      <div className="flex flex-col gap-3 shrink-0">
        <WatchFilterBar
          activePreset={activePreset}
          onPresetChange={handlePresetChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeView={activeView}
          onViewChange={setActiveView}
          startDate={startDate}
          onStartDateChange={handleStartDateChange}
          endDate={endDate}
          onEndDateChange={handleEndDateChange}
        />

        <WatchTimeScrubber
          findings={findings}
          selectedStartDate={startDate}
          selectedEndDate={endDate}
          onSelectDateRange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
            if (start && end) {
              setActivePreset("all");
            } else {
              setActivePreset("all");
            }
          }}
        />
      </div>

      {/* Splitted panels, height locked and independently scrollable */}
      <div className="flex-1 min-h-0 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(18rem,.8fr)]">
        <section className="workspace-panel flex min-w-0 flex-col p-5 h-full">
          <div className="flex items-center justify-between border-b border-hairline pb-4 shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-ink-muted" />
              <h2 className="text-sm font-semibold text-ink">Digest history</h2>
            </div>
            <span className="font-mono text-[11px] text-ink-faint">
              {filteredDigests.length} of {digests.length} matches
            </span>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden pt-4 scrollbar-hide">
            <DigestHistory digests={filteredDigests} onCitationClick={handleCitationClick} />
          </div>
        </section>

        <section className="workspace-panel-raised flex min-w-0 flex-col p-5 h-full">
          <div className="flex items-center justify-between border-b border-hairline pb-4 shrink-0">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-ink-muted" />
              <h2 className="text-sm font-semibold text-ink">Evidence timeline</h2>
            </div>
            <span className="font-mono text-[11px] text-ink-faint">
              {filteredFindings.length} of {findings.length} matches
            </span>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden pt-4 scrollbar-hide">
            {activeView === "links" ? (
              <FindingLinksList findings={filteredFindings} />
            ) : (
              <FindingTimeline findings={filteredFindings} selectedFindingId={selectedFindingId || highlightedId || undefined} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
