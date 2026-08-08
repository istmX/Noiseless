"use client";

import { Finding } from "../types";
import { ExternalLink, Calendar } from "lucide-react";
import { motion } from "motion/react";

interface FindingCardProps {
  finding: Finding;
}

export function FindingCard({ finding }: FindingCardProps) {
  const isHighSignificance = finding.significanceScore >= 8;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-surface border border-hairline rounded-xl shadow-xs hover:border-hairline-strong transition-all flex flex-col gap-3"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-xs font-mono tracking-wider bg-surface-inset text-ink border border-hairline uppercase font-medium">
            {finding.category}
          </span>
          <div className="flex items-center gap-1 text-xs font-mono text-ink-muted">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(finding.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${
          isHighSignificance 
            ? "bg-primary-soft text-primary border-primary/20" 
            : "bg-surface-inset text-ink-muted border-hairline"
        }`}>
          Score {finding.significanceScore}/10
        </div>
      </div>

      <h4 className="text-base font-sans font-semibold text-ink leading-snug">
        <a 
          href={finding.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors flex items-center gap-1.5 group"
        >
          <span>{finding.title}</span>
          <ExternalLink className="w-3.5 h-3.5 text-ink-faint group-hover:text-primary transition-colors shrink-0" />
        </a>
      </h4>

      <p className="text-xs text-ink-muted leading-relaxed font-sans">
        {finding.summary}
      </p>
    </motion.div>
  );
}
