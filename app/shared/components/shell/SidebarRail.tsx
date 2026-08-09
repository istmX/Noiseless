"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { NAV_ITEMS } from "../../constants/shell";
import { useAuthStore } from "../../hooks/useAuthStore";
import { Logo } from "../Logo";
import { serverLogoutAction } from "@/app/(auth)/actions";

function isActivePath(pathname: string | null, href: string) {
  return pathname === href || pathname?.startsWith(`${href}/`);
}

export function SidebarRail() {
  const pathname = usePathname();
  const router = useRouter();
  const { userAvatarUrl, userName } = useAuthStore();

  const handleLogout = async () => {
    useAuthStore.setState({
      isLoggedIn: false,
      userName: "Analyst",
      userEmail: "",
      userAvatarUrl: "",
    });
    const result = await serverLogoutAction();
    if (result.success) router.replace("/login");
  };

  return (
    <aside className="sticky top-0 hidden h-screen max-h-screen w-60 shrink-0 flex-col overflow-hidden border-r border-hairline bg-sidebar px-3 py-4 md:flex">
      <Link href="/dashboard" className="flex min-h-11 items-center gap-3 rounded-md px-3 text-ink hover:bg-surface-inset">
        <Logo size={22} textClassName="text-sm font-semibold tracking-tight" href="" />
      </Link>

      <nav aria-label="Primary navigation" className="mt-8 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = Boolean(isActivePath(pathname, item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium ${
                active
                  ? "bg-accent-soft text-accent"
                  : "text-ink-muted hover:bg-surface-inset hover:text-ink"
              }`}
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-hairline pt-3">
        <Link href="/settings" className="flex min-h-11 items-center gap-3 rounded-md px-3 text-sm text-ink-muted hover:bg-surface-inset hover:text-ink">
          {userAvatarUrl ? (
            <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-hairline">
              <Image src={userAvatarUrl} alt="" fill unoptimized className="object-cover" />
            </span>
          ) : (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-inset">
              <User aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
          )}
          <span className="min-w-0 flex-1 truncate">{userName || "Account"}</span>
        </Link>
        <button onClick={handleLogout} className="flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm text-ink-muted hover:bg-danger-soft hover:text-danger">
          <LogOut aria-hidden="true" className="h-4 w-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
