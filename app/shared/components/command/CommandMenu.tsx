"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { LayoutDashboard, List, Plus, Search, Settings } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useWatchDrawerStore } from "../../hooks/useWatchDrawerStore";
import { CommandItem } from "../../types/shell";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMANDS: readonly Omit<CommandItem, "action">[] = [
  { id: "cmd-dashboard", title: "Go to Now", category: "navigation", href: "/dashboard", shortcut: "G N" },
  { id: "cmd-watches", title: "Go to Watches", category: "navigation", href: "/watches", shortcut: "G W" },
  { id: "cmd-settings", title: "Go to Settings", category: "navigation", href: "/settings", shortcut: "G S" },
];

function CommandIcon({ itemId }: { itemId: string }) {
  const className = "h-4 w-4 shrink-0";
  if (itemId === "cmd-settings") return <Settings aria-hidden="true" className={className} />;
  if (itemId === "cmd-watches") return <List aria-hidden="true" className={className} />;
  if (itemId === "cmd-new-watch") return <Plus aria-hidden="true" className={className} />;
  return <LayoutDashboard aria-hidden="true" className={className} />;
}

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const router = useRouter();
  const openDrawer = useWatchDrawerStore((state) => state.openDrawer);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = useMemo<readonly CommandItem[]>(
    () => [
      ...COMMANDS,
      { id: "cmd-new-watch", title: "Create new watch", category: "action", action: openDrawer, shortcut: "⌘ N" },
    ],
    [openDrawer],
  );
  const filteredCommands = useMemo(
    () => commands.filter((command) => command.title.toLowerCase().includes(query.toLowerCase())),
    [commands, query],
  );

  const executeItem = useCallback((item: CommandItem) => {
    onClose();
    if (item.action) item.action();
    else if (item.href) router.push(item.href);
  }, [onClose, router]);

  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    setSelectedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((index) => (index + 1) % Math.max(filteredCommands.length, 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((index) => (index - 1 + filteredCommands.length) % Math.max(filteredCommands.length, 1));
      } else if (event.key === "Enter" && filteredCommands[selectedIndex]) {
        event.preventDefault();
        executeItem(filteredCommands[selectedIndex]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [executeItem, filteredCommands, isOpen, onClose, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[15vh]">
          <motion.button type="button" aria-label="Close command menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-ink/20" />
          <motion.section role="dialog" aria-modal="true" aria-label="Command menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.16 }} className="relative z-10 flex w-full max-w-xl flex-col overflow-hidden rounded-lg border border-hairline-strong bg-surface shadow-high">
            <label className="flex items-center gap-3 border-b border-hairline px-4 py-3">
              <Search aria-hidden="true" className="h-4 w-4 text-ink-faint" />
              <span className="sr-only">Find a command</span>
              <input autoFocus value={query} onChange={(event) => { setQuery(event.target.value); setSelectedIndex(0); }} placeholder="Search commands" className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none" />
              <kbd className="rounded border border-hairline bg-surface-inset px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">ESC</kbd>
            </label>
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredCommands.length ? filteredCommands.map((command, index) => {
                const selected = index === selectedIndex;
                return <button key={command.id} type="button" onClick={() => executeItem(command)} onMouseEnter={() => setSelectedIndex(index)} className={`flex min-h-11 w-full items-center justify-between rounded-md px-3 text-left text-sm ${selected ? "bg-accent-soft text-accent" : "text-ink hover:bg-surface-inset"}`}>
                  <span className="flex min-w-0 items-center gap-3"><CommandIcon itemId={command.id} /><span className="truncate">{command.title}</span></span>
                  {command.shortcut && <kbd className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">{command.shortcut}</kbd>}
                </button>;
              }) : <p className="px-3 py-8 text-center text-sm text-ink-muted">No matching commands.</p>}
            </div>
            <footer className="flex items-center justify-between border-t border-hairline bg-surface-inset px-4 py-2 font-mono text-[10px] text-ink-faint"><span>Arrow keys to navigate</span><span>Enter to run</span></footer>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  );
}
