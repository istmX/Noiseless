"use client";

import { Finding } from "../types";
import { ExternalLink, Globe } from "lucide-react";
import { motion } from "motion/react";

interface FindingCardProps {
  finding: Finding;
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 8
      ? "bg-success-soft text-success border-success/20"
      : score >= 5
      ? "bg-warning-soft text-warning border-warning/20"
      : "bg-danger-soft text-danger border-danger/20";

  const label = score >= 8 ? "HIGH SIGNAL" : score >= 5 ? "MED SIGNAL" : "LOW SIGNAL";

  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border ${color} flex items-center gap-1`}>
      <span>{score}/10</span>
      <span className="opacity-75">• {label}</span>
    </span>
  );
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "source";
  }
}

export function FindingCard({ finding }: FindingCardProps) {
  const domain = getHostname(finding.url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      data-finding-id={finding.id}
      className="flex flex-col gap-3 rounded-lg border border-hairline bg-surface p-4 transition-colors hover:border-hairline-strong hover:bg-surface-inset group"
    >
      {/* Top row: category + domain + date + score */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-surface-inset text-ink-muted border border-hairline uppercase shrink-0">
            {finding.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-ink-faint bg-surface-inset px-2 py-0.5 rounded border border-hairline truncate">
            <Globe className="w-3 h-3 text-ink-faint shrink-0" />
            <span className="truncate">{domain}</span>
          </span>
          <span className="text-[10px] font-mono text-ink-faint truncate hidden sm:inline" suppressHydrationWarning>
            {formatDate(finding.publishedAt)}
          </span>
        </div>
        <ScoreBadge score={finding.significanceScore} />
      </div>

      {/* Title with link */}
      <a
        href={finding.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start justify-between gap-2 group-hover:text-accent transition-colors"
      >
        <h4 className="text-sm font-sans font-semibold text-ink leading-snug group-hover:text-accent transition-colors">
          {finding.title}
        </h4>
        <ExternalLink className="w-3.5 h-3.5 text-ink-faint group-hover:text-accent shrink-0 mt-0.5 transition-colors" />
      </a>

      {/* Summary excerpt */}
      {finding.summary && (
        <p className="text-xs text-ink-muted font-sans leading-relaxed line-clamp-3 bg-surface-inset/50 p-2.5 rounded-lg border border-hairline/50">
          {finding.summary}
        </p>
      )}
    </motion.div>
  );
}
