"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, ExternalLink, Search } from "lucide-react";
import { toast } from "sonner";

interface FindingRecord {
  id: string;
  url: string;
  title: string;
  content: string;
  score: number;
  category: string;
  keyFact: string;
  createdAt: Date | string;
  watch: { id: string; topic: string };
}

type TimePeriod = "24h" | "7d" | "30d" | "all";

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(date));
}

function scoreStyle(score: number) {
  if (score >= 8) return "bg-danger-soft text-danger";
  if (score >= 5) return "bg-warning-soft text-warning";
  return "bg-info-soft text-info";
}

export function FindingInspector({ findings, referenceTime }: { readonly findings: readonly FindingRecord[]; readonly referenceTime: number }) {
  const [period, setPeriod] = useState<TimePeriod>("7d");
  const [showAllEarlier, setShowAllEarlier] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(findings[0]?.id ?? null);
  const filteredFindings = useMemo(() => {
    if (period === "all") return findings;
    const cutoff = referenceTime - (period === "24h" ? 24 : period === "7d" ? 24 * 7 : 24 * 30) * 60 * 60 * 1000;
    return findings.filter((finding) => new Date(finding.createdAt).getTime() >= cutoff);
  }, [findings, period, referenceTime]);
  const earlierFindings = useMemo(() => filteredFindings.slice(3), [filteredFindings]);
  const latestFindings = useMemo(() => filteredFindings.slice(0, 3), [filteredFindings]);
  const selectedFinding = useMemo(() => filteredFindings.find((finding) => finding.id === selectedId) ?? filteredFindings[0] ?? null, [filteredFindings, selectedId]);

  const copyFinding = async () => {
    if (!selectedFinding) return;
    await navigator.clipboard.writeText(`${selectedFinding.keyFact}\nSource: ${selectedFinding.url}`);
    toast.success("Finding copied to clipboard");
  };

  if (!filteredFindings.length) {
    return <section className="workspace-panel flex min-h-72 flex-col items-center justify-center px-6 text-center"><Search aria-hidden="true" className="h-6 w-6 text-ink-faint" /><h2 className="mt-4 text-base font-semibold text-ink">No signals in this period</h2><p className="mt-2 max-w-md text-sm leading-6 text-ink-muted">Noiseless is monitoring your active watches. Try a wider time period or wait for new evidence.</p></section>;
  }

  return (
    <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.8fr)]">
      <div className="min-w-0 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-hairline bg-surface p-3"><label htmlFor="signal-period" className="text-xs font-medium text-ink">Evidence period</label><select id="signal-period" value={period} onChange={(event) => { setPeriod(event.target.value as TimePeriod); setShowAllEarlier(false); }} className="min-h-9 rounded-md border border-hairline bg-surface-inset px-2.5 text-xs text-ink"><option value="24h">Last 24 hours</option><option value="7d">Last 7 days</option><option value="30d">Last 30 days</option><option value="all">All time</option></select></div>
        <SignalGroup label="New signals" description="The three latest meaningful changes" findings={latestFindings} selectedId={selectedFinding?.id ?? null} onSelect={setSelectedId} />
        <SignalGroup label="Earlier signals" description="Additional evidence from the current monitoring window" findings={showAllEarlier ? earlierFindings : earlierFindings.slice(0, 3)} selectedId={selectedFinding?.id ?? null} onSelect={setSelectedId} />
        {earlierFindings.length > 3 && <button type="button" onClick={() => setShowAllEarlier((current) => !current)} className="text-xs font-medium text-accent hover:text-ink">{showAllEarlier ? "Show fewer signals" : `Show all ${earlierFindings.length} earlier signals`}</button>}
      </div>
      {selectedFinding && <aside className="workspace-panel-raised min-w-0 self-start p-5 xl:sticky xl:top-5"><p className="workspace-kicker">Selected signal</p><h2 className="mt-3 text-base font-semibold leading-6 text-ink">{selectedFinding.keyFact || selectedFinding.title}</h2><dl className="mt-5 space-y-3 border-y border-hairline py-4 text-sm"><div><dt className="workspace-kicker">Watch</dt><dd className="mt-1 text-ink-body">{selectedFinding.watch.topic}</dd></div><div><dt className="workspace-kicker">Detected</dt><dd className="mt-1 font-mono text-xs text-ink-muted">{formatDate(selectedFinding.createdAt)}</dd></div></dl><details className="group border-b border-hairline py-3"><summary className="cursor-pointer list-none text-xs font-medium text-ink marker:hidden"><span className="flex items-center justify-between gap-3">Why it matters <span className="text-ink-faint transition-transform group-open:rotate-180">⌄</span></span></summary><p className="mt-3 max-h-52 overflow-y-auto text-sm leading-6 text-ink-muted">{selectedFinding.content}</p></details><div className="mt-5 flex flex-wrap gap-2"><Link href={`/watches/${selectedFinding.watch.id}?finding=${selectedFinding.id}`} className="inline-flex min-h-10 items-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-on-primary hover:bg-primary-hover">Open watch detail</Link><a href={selectedFinding.url} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-md border border-hairline px-3 text-xs text-ink-muted hover:bg-surface-inset hover:text-ink"><ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />Source</a><button type="button" onClick={copyFinding} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-hairline px-3 text-xs text-ink-muted hover:bg-surface-inset hover:text-ink"><Copy aria-hidden="true" className="h-3.5 w-3.5" />Copy</button></div></aside>}
    </section>
  );
}

function SignalGroup({ label, description, findings, selectedId, onSelect }: { readonly label: string; readonly description: string; readonly findings: readonly FindingRecord[]; readonly selectedId: string | null; readonly onSelect: (id: string) => void }) {
  if (!findings.length) return null;

  return <section aria-label={label}><div className="mb-3 flex items-end justify-between gap-4"><div><p className="workspace-kicker">{label}</p><p className="mt-1 text-xs text-ink-muted">{description}</p></div><span className="font-mono text-xs text-ink-faint">{findings.length}</span></div><div className="grid gap-2">{findings.map((finding) => <div key={finding.id} className={`rounded-lg border p-4 text-left transition-colors ${selectedId === finding.id ? "border-accent bg-accent-soft" : "border-hairline bg-surface hover:border-hairline-strong hover:bg-surface-inset"}`}><button type="button" onClick={() => onSelect(finding.id)} className="group block w-full text-left"><div className="flex min-w-0 items-start gap-3"><span className={`mt-0.5 shrink-0 rounded-sm px-1.5 py-1 font-mono text-[10px] font-medium ${scoreStyle(finding.score)}`}>{finding.score}/10</span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-mono uppercase tracking-[0.1em] text-ink-faint"><span className="truncate">{finding.watch.topic}</span><span>{finding.category}</span><span>{formatDate(finding.createdAt)}</span></span><span className="mt-2 block text-sm font-medium text-ink group-hover:text-accent">{finding.keyFact || finding.title}</span></span></div></button><div className="mt-3 pl-10"><Link href={`/watches/${finding.watch.id}?finding=${finding.id}`} className="text-xs font-medium text-accent hover:text-ink">Read full signal</Link></div></div>)}</div></section>;
}
