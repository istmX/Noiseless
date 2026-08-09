import { LoginForm } from "../components/LoginForm";
import Link from "next/link";
import { Logo } from "@/shared/components/Logo";

export const metadata = {
  title: "Sign In - Autonomous Research Analyst",
  description: "Sign in to your account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-canvas md:flex-row">
      {/* Brand / Hero Section */}
      <div className="relative hidden overflow-hidden border-r border-hairline bg-sidebar p-12 md:flex md:w-[46%] md:flex-col md:justify-between">


        <div className="relative z-10">
          <Logo size={32} href="/login" />
        </div>

        <div className="relative z-10 max-w-md">
          <p className="workspace-kicker">Signal Desk</p>
          <h1 className="mt-3 font-sans text-4xl font-semibold leading-tight tracking-tight text-ink">
            A quieter way to notice what matters.
          </h1>
          <p className="font-data text-body text-ink-muted leading-relaxed">
            Automate continuous monitoring across industries, competitors, and technology trends. Our agent searches, deduplicates, scores, and notifies you only when something genuinely new happens.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-6 sm:p-10 md:p-12">
        <div className="flex w-full max-w-sm flex-col gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="workspace-kicker">Workspace access</p>
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-ink">
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
