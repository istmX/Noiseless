"use server";

import { signIn } from "@/shared/lib/auth";
import { AuthError } from "next-auth";
import { DASHBOARD_ROUTE } from "../constants";

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
  prevState: AuthError | null,
  formData: FormData
) {
  // In a full implementation, we will hash the password and INSERT into Neon Postgres here.
  // For this slice, we will pretend registration is successful and redirect to login.
  try {
    return { success: true, error: null, redirect: true };
  } catch (error) {
    return { error: "Registration failed." };
  }
}

