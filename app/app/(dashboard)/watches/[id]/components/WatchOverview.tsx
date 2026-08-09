"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Sparkles, FileText, ArrowRight, Layers, Globe, ShieldAlert } from "lucide-react";
import { Watch } from "../../types";
import { Finding } from "../findings/types";
import { Digest } from "../digests/types";

interface WatchOverviewProps {
  watch: Watch;
  findings: Finding[];
  digests: Digest[];
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

export function WatchOverview({ watch, findings, digests }: WatchOverviewProps) {
  const latestDigest = digests[0] || null;
  const recentFindings = useMemo(() => findings.slice(0, 3), [findings]);

  // Conflict classification helper
  const isConflictingFinding = (finding: Finding) => {
    const text = (finding.summary + " " + finding.title).toLowerCase();
    const conflictKeywords = ["conflict", "contradict", "disagree", "oppose", "denies", "however", "refutes", "dispute", "incorrect", "false"];
    return conflictKeywords.some(kw => text.includes(kw));
  };

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

  // Summarize first sentences of digest for preview
  const summaryPreview = useMemo(() => {
    if (!latestDigest) return null;
    const cleanText = latestDigest.summary.replace(/https?:\/\/[^\s\)]+/g, "").replace(/\(\s*\)/g, "").trim();
    // Excerpt first two sentences
    const sentences = cleanText.split(/(?<=[.!?])\s+/);
    return sentences.slice(0, 2).join(" ");
  }, [latestDigest]);

  return (
    <div className="space-y-6 pb-8">
      {/* Research Snapshot Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="workspace-panel p-4 flex flex-col gap-1.5 items-center justify-center text-center">
          <span className="text-[10px] font-mono font-medium text-ink-faint uppercase">Total Sources</span>
          <span className="text-xl font-sans font-bold text-ink">{snapshot.total}</span>
        </div>
        <div className="workspace-panel p-4 flex flex-col gap-1.5 items-center justify-center text-center">
          <span className="text-[10px] font-mono font-medium text-ink-faint uppercase">Corroborated</span>
          <span className="text-xl font-sans font-bold text-success">{snapshot.corroborated}</span>
        </div>
        <div className="workspace-panel p-4 flex flex-col gap-1.5 items-center justify-center text-center">
          <span className="text-[10px] font-mono font-medium text-ink-faint uppercase">Conflicting</span>
          <span className="text-xl font-sans font-bold text-warning">{snapshot.conflicting}</span>
        </div>
        <div className="workspace-panel p-4 flex flex-col gap-1.5 items-center justify-center text-center">
          <span className="text-[10px] font-mono font-medium text-ink-faint uppercase">Primary Sources</span>
          <span className="text-xl font-sans font-bold text-accent">{snapshot.primary}</span>
        </div>
      </section>

      {/* Split Section: Summary Preview & Recent Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Summary Preview Card */}
        <div className="workspace-panel p-6 flex flex-col justify-between gap-6 h-fit">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-hairline pb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-sans font-bold text-ink uppercase tracking-wide">
                Summary Preview
              </h2>
            </div>
            
            {summaryPreview ? (
              <div className="space-y-3">
                <p className="text-xs font-sans text-ink-body leading-relaxed line-clamp-4 bg-surface-inset p-4 rounded border border-hairline">
                  {summaryPreview}...
                </p>
                {latestDigest && (
                  <p className="text-[10px] font-mono text-ink-faint">
                    Generated {formatRelativeTime(latestDigest.createdAt)}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-ink-muted py-4">No summary brief is available yet. Trigger a run to compile findings.</p>
            )}
          </div>

          {latestDigest && (
            <Link
              href={`/watches/${watch.id}/summary`}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-medium text-on-primary hover:bg-primary-hover w-fit mt-4"
            >
              <span>Read full summary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Right: Recent Findings Card */}
        <div className="workspace-panel p-6 flex flex-col justify-between gap-6 h-fit">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-hairline pb-3">
              <Layers className="w-4 h-4 text-ink-muted" />
              <h2 className="text-sm font-sans font-bold text-ink uppercase tracking-wide">
                Recent Evidence
              </h2>
            </div>

            {recentFindings.length > 0 ? (
              <div className="space-y-3">
                {recentFindings.map((finding) => (
                  <div
                    key={finding.id}
                    className="p-3 bg-surface border border-hairline rounded hover:bg-surface-inset/40 transition-colors flex items-center justify-between gap-3 text-left"
                  >
                    <div className="min-w-0 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono text-ink bg-surface-inset px-2 py-0.5 rounded border border-hairline shrink-0">
                        <Globe className="w-2.5 h-2.5 text-ink-faint" />
                        <span>{getHostname(finding.url)}</span>
                      </span>
                      <span className="text-xs font-sans font-semibold text-ink truncate">
                        {finding.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-ink-faint shrink-0">
                      {formatRelativeTime(finding.publishedAt)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-ink-muted py-4">No evidence has been collected yet.</p>
            )}
          </div>

          <Link
            href={`/watches/${watch.id}/evidence`}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-hairline bg-surface-inset px-4 py-2 text-xs font-medium text-ink hover:bg-surface hover:border-hairline-strong w-fit mt-4"
          >
            <span>View all evidence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
