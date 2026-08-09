"use client";

import { useState, useEffect } from "react";
import { Layers, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Watch } from "../../types";
import { Finding } from "../findings/types";
import { Digest } from "../digests/types";
import { WatchDetailHeader } from "./WatchDetailHeader";
import { WatchSettings } from "./WatchSettings";
import { FindingTimeline } from "../findings/components/FindingTimeline";
import { DigestHistory } from "../digests/components/DigestHistory";

interface WatchDetailViewProps {
  watch: Watch;
  findings: Finding[];
  digests: Digest[];
}

export function WatchDetailView({ watch, findings, digests }: WatchDetailViewProps) {
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);

  // Poll for updates when agent is running
  useEffect(() => {
    if (!watch.runInProgress) return;
    const interval = setInterval(() => router.refresh(), 3000);
    return () => clearInterval(interval);
  }, [watch.runInProgress, router]);

  // Toast when run completes
  const [prevRunning, setPrevRunning] = useState(watch.runInProgress);
  const [initialCount] = useState(findings.length);

  useEffect(() => {
    if (!watch.runInProgress && prevRunning) {
      if (findings.length === initialCount) {
        toast.info("Scan complete. No new findings detected.");
      } else {
        toast.success(`Scan complete. Found ${findings.length - initialCount} new findings.`);
      }
    }
    setPrevRunning(watch.runInProgress);
  }, [watch.runInProgress, prevRunning, findings.length, initialCount]);

  return (
    <div className="flex flex-col gap-5 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 min-h-screen">
      <WatchDetailHeader
        watch={watch}
        findingsCount={findings.length}
        digestsCount={digests.length}
        onSettingsToggle={() => setShowSettings((s) => !s)}
        showSettings={showSettings}
      />

      <WatchSettings watch={watch} open={showSettings} />

      {/* Two-column findings + digests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 lg:min-h-[520px]">
        {/* Findings — wider column */}
        <div className="lg:col-span-7 flex flex-col border border-hairline bg-surface rounded-md min-h-[400px]">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-hairline shrink-0">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-ink-muted" />
              <h2 className="text-sm font-sans font-semibold text-ink">Findings Timeline</h2>
            </div>
            <span className="text-[11px] font-mono text-ink-faint">
              {findings.length} captured
            </span>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 scrollbar-hide">
            <FindingTimeline findings={findings} />
          </div>
        </div>

        {/* Digests — narrower column */}
        <div className="lg:col-span-5 flex flex-col border border-hairline bg-surface rounded-md min-h-[400px]">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-hairline shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-ink-muted" />
              <h2 className="text-sm font-sans font-semibold text-ink">Digest History</h2>
            </div>
            <span className="text-[11px] font-mono text-ink-faint">
              {digests.length} dispatched
            </span>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 scrollbar-hide">
            <DigestHistory digests={digests} />
          </div>
        </div>
      </div>
    </div>
  );
}
