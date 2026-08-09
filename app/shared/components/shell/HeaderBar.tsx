"use client";

import { Command, Plus, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useWatchDrawerStore } from "../../hooks/useWatchDrawerStore";

interface HeaderBarProps {
  onOpenCommand?: () => void;
}

const PAGE_TITLES: ReadonlyArray<{ readonly match: string; readonly title: string }> = [
  { match: "/watches", title: "Watches" },
  { match: "/settings", title: "Settings" },
  { match: "/dashboard", title: "Dashboard" },
];

function getPageTitle(pathname: string | null) {
  return PAGE_TITLES.find((page) => pathname?.startsWith(page.match))?.title ?? "Workspace";
}

export function HeaderBar({ onOpenCommand }: HeaderBarProps) {
  const pathname = usePathname();
  const openDrawer = useWatchDrawerStore((state) => state.openDrawer);
  const pageTitle = getPageTitle(pathname);
  const showCreateAction = pathname?.startsWith("/dashboard") || pathname?.startsWith("/watches");

  return (
    <header className="flex min-h-16 items-center justify-between border-b border-hairline bg-canvas px-4 sm:px-6 lg:px-8">
      <div className="min-w-0">
        <p className="workspace-kicker">Noiseless / workspace</p>
        <h1 className="truncate text-sm font-semibold text-ink">{pageTitle}</h1>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onOpenCommand}
          aria-label="Open command menu"
          className="inline-flex min-h-10 items-center gap-2 rounded-md border border-hairline bg-surface px-3 text-xs text-ink-muted hover:border-hairline-strong hover:text-ink"
        >
          <Search aria-hidden="true" className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden items-center gap-0.5 rounded border border-hairline bg-surface-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-faint sm:flex">
            <Command aria-hidden="true" className="h-2.5 w-2.5" />K
          </kbd>
        </button>

        {showCreateAction && (
          <button
            type="button"
            onClick={openDrawer}
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-on-primary hover:bg-primary-hover"
          >
            <Plus aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New watch</span>
          </button>
        )}
      </div>
    </header>
  );
}
