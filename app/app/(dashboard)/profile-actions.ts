"use server";

import { prisma } from "@/shared/lib/db";
import { auth } from "@/shared/lib/auth";

export async function updateProfileAction(name: string, email: string) {
  const session = await auth();
  if (!session?.user?.email) {
    return { error: "Not authenticated" };
  }

  if (!name.trim()) {
    return { error: "Name is required" };
  }

  if (!email.trim() || !email.includes("@")) {
    return { error: "Valid email is required" };
  }

  try {
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return { error: "User not found" };
    }


    if (email !== currentUser.email) {
      const emailConflict = await prisma.user.findUnique({
        where: { email },
      });
      if (emailConflict) {
        return { error: "Email is already taken" };
      }
    }

    // Generate random Dicebear avatar seed if missing
    const avatarSeed = Math.random().toString(36).substring(7);
    const newAvatarUrl = currentUser.avatarUrl || `https://api.dicebear.com/7.x/identicon/svg?seed=${avatarSeed}`;

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name,
        email,
        avatarUrl: newAvatarUrl,
      },
    });

    return {
      success: true,
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        avatarUrl: updatedUser.avatarUrl,
      },
    };
  } catch (error) {
    console.error("Profile update error:", error);
    return { error: "Failed to update profile" };
  }
}

export async function getProfileAction() {
  const session = await auth();
  if (!session?.user?.email) {
    return { error: "Not authenticated" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        name: true,
        email: true,
        avatarUrl: true,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Generate avatar if missing
    if (!user.avatarUrl) {
      const avatarSeed = Math.random().toString(36).substring(7);
      const avatarUrl = `https://api.dicebear.com/7.x/identicon/svg?seed=${avatarSeed}`;
      await prisma.user.update({
        where: { email: session.user.email },
        data: { avatarUrl },
      });
      user.avatarUrl = avatarUrl;
    }

    return { success: true, user };
  } catch (error) {
    console.error("Fetch profile error:", error);
    return { error: "Failed to fetch profile" };
  }
}
