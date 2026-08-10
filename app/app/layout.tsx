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
        {/* THESIS: Noiseless turns continuous research into a warm editorial signal world and refuses the generic software hero. OWN-WORLD: orange, peach, cream, ink, organic circles, framed poster surfaces, and oversized geometric type. STORY: the visitor sees the agent move from question to evidence to a useful brief, then starts a watch. FIRST VIEWPORT: a framed poster composition places the headline and action on the left and a live abstract signal scene on the right. FORM: replacement visual world, assigned direction seed f126c40c and 30906322, degraded with no challengers. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md */}
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
