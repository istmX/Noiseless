import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export const metadata = {
  title: "Privacy Policy - Autonomous Research Analyst",
  description: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink p-8 md:p-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/">
          <Button variant="ghost" className="font-sans pl-0 text-ink-muted hover:text-ink hover:bg-transparent">
            &larr; Back to home
          </Button>
        </Link>
        <h1 className="font-sans text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <div className="font-data space-y-4 text-ink-muted leading-relaxed">
          <p>Last updated: August 2026</p>
          <h2 className="text-2xl font-semibold text-ink pt-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create or modify your account, request support, or otherwise communicate with us.</p>
          <h2 className="text-2xl font-semibold text-ink pt-4">2. How We Use Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, as well as to develop new features and protect our users.</p>
          <h2 className="text-2xl font-semibold text-ink pt-4">3. Security</h2>
          <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
          <p className="pt-8"><i>This is a placeholder page for demonstration purposes.</i></p>
        </div>
      </div>
    </div>
  );
}
