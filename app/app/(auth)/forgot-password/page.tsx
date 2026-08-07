import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { LOGIN_ROUTE } from "../constants";

export const metadata = {
  title: "Forgot Password - Autonomous Research Analyst",
  description: "Reset your password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-canvas">
      
      <div className="hidden md:flex md:w-1/2 bg-[#050505] border-r border-hairline p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[50%] bg-primary-soft opacity-20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center shadow-low">
            <Search className="w-4 h-4 text-on-primary" strokeWidth={2.5} />
          </div>
          <span className="font-sans font-semibold text-ink tracking-tight">
            Noiseless
          </span>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="font-sans text-display font-bold text-ink leading-tight mb-4">
            Recovery.
          </h1>
          <p className="font-data text-body text-ink-muted leading-relaxed">
            Get back to your intelligence streams quickly. We'll send you a link to securely reset your password.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-[400px] flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h2 className="font-sans text-2xl font-semibold text-ink tracking-tight">
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
