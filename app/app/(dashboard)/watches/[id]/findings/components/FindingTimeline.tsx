"use client";

import { Finding } from "../types";
import { FindingCard } from "./FindingCard";
import { Search } from "lucide-react";

interface FindingTimelineProps {
  findings: Finding[];
}

export function FindingTimeline({ findings }: FindingTimelineProps) {
  if (!findings || findings.length === 0) {
    return (
      <div className="py-16 text-center bg-surface border border-hairline rounded-xl p-8 flex flex-col items-center">
        <Search className="w-8 h-8 text-ink-muted mb-3" />
        <h3 className="text-sm font-sans font-semibold text-ink mb-1">No findings yet</h3>
        <p className="text-xs font-sans text-ink-muted max-w-sm">
          The research agent runs in the background based on your schedule. New findings will populate here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {findings.map((finding) => (
        <FindingCard key={finding.id} finding={finding} />
      ))}
    </div>
  );
}
