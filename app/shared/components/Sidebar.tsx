"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutDashboard, Settings, Activity, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Watches", href: "/watches" },
    { icon: Activity, label: "System Health", href: "/agent" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between overflow-y-auto">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-hairline">
          <Logo size={24} textClassName="text-lg" />
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
                    className="absolute inset-0 bg-surface-inset rounded-md border border-hairline"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${isActive ? "text-ink font-medium" : "text-ink-muted hover:text-ink hover:bg-surface-inset/50"}`}>
                  <item.icon className="w-4 h-4" />
                  <span className="font-sans text-sm">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-hairline bg-surface-inset/30">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-surface-inset border border-hairline flex items-center justify-center">
            <User className="w-4 h-4 text-ink-muted" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-sm font-medium text-ink">Analyst</span>
            <span className="font-sans text-xs text-ink-muted">Workspace</span>
          </div>
        </div>
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
              className="md:hidden fixed left-0 top-0 h-full w-64 bg-surface border-r border-hairline z-50 shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex w-64 h-screen border-r border-hairline bg-surface flex-col fixed left-0 top-0 z-40">
        {sidebarContent}
      </aside>
    </>
  );
}
