"use client";

import { Digest } from "../types";
import { DigestCard } from "./DigestCard";
import { FileText } from "lucide-react";

interface DigestHistoryProps {
  digests: Digest[];
}

export function DigestHistory({ digests }: DigestHistoryProps) {
  if (!digests || digests.length === 0) {
    return (
      <div className="py-16 text-center bg-surface border border-hairline rounded-none p-8 flex flex-col items-center">
        <FileText className="w-8 h-8 text-ink-muted mb-3" />
        <h3 className="text-sm font-sans font-semibold text-ink mb-1">No digests generated</h3>
        <p className="text-xs font-sans text-ink-muted max-w-sm">
          Digests are automatically generated and dispatched via Email or Slack when findings cross your significance threshold.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {digests.map((digest) => (
        <DigestCard key={digest.id} digest={digest} />
      ))}
    </div>
  );
}
