import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
  readonly action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return <div className="workspace-panel flex min-h-64 flex-col items-center justify-center px-6 py-10 text-center"><Icon aria-hidden="true" className="h-6 w-6 text-ink-faint" /><h2 className="mt-4 text-base font-semibold text-ink">{title}</h2><p className="mt-2 max-w-md text-sm leading-6 text-ink-muted">{description}</p>{action && <div className="mt-5">{action}</div>}</div>;
}
