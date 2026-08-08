"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { ArrowLeft, Clock, Hash, FileText, Search, Plus, X, Sliders, ChevronDown, ChevronUp, Layers, Sparkles, Mail, MessageSquare, Play } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { FindingTimeline } from "../findings/components/FindingTimeline";
import { DigestHistory } from "../digests/components/DigestHistory";
import { Finding } from "../findings/types";
import { Digest } from "../digests/types";
import { Watch } from "../../types";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { deleteWatch, updateWatch, runWatchNow } from "../../actions";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";

interface WatchDetailViewProps {
  watch: Watch;
  findings: Finding[];
  digests: Digest[];
}

export function WatchDetailView({ watch, findings, digests }: WatchDetailViewProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [active, setActive] = useState(watch.active);
  const [frequency, setFrequency] = useState(watch.frequency);
  const [threshold, setThreshold] = useState(watch.significanceThreshold);
  const [queries, setQueries] = useState<string[]>(watch.searchQueries);
  const [newQuery, setNewQuery] = useState("");
  const [notificationEmail, setNotificationEmail] = useState(watch.notificationEmail || "");
  const [notificationSlackWebhook, setNotificationSlackWebhook] = useState(watch.notificationSlackWebhook || "");
  const [isPending, startTransition] = useTransition();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  const [prevRunInProgress, setPrevRunInProgress] = useState(watch.runInProgress);
  const [initialFindingsCount, setInitialFindingsCount] = useState(findings.length);

  useEffect(() => {
    if (watch.runInProgress && !prevRunInProgress) {
      setInitialFindingsCount(findings.length);
      setPrevRunInProgress(true);
    }
    if (!watch.runInProgress && prevRunInProgress) {
      setPrevRunInProgress(false);
      if (findings.length === initialFindingsCount) {
        toast.info("Scan complete. No new updates found (all search results were duplicates).");
      } else {
        toast.success(`Scan complete. Found ${findings.length - initialFindingsCount} new findings!`);
      }
    }
  }, [watch.runInProgress, findings.length, prevRunInProgress, initialFindingsCount]);

  useEffect(() => {
    if (watch.runInProgress) {
      const interval = setInterval(() => {
        router.refresh();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [watch.runInProgress, router]);

  const hasChanges = 
    active !== watch.active ||
    frequency !== watch.frequency ||
    threshold !== watch.significanceThreshold ||
    JSON.stringify(queries) !== JSON.stringify(watch.searchQueries) ||
    notificationEmail !== (watch.notificationEmail || "") ||
    notificationSlackWebhook !== (watch.notificationSlackWebhook || "");

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateWatch(watch.id, {
        active,
        frequency,
        significanceThreshold: threshold,
        searchQueries: queries,
        notificationEmail: notificationEmail || null,
        notificationSlackWebhook: notificationSlackWebhook || null,
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Watch configuration updated successfully");
      }
    });
  };

  const handleRunNow = () => {
    startTransition(async () => {
      const result = await runWatchNow(watch.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Background agent pipeline triggered successfully");
      }
    });
  };

  const confirmDelete = () => {
    startTransition(async () => {
      const result = await deleteWatch(watch.id);
      if (result.error) {
        toast.error(result.error);
        setShowDeleteConfirm(false);
      } else {
        toast.success("Watch deleted successfully");
        router.push("/watches");
      }
    });
  };

  const handleAddQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuery.trim() && !queries.includes(newQuery.trim())) {
      setQueries([...queries, newQuery.trim()]);
      setNewQuery("");
    }
  };

  const handleRemoveQuery = (index: number) => {
    setQueries(queries.filter((_, i) => i !== index));
  };

  return (
    <div className="relative flex flex-col w-full max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 min-h-screen">
      {/* Back Navigation */}
      <Link 
        href="/watches"
        className="inline-flex items-center gap-2 text-xs font-mono text-ink-muted hover:text-ink transition-colors mb-6 group w-fit"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Watches</span>
      </Link>

      {/* Header Panel */}
      <div className="bg-surface border border-hairline rounded-lg p-6 sm:p-8 mb-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-hairline">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className={`px-2.5 py-0.5 rounded-sm text-xs font-mono tracking-wider border uppercase font-medium ${
                active ? "bg-primary-soft text-primary border-primary/20" : "bg-surface-inset text-ink-muted border-hairline"
              }`}>
                {active ? "MONITORING" : "PAUSED"}
              </span>
              <span className="text-xs font-mono text-ink-muted">
                ID: {watch.id}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-sans font-semibold text-ink tracking-tight">
              {watch.topic}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-surface-inset px-4 py-2 rounded-sm border border-hairline flex items-center gap-2">
              <Clock className="w-4 h-4 text-ink-muted" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-ink-faint uppercase">Frequency</span>
                <span className="text-xs font-mono font-medium text-ink capitalize">{frequency}</span>
              </div>
            </div>

            <div className="bg-surface-inset px-4 py-2 rounded-sm border border-hairline flex items-center gap-2">
              <Hash className="w-4 h-4 text-ink-muted" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-ink-faint uppercase">Min Score</span>
                <span className="text-xs font-mono font-medium text-ink">{threshold} / 10</span>
              </div>
            </div>

            <div className="bg-surface-inset px-4 py-2 rounded-sm border border-hairline flex items-center gap-2">
              <FileText className="w-4 h-4 text-ink-muted" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-ink-faint uppercase">Findings</span>
                <span className="text-xs font-mono font-medium text-ink">{findings.length}</span>
              </div>
            </div>

            <Button
              onClick={handleRunNow}
              disabled={isPending || watch.runInProgress}
              className="bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium rounded-full px-4 h-10 flex items-center gap-2 cursor-pointer text-xs"
            >
              <Play className="w-4 h-4" />
              <span>{watch.runInProgress ? "Running..." : "Run Now"}</span>
            </Button>

            <Button
              onClick={() => setShowSettings(!showSettings)}
              className="bg-surface-inset border border-hairline text-ink hover:bg-primary-soft rounded-full px-4 h-10 flex items-center gap-2 cursor-pointer text-xs"
            >
              <Sliders className="w-4 h-4" />
              <span>Configure</span>
              {showSettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </Button>
          </div>
        </div>

        {/* Collapsible settings panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-b border-hairline"
            >
              <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface-inset -mx-8 px-8 border-t border-hairline">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-hairline">
                    <Label className="text-xs font-mono uppercase text-ink">Watch Configuration</Label>
                    <span className="text-[10px] font-mono text-ink-faint uppercase">UI Preview Only</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-sans font-medium text-ink">Active Monitoring</span>
                      <span className="text-xs text-ink-muted">Enable or disable background execution</span>
                    </div>
                    <button
                      onClick={() => setActive(!active)}
                      disabled={isPending}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        active ? "bg-primary" : "bg-hairline"
                      } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          active ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-body-sm font-medium text-ink">Frequency Interval</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {["hourly", "daily", "weekly"].map((f) => (
                        <button
                          key={f}
                          onClick={() => setFrequency(f)}
                          disabled={isPending}
                          className={`py-2 text-xs font-semibold rounded-md border capitalize cursor-pointer transition-all ${
                            frequency === f
                              ? "bg-primary text-on-primary border-primary"
                              : "bg-surface text-ink-muted border-hairline hover:text-ink"
                          } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-body-sm font-medium text-ink">Min Significance Score Threshold</Label>
                      <span className="text-xs font-mono font-bold text-ink">{threshold} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={threshold}
                      disabled={isPending}
                      onChange={(e) => setThreshold(parseInt(e.target.value))}
                      className="w-full accent-primary h-1 bg-hairline rounded-lg appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <Label className="text-xs font-mono uppercase text-ink block pb-1 border-b border-hairline">Notifications</Label>
                    
                    <div className="space-y-1 relative">
                      <Label className="text-xs font-medium text-ink">Alert Email</Label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
                        <Input
                          type="email"
                          placeholder="alert@example.com"
                          value={notificationEmail}
                          disabled={isPending}
                          onChange={(e) => setNotificationEmail(e.target.value)}
                          className="bg-surface border-hairline font-sans text-xs focus-visible:ring-1 focus-visible:ring-primary-soft focus-visible:border-primary pl-9 h-10 rounded-md w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 relative">
                      <Label className="text-xs font-medium text-ink">Slack Webhook URL</Label>
                      <div className="relative">
                        <MessageSquare className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
                        <Input
                          type="url"
                          placeholder="https://hooks.slack.com/services/..."
                          value={notificationSlackWebhook}
                          disabled={isPending}
                          onChange={(e) => setNotificationSlackWebhook(e.target.value)}
                          className="bg-surface border-hairline font-sans text-xs focus-visible:ring-1 focus-visible:ring-primary-soft focus-visible:border-primary pl-9 h-10 rounded-md w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs font-mono uppercase text-ink block pb-2 border-b border-hairline">Target Search Queries</Label>
                  <form onSubmit={handleAddQuery} className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
                      <Input
                        placeholder="Add search query..."
                        value={newQuery}
                        disabled={isPending}
                        onChange={(e) => setNewQuery(e.target.value)}
                        className="bg-surface border-hairline font-sans text-xs focus-visible:ring-1 focus-visible:ring-primary-soft focus-visible:border-primary pl-9 h-10 rounded-md w-full"
                      />
                    </div>
                    <Button type="submit" size="sm" disabled={isPending} className="h-10 px-4 rounded-md cursor-pointer bg-primary text-on-primary hover:bg-primary-hover">
                      Add
                    </Button>
                  </form>

                  <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto pr-1">
                    {queries.map((q, idx) => (
                      <span key={idx} className="bg-surface px-2.5 py-1 rounded-sm border border-hairline text-[11px] font-mono text-ink flex items-center gap-1.5 shrink-0">
                        <Search className="w-3 h-3 text-ink-muted" />
                        <span>{q}</span>
                        <button
                          onClick={() => handleRemoveQuery(idx)}
                          disabled={isPending}
                          className="hover:text-danger rounded-full hover:bg-danger-soft/10 p-0.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 pt-6 border-t border-hairline flex justify-between items-center gap-4">
                  <div>
                    {hasChanges && (
                      <Button
                        onClick={handleSave}
                        disabled={isPending}
                        className="bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium h-10 px-6 rounded-md cursor-pointer"
                      >
                        {isPending ? "Saving..." : "Save Changes"}
                      </Button>
                    )}
                  </div>
                  <Button
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isPending}
                    className="bg-danger hover:bg-danger/90 text-white font-sans font-medium h-10 px-4 rounded-md cursor-pointer flex items-center gap-2"
                  >
                    Delete Watch
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Static Queries List */}
        {!showSettings && (
          <div className="pt-6">
            <span className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-3 block">
              Target Search Queries
            </span>
            <div className="flex flex-wrap gap-2">
              {queries.map((query, i) => (
                <span key={i} className="bg-surface-inset px-3 py-1 rounded-sm border border-hairline text-xs font-mono text-ink flex items-center gap-1.5">
                  <Search className="w-3 h-3 text-ink-muted" />
                  <span>{query}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:h-[calc(100vh-360px)] lg:min-h-[500px]">
        {/* Left Column: Findings Timeline */}
        <div className="lg:col-span-7 flex flex-col h-full border border-hairline bg-surface rounded-xl p-6 shadow-xs min-h-[400px]">
          <div className="flex items-center justify-between pb-3 border-b border-hairline shrink-0">
            <h2 className="text-lg font-sans font-semibold text-ink flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <span>Findings Timeline</span>
            </h2>
            <span className="text-xs font-mono text-ink-muted">
              {findings.length} captured
            </span>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 mt-4 scrollbar-hide">
            <FindingTimeline findings={findings} />
          </div>
        </div>

        {/* Right Column: Digest History */}
        <div className="lg:col-span-5 flex flex-col h-full border border-hairline bg-surface rounded-xl p-6 shadow-xs min-h-[400px]">
          <div className="flex items-center justify-between pb-3 border-b border-hairline shrink-0">
            <h2 className="text-lg font-sans font-semibold text-ink flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Digest History</span>
            </h2>
            <span className="text-xs font-mono text-ink-muted">
              {digests.length} dispatched
            </span>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 mt-4 scrollbar-hide">
            <DigestHistory digests={digests} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showDeleteConfirm && (
          <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
            <DialogContent className="sm:max-w-[425px] bg-surface border border-hairline rounded-lg p-6 shadow-high">
              <DialogHeader>
                <DialogTitle className="text-xl font-sans font-semibold text-ink">Delete Watch</DialogTitle>
                <DialogDescription className="text-xs text-ink-muted mt-2">
                  Are you sure you want to permanently delete this watch? This action cannot be undone and all captured findings and digests will be lost.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-3 mt-6">
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isPending}
                  className="bg-surface-inset border border-hairline text-ink hover:bg-primary-soft rounded-md px-4 h-10 text-xs cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDelete}
                  disabled={isPending}
                  className="bg-danger hover:bg-danger/90 text-white font-sans font-medium rounded-md px-4 h-10 text-xs cursor-pointer"
                >
                  {isPending ? "Deleting..." : "Delete Permanently"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
