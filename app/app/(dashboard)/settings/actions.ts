"use server";

import { prisma } from "@/shared/lib/db";
import { auth } from "@/shared/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(name: string, email: string, avatarUrl?: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Authentication required" };
  }

  if (!name.trim() || !email.trim()) {
    return { error: "Name and email are required" };
  }

  try {
    const finalAvatarUrl = avatarUrl || `https://api.dicebear.com/10.x/croodles/svg?seed=${encodeURIComponent(name.trim())}`;
    
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: name.trim(),
        email: email.trim(),
        avatarUrl: finalAvatarUrl,
      },
    });

    revalidatePath("/settings");
    return { success: true, avatarUrl: finalAvatarUrl };
  } catch (err: any) {
    if (err.code === "P2002") {
      return { error: "Email is already in use by another account" };
    }
    return { error: "Failed to update profile settings" };
  }
}

export async function upgradeUserPlan(tier: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Authentication required" };
  }

  const allowedTiers = ["FREE", "PRO", "ENTERPRISE"];
  if (!allowedTiers.includes(tier)) {
    return { error: "Invalid subscription tier" };
  }

  let tokensBalance = 500;
  if (tier === "PRO") {
    tokensBalance = 10000;
  } else if (tier === "ENTERPRISE") {
    tokensBalance = 100000;
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        tier,
        tokensBalance,
      },
    });

    revalidatePath("/settings");
    return { success: true };
  } catch (err: any) {
    return { error: "Failed to upgrade subscription plan" };
  }
}

