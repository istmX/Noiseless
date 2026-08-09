"use client";

import { useState, useTransition, useEffect } from "react";
import {
  Play,
  Loader2,
  Clock,
  Hash,
  TrendingUp,
  ArrowLeft,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Watch } from "../../types";
import { runWatchNow } from "../../actions";
import { toast } from "sonner";


function formatLastRun(date: Date | string | null | undefined): string {
  if (!date) return "Never";
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(d).toLocaleDateString();
}

function formatCooldown(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

interface WatchDetailHeaderProps {
  watch: Watch;
  findingsCount: number;
  digestsCount: number;
  onSettingsToggle: () => void;
  showSettings: boolean;
}

export function WatchDetailHeader({
  watch,
  findingsCount,
  digestsCount,
  onSettingsToggle,
  showSettings,
}: WatchDetailHeaderProps) {
  const [isPending, startTransition] = useTransition();
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  useEffect(() => {
    if (!watch.lastRunAt) return;
    const checkCooldown = () => {
      const lastRun = new Date(watch.lastRunAt!).getTime();
      const elapsed = (Date.now() - lastRun) / 1000;
      setCooldownRemaining(Math.ceil(Math.max(0, 900 - elapsed)));
    };
    checkCooldown();
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, [watch.lastRunAt]);

  const handleRunNow = () => {
    startTransition(async () => {
      const result = await runWatchNow(watch.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Agent pipeline triggered successfully.");
      }
    });
  };

  const isRunDisabled = isPending || watch.runInProgress || cooldownRemaining > 0;

  const runLabel = watch.runInProgress
    ? "Running…"
    : isPending
    ? "Triggering…"
    : cooldownRemaining > 0
    ? `Cooldown ${formatCooldown(cooldownRemaining)}`
    : "Run Now";

  return (
    <div className="flex flex-col gap-5">
      {/* Back nav */}
      <Link
        href="/watches"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-ink transition-colors w-fit group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Back to Watches
      </Link>

      {/* Header card */}
      <div className="bg-surface border border-hairline rounded-md p-5">
        <div className="flex flex-col lg:flex-row lg:items-start gap-5">
          {/* Left: title + status */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2">
              {watch.active ? (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[11px] font-mono font-semibold uppercase bg-success-soft text-success border border-success/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Monitoring
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-sm text-[11px] font-mono font-semibold uppercase bg-surface-inset text-ink-faint border border-hairline">
                  Paused
                </span>
              )}
              <span className="text-[10px] font-mono text-ink-faint truncate">
                {watch.id}
              </span>
            </div>
            <h1 className="text-xl font-sans font-semibold text-ink tracking-tight leading-snug">
              {watch.topic}
            </h1>
          </div>

          {/* Right: stat chips + actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Stat chips */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-hairline bg-surface-inset">
              <Clock className="w-3.5 h-3.5 text-ink-muted" />
              <span className="text-[11px] font-mono text-ink-muted uppercase">{watch.frequency}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-hairline bg-surface-inset">
              <Hash className="w-3.5 h-3.5 text-ink-muted" />
              <span className="text-[11px] font-mono text-ink-muted">{watch.significanceThreshold} / 10</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-hairline bg-surface-inset">
              <TrendingUp className="w-3.5 h-3.5 text-success" />
              <span className="text-[11px] font-mono text-ink">{findingsCount} findings</span>
            </div>

            {/* Run Now */}
            <Button
              onClick={handleRunNow}
              disabled={isRunDisabled}
              className="bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium rounded-md px-3 h-9 flex items-center gap-2 cursor-pointer text-xs transition-colors disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              {runLabel}
            </Button>

            {/* Settings toggle */}
            <Button
              onClick={onSettingsToggle}
              className={`border border-hairline font-sans font-medium rounded-md px-3 h-9 flex items-center gap-2 cursor-pointer text-xs transition-colors ${
                showSettings
                  ? "bg-surface-inset text-ink border-hairline-strong"
                  : "bg-surface text-ink-muted hover:text-ink hover:bg-surface-inset"
              }`}
            >
              <Settings2 className="w-3.5 h-3.5" />
              Configure
            </Button>
          </div>
        </div>

        {/* Last run + search queries */}
        <div className="mt-4 pt-4 border-t border-hairline flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-[11px] font-mono text-ink-faint shrink-0" suppressHydrationWarning>
            Last run: {formatLastRun(watch.lastRunAt)}
          </span>
          {watch.searchQueries.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {watch.searchQueries.map((q, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-sm border border-hairline bg-surface-inset text-[10px] font-mono text-ink-muted"
                >
                  {q}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
