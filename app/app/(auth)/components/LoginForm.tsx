"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import Link from "next/link";
import { REGISTER_ROUTE } from "../constants";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, { error: null, success: false });

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state?.error && (
        <div className="bg-danger-soft text-danger p-3 rounded-md text-sm font-data">
          {state.error}
        </div>
      )}
      
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
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="font-sans text-ink text-label">
            Password
          </Label>
          <Link href="/forgot-password" className="font-sans text-label text-ink-muted hover:text-ink transition-colors">
            Forgot password?
          </Link>
        </div>
        <Input 
          id="password" 
          name="password" 
          type="password"
          placeholder="••••••••" 
          required 
          className="font-data bg-surface-inset border-hairline focus-visible:ring-1 focus-visible:ring-primary-soft focus-visible:border-primary h-11"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isPending}
        className="font-sans font-medium w-full bg-primary hover:bg-primary-hover text-on-primary rounded-md h-11 mt-2 transition-colors"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
      
      <div className="font-data text-body-sm text-center text-ink-muted mt-2">
        Don't have an account?{" "}
        <Link href={REGISTER_ROUTE} className="text-ink font-medium hover:underline underline-offset-4 transition-all">
          Sign up
        </Link>
      </div>
    </form>
  );
}
