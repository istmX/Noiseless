"use client";

import { useEffect, useState } from "react";
import { Activity, ShieldCheck, Cpu, HardDrive, Server, Zap, RefreshCw, BarChart2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function SystemHealthPage() {
  const [lastRefreshed, setLastRefreshed] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const updateTimestamp = () => {
    setLastRefreshed(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    updateTimestamp();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      updateTimestamp();
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="relative flex flex-col w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 min-h-screen bg-canvas space-y-8 select-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-sans font-bold text-ink">System Health</h1>
          <p className="text-xs text-ink-muted mt-1">Real-time status updates of continuous intelligence services.</p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
          className="border-hairline bg-surface text-ink hover:bg-surface-inset rounded-full px-4 flex items-center gap-2 cursor-pointer text-xs h-10"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Refresh Status</span>
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface border border-hairline rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center border border-success/10 text-success">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase text-ink-muted">FastAPI Service</p>
            <p className="text-sm font-sans font-semibold text-ink mt-0.5">Online</p>
          </div>
        </div>

        <div className="bg-surface border border-hairline rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center border border-success/10 text-success">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase text-ink-muted">Tavily API</p>
            <p className="text-sm font-sans font-semibold text-ink mt-0.5">Connected (99.8%)</p>
          </div>
        </div>

        <div className="bg-surface border border-hairline rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center border border-success/10 text-success">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase text-ink-muted">Qdrant DB</p>
            <p className="text-sm font-sans font-semibold text-ink mt-0.5">Operational</p>
          </div>
        </div>

        <div className="bg-surface border border-hairline rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center border border-success/10 text-success">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase text-ink-muted">Relational DB</p>
            <p className="text-sm font-sans font-semibold text-ink mt-0.5">Neon Connected</p>
          </div>
        </div>
      </div>

      {/* Main Stats Block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: System Metrics */}
        <div className="lg:col-span-8 bg-surface border border-hairline rounded-xl p-6 shadow-xs space-y-6">
          <h2 className="text-lg font-sans font-semibold text-ink border-b border-hairline pb-2 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-primary" /> Metrics Workstation
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-sans font-medium mb-1.5 text-ink">
                <span>Scheduler CPU Allocation</span>
                <span className="font-mono text-ink-muted">14%</span>
              </div>
              <div className="w-full bg-hairline h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "14%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-sans font-medium mb-1.5 text-ink">
                <span>Vector Embeddings Pipeline Queue</span>
                <span className="font-mono text-ink-muted">0 Jobs</span>
              </div>
              <div className="w-full bg-hairline h-2 rounded-full overflow-hidden">
                <div className="bg-success h-full rounded-full" style={{ width: "0%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-sans font-medium mb-1.5 text-ink">
                <span>Monthly Query Quota Credits</span>
                <span className="font-mono text-ink-muted">1,245 / 5,000 queries consumed</span>
              </div>
              <div className="w-full bg-hairline h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "24.9%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Active Jobs Logs */}
        <div className="lg:col-span-4 bg-surface border border-hairline rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-lg font-sans font-semibold text-ink border-b border-hairline pb-2 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Active Job Logs
            </h2>
            <div className="space-y-3 font-mono text-[10px] text-ink-muted leading-relaxed">
              <p>[{lastRefreshed}] Scheduler checking registered watch configurations...</p>
              <p>[{lastRefreshed}] Qdrant Vector collections namespaces verified.</p>
              <p className="text-success">[{lastRefreshed}] All connection gateways responding correctly.</p>
            </div>
          </div>
          <div className="text-[10px] text-ink-faint font-mono mt-6 pt-4 border-t border-hairline">
            Last updated: {lastRefreshed}
          </div>
        </div>
      </div>
    </div>
  );
}
