"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/shared/lib/auth";
import { fetchApi } from "@/shared/lib/api-client";
import { watchFormSchema, WatchFormValues, Watch } from "./types";
import { prisma } from "@/shared/lib/db";
import { mockWatches } from "./placeholder";

// In-memory store fallback for dev/scaffolding mode
const localWatchesStore: Watch[] = [];

export async function createWatch(values: WatchFormValues) {
  const session = await auth();
  const userId = session?.user?.id || "demo-user";

  const parsed = watchFormSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid form data" };
  }

  // Convert searchQueries back to string array for backend
  const payload = {
    ...parsed.data,
    searchQueries: parsed.data.searchQueries.map((q) => q.value),
  };

  // 1. Try FastAPI backend API
  try {
    const res = await fetchApi<Watch>("/watches", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (res.data) {
      revalidatePath("/watches");
      return { data: res.data };
    }
  } catch (apiErr) {
    // Backend API not running yet
  }

  // 2. Try Prisma Postgres DB
  try {
    const newWatch = await prisma.watch.create({
      data: {
        userId: userId,
        topic: payload.topic,
        searchQueries: payload.searchQueries,
        frequency: payload.frequency,
        significanceThreshold: payload.significanceThreshold,
        notificationEmail: payload.notificationEmail || null,
        notificationSlackWebhook: payload.notificationSlackWebhook || null,
        active: payload.active,
      },
    });
    revalidatePath("/watches");
    return { data: newWatch as unknown as Watch };
  } catch (dbErr) {
    // 3. Dev / Scaffolding In-Memory Fallback
    const localWatch: Watch = {
      id: "watch-" + Date.now(),
      userId: userId,
      topic: payload.topic,
      searchQueries: payload.searchQueries,
      frequency: payload.frequency,
      significanceThreshold: payload.significanceThreshold,
      notificationEmail: payload.notificationEmail || null,
      notificationSlackWebhook: payload.notificationSlackWebhook || null,
      lastRunAt: null,
      runInProgress: false,
      active: payload.active,
      createdAt: new Date(),
      updatedAt: new Date(),
      _count: {
        findings: 0,
        digests: 0,
      },
    };

    localWatchesStore.unshift(localWatch);
    revalidatePath("/watches");
    return { data: localWatch };
  }
}

export async function getWatches(): Promise<Watch[]> {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    if (userId) {
      const watches = await prisma.watch.findMany({
        where: { userId: userId },
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { findings: true, digests: true },
          },
        },
      });
      if (watches.length > 0) {
        return watches as unknown as Watch[];
      }
    }
  } catch (dbErr) {
    // DB offline or not configured
  }

  return localWatchesStore;
}

export async function updateWatch(watchId: string, values: any) {
  const session = await auth();
  const userId = session?.user?.id || "demo-user";

  const payload: any = { ...values };
  if (values.searchQueries) {
    payload.searchQueries = values.searchQueries.map((q: any) => typeof q === "string" ? q : q.value);
  }

  // 1. Try FastAPI backend API via PATCH request
  try {
    const res = await fetchApi<Watch>(`/watches/${watchId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    if (res.data) {
      revalidatePath("/watches");
      revalidatePath(`/watches/${watchId}`);
      return { data: res.data };
    }
  } catch (apiErr) {
    // Backend API not running or offline
  }

  // 2. Try Prisma database update
  try {
    const updatedWatch = await prisma.watch.update({
      where: { id: watchId },
      data: {
        topic: payload.topic,
        searchQueries: payload.searchQueries,
        frequency: payload.frequency,
        significanceThreshold: payload.significanceThreshold,
        notificationEmail: payload.notificationEmail !== undefined ? (payload.notificationEmail || null) : undefined,
        notificationSlackWebhook: payload.notificationSlackWebhook !== undefined ? (payload.notificationSlackWebhook || null) : undefined,
        active: payload.active,
      },
    });
    revalidatePath("/watches");
    revalidatePath(`/watches/${watchId}`);
    return { data: updatedWatch as unknown as Watch };
  } catch (dbErr) {
    // 3. Fallback to mock update for dev mode
    revalidatePath("/watches");
    revalidatePath(`/watches/${watchId}`);
    return { error: "Failed to update watch configuration in database" };
  }
}

export async function deleteWatch(watchId: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Authentication required" };
  }

  // 1. Try FastAPI backend API via DELETE request
  try {
    const res = await fetchApi<void>(`/watches/${watchId}`, {
      method: "DELETE",
    });
    if (!res.error) {
      revalidatePath("/watches");
      return { success: true };
    }
  } catch (apiErr) {
    // Backend API offline or not running
  }

  // 2. Try Prisma database delete
  try {
    await prisma.watch.delete({
      where: { id: watchId },
    });
    revalidatePath("/watches");
    return { success: true };
  } catch (dbErr) {
    return { error: "Failed to delete watch from database" };
  }
}

export async function runWatchNow(watchId: string) {
  try {
    const res = await fetchApi<any>(`/internal/run-watch/${watchId}`, {
      method: "POST",
    });
    if (res.data) {
      revalidatePath("/watches");
      revalidatePath(`/watches/${watchId}`);
      return { success: true };
    }
    return { error: res.error || "Failed to trigger agent run" };
  } catch (err) {
    return { error: "Failed to connect to backend agent" };
  }
}

