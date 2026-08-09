"use client";

import { Digest } from "../types";
import { Mail, MessageSquare, ExternalLink, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface DigestCardProps {
  digest: Digest;
  onCitationClick?: (url: string) => void;
}

export function DigestCard({ digest, onCitationClick }: DigestCardProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (onCitationClick) {
      e.preventDefault();
      onCitationClick(url);
    }
  };

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
            onClick={(e) => handleLinkClick(e, part)}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-accent-soft text-accent rounded hover:underline font-mono text-[11px] border border-accent/20 align-middle mx-0.5"
          >
            {hostname}
            <ExternalLink className="w-2.5 h-2.5" />
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
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4 rounded-lg border border-hairline bg-surface p-5 transition-colors hover:border-hairline-strong"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-accent-soft text-accent flex items-center justify-center border border-accent/20">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono font-semibold text-ink uppercase tracking-wider">
            AI Digest Report
          </span>
          <span className="text-xs font-mono text-ink-muted">
            • {new Date(digest.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {digest.deliveredEmail && (
            <span className="p-1 rounded-md bg-surface-inset text-ink-muted border border-hairline flex items-center gap-1 text-[10px] font-mono" title="Delivered to Email">
              <Mail className="w-3 h-3 text-success" />
              <span>Email</span>
            </span>
          )}
          {digest.deliveredSlack && (
            <span className="p-1 rounded-md bg-surface-inset text-ink-muted border border-hairline flex items-center gap-1 text-[10px] font-mono" title="Delivered to Slack">
              <MessageSquare className="w-3 h-3 text-info" />
              <span>Slack</span>
            </span>
          )}
        </div>
      </div>

      <div className="text-xs font-sans text-ink leading-relaxed bg-surface-inset p-4 rounded-lg border border-hairline whitespace-pre-line">
        {renderFormattedText(digest.summary)}
      </div>

      {digest.citations && digest.citations.length > 0 && (
        <div className="space-y-2 pt-1 border-t border-hairline">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink-muted">RETRIEVED CITATIONS</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {digest.citations.map((url, i) => (
              <a
                key={i}
                href={url}
                onClick={(e) => handleLinkClick(e, url)}
                className="text-xs font-mono text-ink hover:text-accent flex items-center justify-between bg-surface-inset px-3 py-1.5 rounded-md border border-hairline hover:border-hairline-strong transition-all group"
              >
                <span className="truncate mr-2 text-[11px]">{new URL(url).hostname}</span>
                <ExternalLink className="w-3 h-3 shrink-0 text-ink-faint group-hover:text-accent transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
