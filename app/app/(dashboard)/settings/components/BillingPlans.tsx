"use client";

import { Check, ShieldAlert } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function BillingPlans() {
  const plans = [
    {
      name: "Free Tier",
      price: "$0",
      description: "Ideal for individual research and basic monitoring.",
      features: [
        "Up to 5 active watch topics",
        "Daily or weekly search frequencies",
        "Tavily News search integration",
        "500 query credits per month",
      ],
      current: true,
    },
    {
      name: "Pro Analyst",
      price: "$29",
      description: "For professionals needing near real-time updates.",
      features: [
        "Up to 50 active watch topics",
        "Hourly search trigger capability",
        "Gemini 3.5 and Mistral model fallbacks",
        "10,000 query credits per month",
        "Dedicated Slack webhook delivery",
      ],
      current: false,
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For organizations tracking large scale market movements.",
      features: [
        "Unlimited active watch topics",
        "Custom execution intervals",
        "Priority vector indexing keys",
        "100,000 query credits per month",
        "Custom Brevo SMTP sender credentials",
      ],
      current: false,
    },
  ];

  return (
    <div className="bg-surface border border-hairline rounded-xl p-6 sm:p-8 shadow-xs space-y-8">
      <div className="border-b border-hairline pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-sans font-semibold text-ink">Subscription and Billing</h2>
          <p className="text-xs text-ink-muted mt-1">Manage your plan subscription and token usage.</p>
        </div>
      </div>

      {/* Credit quota tracker */}
      <div className="bg-surface-inset border border-hairline-strong rounded-lg p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-sans font-semibold text-ink text-sm flex items-center gap-1.5 justify-center sm:justify-start">
            <span>Free Tier Plan Usage</span>
            <span className="text-[10px] bg-primary-soft text-primary px-2 py-0.5 rounded-sm uppercase tracking-wider font-mono font-medium">Active</span>
          </h3>
          <p className="text-xs text-ink-muted">Your queries reset on the first of every month.</p>
        </div>
        <div className="text-center sm:text-right shrink-0">
          <span className="font-mono text-xl font-semibold text-ink">0 / 500</span>
          <span className="text-xs text-ink-faint ml-1.5 block sm:inline">query tokens used</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-lg p-5 flex flex-col justify-between transition-all ${
              plan.current
                ? "bg-surface-inset border-primary border-2 shadow-xs"
                : "bg-surface border-hairline hover:border-hairline-strong"
            }`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-sans font-semibold text-ink text-sm">{plan.name}</h4>
                  <p className="text-[10px] text-ink-muted mt-1 leading-snug">{plan.description}</p>
                </div>
              </div>

              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-2xl font-mono font-semibold text-ink">{plan.price}</span>
                <span className="text-xs text-ink-muted">/ month</span>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-hairline/50">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[11px] text-ink-muted leading-tight">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              {plan.current ? (
                <Button disabled className="w-full bg-surface-elevated text-ink-faint border border-hairline rounded-md text-xs cursor-not-allowed">
                  Current Plan
                </Button>
              ) : (
                <Button className="w-full bg-primary hover:bg-primary-hover text-on-primary rounded-md text-xs cursor-pointer transition-colors">
                  Upgrade to {plan.name.split(" ")[0]}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
