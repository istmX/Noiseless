import { RegisterForm } from "../components/RegisterForm";
import Link from "next/link";
import { Logo } from "@/shared/components/Logo";

export const metadata = {
  title: "Register - Autonomous Research Analyst",
  description: "Create an account.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-canvas md:flex-row">
      {/* Brand / Hero Section */}
      <div className="relative hidden overflow-hidden border-r border-hairline bg-sidebar p-12 md:flex md:w-[46%] md:flex-col md:justify-between">


        <div className="relative z-10">
          <Logo size={32} href="/register" />
        </div>

        <div className="relative z-10 max-w-md">
          <p className="workspace-kicker">Signal Desk</p>
          <h1 className="mt-3 font-sans text-4xl font-semibold leading-tight tracking-tight text-ink">
            Start with one focused question.
          </h1>
          <p className="font-data text-body text-ink-muted leading-relaxed">
            Create an account to build your first Watch. Track any topic on autopilot, completely immune to noise.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-6 sm:p-10 md:p-12">
        <div className="flex w-full max-w-[400px] flex-col gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="workspace-kicker">New workspace</p>
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-ink">
              Create an account
            </h2>
            <p className="font-data text-body text-ink-muted">
              Enter your email below to create your account
            </p>
          </div>
          
          <RegisterForm />
          
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
