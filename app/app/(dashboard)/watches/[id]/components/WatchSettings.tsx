"use client";

import { useState, useTransition } from "react";
import { Search, Plus, X, Mail, MessageSquare, Lock, Trash2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Watch } from "../../types";
import { deleteWatch, updateWatch } from "../../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/hooks/useAuthStore";

interface WatchSettingsProps {
  watch: Watch;
  open: boolean;
  onClose: () => void;
}

const FREQUENCIES = ["hourly", "daily", "weekly"] as const;

export function WatchSettings({ watch, open, onClose }: WatchSettingsProps) {
  const router = useRouter();
  const { userTier, userEmail } = useAuthStore();
  const isHourlyLocked = userTier === "FREE";

  const [active, setActive] = useState(watch.active);
  const [frequency, setFrequency] = useState(watch.frequency);
  const [threshold, setThreshold] = useState(watch.significanceThreshold);
  const [queries, setQueries] = useState<string[]>(watch.searchQueries);
  const [newQuery, setNewQuery] = useState("");
  const [notificationEmail, setNotificationEmail] = useState(watch.notificationEmail || "");
  const [notificationSlack, setNotificationSlack] = useState(watch.notificationSlackWebhook || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const hasChanges =
    active !== watch.active ||
    frequency !== watch.frequency ||
    threshold !== watch.significanceThreshold ||
    JSON.stringify(queries) !== JSON.stringify(watch.searchQueries) ||
    notificationEmail !== (watch.notificationEmail || "") ||
    notificationSlack !== (watch.notificationSlackWebhook || "");

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateWatch(watch.id, {
        active,
        frequency,
        significanceThreshold: threshold,
        searchQueries: queries,
        notificationEmail: notificationEmail.trim() || userEmail || null,
        notificationSlackWebhook: notificationSlack || null,
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Watch configuration saved.");
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteWatch(watch.id);
      if (result.error) {
        toast.error(result.error);
        setShowDeleteConfirm(false);
      } else {
        toast.success("Watch deleted.");
        router.push("/watches");
      }
    });
  };

  const handleAddQuery = (e: React.FormEvent) => {
    e.preventDefault();
    const q = newQuery.trim();
    if (q && !queries.includes(q)) {
      setQueries([...queries, q]);
      setNewQuery("");
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
          <motion.button
            type="button"
            aria-label="Close watch configuration"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/20"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Configure watch"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl overflow-y-auto border-l border-hairline bg-surface p-5 shadow-high sm:p-6"
          >
            <div className="mb-6 flex items-start justify-between border-b border-hairline pb-4"><div><p className="text-[10px] font-mono uppercase tracking-[0.14em] text-ink-faint">Watch rules</p><h2 className="mt-1 text-lg font-semibold text-ink">Configure watch</h2><p className="mt-1 text-xs text-ink-muted">Change how Noiseless finds and delivers intelligence.</p></div><button type="button" onClick={onClose} className="min-h-10 rounded-md px-3 text-xs text-ink-muted hover:bg-surface-inset hover:text-ink">Close</button></div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Left col: configuration */}
              <div className="space-y-5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-ink-muted border-b border-hairline pb-2">
                  Cadence and significance
                </p>

                {/* Active toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-sans font-medium text-ink">Active Monitoring</p>
                    <p className="text-xs text-ink-muted mt-0.5">Enable or disable background agent</p>
                  </div>
                  <button
                    onClick={() => setActive(!active)}
                    disabled={isPending}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                      active ? "bg-success" : "bg-hairline-strong"
                    } disabled:opacity-50`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ${
                        active ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Frequency */}
                <div className="space-y-2">
                  <Label className="text-xs font-sans font-medium text-ink">Frequency Interval</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {FREQUENCIES.map((f) => {
                      const locked = f === "hourly" && isHourlyLocked;
                      const selected = frequency === f;
                      return (
                        <button
                          key={f}
                          type="button"
                          onClick={() => !locked && setFrequency(f)}
                          disabled={isPending || locked}
                          className={`py-2 text-xs font-medium rounded-md border capitalize flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                            selected
                              ? "bg-primary text-on-primary border-primary"
                              : "bg-surface text-ink-muted border-hairline hover:text-ink"
                          } ${locked ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {f}
                          {locked && <Lock className="w-3 h-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Score threshold */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs font-sans font-medium text-ink">Min Significance Score</Label>
                    <span className="text-xs font-mono font-bold text-ink">{threshold} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={threshold}
                    disabled={isPending}
                    onChange={(e) => setThreshold(parseInt(e.target.value))}
                    className="w-full accent-primary h-1 bg-hairline rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                  />
                </div>

                {/* Notifications */}
                <div className="space-y-3 pt-1">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-ink-muted border-b border-hairline pb-2">
                    Delivery
                  </p>
                  <div className="space-y-1">
                    <Label className="text-xs font-sans font-medium text-ink">Alert Email</Label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
                      <Input
                        type="email"
                        placeholder="alert@example.com"
                        value={notificationEmail}
                        disabled={isPending}
                        onChange={(e) => setNotificationEmail(e.target.value)}
                        className="pl-8 h-9 text-xs font-sans bg-surface border-hairline rounded-md focus-visible:ring-1 focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs font-sans font-medium text-ink">Slack Webhook</Label>
                    <div className="relative">
                      <MessageSquare className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
                      <Input
                        type="url"
                        placeholder="https://hooks.slack.com/services/…"
                        value={notificationSlack}
                        disabled={isPending}
                        onChange={(e) => setNotificationSlack(e.target.value)}
                        className="pl-8 h-9 text-xs font-sans bg-surface border-hairline rounded-md focus-visible:ring-1 focus-visible:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right col: search queries */}
              <div className="space-y-4">
                <p className="text-[10px] font-mono uppercase tracking-widest text-ink-muted border-b border-hairline pb-2">
                  Scope
                </p>
                <form onSubmit={handleAddQuery} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                      placeholder="Add search query…"
                      value={newQuery}
                      disabled={isPending}
                      onChange={(e) => setNewQuery(e.target.value)}
                      className="pl-8 h-9 text-xs font-sans bg-surface border-hairline rounded-md focus-visible:ring-1 focus-visible:ring-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="h-9 px-4 rounded-md text-xs bg-primary text-on-primary hover:bg-primary-hover cursor-pointer"
                  >
                    Add
                  </Button>
                </form>

                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
                  {queries.map((q, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-sm border border-hairline bg-surface text-[11px] font-mono text-ink"
                    >
                      <Search className="w-3 h-3 text-ink-muted" />
                      {q}
                      <button
                        onClick={() => setQueries(queries.filter((_, j) => j !== i))}
                        disabled={isPending}
                        className="ml-0.5 hover:text-danger transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 pt-4 border-t border-hairline flex items-center justify-between gap-3">
                <Button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={isPending}
                  className="bg-surface border border-danger/30 text-danger hover:bg-danger-soft/10 font-sans font-medium rounded-md px-4 h-9 text-xs flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Watch
                </Button>

                {hasChanges && (
                  <Button
                    onClick={handleSave}
                    disabled={isPending}
                    className="bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium rounded-md px-5 h-9 text-xs flex items-center gap-2 cursor-pointer"
                  >
                    {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                    {isPending ? "Saving…" : "Save Changes"}
                  </Button>
                )}
              </div>
            </div>
          </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="sm:max-w-sm bg-surface border border-hairline rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-sans font-semibold text-ink">Delete Watch</DialogTitle>
            <DialogDescription className="text-xs text-ink-muted mt-2">
              This will permanently delete the watch and all its findings and digests. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-5">
            <Button
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isPending}
              className="bg-surface-inset border border-hairline text-ink hover:bg-primary-soft rounded-md px-4 h-9 text-xs cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isPending}
              className="bg-danger hover:bg-danger/90 text-white rounded-md px-4 h-9 text-xs font-medium cursor-pointer flex items-center gap-2"
            >
              {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isPending ? "Deleting…" : "Delete Permanently"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
