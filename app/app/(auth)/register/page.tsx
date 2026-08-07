import { RegisterForm } from "../components/RegisterForm";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Register - Autonomous Research Analyst",
  description: "Create an account.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-canvas">
      {/* Brand / Hero Section */}
      <div className="hidden md:flex md:w-1/2 bg-surface-inset border-r border-hairline p-12 flex-col justify-between relative overflow-hidden">


        <div className="relative z-10 flex items-center gap-3">
          <Image 
            src="/logos/image.png" 
            alt="Noiseless Logo" 
            width={32} 
            height={32} 
            className="object-cover"
          />
          <span className="font-sans font-semibold text-ink tracking-tight">
            Noiseless
          </span>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="font-sans text-display font-bold text-ink leading-tight mb-4">
            Start your intelligence stream.
          </h1>
          <p className="font-data text-body text-ink-muted leading-relaxed">
            Create an account to build your first Watch. Track any topic on autopilot, completely immune to noise.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 relative">
        <div className="w-full max-w-[400px] flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h2 className="font-sans text-2xl font-semibold text-ink tracking-tight">
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
