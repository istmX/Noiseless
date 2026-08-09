"use client";

import { useState } from "react";
import { Check, ShieldCheck, CreditCard } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { upgradeUserPlan } from "../actions";

interface BillingPlansProps {
  tokensBalance: number;
  tokensUsed: number;
  tier: string;
}

export function BillingPlans({ tokensBalance, tokensUsed, tier }: BillingPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plans = [
    {
      name: "Free Tier",
      id: "FREE",
      price: "$0",
      description: "Ideal for individual research and basic monitoring.",
      features: [
        "Up to 5 active watch topics",
        "Daily or weekly search frequencies",
        "Tavily News search integration",
        "500 query credits per month",
      ],
      current: tier === "FREE",
    },
    {
      name: "Pro Analyst",
      id: "PRO",
      price: "$29",
      description: "For professionals needing near real-time updates.",
      features: [
        "Up to 50 active watch topics",
        "Hourly search trigger capability",
        "Real time search threshold filters",
        "10,000 query credits per month",
        "Dedicated Slack webhook delivery",
      ],
      current: tier === "PRO",
    },
    {
      name: "Enterprise",
      id: "ENTERPRISE",
      price: "$99",
      description: "For organizations tracking large scale market movements.",
      features: [
        "Unlimited active watch topics",
        "Custom execution intervals",
        "Priority vector indexing keys",
        "100,000 query credits per month",
        "Custom Brevo SMTP sender credentials",
      ],
      current: tier === "ENTERPRISE",
    },
  ];

  const handleOpenUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    setError(null);
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setCardName("");
  };

  const handleCloseUpgrade = () => {
    if (!isProcessing) {
      setSelectedPlan(null);
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    if (paymentMethod === "card") {
      if (!cardName.trim() || cardNumber.length < 16 || !cardExpiry.includes("/") || cardCvc.length < 3) {
        setError("Please complete all payment details before submitting.");
        return;
      }
    }

    setIsProcessing(true);
    setError(null);

    // Simulate payment transaction network latency
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = await upgradeUserPlan(selectedPlan);

    setIsProcessing(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSelectedPlan(null);
    }
  };

  const activePlanInfo = plans.find((p) => p.current) || plans[0];

  return (
    <section className="workspace-panel space-y-8 p-5 sm:p-6">
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
            <span>{activePlanInfo.name} Usage</span>
            <span className="text-[10px] bg-primary-soft text-primary px-2 py-0.5 rounded-sm uppercase tracking-wider font-mono font-medium">Active</span>
          </h3>
          <p className="text-xs text-ink-muted">Your queries reset on the first of every month.</p>
        </div>
        <div className="text-center sm:text-right shrink-0">
          <span className="font-mono text-xl font-semibold text-ink">{tokensUsed} / {tokensBalance + tokensUsed}</span>
          <span className="text-xs text-ink-faint ml-1.5 block sm:inline">query tokens used</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col justify-between rounded-lg border p-5 transition-all ${
              plan.current
                ? "bg-accent-soft border-accent"
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
                <Button
                  onClick={() => handleOpenUpgrade(plan.id)}
                  className="w-full bg-primary hover:bg-primary-hover text-on-primary rounded-md text-xs cursor-pointer transition-colors"
                >
                  Upgrade to {plan.name.split(" ")[0]}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Dialog */}
      <Dialog open={selectedPlan !== null} onOpenChange={handleCloseUpgrade}>
        <DialogContent className="sm:max-w-[480px] bg-surface border border-hairline rounded-lg p-6 shadow-high">
          <DialogHeader>
            <DialogTitle className="text-lg font-sans font-semibold text-ink flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Secure Checkout
            </DialogTitle>
            <DialogDescription className="text-xs text-ink-muted mt-1">
              Complete your subscription upgrade details below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCheckoutSubmit} className="space-y-4 my-2">
            {error && (
              <div className="p-3 bg-danger-soft border border-danger/20 rounded-md text-xs text-danger text-center">
                {error}
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="grid grid-cols-1 gap-2 pb-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`py-2 px-3 text-center border rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  paymentMethod === "card"
                    ? "bg-surface-inset border-primary text-ink"
                    : "bg-surface border-hairline text-ink-muted hover:text-ink"
                }`}
              >
                Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                className={`py-2 px-3 text-center border rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  paymentMethod === "paypal"
                    ? "bg-surface-inset border-primary text-ink"
                    : "bg-surface border-hairline text-ink-muted hover:text-ink"
                }`}
              >
                PayPal
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("apple")}
                className={`py-2 px-3 text-center border rounded-md text-xs font-medium cursor-pointer transition-colors ${
                  paymentMethod === "apple"
                    ? "bg-surface-inset border-primary text-ink"
                    : "bg-surface border-hairline text-ink-muted hover:text-ink"
                }`}
              >
                Apple Pay
              </button>
            </div>

            {paymentMethod === "card" ? (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-ink-muted uppercase tracking-wider block">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full text-xs bg-surface-inset border border-hairline rounded-md p-2.5 text-ink outline-hidden focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-ink-muted uppercase tracking-wider block">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="4111 2222 3333 4444"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                    className="w-full text-xs bg-surface-inset border border-hairline rounded-md p-2.5 text-ink outline-hidden focus:border-primary font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-ink-muted uppercase tracking-wider block">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full text-xs bg-surface-inset border border-hairline rounded-md p-2.5 text-ink outline-hidden focus:border-primary font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-ink-muted uppercase tracking-wider block">
                      Security Code (CVC)
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      placeholder="•••"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                      className="w-full text-xs bg-surface-inset border border-hairline rounded-md p-2.5 text-ink outline-hidden focus:border-primary font-mono"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center border border-dashed border-hairline rounded-md">
                <p className="text-xs text-ink-muted">
                  You will be redirected to complete payment with{" "}
                  {paymentMethod === "paypal" ? "PayPal" : "Apple Pay"} upon clicking process.
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2 text-[10px] text-ink-muted">
              <ShieldCheck className="w-4 h-4 text-success shrink-0" />
              <span>Payments are processed securely. Your data is encrypted end to end.</span>
            </div>

            <DialogFooter className="pt-4 border-t border-hairline/50 mt-4 flex sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={isProcessing}
                onClick={handleCloseUpgrade}
                className="w-full sm:w-auto text-xs bg-transparent border border-hairline text-ink hover:bg-surface-inset"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-on-primary text-xs font-sans font-semibold flex items-center justify-center gap-1.5"
              >
                {isProcessing ? "Processing..." : "Process Subscription"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
