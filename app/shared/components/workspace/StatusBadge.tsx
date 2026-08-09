type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

interface StatusBadgeProps {
  readonly label: string;
  readonly tone?: StatusTone;
}

const TONE_CLASSES: Record<StatusTone, string> = {
  neutral: "bg-surface-inset text-ink-muted",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
};

export function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] ${TONE_CLASSES[tone]}`}><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />{label}</span>;
}
