"use client";

import { useEffect } from "react";
import { AlertOctagon, RotateCcw } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Database or Render Error captured by Boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-md mx-auto text-center px-4 py-12 gap-5 bg-surface/50 backdrop-blur-md border border-hairline rounded-xl shadow-low">
      <div className="p-3 bg-danger-soft text-danger rounded-full">
        <AlertOctagon className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-sans font-bold text-ink leading-snug">Connection Interrupted</h2>
        <p className="text-sm font-sans text-ink-muted leading-relaxed">
          Could not establish connection to the database. Verify your configuration or try reloading the workspace.
        </p>
      </div>
      {error.message && (
        <div className="w-full px-3.5 py-2.5 bg-surface-inset border border-hairline rounded-lg text-left overflow-x-auto max-h-32 scrollbar-hide">
          <pre className="text-xs font-mono text-ink-faint whitespace-pre-wrap break-all">
            {error.message}
          </pre>
        </div>
      )}
      <Button
        onClick={() => reset()}
        className="w-full md:w-auto inline-flex items-center gap-2 cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Try Again</span>
      </Button>
    </div>
  );
}
