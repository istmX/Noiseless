import { Finding } from "../findings/types";
import { Digest } from "../digests/types";
import { prisma } from "@/shared/lib/db";
import { redirect } from "next/navigation";
import { WatchSummaryView } from "../components/WatchSummaryView";

interface WatchSummaryPageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchSummaryPage({ params }: WatchSummaryPageProps) {
  const { id } = await params;

  const watch = await prisma.watch.findUnique({
    where: { id },
    include: {
      findings: { orderBy: { createdAt: "desc" } },
      digests: { orderBy: { sentAt: "desc" } }
    }
  });

  if (!watch) {
    redirect("/404");
  }

  const rawFindings = watch.findings || [];
  const rawDigests = watch.digests || [];

  // Map to frontend component types
  const findings: Finding[] = rawFindings.map((f) => ({
    id: f.id,
    watchId: f.watchId,
    title: f.title,
    url: f.url,
    summary: f.keyFact || f.content,
    significanceScore: f.score,
    publishedAt: f.createdAt instanceof Date ? f.createdAt.toISOString() : new Date(f.createdAt).toISOString(),
    createdAt: f.createdAt instanceof Date ? f.createdAt.toISOString() : new Date(f.createdAt).toISOString(),
    category: f.category
  }));

  const digests: Digest[] = rawDigests.map((d) => ({
    id: d.id,
    watchId: d.watchId,
    summary: d.summary,
    citations: rawFindings.filter(f => f.score >= (watch.significanceThreshold || 8)).map(f => f.url),
    triggerScore: watch.significanceThreshold || 8,
    createdAt: d.sentAt instanceof Date ? d.sentAt.toISOString() : new Date(d.sentAt).toISOString(),
    deliveredEmail: !!watch.notificationEmail,
    deliveredSlack: !!watch.notificationSlackWebhook
  }));

  return (
    <WatchSummaryView 
      watch={watch} 
      findings={findings} 
      digests={digests} 
    />
  );
}
