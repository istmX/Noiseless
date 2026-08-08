import { ArrowLeft, Clock, Hash, Mail, Search, Layers, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { FindingTimeline } from "./findings/components/FindingTimeline";
import { DigestHistory } from "./digests/components/DigestHistory";
import { Finding } from "./findings/types";
import { Digest } from "./digests/types";
import { prisma } from "@/shared/lib/db";
import { mockWatches } from "../placeholder";
import { notFound } from "next/navigation";

import { WatchDetailView } from "./components/WatchDetailView";

interface WatchDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchDetailPage({ params }: WatchDetailPageProps) {
  const { id } = await params;

  let dbWatch = null;
  try {
    dbWatch = await prisma.watch.findUnique({
      where: { id },
      include: {
        findings: { orderBy: { createdAt: "desc" } },
        digests: { orderBy: { sentAt: "desc" } },
        _count: { select: { findings: true, digests: true } }
      }
    });
  } catch (e) {
    // Database query failed or table does not exist
  }

  // Fallback to mock data if not found in DB
  const mockWatch = mockWatches.find(w => w.id === id);
  const watch = dbWatch || mockWatch;

  if (!watch) {
    return notFound();
  }

  // Generate realistic findings if we are using the fallback mock and they are empty
  const rawFindings = dbWatch ? dbWatch.findings : [
    {
      id: "f-1",
      watchId: watch.id,
      url: "https://openai.com/blog/gpt-4o",
      title: "Introducing GPT-4o: Our New flagship model",
      content: "GPT-4o provides GPT-4 level intelligence but is much faster and improves on capabilities across text, voice, and vision.",
      score: 9,
      category: "Product Launch",
      keyFact: "GPT-4o provides GPT-4 level intelligence but is much faster and improves on capabilities across text, voice, and vision.",
      createdAt: new Date()
    },
    {
      id: "f-2",
      watchId: watch.id,
      url: "https://openai.com/blog/openai-alignment-team",
      title: "Our approach to alignment and safety research",
      content: "We are forming a new superalignment team to steer and control AI systems much smarter than us.",
      score: 7,
      category: "Safety Research",
      keyFact: "We are forming a new superalignment team to steer and control AI systems much smarter than us.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
    }
  ];

  const rawDigests = dbWatch ? dbWatch.digests : [
    {
      id: "d-1",
      watchId: watch.id,
      summary: "OpenAI announced GPT-4o, a new flagship model bringing real-time voice, vision, and text intelligence at twice the speed of GPT-4.",
      sentAt: new Date()
    }
  ];

  // Map to frontend component types
  const findings: Finding[] = rawFindings.map((f: any) => ({
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

  const digests: Digest[] = rawDigests.map((d: any) => ({
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
    <WatchDetailView watch={watch} findings={findings} digests={digests} />
  );
}
