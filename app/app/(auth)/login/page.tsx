import { LoginForm } from "../components/LoginForm";
import Link from "next/link";
import { Logo } from "@/shared/components/Logo";

export const metadata = {
  title: "Sign In - Autonomous Research Analyst",
  description: "Sign in to your account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-canvas">
      {/* Brand / Hero Section */}
      <div className="hidden md:flex md:w-1/2 bg-surface-inset border-r border-hairline p-12 flex-col justify-between relative overflow-hidden">


        <div className="relative z-10">
          <Logo size={32} href="/login" />
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="font-sans text-display font-bold text-ink leading-tight mb-4">
            Signal-only intelligence.
          </h1>
          <p className="font-data text-body text-ink-muted leading-relaxed">
            Automate continuous monitoring across industries, competitors, and technology trends. Our agent searches, deduplicates, scores, and notifies you only when something genuinely new happens.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 relative">
        <div className="w-full max-w-sm flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h2 className="font-sans text-2xl font-semibold text-ink tracking-tight">
              Welcome back
            </h2>
            <p className="font-data text-body text-ink-muted">
              Enter your email to sign in to your account
            </p>
          </div>
          
          <LoginForm />
          
          <p className="font-data text-body-sm text-center text-ink-muted">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-ink underline-offset-4">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-ink underline-offset-4">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
