import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/shared/lib/auth";
import { AuthProvider } from "@/shared/components/AuthProvider";
import { Toaster } from "@/shared/components/ui/sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

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

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas relative">
        <AuthProvider isLoggedIn={!!session?.user}>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
