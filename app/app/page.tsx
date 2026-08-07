import React from 'react'
import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 gap-8">
      <h1 className="text-display font-sans font-bold text-ink">Autonomous Research Analyst</h1>
      <p className="text-ink-muted max-w-md text-center">
        The continuous monitoring, signal-only intelligence stream.
      </p>
      <div className="flex gap-4">
        <Link href="/login">
          <Button className="bg-primary text-on-primary hover:bg-primary-hover">Sign In</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline" className="border-hairline text-ink bg-transparent hover:bg-surface-inset">Register</Button>
        </Link>
      </div>
    </div>
  )
}