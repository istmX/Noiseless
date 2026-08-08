"use client";

import { Digest } from "../types";
import { Mail, MessageSquare, ExternalLink, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface DigestCardProps {
  digest: Digest;
}

export function DigestCard({ digest }: DigestCardProps) {
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(https?:\/\/[^\s\)]+)/g);
    return parts.map((part, index) => {
      if (part.match(/^https?:\/\//)) {
        let hostname = part;
        try {
          hostname = new URL(part).hostname;
        } catch (e) {}
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-primary-soft text-primary rounded-sm hover:underline font-mono text-[11px] border border-primary/20 align-middle mx-0.5"
          >
            {hostname}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-surface border border-hairline rounded-md shadow-xs hover:border-hairline-strong transition-all flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono font-medium text-ink">
            AI Digest Report
          </span>
          <span className="text-xs font-mono text-ink-muted">
            • {new Date(digest.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {digest.deliveredEmail && (
            <span className="p-1 rounded-sm bg-surface-inset text-ink-muted border border-hairline" title="Delivered to Email">
              <Mail className="w-3.5 h-3.5" />
            </span>
          )}
          {digest.deliveredSlack && (
            <span className="p-1 rounded-sm bg-surface-inset text-ink-muted border border-hairline" title="Delivered to Slack">
              <MessageSquare className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </div>

      <div className="text-xs font-sans text-ink leading-relaxed bg-surface-inset p-4 rounded-sm border border-hairline whitespace-pre-line">
        {renderFormattedText(digest.summary)}
      </div>

      {digest.citations && digest.citations.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-xs font-mono uppercase tracking-wider text-ink-muted">Citations</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {digest.citations.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-primary hover:underline flex items-center justify-between bg-primary-soft px-3 py-1.5 rounded-sm border border-primary/20 hover:border-primary transition-colors"
              >
                <span className="truncate mr-2">{new URL(url).hostname}</span>
                <ExternalLink className="w-3 h-3 shrink-0 text-ink-muted" />
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
