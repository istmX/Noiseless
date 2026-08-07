"use server";

import { signIn } from "@/shared/lib/auth";
import { AuthError } from "next-auth";
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
    throw error; // Let Next.js handle redirects internally
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

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return { success: true, error: null, redirect: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Registration failed." };
  }
}
