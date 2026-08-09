import { prisma } from "@/shared/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WorkspaceHeaderWrapper } from "./components/WorkspaceHeaderWrapper";
import { WorkspaceNav } from "./components/WorkspaceNav";

interface WatchWorkspaceLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function WatchWorkspaceLayout({ children, params }: WatchWorkspaceLayoutProps) {
  const { id } = await params;

  const watch = await prisma.watch.findUnique({
    where: { id },
    include: {
      _count: { select: { findings: true, digests: true } }
    }
  });

  if (!watch) {
    redirect("/404");
  }

  // Map database counts
  const findingsCount = watch._count.findings;
  const digestsCount = watch._count.digests;

  return (
    <div className="flex flex-col gap-5 w-full h-[calc(100vh-10rem)] md:h-[calc(100vh-8.5rem)] min-h-0">
      {/* Back button */}
      <div className="shrink-0">
        <Link
          href="/watches"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-ink transition-colors w-fit group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to watches
        </Link>
      </div>

      {/* Dynamic Header & Actions (Fixed) */}
      <div className="shrink-0 flex flex-col gap-4">
        <WorkspaceHeaderWrapper
          watch={watch}
          findingsCount={findingsCount}
          digestsCount={digestsCount}
        />
        
        {/* Sub Navigation */}
        <WorkspaceNav watchId={id} />
      </div>

      {/* Workspace Pages (Independent Scroll Areas inside child pages) */}
      <div className="flex-1 min-h-0">
        {children}
      </div>
    </div>
  );
}
