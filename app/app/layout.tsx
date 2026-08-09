import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/shared/lib/auth";
import { AuthProvider } from "@/shared/components/AuthProvider";
import { Toaster } from "@/shared/components/ui/sonner";

export const metadata: Metadata = {
  title: "Noiseless — Autonomous Research Analyst",
  description:
    "Monitor topics, industries, and competitors with an autonomous AI research agent. Signal-only intelligence, delivered when it matters.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const sessionUser = session?.user as ({ name?: string | null; email?: string | null; avatarUrl?: string | null; tier?: string | null } | undefined);

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-canvas relative text-ink">
        <AuthProvider
          isLoggedIn={!!session?.user}
          profile={sessionUser ? {
            name: sessionUser.name || "Analyst",
            email: sessionUser.email || "",
            avatarUrl: sessionUser.avatarUrl || "",
            tier: sessionUser.tier || "FREE",
          } : undefined}
        >
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
