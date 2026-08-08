"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/shared/lib/auth";
import { fetchApi } from "@/shared/lib/api-client";
import { watchFormSchema, WatchFormValues, Watch } from "./types";
import { prisma } from "@/shared/lib/db";
import { mockWatches } from "./placeholder";

export async function createWatch(values: WatchFormValues) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const parsed = watchFormSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  // Convert searchQueries back to string array for backend
  const payload = {
    ...parsed.data,
    searchQueries: parsed.data.searchQueries.map(q => q.value),
  };

  const res = await fetchApi<Watch>("/watches", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (res.error) {
    // Fallback: If FastAPI is not yet running, create directly in Prisma
    // This is temporary scaffolding as requested in the architecture
    try {
      const newWatch = await prisma.watch.create({
        data: {
          userId: session.user.id,
          topic: payload.topic,
          searchQueries: payload.searchQueries,
          frequency: payload.frequency,
          significanceThreshold: payload.significanceThreshold,
          notificationEmail: payload.notificationEmail || null,
          notificationSlackWebhook: payload.notificationSlackWebhook || null,
          active: payload.active,
        }
      });
      revalidatePath("/watches");
      return { data: newWatch };
    } catch (dbErr) {
      return { error: "Failed to connect to backend API and fallback failed." };
    }
  }

  revalidatePath("/watches");
  return { data: res.data };
}

export async function getWatches(): Promise<Watch[]> {
  const session = await auth();
  if (!session?.user?.id) {
    // PLACEHOLDER: Use fake data for now if not logged in
    return mockWatches;
  }

  // Workflow 3: Server Component fetches watch list directly from Neon via db.ts
  const watches = await prisma.watch.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { findings: true, digests: true }
      }
    }
  });

  if (watches.length === 0) {
    // PLACEHOLDER: Use fake data for now if DB is empty
    return mockWatches;
  }

  return watches as unknown as Watch[];
}
