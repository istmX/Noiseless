"use client";

import { Finding } from "../types";
import { FindingCard } from "./FindingCard";
import { Search } from "lucide-react";
import { useEffect } from "react";

interface FindingTimelineProps {
  findings: Finding[];
  selectedFindingId?: string;
}

export function FindingTimeline({ findings, selectedFindingId }: FindingTimelineProps) {
  useEffect(() => {
    if (!selectedFindingId) return;
    document.querySelector(`[data-finding-id="${selectedFindingId}"]`)?.scrollIntoView({ block: "center" });
  }, [selectedFindingId]);
  if (!findings || findings.length === 0) {
    return (
      <div className="py-16 text-center bg-surface border border-hairline rounded-none p-8 flex flex-col items-center">
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
