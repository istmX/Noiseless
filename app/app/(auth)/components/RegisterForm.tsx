"use client";

import { useActionState, useEffect } from "react";
import { registerAction } from "../actions";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LOGIN_ROUTE } from "../constants";

export function RegisterForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerAction, { error: null, success: false, redirect: false });

  useEffect(() => {
    if (state?.redirect) {
      router.push(LOGIN_ROUTE);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state?.error && (
        <div className="bg-danger-soft text-danger p-3 rounded-md text-sm font-data">
          {state.error}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="name" className="font-sans text-ink text-label">
          Name
        </Label>
        <Input 
          id="name" 
          name="name" 
          type="text" 
          placeholder="John Doe" 
          required 
          className="font-data bg-surface-inset border-hairline focus-visible:ring-1 focus-visible:ring-primary-soft focus-visible:border-primary h-11"
        />
      </div>

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
        <Label htmlFor="password" className="font-sans text-ink text-label">
          Password
        </Label>
        <Input 
          id="password" 
          name="password" 
          type="password"
          placeholder="••••••••" 
          required 
          minLength={8}
          className="font-data bg-surface-inset border-hairline focus-visible:ring-1 focus-visible:ring-primary-soft focus-visible:border-primary h-11"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isPending}
        className="font-sans font-medium w-full bg-primary hover:bg-primary-hover text-on-primary rounded-md h-11 mt-2 transition-colors"
      >
        {isPending ? "Creating account..." : "Create Account"}
      </Button>
      
      <div className="font-data text-body-sm text-center text-ink-muted mt-2">
        Already have an account?{" "}
        <Link href={LOGIN_ROUTE} className="text-ink font-medium hover:underline underline-offset-4 transition-all">
          Sign in
        </Link>
      </div>
    </form>
  );
}
