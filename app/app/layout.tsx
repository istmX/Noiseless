import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/shared/lib/auth";
import { AuthProvider } from "@/shared/components/AuthProvider";
import { Toaster } from "@/shared/components/ui/sonner";
import { prisma } from "@/shared/lib/db";

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
  
  let dbUser = null;
  if (session?.user?.id) {
    dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        email: true,
        avatarUrl: true,
        tier: true,
      },
    });
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-canvas relative text-ink">
        <AuthProvider
          isLoggedIn={!!session?.user}
          profile={dbUser ? {
            name: dbUser.name || "Analyst",
            email: dbUser.email || "",
            avatarUrl: dbUser.avatarUrl || "",
            tier: dbUser.tier || "FREE",
          } : undefined}
        >
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
