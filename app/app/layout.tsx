import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/shared/components/ThemeProvider";
import { auth } from "@/shared/lib/auth";
import { AuthProvider } from "@/shared/components/AuthProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-data",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Autonomous Research Analyst",
  description: "Monitor topics, industries, and competitors with an autonomous AI research agent.",
};

import { ThemeToggle } from "@/shared/components/ThemeToggle";

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
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas relative">
        <ThemeProvider 
          attribute="data-theme" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          <div className="absolute top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <AuthProvider isLoggedIn={!!session?.user}>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
