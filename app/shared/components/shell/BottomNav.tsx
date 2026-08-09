"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../../constants/shell";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 border-t border-hairline bg-surface px-2 py-1 pb-safe md:hidden"
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[10px] font-medium transition-colors ${
              active
                ? "bg-accent-soft text-accent"
                : "text-ink-muted hover:bg-surface-inset hover:text-ink"
            }`}
          >
            <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
