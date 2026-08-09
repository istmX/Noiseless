import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/db";
import { redirect } from "next/navigation";
import { ProfileForm } from "./components/ProfileForm";
import { BillingPlans } from "./components/BillingPlans";

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
    <div className="relative flex flex-col w-full max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 min-h-screen space-y-8">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-sans font-semibold text-ink tracking-tight">
          Workstation Settings
        </h1>
        <p className="text-xs text-ink-muted mt-2">
          Configure your personal preferences, plan details, and notification thresholds.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 gap-8">
        <ProfileForm initialUser={user} />
        <BillingPlans tokensBalance={user.tokensBalance} tokensUsed={user.tokensUsed} tier={user.tier} />
      </div>
    </div>
  );

}
