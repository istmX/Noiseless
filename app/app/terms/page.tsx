import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export const metadata = {
  title: "Terms of Service - Autonomous Research Analyst",
  description: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink p-8 md:p-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/">
          <Button variant="ghost" className="font-sans pl-0 text-ink-muted hover:text-ink hover:bg-transparent">
            &larr; Back to home
          </Button>
        </Link>
        <h1 className="font-sans text-4xl font-bold tracking-tight">Terms of Service</h1>
        <div className="font-data space-y-4 text-ink-muted leading-relaxed">
          <p>Last updated: August 2026</p>
          <h2 className="text-2xl font-semibold text-ink pt-4">1. Acceptance of Terms</h2>
          <p>By accessing or using the Autonomous Research Analyst, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
          <h2 className="text-2xl font-semibold text-ink pt-4">2. Use of Service</h2>
          <p>You agree to use the service only for lawful purposes. You must not use the service to conduct any automated data scraping or extraction that violates third-party terms.</p>
          <h2 className="text-2xl font-semibold text-ink pt-4">3. Data and Privacy</h2>
          <p>Your privacy is important to us. Please read our Privacy Policy to understand how we collect, use, and share your information.</p>
          <p className="pt-8"><i>This is a placeholder page for demonstration purposes.</i></p>
        </div>
      </div>
    </div>
  );
}
