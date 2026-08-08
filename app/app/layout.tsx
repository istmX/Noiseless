import type { Metadata } from "next";
import { Space_Grotesk, Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
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

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"],
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

import { ThemeToggle } from "@/shared/components/ThemeToggle";
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${playfairDisplay.variable} ${jetBrainsMono.variable} h-full antialiased`}
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
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
