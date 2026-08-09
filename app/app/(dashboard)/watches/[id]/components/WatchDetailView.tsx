"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Layers, Sparkles, Calendar, Search, Filter, ArrowUpDown, ChevronDown, ChevronUp, ExternalLink, Globe, AlertTriangle, FileText, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Watch } from "../../types";
import { Finding } from "../findings/types";
import { Digest } from "../digests/types";
import { WatchDetailHeader } from "./WatchDetailHeader";
import { WatchSettings } from "./WatchSettings";
import { WatchTimeScrubber } from "./WatchTimeScrubber";
import { motion, AnimatePresence } from "motion/react";

interface WatchDetailViewProps {
  watch: Watch;
  findings: Finding[];
  digests: Digest[];
  selectedFindingId?: string;
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

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "source";
  }
}

export function WatchDetailView({ watch, findings, digests, selectedFindingId }: WatchDetailViewProps) {
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);

  // States
  const [activePreset, setActivePreset] = useState<"all" | "today" | "7days" | "30days" | "custom">("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sort and Filters for Evidence
  const [sortBy, setSortBy] = useState<"relevance" | "newest" | "oldest">("relevance");
  const [filterSourceType, setFilterSourceType] = useState<string>("all");
  const [filterCredibility, setFilterCredibility] = useState<"all" | "high" | "medium">("all");
  
  // Expanded card state
  const [expandedFindingIds, setExpandedFindingIds] = useState<Record<string, boolean>>({});
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Auto-fill custom dates when preset changes
  const handlePresetChange = (preset: typeof activePreset) => {
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
    } else if (preset === "7days") {
      const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 - offset);
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(now.toISOString().split("T")[0]);
    } else if (preset === "30days") {
      const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000 - offset);
      setStartDate(start.toISOString().split("T")[0]);
      setEndDate(now.toISOString().split("T")[0]);
    }
  };

  // Toggle card expansion
  const toggleExpand = (id: string) => {
    setExpandedFindingIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Poll for updates when agent is running
  useEffect(() => {
    if (!watch.runInProgress) return;
    const interval = setInterval(() => router.refresh(), 3000);
    return () => clearInterval(interval);
  }, [watch.runInProgress, router]);

  // Highlight finding from router/citation click
  useEffect(() => {
    if (selectedFindingId) {
      setHighlightedId(selectedFindingId);
      setExpandedFindingIds((prev) => ({ ...prev, [selectedFindingId]: true }));
      setTimeout(() => {
        document.querySelector(`[data-finding-id="${selectedFindingId}"]`)?.scrollIntoView({ block: "center", behavior: "smooth" });
      }, 300);
    }
  }, [selectedFindingId]);

  // Latest digest summary and citations
  const latestDigest = digests[0] || null;

  // Extracted Claims from Latest Digest Summary
  const claims = useMemo(() => {
    if (!latestDigest) return [];
    
    // Split the summary text into sentences
    const sentences = latestDigest.summary
      .split(/(?<=[.!?])\s+/)
      .filter((s) => s.trim().length > 10);

    return sentences.map((sentence, idx) => {
      const urlMatch = sentence.match(/https?:\/\/[^\s\)]+/g);
      return {
        id: `claim-${idx}`,
        text: sentence.replace(/https?:\/\/[^\s\)]+/g, "").replace(/\(\s*\)/g, "").trim(),
        citationUrl: urlMatch ? urlMatch[0] : null,
      };
    });
  }, [latestDigest]);

  // Parser to replace URLs in summary with compact numbered citation markers
  const parsedSummary = useMemo(() => {
    if (!latestDigest) return { elements: [], urls: [] };
    
    const text = latestDigest.summary;
    const urlRegex = /(https?:\/\/[^\s\)]+)/g;
    const urls = Array.from(new Set(text.match(urlRegex) || []));
    
    const parts = text.split(urlRegex);
    const elements = parts.map((part, idx) => {
      if (part.match(/^https?:\/\//)) {
        const urlIdx = urls.indexOf(part);
        return (
          <button
            key={idx}
            onClick={() => handleClaimClick(part)}
            className="text-accent hover:underline font-mono text-[9px] font-bold align-super mx-0.5 focus:outline-none"
            title={getHostname(part)}
          >
            [{urlIdx + 1}]
          </button>
        );
      }
      return <span key={idx}>{part}</span>;
    });

    return { elements, urls };
  }, [latestDigest]);

  // Unique source categories/types for filters
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

  // Research Snapshot metrics
  const snapshot = useMemo(() => {
    const total = findings.length;
    const conflicting = findings.filter(isConflictingFinding).length;
    const corroborated = findings.filter(f => f.significanceScore >= 7 && !isConflictingFinding(f)).length;
    const primary = findings.filter(f => {
      const domain = getHostname(f.url);
      return domain.includes("gov") || domain.includes("edu") || domain.includes("org") || domain.includes("github");
    }).length;

    return { total, corroborated, conflicting, primary };
  }, [findings]);

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

  // Citation click scrolls and expands the finding
  const handleClaimClick = (url: string) => {
    const finding = findings.find((f) => f.url === url);
    if (finding) {
      setHighlightedId(finding.id);
      setExpandedFindingIds((prev) => ({ ...prev, [finding.id]: true }));
      
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
    <div className="flex flex-col gap-6 w-full h-[calc(100vh-10rem)] md:h-[calc(100vh-8.5rem)] min-h-0">
      {/* Header (fixed) */}
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

      {/* Two Column Layout on Desktop, Split reading experience */}
      <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: Editorial Reading Area (Wider, Narrow Measure) */}
        <div className="xl:col-span-2 h-full overflow-y-auto pr-2 flex flex-col gap-8 scrollbar-hide">
          
          {/* Editorial Summary Brief */}
          <article className="max-w-2xl mx-auto w-full space-y-6 pt-2">
            <header className="space-y-2 border-b border-hairline pb-4">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-accent flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Research Brief</span>
              </span>
              <h1 className="text-xl font-sans font-bold text-ink leading-tight">
                {watch.topic} Synthesis
              </h1>
              {latestDigest && (
                <p className="text-[11px] font-mono text-ink-faint">
                  Compiled {formatRelativeTime(latestDigest.createdAt)}
                </p>
              )}
            </header>

            {/* Structured Paragraph Body */}
            {latestDigest ? (
              <section className="text-xs font-sans text-ink-body leading-relaxed space-y-4 font-normal">
                {/* Dynamically splits content into paragraphs by double newlines for a spacious reading format */}
                {latestDigest.summary.split(/\n\n+/).map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-xs leading-relaxed">
                    {paragraph.split(/(https?:\/\/[^\s\)]+)/g).map((part, index) => {
                      if (part.match(/^https?:\/\//)) {
                        const urlIdx = parsedSummary.urls.indexOf(part);
                        return (
                          <button
                            key={index}
                            onClick={() => handleClaimClick(part)}
                            className="text-accent hover:underline font-mono text-[9px] font-bold align-super mx-0.5 focus:outline-none"
                            title={getHostname(part)}
                          >
                            [{urlIdx + 1}]
                          </button>
                        );
                      }
                      return <span key={index}>{part}</span>;
                    })}
                  </p>
                ))}
              </section>
            ) : (
              <div className="text-center py-16 bg-surface border border-hairline rounded-lg">
                <FileText className="w-8 h-8 text-ink-faint mx-auto mb-3" />
                <p className="text-xs text-ink-muted">No summary brief is available yet. Trigger a run to compile findings.</p>
              </div>
            )}

            {/* KEY FINDINGS / CLAIMS */}
            {claims.length > 0 && (
              <section className="space-y-4 pt-6 border-t border-hairline">
                <h2 className="text-[10px] font-mono font-bold text-ink uppercase tracking-wider">
                  Material Assertions
                </h2>
                <div className="space-y-2.5">
                  {claims.map((claim, idx) => (
                    <div
                      key={claim.id}
                      onClick={() => claim.citationUrl && handleClaimClick(claim.citationUrl)}
                      className={`group p-3 rounded-lg border border-hairline bg-surface/50 hover:bg-surface transition-all flex items-start gap-3 justify-between ${
                        claim.citationUrl ? "cursor-pointer" : ""
                      }`}
                    >
                      <div className="flex gap-2.5 items-start min-w-0">
                        <span className="text-[9px] font-mono text-ink-faint mt-0.5">0{idx + 1}.</span>
                        <p className="text-[11px] font-sans text-ink-body leading-relaxed">
                          {claim.text}
                        </p>
                      </div>
                      {claim.citationUrl && (
                        <div className="flex items-center gap-1.5 shrink-0 pl-2">
                          <span className="text-[9px] font-mono text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity">
                            {getHostname(claim.citationUrl)}
                          </span>
                          <ExternalLink className="w-3 h-3 text-ink-faint group-hover:text-accent transition-colors" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>

        {/* RIGHT COLUMN: Sidebar Research Context & Collapsed Evidence (Sticky Panel) */}
        <div className="xl:col-span-1 h-full flex flex-col gap-4 min-h-0 border-t xl:border-t-0 xl:border-l border-hairline pt-6 xl:pt-0 xl:pl-6">
          
          {/* Research Snapshot Metrics */}
          <div className="grid grid-cols-4 gap-2 shrink-0">
            <div className="bg-surface border border-hairline rounded p-2 text-center">
              <span className="block text-[8px] font-mono text-ink-faint uppercase">Sources</span>
              <span className="text-sm font-sans font-bold text-ink">{snapshot.total}</span>
            </div>
            <div className="bg-surface border border-hairline rounded p-2 text-center">
              <span className="block text-[8px] font-mono text-ink-faint uppercase">Verified</span>
              <span className="text-sm font-sans font-bold text-success">{snapshot.corroborated}</span>
            </div>
            <div className="bg-surface border border-hairline rounded p-2 text-center">
              <span className="block text-[8px] font-mono text-ink-faint uppercase">Conflict</span>
              <span className="text-sm font-sans font-bold text-warning">{snapshot.conflicting}</span>
            </div>
            <div className="bg-surface border border-hairline rounded p-2 text-center">
              <span className="block text-[8px] font-mono text-ink-faint uppercase">Primary</span>
              <span className="text-sm font-sans font-bold text-accent">{snapshot.primary}</span>
            </div>
          </div>

          {/* Time Scrubber Timeline Scrubber */}
          <div className="shrink-0">
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
          </div>

          {/* Filters & Evidence Feed Container */}
          <div className="flex-1 min-h-0 flex flex-col gap-3">
            {/* Minimal Filter Bar */}
            <div className="flex flex-col gap-2 p-3 bg-surface border border-hairline rounded-md shrink-0">
              <div className="relative">
                <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-ink-faint" />
                <input
                  type="text"
                  placeholder="Filter sources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 text-[11px] bg-surface-inset border border-hairline rounded text-ink focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-surface-inset text-ink border border-hairline rounded px-1.5 py-0.5 text-[10px] outline-none flex-1"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>

                <select
                  value={filterSourceType}
                  onChange={(e) => setFilterSourceType(e.target.value)}
                  className="bg-surface-inset text-ink border border-hairline rounded px-1.5 py-0.5 text-[10px] outline-none flex-1"
                >
                  <option value="all">All Types</option>
                  {sourceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <select
                  value={filterCredibility}
                  onChange={(e) => setFilterCredibility(e.target.value as any)}
                  className="bg-surface-inset text-ink border border-hairline rounded px-1.5 py-0.5 text-[10px] outline-none flex-1"
                >
                  <option value="all">Credibility</option>
                  <option value="high">High Signal</option>
                  <option value="medium">Med Signal</option>
                </select>
              </div>
            </div>

            {/* Collapsed Scrollable Feed */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 scrollbar-hide min-h-0">
              {processedFindings.length === 0 ? (
                <div className="py-8 text-center bg-surface border border-hairline rounded text-[11px] text-ink-faint">
                  No matching sources found.
                </div>
              ) : (
                processedFindings.map((finding) => {
                  const domain = getHostname(finding.url);
                  const isExpanded = !!expandedFindingIds[finding.id];
                  const isConflict = isConflictingFinding(finding);
                  
                  return (
                    <div
                      key={finding.id}
                      data-finding-id={finding.id}
                      className={`border rounded bg-surface transition-all flex flex-col ${
                        highlightedId === finding.id 
                          ? "border-accent ring-1 ring-accent/20 bg-accent-soft/10" 
                          : isConflict 
                          ? "border-warning/20" 
                          : "border-hairline hover:border-hairline-strong"
                      }`}
                    >
                      {/* Collapsed Row header */}
                      <div 
                        onClick={() => toggleExpand(finding.id)}
                        className="p-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-surface-inset/40"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[10px] font-mono text-ink-muted truncate font-bold">
                            {domain}
                          </span>
                          {isConflict && (
                            <span className="w-1.5 h-1.5 rounded-full bg-warning" title="Conflicting evidence" />
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[9px] font-mono text-ink-faint">
                            {formatRelativeTime(finding.publishedAt)}
                          </span>
                          <span className="text-[9px] font-mono font-semibold text-ink-muted bg-surface-inset px-1.5 py-0.5 rounded border border-hairline">
                            {finding.significanceScore}
                          </span>
                        </div>
                      </div>

                      {/* Excerpt title */}
                      {!isExpanded && (
                        <div className="px-3 pb-3 pt-0 text-[11px] font-sans text-ink-body font-medium truncate leading-none">
                          {finding.title}
                        </div>
                      )}

                      {/* Expanded body details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="border-t border-hairline bg-surface-inset/20 overflow-hidden text-[11px] font-sans"
                          >
                            <div className="p-3 space-y-2">
                              <p className="font-semibold text-ink leading-snug">{finding.title}</p>
                              
                              <p className="text-ink-muted bg-surface p-2 border border-hairline rounded leading-relaxed">
                                {finding.summary}
                              </p>

                              <details className="group border border-hairline rounded bg-surface">
                                <summary className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-ink-faint cursor-pointer hover:bg-surface-inset list-none flex items-center justify-between">
                                  <span>Source details</span>
                                  <ChevronDown className="w-2.5 h-2.5" />
                                </summary>
                                <div className="p-2 border-t border-hairline text-[9px] font-mono text-ink-muted bg-surface-inset/40 space-y-1">
                                  <div className="truncate"><span className="text-ink-faint">URL:</span> <a href={finding.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{finding.url}</a></div>
                                  <div><span className="text-ink-faint">Type:</span> {finding.category}</div>
                                  <div><span className="text-ink-faint">Date:</span> {new Date(finding.publishedAt).toLocaleString()}</div>
                                </div>
                              </details>

                              <div className="flex justify-end gap-2 pt-1">
                                <a
                                  href={finding.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] font-mono text-accent border border-hairline rounded bg-surface hover:bg-surface-inset"
                                >
                                  <span>Open source ↗</span>
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
