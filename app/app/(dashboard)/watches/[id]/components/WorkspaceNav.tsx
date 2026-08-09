"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface WorkspaceNavProps {
  watchId: string;
}

export function WorkspaceNav({ watchId }: WorkspaceNavProps) {
  const pathname = usePathname();
  
  const baseRoute = `/watches/${watchId}`;
  const tabs = [
    { label: "Overview", href: baseRoute, exact: true },
    { label: "Summary", href: `${baseRoute}/summary`, exact: false },
    { label: "Evidence", href: `${baseRoute}/evidence`, exact: false }
  ];

  return (
    <nav className="flex items-center gap-1 bg-surface-inset p-0.5 rounded-md border border-hairline w-fit shrink-0">
      {tabs.map((tab) => {
        const isActive = tab.exact 
          ? pathname === tab.href 
          : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`px-4 py-1.5 text-xs font-mono font-medium rounded transition-all leading-none ${
              isActive
                ? "bg-surface text-ink shadow-sm border border-hairline"
                : "text-ink-muted hover:text-ink border border-transparent"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
