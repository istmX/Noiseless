"use client";

import { Finding } from "../types";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";

interface FindingCardProps {
  finding: Finding;
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 7
      ? "bg-success-soft text-success border-success/20"
      : score >= 4
      ? "bg-warning-soft text-warning border-warning/20"
      : "bg-danger-soft text-danger border-danger/20";

  return (
    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-mono font-semibold border ${color}`}>
      {score} / 10
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

export function FindingCard({ finding }: FindingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="p-4 bg-surface border border-hairline rounded-md hover:border-hairline-strong transition-colors flex flex-col gap-2.5"
    >
      {/* Top row: category + date + score */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-medium bg-surface-inset text-ink-muted border border-hairline uppercase shrink-0">
            {finding.category}
          </span>
          <span className="text-[10px] font-mono text-ink-faint truncate" suppressHydrationWarning>
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
        className="group flex items-start gap-1.5 hover:text-success transition-colors"
      >
        <h4 className="text-sm font-sans font-semibold text-ink leading-snug group-hover:text-success transition-colors">
          {finding.title}
        </h4>
        <ExternalLink className="w-3.5 h-3.5 text-ink-faint group-hover:text-success shrink-0 mt-0.5 transition-colors" />
      </a>

      {/* Summary excerpt */}
      {finding.summary && (
        <p className="text-xs text-ink-muted font-sans leading-relaxed line-clamp-3">
          {finding.summary}
        </p>
      )}
    </motion.div>
  );
}
