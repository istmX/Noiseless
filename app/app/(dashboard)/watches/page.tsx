import React from 'react'
import { auth } from '@/shared/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen p-8 bg-canvas">
      <h1 className="text-display font-sans font-bold text-ink">Watches Dashboard</h1>
      <p className="mt-4 text-ink-muted">Welcome back, {session.user?.email}!</p>
      <div className="mt-8 p-6 rounded-md border-hairline bg-surface">
        <p className="text-ink">This is a placeholder dashboard. Watch CRUD implementation is pending.</p>
      </div>
    </div>
  )
}
