import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly breadcrumbs?: readonly string[];
  readonly actions?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-hairline pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.1em] text-ink-faint">
            {breadcrumbs.map((crumb, index) => <span key={`${crumb}-${index}`} className="flex items-center gap-1.5"><span>{crumb}</span>{index < breadcrumbs.length - 1 && <ChevronRight aria-hidden="true" className="h-3 w-3" />}</span>)}
          </nav>
        ) : eyebrow ? <p className="workspace-kicker">{eyebrow}</p> : null}
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}
