"use server";

import { prisma } from "@/shared/lib/db";
import { auth } from "@/shared/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(name: string, email: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "Authentication required" };
  }

  if (!name.trim() || !email.trim()) {
    return { error: "Name and email are required" };
  }

  try {
    // Generate default Dicebear avatar based on name
    const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name.trim())}`;
    
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: name.trim(),
        email: email.trim(),
        avatarUrl,
      },
    });

    revalidatePath("/settings");
    return { success: true, avatarUrl };
  } catch (err: any) {
    if (err.code === "P2002") {
      return { error: "Email is already in use by another account" };
    }
    return { error: "Failed to update profile settings" };
  }
}
