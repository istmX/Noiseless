"use client";

import { useState, useEffect } from "react";
import { HeaderBar } from "@/shared/components/shell/HeaderBar";
import { SidebarRail } from "@/shared/components/shell/SidebarRail";
import { BottomNav } from "@/shared/components/shell/BottomNav";
import { CommandMenu } from "@/shared/components/command/CommandMenu";
import { useWatchDrawerStore } from "@/shared/hooks/useWatchDrawerStore";
import { WatchForm } from "./watches/components/WatchForm";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/shared/constants/shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const pathname = usePathname();
  const { isOpen: isWatchDrawerOpen, closeDrawer: closeWatchDrawer } = useWatchDrawerStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-canvas text-ink">
      <SidebarRail />

      <div className="flex min-w-0 flex-1 flex-col">
        <HeaderBar onOpenCommand={() => setIsCommandOpen(true)} />

        <main className="min-w-0 flex-1 overflow-auto px-4 py-5 pb-20 sm:px-6 lg:px-8 md:pb-5">
          <div className="mx-auto w-full max-w-[1440px]">{children}</div>
        </main>

        <BottomNav />

        <CommandMenu isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />

        <AnimatePresence>
          {isWatchDrawerOpen && (
            <>
              <motion.button
                type="button"
                aria-label="Close create watch panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeWatchDrawer}
                className="fixed inset-0 z-50 cursor-default bg-ink/20"
              />
              <motion.section
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-watch-title"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-hairline bg-surface shadow-high"
              >
                <div className="flex items-center justify-between border-b border-hairline bg-surface px-6 py-5">
                <div>
                  <h2 id="create-watch-title" className="text-base font-semibold text-ink">Create watch</h2>
                  <p className="mt-1 text-xs text-ink-muted">Start monitoring a focused intelligence surface.</p>
                </div>
                <button
                  onClick={closeWatchDrawer}
                  aria-label="Close create watch panel"
                  className="rounded-md p-2 text-ink-muted hover:bg-surface-inset hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-5 scrollbar-hide">
                  <WatchForm onSuccess={closeWatchDrawer} />
                </div>
              </motion.section>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
