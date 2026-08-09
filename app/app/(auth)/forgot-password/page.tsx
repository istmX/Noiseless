import Link from "next/link";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { LOGIN_ROUTE } from "../constants";
import { Logo } from "@/shared/components/Logo";

export const metadata = {
  title: "Forgot Password - Autonomous Research Analyst",
  description: "Reset your password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-canvas md:flex-row">
      
      <div className="hidden overflow-hidden border-r border-hairline bg-sidebar p-12 md:flex md:w-[46%] md:flex-col md:justify-between">

        <div className="relative z-10">
          <Logo size={32} href="/login" />
        </div>

        <div className="relative z-10 max-w-md">
          <p className="workspace-kicker">Signal Desk</p>
          <h1 className="mt-3 font-sans text-4xl font-semibold leading-tight tracking-tight text-ink">
            Return to your signal desk.
          </h1>
          <p className="font-data text-body text-ink-muted leading-relaxed">
            Get back to your intelligence streams quickly. We&apos;ll send you a link to securely reset your password.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-10 md:p-12">
        <div className="flex w-full max-w-[400px] flex-col gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="workspace-kicker">Account recovery</p>
            <h2 className="font-sans text-2xl font-semibold tracking-tight text-ink">
              Reset Password
            </h2>
            <p className="font-data text-body text-ink-muted">
              Enter your email and we will send you a reset link.
            </p>
          </div>
          
          <form className="flex flex-col gap-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sans text-ink text-label">
                Email
              </Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
                className="font-data bg-surface-inset border-hairline focus-visible:ring-1 focus-visible:ring-primary-soft focus-visible:border-primary h-11"
              />
            </div>
            
            <Button 
              type="button" 
              className="font-sans font-medium w-full bg-primary hover:bg-primary-hover text-on-primary rounded-md h-11 mt-2 transition-colors"
            >
              Send Reset Link
            </Button>
            
            <div className="font-data text-body-sm text-center text-ink-muted mt-2">
              Remembered your password?{" "}
              <Link href={LOGIN_ROUTE} className="text-ink font-medium hover:underline underline-offset-4 transition-all">
                Sign in
              </Link>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}
