"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { Eye, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useWatchDrawerStore } from "@/shared/hooks/useWatchDrawerStore";
import { Watch } from "../types";
import { PageHeader } from "@/shared/components/workspace/PageHeader";
import { StatusBadge } from "@/shared/components/workspace/StatusBadge";

type StatusFilter = "ALL" | "MONITORING" | "RUNNING" | "PAUSED";

const STATUS_FILTERS: readonly StatusFilter[] = ["ALL", "MONITORING", "RUNNING", "PAUSED"];

function getStatus(watch: Watch): Exclude<StatusFilter, "ALL"> {
  if (watch.runInProgress) return "RUNNING";
  if (!watch.active) return "PAUSED";
  return "MONITORING";
}

function formatRun(date: Date | null) {
  if (!date) return "Not run yet";
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(date));
}

export function AllWatchesList({ watches }: { readonly watches: readonly Watch[] }) {
  const openDrawer = useWatchDrawerStore((state) => state.openDrawer);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search).trim().toLowerCase();
  const filteredWatches = useMemo(() => watches.filter((watch) => {
    const matchesStatus = statusFilter === "ALL" || getStatus(watch) === statusFilter;
    const matchesSearch = !deferredSearch || watch.topic.toLowerCase().includes(deferredSearch) || watch.searchQueries.some((query) => query.toLowerCase().includes(deferredSearch));
    return matchesStatus && matchesSearch;
  }), [deferredSearch, statusFilter, watches]);

  const activeCount = watches.filter((watch) => watch.active).length;
  const runningCount = watches.filter((watch) => watch.runInProgress).length;
  const pausedCount = watches.length - activeCount;

  return <section className="flex min-w-0 flex-col gap-6">
    <PageHeader eyebrow="Operational inventory" title="Watches" description="Manage every intelligence surface in this workspace." actions={<button type="button" onClick={openDrawer} className="workspace-action inline-flex items-center justify-center gap-2 bg-primary text-on-primary hover:bg-primary-hover"><Plus aria-hidden="true" className="h-3.5 w-3.5" />New watch</button>} />
    {!!watches.length && <div aria-label="Watch status summary" className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-hairline pb-5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint"><span><strong className="font-semibold text-ink">{activeCount}</strong> active</span><span><strong className="font-semibold text-ink">{runningCount}</strong> running</span><span><strong className="font-semibold text-ink">{pausedCount}</strong> paused</span></div>}
    {!watches.length ? <div className="workspace-panel flex min-h-72 flex-col items-center justify-center px-6 text-center"><Eye aria-hidden="true" className="h-6 w-6 text-ink-faint" /><h3 className="mt-4 text-base font-semibold text-ink">No watches configured</h3><p className="mt-2 max-w-sm text-sm leading-6 text-ink-muted">Create a watch to start filtering the web for material changes.</p><button type="button" onClick={openDrawer} className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-on-primary hover:bg-primary-hover"><Plus aria-hidden="true" className="h-3.5 w-3.5" />Create watch</button></div> : <>
      <div className="workspace-panel flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between"><div className="relative min-w-0 sm:w-80"><Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" /><label htmlFor="watch-search" className="sr-only">Search watches</label><input id="watch-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search watches and queries" className="min-h-10 w-full rounded-md border border-hairline bg-surface px-9 text-sm text-ink placeholder:text-ink-faint" /></div><div className="flex flex-wrap gap-1">{STATUS_FILTERS.map((status) => <button key={status} type="button" onClick={() => setStatusFilter(status)} className={`min-h-9 rounded-md px-2.5 font-mono text-[10px] tracking-[0.08em] ${status === statusFilter ? "bg-accent-soft text-accent" : "text-ink-muted hover:bg-surface-inset hover:text-ink"}`}>{status}</button>)}</div></div>
      <div className="workspace-panel overflow-hidden"><div className="flex items-center justify-between border-b border-hairline px-4 py-3 sm:px-5"><p className="text-xs text-ink-muted"><span className="font-medium text-ink">{filteredWatches.length}</span> matching watches</p><SlidersHorizontal aria-hidden="true" className="h-4 w-4 text-ink-faint" /></div><div className="hidden grid-cols-[minmax(14rem,1.8fr)_minmax(7rem,.65fr)_minmax(7rem,.65fr)_minmax(8rem,.8fr)_minmax(6rem,.45fr)] gap-4 border-b border-hairline bg-surface-inset px-5 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint md:grid"><span>Watch</span><span>Status</span><span>Cadence</span><span>Last run</span><span className="text-right">Signals</span></div><div className="divide-y divide-hairline">{filteredWatches.map((watch) => <Link key={watch.id} href={`/watches/${watch.id}`} className="group grid min-w-0 gap-3 px-4 py-4 transition-colors hover:bg-surface-inset md:grid-cols-[minmax(14rem,1.8fr)_minmax(7rem,.65fr)_minmax(7rem,.65fr)_minmax(8rem,.8fr)_minmax(6rem,.45fr)] md:items-center md:gap-4 md:px-5"><span className="min-w-0"><span className="block truncate text-sm font-medium text-ink group-hover:text-accent">{watch.topic}</span><span className="mt-1 block truncate font-mono text-[10px] text-ink-faint">{watch.searchQueries.length} query terms <span aria-hidden="true">·</span> threshold {watch.significanceThreshold}/10</span></span><StatusLabel status={getStatus(watch)} /><span className="font-mono text-[11px] uppercase text-ink-muted">{watch.frequency}</span><span className="font-mono text-[11px] text-ink-muted">{formatRun(watch.lastRunAt)}</span><span className="font-mono text-sm tabular-nums text-ink md:text-right">{watch._count?.findings ?? 0}</span></Link>)}</div>{!filteredWatches.length && <div className="px-6 py-14 text-center"><p className="text-sm font-medium text-ink">No watches match these filters</p><p className="mt-2 text-sm text-ink-muted">Try a different search term or state.</p></div>}</div>
    </>}</section>;
}

function StatusLabel({ status }: { readonly status: Exclude<StatusFilter, "ALL"> }) {
  const tone: "info" | "neutral" | "success" = status === "RUNNING" ? "info" : status === "PAUSED" ? "neutral" : "success";
  return <StatusBadge label={status} tone={tone} />;
}
