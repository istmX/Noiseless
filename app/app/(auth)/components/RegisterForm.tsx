"use client";

import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { DASHBOARD_ROUTE } from "../constants";

export function RegisterForm() {
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Registration failed");
      } else {
        const signInRes = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        
        if (signInRes?.error) {
          setError("Registration successful, but auto-login failed. Please sign in.");
        } else {
          window.location.href = DASHBOARD_ROUTE;
        }
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
        <Label htmlFor="name" className="font-sans text-ink text-label">
          Name
        </Label>
        <Input 
          id="name" 
          name="name" 
          type="text" 
          placeholder="John Doe" 
          required 
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
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
        <Link href="/login" className="text-ink font-medium hover:underline underline-offset-4 transition-all">
          Sign in
        </Link>
      </div>
    </form>
  );
}
