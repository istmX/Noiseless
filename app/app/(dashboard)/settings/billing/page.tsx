import { auth } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/db";
import { redirect } from "next/navigation";
import { PageHeader } from "@/shared/components/workspace/PageHeader";
import { BillingPlans } from "../components/BillingPlans";

export default async function BillingPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { tokensBalance: true, tokensUsed: true, tier: true },
  });
  if (!user) redirect("/login");

  return <div className="flex min-w-0 flex-col gap-6"><PageHeader eyebrow="Account / subscription" title="Plan and usage" description="Manage your token balance, plan limits, and subscription upgrade." /><BillingPlans tokensBalance={user.tokensBalance} tokensUsed={user.tokensUsed} tier={user.tier} /></div>;
}
