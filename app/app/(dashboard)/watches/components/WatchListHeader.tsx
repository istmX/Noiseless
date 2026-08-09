"use client";

import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface WatchListHeaderProps {
  userName: string;
  hasWatches: boolean;
  onCreateClick: () => void;
}

export function WatchListHeader({ userName, hasWatches, onCreateClick }: WatchListHeaderProps) {
  const firstName = userName?.split(" ")[0] ?? "Analyst";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-sans font-semibold text-ink tracking-tight">
          Good morning, {firstName}
        </h1>
        <p className="text-sm text-ink-muted mt-0.5">
          Your intelligence stream is active.
        </p>
      </div>

      {hasWatches && (
        <Button
          onClick={onCreateClick}
          className="bg-primary hover:bg-primary-hover text-on-primary font-sans font-medium rounded-md px-4 py-2 text-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Watch
        </Button>
      )}
    </div>
  );
}
