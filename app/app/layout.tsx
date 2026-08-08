import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/shared/lib/auth";
import { AuthProvider } from "@/shared/components/AuthProvider";
import { Sidebar } from "@/shared/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Autonomous Research Analyst",
  description: "Monitor topics, industries, and competitors with an autonomous AI research agent.",
};

import { Toaster } from "@/shared/components/ui/sonner";

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
      className={`${inter.variable} ${newsreader.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas relative">
        <AuthProvider isLoggedIn={!!session?.user}>
          <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-canvas">
            <Sidebar />
            <main className="flex-1 overflow-y-auto pl-0 md:pl-64 w-full">
              {children}
            </main>
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
