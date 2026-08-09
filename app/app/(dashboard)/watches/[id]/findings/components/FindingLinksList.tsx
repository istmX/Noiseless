"use client";

import { Finding } from "../types";
import { ExternalLink, Globe, Search } from "lucide-react";
import { motion } from "motion/react";

interface FindingLinksListProps {
  findings: Finding[];
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "source";
  }
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function ScoreIndicator({ score }: { score: number }) {
  const dotColor =
    score >= 8
      ? "bg-success"
      : score >= 5
      ? "bg-warning"
      : "bg-danger";

  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] text-ink-body">
      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
      <span>{score}</span>
    </div>
  );
}

export function FindingLinksList({ findings }: FindingLinksListProps) {
  if (!findings || findings.length === 0) {
    return (
      <div className="py-16 text-center bg-surface border border-hairline rounded-none p-8 flex flex-col items-center">
        <Search className="w-8 h-8 text-ink-muted mb-3" />
        <h3 className="text-sm font-sans font-semibold text-ink mb-1">No findings yet</h3>
        <p className="text-xs font-sans text-ink-muted max-w-sm">
          No matching findings found. Try adjusting your search query or date range filters.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-hairline rounded-lg overflow-hidden bg-surface divide-y divide-hairline">
      {/* Header Row */}
      <div className="hidden md:grid grid-cols-[1.5fr_4fr_1.5fr_1fr] gap-4 px-4 py-2 bg-surface-inset text-[10px] font-mono font-medium text-ink-faint uppercase">
        <span>Domain</span>
        <span>Title</span>
        <span>Date</span>
        <span className="text-right">Signal</span>
      </div>

      {/* Body Rows */}
      {findings.map((finding) => {
        const domain = getHostname(finding.url);
        return (
          <motion.div
            key={finding.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-[1.5fr_4fr_1.5fr_1fr] gap-2 md:gap-4 px-4 py-3 items-center hover:bg-surface-inset transition-colors group"
          >
            {/* Domain */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-ink-muted bg-surface-inset px-2 py-0.5 rounded border border-hairline truncate">
                <Globe className="w-3 h-3 text-ink-faint shrink-0" />
                <span className="truncate">{domain}</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-surface-inset text-ink-faint border border-hairline uppercase md:hidden">
                {finding.category}
              </span>
            </div>

            {/* Title & External Link */}
            <div className="min-w-0">
              <a
                href={finding.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 group-hover:text-accent transition-colors"
              >
                <span className="text-xs font-sans font-semibold text-ink leading-snug truncate group-hover:text-accent transition-colors">
                  {finding.title}
                </span>
                <ExternalLink className="w-3 h-3 text-ink-faint group-hover:text-accent shrink-0 transition-colors" />
              </a>
            </div>

            {/* Date */}
            <div className="text-[11px] font-mono text-ink-faint md:text-ink-body" suppressHydrationWarning>
              {formatDate(finding.publishedAt)}
            </div>

            {/* Signal Score */}
            <div className="flex justify-between md:justify-end items-center">
              <span className="text-[10px] font-mono text-ink-faint uppercase md:hidden">Signal Score:</span>
              <ScoreIndicator score={finding.significanceScore} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
