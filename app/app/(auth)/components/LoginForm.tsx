"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { REGISTER_ROUTE, DASHBOARD_ROUTE } from "../constants";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password.");
      } else {
        window.location.href = DASHBOARD_ROUTE;
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="bg-danger-soft text-danger p-3 rounded-md text-sm font-data">
          {error}
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
          disabled={isPending}
          className="font-data bg-surface-inset border-hairline focus-visible:ring-1 focus-visible:ring-primary-soft focus-visible:border-primary h-11"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="font-sans text-ink text-label">
            Password
          </Label>
          <Link href="/forgot-password" className="font-data text-body-sm text-primary hover:text-primary-hover transition-colors">
            Forgot password?
          </Link>
        </div>
        <Input 
          id="password" 
          name="password" 
          type="password"
          placeholder="••••••••" 
          required 
          disabled={isPending}
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
        Don&apos;t have an account?{" "}
        <Link href={REGISTER_ROUTE} className="text-ink font-medium hover:underline underline-offset-4 transition-all">
          Create one
        </Link>
      </div>
    </form>
  );
}
