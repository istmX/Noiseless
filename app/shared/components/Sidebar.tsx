"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Settings,
  Activity,
  User,
  Menu,
  X,
  LogOut,
  List,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useAuthStore } from "../hooks/useAuthStore";
import { getProfileAction } from "@/app/(dashboard)/profile-actions";
import Image from "next/image";
import { serverLogoutAction } from "@/app/(auth)/actions";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: List, label: "Watches", href: "/watches" },
  { icon: Activity, label: "System Health", href: "/agent" },
  { icon: Settings, label: "Settings", href: "/settings" },
] as const;

// ---------------------------------------------------------------------------
// Desktop icon rail item with tooltip
// ---------------------------------------------------------------------------
function NavRailItem({
  icon: Icon,
  label,
  href,
  isActive,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive: boolean;
}) {
  const [showTip, setShowTip] = useState(false);
  const tipRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    tipRef.current = setTimeout(() => setShowTip(true), 120);
  };
  const handleLeave = () => {
    if (tipRef.current) clearTimeout(tipRef.current);
    setShowTip(false);
  };

  return (
    <div className="relative flex justify-center">
      <Link
        href={href}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-label={label}
        className={`relative flex items-center justify-center w-10 h-10 rounded-md transition-colors duration-100 cursor-pointer ${
          isActive
            ? "bg-success-soft text-success"
            : "text-ink-muted hover:text-ink hover:bg-surface-inset"
        }`}
      >
        {isActive && (
          <motion.div
            layoutId="sidebar-active-rail"
            className="absolute inset-0 bg-success-soft rounded-md"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        <Icon className="w-[18px] h-[18px] relative z-10" />
      </Link>

      {/* Tooltip */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 pointer-events-none z-50"
          >
            <div className="bg-ink text-on-primary text-xs font-sans font-medium px-2.5 py-1.5 rounded-md whitespace-nowrap shadow-high">
              {label}
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-ink" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Sidebar
// ---------------------------------------------------------------------------
export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, userName, userAvatarUrl, setProfile } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      getProfileAction().then((res) => {
        if (res.success && res.user) {
          setProfile({
            name: res.user.name,
            email: res.user.email,
            avatarUrl: res.user.avatarUrl || "",
            tier: (res.user as { tier?: string }).tier || "FREE",
          });
        }
      });
    }
  }, [isLoggedIn, setProfile]);

  const handleLogout = async () => {
    useAuthStore.setState({
      isLoggedIn: false,
      userName: "Analyst",
      userEmail: "",
      userAvatarUrl: "",
    });
    await serverLogoutAction();
  };

  // ---------------------------------------------------------------------------
  // Desktop sidebar — narrow icon rail
  // ---------------------------------------------------------------------------
  const desktopRail = (
    <aside className="hidden md:flex flex-col h-screen w-16 border-r border-hairline bg-surface fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-hairline shrink-0">
        <Logo size={22} textClassName="hidden" />
      </div>

      {/* Nav items */}
      <nav className="flex flex-col items-center gap-1 py-4 flex-1">
        {NAV_ITEMS.map((item) => (
          <NavRailItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={!!pathname?.startsWith(item.href)}
          />
        ))}
      </nav>

      {/* User avatar + logout */}
      <div className="flex flex-col items-center gap-2 py-4 border-t border-hairline">
        <Link
          href="/settings"
          title="Settings"
          className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-surface-inset transition-colors cursor-pointer"
        >
          {userAvatarUrl ? (
            <div className="w-7 h-7 rounded-full overflow-hidden border border-hairline relative">
              <Image src={userAvatarUrl} alt="Avatar" fill unoptimized className="object-cover" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full bg-surface-inset border border-hairline flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-ink-muted" />
            </div>
          )}
        </Link>

        <button
          onClick={handleLogout}
          title="Log Out"
          className="w-10 h-10 rounded-md flex items-center justify-center text-ink-muted hover:text-danger hover:bg-danger-soft/20 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );

  // ---------------------------------------------------------------------------
  // Mobile — top bar + slide drawer
  // ---------------------------------------------------------------------------
  const mobileTopBar = (
    <div className="md:hidden flex items-center justify-between h-14 px-4 border-b border-hairline bg-surface shrink-0 w-full z-30">
      <Logo size={20} textClassName="text-sm font-semibold" />
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="p-2 rounded-md hover:bg-surface-inset text-ink-muted hover:text-ink cursor-pointer transition-colors"
        aria-label="Toggle Navigation Menu"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>
  );

  const mobileDrawer = (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-ink/20 backdrop-blur-sm z-40 cursor-pointer"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className="md:hidden fixed left-0 top-0 h-full w-56 bg-surface border-r border-hairline z-50 flex flex-col"
          >
            {/* Header */}
            <div className="h-14 flex items-center px-5 border-b border-hairline">
              <Logo size={20} textClassName="text-sm font-semibold" />
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
              {NAV_ITEMS.map((item) => {
                const isActive = !!pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-sans transition-colors cursor-pointer ${
                      isActive
                        ? "bg-success-soft text-success font-semibold"
                        : "text-ink-muted hover:text-ink hover:bg-surface-inset"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* User footer */}
            <div className="px-3 py-4 border-t border-hairline flex items-center justify-between">
              <Link href="/settings" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 min-w-0">
                {userAvatarUrl ? (
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-hairline relative shrink-0">
                    <Image src={userAvatarUrl} alt="Avatar" fill unoptimized className="object-cover" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-surface-inset border border-hairline flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 text-ink-muted" />
                  </div>
                )}
                <span className="text-sm font-sans font-medium text-ink truncate">{userName}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-1.5 text-ink-muted hover:text-danger hover:bg-danger-soft/10 rounded-md transition-colors cursor-pointer shrink-0"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {desktopRail}
      {mobileTopBar}
      {mobileDrawer}
    </>
  );
}
