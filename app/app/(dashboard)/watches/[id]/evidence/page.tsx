import { Finding } from "../findings/types";
import { prisma } from "@/shared/lib/db";
import { redirect } from "next/navigation";
import { WatchEvidenceView } from "../components/WatchEvidenceView";

interface WatchEvidencePageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchEvidencePage({ params }: WatchEvidencePageProps) {
  const { id } = await params;

  const watch = await prisma.watch.findUnique({
    where: { id },
    include: {
      findings: { orderBy: { createdAt: "desc" } }
    }
  });

  if (!watch) {
    redirect("/404");
  }

  const rawFindings = watch.findings || [];

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

  return (
    <WatchEvidenceView 
      watch={watch} 
      findings={findings} 
    />
  );
}
