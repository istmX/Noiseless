"use client";

import { Digest } from "../types";
import { Mail, MessageSquare, ExternalLink, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface DigestCardProps {
  digest: Digest;
}

export function DigestCard({ digest }: DigestCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-surface border border-hairline rounded-xl shadow-xs hover:border-hairline-strong transition-all flex flex-col gap-4"
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
            <span className="p-1 rounded bg-surface-inset text-ink-muted border border-hairline" title="Delivered to Email">
              <Mail className="w-3.5 h-3.5" />
            </span>
          )}
          {digest.deliveredSlack && (
            <span className="p-1 rounded bg-surface-inset text-ink-muted border border-hairline" title="Delivered to Slack">
              <MessageSquare className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </div>

      <p className="text-xs font-sans text-ink leading-relaxed bg-surface-inset p-4 rounded-lg border border-hairline">
        {digest.summary}
      </p>

      {digest.citations && digest.citations.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-xs font-mono uppercase tracking-wider text-ink-muted">Citations</span>
          <div className="flex flex-wrap gap-2">
            {digest.citations.map((url, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-primary hover:underline flex items-center gap-1 bg-primary-soft px-2 py-0.5 rounded border border-primary/20"
              >
                <span>{new URL(url).hostname}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
