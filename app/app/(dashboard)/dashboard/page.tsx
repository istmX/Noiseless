import { auth } from "@/shared/lib/auth";
import { getRecentFindings, getWatches } from "../watches/actions";
import { FindingInspector } from "./components/FindingInspector";
import { Activity, Eye } from "lucide-react";
import { PageHeader } from "@/shared/components/workspace/PageHeader";
import { MetricReadout } from "@/shared/components/workspace/MetricReadout";
import { StatusBadge } from "@/shared/components/workspace/StatusBadge";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  const [watches, recentFindings] = await Promise.all([getWatches(), getRecentFindings()]);
  const activeWatches = watches.filter((watch) => watch.active).length;
  const highConfidenceFindings = recentFindings.filter((finding) => finding.score >= 8).length;
  const latestFinding = recentFindings[0];

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader eyebrow="Intelligence desk" title="What changed?" description={`Meaningful changes across your active watches${session?.user?.name ? ` for ${session.user.name}` : ""}.`} actions={<Link href="/watches" className="workspace-action inline-flex items-center bg-primary text-on-primary hover:bg-primary-hover">Manage watches</Link>} />
      <section aria-label="Workspace summary" className="workspace-panel grid grid-cols-2 gap-5 p-4 sm:grid-cols-4 sm:gap-0">
        <MetricReadout label="New signals" value={recentFindings.length} note="Review queue" />
        <MetricReadout label="High confidence" value={highConfidenceFindings} note="Score 8 or higher" />
        <MetricReadout label="Active watches" value={activeWatches} note="Monitoring now" />
        <MetricReadout label="Latest detection" value={latestFinding ? new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(latestFinding.createdAt)) : "None"} note={latestFinding?.watch.topic ?? "Waiting for evidence"} />
      </section>
      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0"><div className="mb-3 flex items-end justify-between"><div><p className="workspace-kicker">Priority signals</p><p className="mt-1 text-xs text-ink-muted">Select a signal to inspect the evidence and source.</p></div><StatusBadge label={recentFindings.length ? "Review queue" : "Monitoring"} tone={recentFindings.length ? "warning" : "success"} /></div><FindingInspector findings={recentFindings} referenceTime={latestFinding ? new Date(latestFinding.createdAt).getTime() : 0} /></div>
        <aside className="space-y-4">
          <section className="workspace-panel p-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Eye aria-hidden="true" className="h-4 w-4 text-ink-muted" /><h2 className="text-sm font-semibold text-ink">Watch coverage</h2></div><Link href="/watches" className="text-xs font-medium text-accent hover:text-ink">View all</Link></div><p className="mt-3 text-2xl font-semibold tabular-nums text-ink">{activeWatches}<span className="ml-1 text-sm font-normal text-ink-muted">active</span></p><p className="mt-1 text-xs leading-5 text-ink-muted">Your monitoring network is running across the configured topics.</p></section>
          <section className="workspace-panel-inset p-4"><div className="flex items-center gap-2"><Activity aria-hidden="true" className="h-4 w-4 text-success" /><p className="workspace-kicker text-ink-muted">Agent activity</p></div><p className="mt-3 text-sm font-medium text-ink">{latestFinding ? "Latest signal captured" : "Monitoring normally"}</p><p className="mt-1 text-xs leading-5 text-ink-muted">{latestFinding ? latestFinding.watch.topic : "New evidence will appear here when it crosses your threshold."}</p><div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-success"><span className="status-dot--running h-1.5 w-1.5 rounded-full" />System available</div></section>
        </aside>
      </div>
    </div>
  );
}
