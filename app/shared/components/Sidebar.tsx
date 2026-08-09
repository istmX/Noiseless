"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutDashboard, Settings, Activity, User, Menu, X, LogOut, ChevronLeft, ChevronRight, List } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useAuthStore } from "../hooks/useAuthStore";
import { getProfileAction } from "@/app/(dashboard)/profile-actions";
import Image from "next/image";
import { serverLogoutAction } from "@/app/(auth)/actions";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { isLoggedIn, userName, userAvatarUrl, setProfile, sidebarCollapsed, setSidebarCollapsed } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      getProfileAction().then((res) => {
        if (res.success && res.user) {
          setProfile({
            name: res.user.name,
            email: res.user.email,
            avatarUrl: res.user.avatarUrl || "",
            tier: (res.user as any).tier || "FREE",
          });
        }
      });
    }
  }, [isLoggedIn, setProfile]);


  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: List, label: "Watches", href: "/watches" },
    { icon: Activity, label: "System Health", href: "/agent" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between overflow-y-auto bg-[var(--color-sidebar)] overflow-x-hidden">
      <div>
        <div className={`h-16 flex items-center border-b border-hairline gap-2 ${
          sidebarCollapsed ? "justify-center px-2" : "justify-between px-6"
        }`}>
          {!sidebarCollapsed && <Logo size={24} textClassName="text-lg font-semibold text-[var(--color-success)]" />}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-md hover:bg-surface-inset text-ink-muted hover:text-ink cursor-pointer transition-colors shrink-0"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block relative cursor-pointer"
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-[var(--color-sidebar-active)] rounded-lg border border-hairline"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  sidebarCollapsed ? "justify-center px-0" : ""
                } ${isActive ? "text-[var(--color-success)] font-semibold" : "text-ink-muted hover:text-ink hover:bg-[var(--color-sidebar-active)]/50"}`}>
                  <item.icon className="w-4 h-4" />
                  {!sidebarCollapsed && <span className="font-sans text-sm">{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className={`p-4 border-t border-hairline bg-[var(--color-sidebar-active)]/20 flex ${
        sidebarCollapsed ? "flex-col items-center gap-4 py-6" : "items-center justify-between gap-2"
      }`}>
        <Link 
          href="/settings"
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 rounded-md hover:bg-[var(--color-sidebar-active)]/30 transition-colors cursor-pointer min-w-0 ${
            sidebarCollapsed ? "justify-center p-1.5" : "flex-1 px-2 py-1.5"
          }`}
          title="Edit Profile"
        >
          {userAvatarUrl ? (
            <div className="w-8 h-8 rounded-full overflow-hidden border border-hairline relative shrink-0 bg-surface-inset">
              <Image 
                src={userAvatarUrl}
                alt="User Avatar"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-[var(--color-sidebar-active)] border border-hairline flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-[var(--color-success)]" />
            </div>
          )}
          {!sidebarCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-sans text-sm font-medium text-ink truncate">{userName}</span>
              <span className="font-sans text-xs text-ink-muted">Settings</span>
            </div>
          )}
        </Link>

        <button
          onClick={async () => {
            useAuthStore.setState({
              isLoggedIn: false,
              userName: "Analyst",
              userEmail: "",
              userAvatarUrl: "",
            });
            await serverLogoutAction();
          }}
          className={`p-2 text-ink-muted hover:text-danger hover:bg-danger-soft/10 rounded-md transition-colors cursor-pointer shrink-0 ${
            sidebarCollapsed ? "mt-1" : ""
          }`}
          title="Log Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between h-14 px-4 border-b border-hairline bg-surface shrink-0 w-full z-30">
        <Logo size={22} textClassName="text-base" />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md hover:bg-surface-inset text-ink-muted hover:text-ink cursor-pointer transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-ink/30 backdrop-blur-xs z-40 cursor-pointer"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="md:hidden fixed left-0 top-0 h-full w-64 bg-[var(--color-sidebar)] border-r border-hairline z-50 shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <aside className={`hidden md:flex h-screen border-r border-hairline bg-[var(--color-sidebar)] flex-col fixed left-0 top-0 z-40 transition-all duration-300 ${
        sidebarCollapsed ? "w-16" : "w-64"
      }`}>
        {sidebarContent}
      </aside>
    </>
  );
}
