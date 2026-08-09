"use server";

import { signIn, signOut } from "@/shared/lib/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { DASHBOARD_ROUTE } from "./constants";
import { prisma } from "@/shared/lib/db";
import bcrypt from "bcryptjs";

export async function loginAction(
  prevState: AuthError | null,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirectTo: DASHBOARD_ROUTE,
    });
    return { success: true, error: null };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "An unexpected authentication error occurred." };
      }
    }
    throw error; 
  }
}

export async function registerAction(
  prevState: unknown,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  if (!email || !name || !password) {
    return { error: "Missing required fields." };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "Email is already registered." };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const avatarSeed = Math.random().toString(36).substring(7);
    const avatarUrl = `https://api.dicebear.com/10.x/croodles/svg?seed=${avatarSeed}`;

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        avatarUrl,
      },
    });

    return { success: true, error: null, redirect: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Registration failed." };
  }
}

export async function serverLogoutAction(): Promise<{ success: boolean }> {
  try {
    const cookieStore = await cookies();
    const cookieNames = [
      "authjs.session-token",
      "__Secure-authjs.session-token",
      "next-auth.session-token",
      "__Secure-next-auth.session-token",
      "authjs.csrf-token",
      "__Secure-authjs.csrf-token",
      "authjs.callback-url",
      "__Secure-authjs.callback-url",
    ];
    for (const name of cookieNames) {
      cookieStore.delete(name);
    }
  } catch (e) {
    console.error("Failed to delete cookies:", e);
  }
  
  await signOut({ redirect: false });
  return { success: true };
}
