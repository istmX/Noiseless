import { prisma } from "@/shared/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Globe, Clock, Award, ShieldAlert, ExternalLink } from "lucide-react";

interface EvidenceDetailPageProps {
  params: Promise<{ id: string; evidenceId: string }>;
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "source";
  }
}

export default async function EvidenceDetailPage({ params }: EvidenceDetailPageProps) {
  const { id, evidenceId } = await params;

  const finding = await prisma.finding.findUnique({
    where: { id: evidenceId },
    include: {
      watch: true
    }
  });

  if (!finding || finding.watchId !== id) {
    redirect(`/watches/${id}/evidence`);
  }

  const domain = getHostname(finding.url);
  const isConflict = (finding.keyFact || finding.content || "").toLowerCase().includes("conflict") || 
                     finding.title.toLowerCase().includes("conflict") ||
                     (finding.keyFact || finding.content || "").toLowerCase().includes("however");

  return (
    <div className="h-full overflow-y-auto pr-1 scrollbar-hide pb-12">
      <div className="max-w-2xl mx-auto flex flex-col gap-6 pt-2">
        {/* Back Link */}
        <Link
          href={`/watches/${id}/evidence`}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-ink transition-colors w-fit group shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to evidence
        </Link>

        {/* Article Container */}
        <article className="workspace-panel p-6 flex flex-col gap-5">
          <header className="space-y-3 border-b border-hairline pb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-ink bg-surface-inset px-2.5 py-0.5 rounded border border-hairline uppercase shrink-0">
                <Globe className="w-3 h-3 text-ink-faint shrink-0" />
                <span>{domain}</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-inset text-ink-muted border border-hairline uppercase">
                {finding.category}
              </span>
              {isConflict && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-warning-soft text-warning border border-warning/20 text-[10px] font-mono">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Conflicting Evidence</span>
                </span>
              )}
            </div>

            <h1 className="text-lg font-sans font-bold text-ink leading-snug">
              {finding.title}
            </h1>
          </header>

          {/* Evidence Content Section */}
          <div className="space-y-2">
            <h2 className="text-[10px] font-mono font-bold text-ink uppercase tracking-wider">
              Extracted Evidence snippet
            </h2>
            <div className="p-4 bg-surface-inset border border-hairline rounded-lg text-xs font-sans text-ink-body leading-relaxed whitespace-pre-line">
              {finding.keyFact || finding.content}
            </div>
          </div>

          {/* Significance Context */}
          <div className="space-y-2 pt-2">
            <h2 className="text-[10px] font-mono font-bold text-ink uppercase tracking-wider">
              Analysis & Significance
            </h2>
            <div className="p-4 bg-surface border border-hairline rounded-lg space-y-3 text-xs font-sans text-ink-body">
              <div className="flex items-center justify-between border-b border-hairline pb-2">
                <span className="text-ink-muted flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-accent" />
                  <span>Credibility score</span>
                </span>
                <span className="font-mono font-semibold text-ink">{finding.score}/10</span>
              </div>
              <p className="leading-relaxed">
                This evidence was captured and processed by the background analyst agent because its significance score of {finding.score} met your watch requirements.
              </p>
            </div>
          </div>

          {/* Meta Grid details */}
          <div className="space-y-2 pt-2">
            <h2 className="text-[10px] font-mono font-bold text-ink uppercase tracking-wider">
              Source details
            </h2>
            <div className="border border-hairline rounded-lg overflow-hidden bg-surface-inset text-[11px] font-mono divide-y divide-hairline">
              <div className="px-4 py-2.5 flex justify-between gap-4">
                <span className="text-ink-faint shrink-0">Captured at:</span>
                <span className="text-ink-body text-right truncate">
                  {new Date(finding.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="px-4 py-2.5 flex justify-between gap-4">
                <span className="text-ink-faint shrink-0">Original Link:</span>
                <a
                  href={finding.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline truncate text-right max-w-[160px] sm:max-w-[280px]"
                >
                  {finding.url}
                </a>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex justify-end pt-4 border-t border-hairline">
            <a
              href={finding.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-medium text-on-primary hover:bg-primary-hover w-fit"
            >
              <span>Visit original source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
