"use client";

import { useState, useMemo } from "react";
import { Sparkles, Calendar, ChevronLeft, ChevronRight, FileText, ArrowRight, ExternalLink, HelpCircle } from "lucide-react";
import { Watch } from "../../types";
import { Finding } from "../findings/types";
import { Digest } from "../digests/types";
import Link from "next/link";

interface WatchSummaryViewProps {
  watch: Watch;
  findings: Finding[];
  digests: Digest[];
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "source";
  }
}

export function WatchSummaryView({ watch, findings, digests }: WatchSummaryViewProps) {
  // Version state: index of selected digest in array (0 is latest since sorted desc)
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selectedDigest = digests[selectedIdx] || null;

  // Navigation handlers
  const hasPrev = selectedIdx < digests.length - 1;
  const hasNext = selectedIdx > 0;

  const handlePrev = () => {
    if (hasPrev) setSelectedIdx((i) => i + 1);
  };

  const handleNext = () => {
    if (hasNext) setSelectedIdx((i) => i - 1);
  };

  // Parser to replace URLs with superscript index numbers
  const parsedBrief = useMemo(() => {
    if (!selectedDigest) return { elements: [], urls: [] };

    const text = selectedDigest.summary;
    const urlRegex = /(https?:\/\/[^\s\)]+)/g;
    const urls = Array.from(new Set(text.match(urlRegex) || []));

    // Split text into paragraphs
    const paragraphs = text.split(/\n\n+/);
    
    const elements = paragraphs.map((para, pIdx) => {
      const parts = para.split(urlRegex);
      return (
        <p key={pIdx} className="text-xs leading-relaxed text-ink-body">
          {parts.map((part, index) => {
            if (part.match(/^https?:\/\//)) {
              const urlIdx = urls.indexOf(part);
              return (
                <a
                  key={index}
                  href={`#citation-${urlIdx + 1}`}
                  className="text-accent hover:underline font-mono text-[9px] font-bold align-super mx-0.5 focus:outline-none"
                  title={getHostname(part)}
                >
                  [{urlIdx + 1}]
                </a>
              );
            }
            return <span key={index}>{part}</span>;
          })}
        </p>
      );
    });

    return { elements, urls };
  }, [selectedDigest]);

  // Map URLs to local findings in database
  const bibliography = useMemo(() => {
    if (!parsedBrief.urls.length) return [];
    return parsedBrief.urls.map((url, index) => {
      const matched = findings.find((f) => f.url === url);
      return {
        index: index + 1,
        url,
        title: matched?.title || getHostname(url),
        findingId: matched?.id || null,
        score: matched?.significanceScore || null
      };
    });
  }, [parsedBrief.urls, findings]);

  return (
    <div className="pb-12">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        
        {/* Version switcher */}
        {digests.length > 1 && (
          <div className="flex items-center justify-between p-3 border border-hairline bg-surface rounded-md shrink-0">
            <span className="text-[10px] font-mono text-ink-faint">
              Brief version {digests.length - selectedIdx} of {digests.length}
            </span>
            
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={!hasPrev}
                className="p-1 rounded hover:bg-surface-inset border border-hairline disabled:opacity-30 disabled:cursor-not-allowed"
                title="Older brief version"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                disabled={!hasNext}
                className="p-1 rounded hover:bg-surface-inset border border-hairline disabled:opacity-30 disabled:cursor-not-allowed"
                title="Newer brief version"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Editorial Reading Area */}
        <article className="space-y-6 pt-2">
          <header className="space-y-2 border-b border-hairline pb-4">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-accent flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Research Summary Brief</span>
            </span>
            <h1 className="text-xl font-sans font-bold text-ink leading-tight">
              {watch.topic} Synthesis
            </h1>
            {selectedDigest && (
              <p className="text-[11px] font-mono text-ink-faint" suppressHydrationWarning>
                Compiled {new Date(selectedDigest.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at {new Date(selectedDigest.createdAt).toLocaleTimeString()}
              </p>
            )}
          </header>

          {/* Reading body */}
          {selectedDigest ? (
            <div className="space-y-4">
              {parsedBrief.elements}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface border border-hairline rounded-lg">
              <FileText className="w-8 h-8 text-ink-faint mx-auto mb-3" />
              <p className="text-xs text-ink-muted">No summary brief is available yet. Run a scan to generate intelligence briefs.</p>
            </div>
          )}
        </article>

        {/* SECTION: BIBLIOGRAPHY / SOURCES */}
        {bibliography.length > 0 && (
          <section className="space-y-4 pt-8 border-t border-hairline">
            <h2 className="text-[10px] font-mono font-bold text-ink uppercase tracking-wider">
              Cited Sources & Bibliography
            </h2>
            
            <div className="space-y-3">
              {bibliography.map((item) => (
                <div
                  key={item.index}
                  id={`citation-${item.index}`}
                  className="group flex gap-4 p-3 bg-surface border border-hairline rounded-lg hover:border-hairline-strong transition-colors text-left"
                >
                  {/* Number index */}
                  <span className="text-xs font-mono font-bold text-ink-faint shrink-0 mt-0.5">
                    [{item.index}]
                  </span>

                  {/* Title / details */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono text-ink-muted uppercase">
                        {getHostname(item.url)}
                      </span>
                      {item.score && (
                        <span className="text-[9px] font-mono bg-surface-inset text-ink-faint px-1.5 py-0.5 rounded border border-hairline">
                          Credibility: {item.score}/10
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xs font-sans font-semibold text-ink leading-snug truncate">
                      {item.title}
                    </h3>
                  </div>

                  {/* Open details page or original link */}
                  <div className="flex items-center gap-2 shrink-0">
                    {item.findingId ? (
                      <Link
                        href={`/watches/${watch.id}/evidence/${item.findingId}`}
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-accent hover:underline"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] font-mono text-accent hover:underline"
                      >
                        <span>Visit ↗</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
