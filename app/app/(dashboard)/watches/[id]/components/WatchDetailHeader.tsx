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
  Command,
} from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
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
  onSettingsToggle,
  showSettings,
}: WatchDetailHeaderProps) {
  const [isPending, startTransition] = useTransition();
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [showInsufficientTokens, setShowInsufficientTokens] = useState(false);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);

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
        if (result.code === "INSUFFICIENT_TOKENS") {
          setTokenBalance(result.tokensBalance ?? null);
          setShowInsufficientTokens(true);
        } else toast.error(result.error);
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
    <>
    <div className="flex flex-col gap-4">
      <div className="workspace-panel flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          {/* Left: title + status */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2">
              {watch.active ? (
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-success-soft px-2 py-1 text-xs font-mono font-semibold uppercase text-success">
                  <span className={`h-1.5 w-1.5 rounded-full bg-success ${watch.runInProgress ? "status-dot--running" : ""}`} />
                  Monitoring
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase bg-surface-inset text-ink-faint border border-hairline">
                  Paused
                </span>
              )}
              <span className="text-xs font-mono text-ink-faint truncate">
                {watch.id}
              </span>
            </div>
            <h1 className="text-2xl font-sans font-bold text-ink tracking-tight leading-snug">
              {watch.topic}
            </h1>
          </div>

          {/* Right: stat chips + actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Stat chips */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-hairline bg-surface-inset">
              <Clock className="w-3.5 h-3.5 text-ink-muted" />
              <span className="text-xs font-mono text-ink-body uppercase">{watch.frequency}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-hairline bg-surface-inset">
              <Hash className="w-3.5 h-3.5 text-ink-muted" />
              <span className="text-xs font-mono text-ink-body">{watch.significanceThreshold} / 10</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-hairline bg-surface-inset">
              <TrendingUp className="w-3.5 h-3.5 text-success" />
              <span className="text-xs font-mono text-ink font-semibold">{findingsCount} signals</span>
            </div>

            {/* Run Now Button */}
            <button
              onClick={handleRunNow}
              disabled={isRunDisabled}
              className="flex min-h-10 items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-medium text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
              <span>{runLabel}</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.5 text-[9px] font-mono bg-white/20 rounded">
                <Command className="w-2.5 h-2.5" />R
              </kbd>
            </button>

            {/* Settings toggle */}
            <button
              onClick={onSettingsToggle}
              className={`flex min-h-10 items-center gap-2 rounded-md border px-4 py-2 text-xs font-medium ${
                showSettings
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-inset hover:bg-surface text-ink border-hairline"
              }`}
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Configure</span>
            </button>
          </div>
        </div>

        {/* Search queries */}
        <div className="pt-4 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-mono text-ink-faint shrink-0" suppressHydrationWarning>
            Last run: {formatLastRun(watch.lastRunAt)}
          </span>
          {watch.searchQueries && watch.searchQueries.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {watch.searchQueries.map((q, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md border border-hairline bg-surface-inset text-xs font-mono text-ink-muted"
                >
                  {q}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    <Dialog open={showInsufficientTokens} onOpenChange={setShowInsufficientTokens}>
      <DialogContent className="workspace-panel max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-ink">More tokens are needed</DialogTitle>
          <DialogDescription className="text-sm leading-6 text-ink-muted">This watch run needs at least 10 tokens. Your current balance is {tokenBalance ?? 0}. Upgrade your plan to continue monitoring this watch.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex-col gap-2 border-0 bg-transparent p-0 sm:flex-row">
          <Button type="button" variant="outline" onClick={() => setShowInsufficientTokens(false)} className="min-h-10 border-hairline bg-surface text-xs">Not now</Button>
          <Link href="/settings/billing" onClick={() => setShowInsufficientTokens(false)} className="inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-on-primary hover:bg-primary-hover">View subscription</Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
