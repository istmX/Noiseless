import { ArrowLeft, Clock, Hash, Mail, Search, Layers, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { FindingTimeline } from "./findings/components/FindingTimeline";
import { DigestHistory } from "./digests/components/DigestHistory";
import { Finding } from "./findings/types";
import { Digest } from "./digests/types";

// Real data arrays (empty states)
const mockFindings: Finding[] = [];
const mockDigests: Digest[] = [];

interface WatchDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchDetailPage({ params }: WatchDetailPageProps) {
  const { id } = await params;

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

      {/* Header Workstation Section */}
      <div className="bg-surface border border-hairline rounded-2xl p-6 sm:p-8 mb-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-hairline">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono tracking-wider bg-primary-soft text-primary border border-primary/20 uppercase font-medium">
                MONITORING
              </span>
              <span className="text-xs font-mono text-ink-muted">
                ID: {id}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-semibold text-ink tracking-tight">
              OpenAI Product Announcements
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-surface-inset px-4 py-2 rounded-lg border border-hairline flex items-center gap-2">
              <Clock className="w-4 h-4 text-ink-muted" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-ink-faint uppercase">Frequency</span>
                <span className="text-xs font-mono font-medium text-ink">Hourly</span>
              </div>
            </div>

            <div className="bg-surface-inset px-4 py-2 rounded-lg border border-hairline flex items-center gap-2">
              <Hash className="w-4 h-4 text-ink-muted" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-ink-faint uppercase">Min Score</span>
                <span className="text-xs font-mono font-medium text-ink">8 / 10</span>
              </div>
            </div>

            <div className="bg-surface-inset px-4 py-2 rounded-lg border border-hairline flex items-center gap-2">
              <FileText className="w-4 h-4 text-ink-muted" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-ink-faint uppercase">Findings</span>
                <span className="text-xs font-mono font-medium text-ink">{mockFindings.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Queries List */}
        <div className="pt-6">
          <span className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-3 block">
            Target Search Queries
          </span>
          <div className="flex flex-wrap gap-2">
            <span className="bg-surface-inset px-3 py-1 rounded-md border border-hairline text-xs font-mono text-ink flex items-center gap-1.5">
              <Search className="w-3 h-3 text-ink-muted" />
              <span>site:openai.com/blog</span>
            </span>
            <span className="bg-surface-inset px-3 py-1 rounded-md border border-hairline text-xs font-mono text-ink flex items-center gap-1.5">
              <Search className="w-3 h-3 text-ink-muted" />
              <span>OpenAI release</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Findings & Digests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Findings Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-hairline">
            <h2 className="text-lg font-sans font-semibold text-ink flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <span>Findings Timeline</span>
            </h2>
            <span className="text-xs font-mono text-ink-muted">
              {mockFindings.length} captured
            </span>
          </div>

          <FindingTimeline findings={mockFindings} />
        </div>

        {/* Right Column: Digest History (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-hairline">
            <h2 className="text-lg font-sans font-semibold text-ink flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Digest History</span>
            </h2>
            <span className="text-xs font-mono text-ink-muted">
              {mockDigests.length} dispatched
            </span>
          </div>

          <DigestHistory digests={mockDigests} />
        </div>
      </div>
    </div>
  );
}
