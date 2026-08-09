import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/db";
import { redirect } from "next/navigation";
import { ProfileForm } from "./components/ProfileForm";
import { PageHeader } from "@/shared/components/workspace/PageHeader";
import Link from "next/link";

export default async function SettingsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }

  // Retrieve user record from database
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      avatarUrl: true,
      tokensBalance: true,
      tokensUsed: true,
      tier: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <PageHeader eyebrow="Account" title="Settings" description="Manage your profile, delivery destinations, and plan limits." />

      {/* Settings Sections */}
      <div className="grid grid-cols-1 gap-6">
        <ProfileForm initialUser={user} />
        <section className="workspace-panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div><p className="workspace-kicker">Subscription</p><h2 className="mt-2 text-base font-semibold text-ink">{user.tier} plan</h2><p className="mt-1 text-sm text-ink-muted">{user.tokensBalance} tokens available. Review usage and manage your plan.</p></div><Link href="/settings/billing" className="workspace-action inline-flex shrink-0 items-center justify-center bg-primary text-on-primary hover:bg-primary-hover">Manage subscription</Link></section>
      </div>
    </div>
  );
}
