"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { WatchForm } from "./WatchForm";
import { Plus } from "lucide-react";

export function CreateWatchDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium rounded-lg px-4 py-2.5 shadow-sm transition-all flex items-center gap-2 cursor-pointer text-xs" />}>
        <Plus className="w-4 h-4" />
        <span>Create Watch</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-screen flex flex-col bg-surface-elevated border-hairline shadow-high rounded-2xl p-0 overflow-hidden">
        <DialogHeader className="px-8 py-6 border-b border-hairline/50 bg-surface/50 backdrop-blur-md sticky top-0 z-20">
          <DialogTitle className="font-sans text-h2 font-semibold text-ink tracking-tight">Create New Watch</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-8 py-6 custom-scrollbar">
          <WatchForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
