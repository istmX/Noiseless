"use client";

import { useState, use, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, ShieldCheck, CreditCard, ArrowRight, ArrowLeft, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { upgradeUserPlan } from "@/app/(dashboard)/settings/actions";
import Link from "next/link";

interface PageProps {
  params: Promise<{ plan: string }>;
}

export default function CheckoutPage({ params }: PageProps) {
  const router = useRouter();
  const { plan } = use(params);
  const planUpper = plan.toUpperCase();

  const [step, setStep] = useState(0);
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");
  const [country, setCountry] = useState("United States");
  const [zip, setZip] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();
  const [currentSecurityStep, setCurrentSecurityStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const allowedPlans = ["PRO", "ENTERPRISE"];
  if (!allowedPlans.includes(planUpper)) {
    router.replace("/settings");
    return null;
  }

  const basePrice = planUpper === "PRO" ? 29 : 99;
  const price = billingInterval === "monthly" ? basePrice : basePrice * 10;

  const securityMessages = [
    "Establishing encrypted gateway link",
    "Transmitting secure authorization token",
    "Verifying billing identity constraints",
    "Allocating new token quota balance",
    "Finalizing subscription configuration"
  ];

  const handleNext = () => {
    if (step === 1 && (!zip.trim() || !addressLine.trim())) {
      setCheckoutError("Please fill out all billing address fields.");
      return;
    }
    if (step === 2 && (!cardName.trim() || cardNumber.length < 16 || !cardExpiry.includes("/") || cardCvc.length < 3)) {
      setCheckoutError("Please complete all payment card details.");
      return;
    }
    setCheckoutError(null);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCheckoutError(null);
    setStep((prev) => prev - 1);
  };

  const handleProcessCheckout = () => {
    setCheckoutError(null);
    startTransition(async () => {
      // Step-by-step mock security checks timing
      for (let i = 0; i < securityMessages.length; i++) {
        setCurrentSecurityStep(i);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      const res = await upgradeUserPlan(planUpper);
      if (res?.error) {
        setCheckoutError(res.error);
        setStep(3); // return to review step
      } else {
        setIsSuccess(true);
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-md mx-auto px-6 text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-primary-soft flex items-center justify-center border border-hairline">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-2xl font-sans font-bold text-ink">Checkout Complete</h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          Your workspace has been successfully upgraded to the {planUpper} plan level. Enjoy hourly watch intervals and your newly allocated query tokens.
        </p>
        <Link href="/settings" className="w-full">
          <Button className="w-full bg-primary hover:bg-primary-hover text-on-primary h-11 rounded-md text-xs cursor-pointer font-semibold transition-colors">
            Return to settings
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col w-full max-w-3xl mx-auto px-6 md:px-12 py-8 md:py-12 min-h-screen space-y-8">
      {/* Back to settings button */}
      <div>
        <Link
          href="/settings"
          className="inline-flex items-center text-xs text-ink-muted hover:text-ink transition-colors gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to settings
        </Link>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-sans font-semibold text-ink tracking-tight flex items-center gap-2">
          Checkout ({planUpper} Plan)
        </h1>
        <p className="text-xs text-ink-muted mt-1">
          Complete the checkout steps below to activate your premium upgrades.
        </p>
      </div>

      {/* Stepper indicators */}
      <div className="flex justify-between items-center pb-4 border-b border-hairline">
        {["Plan Options", "Billing Address", "Card Details", "Review"].map((label, idx) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-semibold border ${
                idx === step
                  ? "bg-primary text-on-primary border-primary"
                  : idx < step
                  ? "bg-primary-soft text-primary border-hairline"
                  : "bg-surface text-ink-faint border-hairline"
              }`}
            >
              {idx < step ? "✓" : idx + 1}
            </span>
            <span
              className={`text-[11px] font-sans font-medium hidden sm:inline ${
                idx === step ? "text-ink" : "text-ink-faint"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Main card panel */}
      <div className="bg-surface border border-hairline rounded-xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Loading overlay for security steps */}
        {isPending && (
          <div className="absolute inset-0 bg-surface/90 backdrop-blur-xs flex flex-col items-center justify-center z-20 space-y-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <div className="space-y-1.5 text-center px-6">
              <p className="text-sm font-sans font-medium text-ink flex items-center gap-1.5 justify-center">
                <Sparkles className="w-4 h-4 text-success" />
                {securityMessages[currentSecurityStep]}
              </p>
              <p className="text-[11px] text-ink-faint">
                Transaction processing (please do not reload this workstation session)
              </p>
            </div>
          </div>
        )}

        {checkoutError && (
          <div className="mb-6 p-4 bg-danger-soft border border-danger/20 rounded-md text-xs text-danger text-center">
            {checkoutError}
          </div>
        )}

        {/* STEP 0: Plan billing options */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-body-sm font-medium text-ink">Choose Billing Interval</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBillingInterval("monthly")}
                  className={`py-3 px-4 border rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                    billingInterval === "monthly"
                      ? "bg-surface-inset border-primary text-ink"
                      : "bg-surface border-hairline text-ink-muted hover:text-ink"
                  }`}
                >
                  Monthly billing (${basePrice}/mo)
                </button>
                <button
                  type="button"
                  onClick={() => setBillingInterval("yearly")}
                  className={`py-3 px-4 border rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                    billingInterval === "yearly"
                      ? "bg-surface-inset border-primary text-ink"
                      : "bg-surface border-hairline text-ink-muted hover:text-ink"
                  }`}
                >
                  Yearly billing (${basePrice * 10}/yr - save 15%)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Address Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-ink-muted uppercase tracking-wider block">
                Country
              </label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full text-xs bg-surface-inset border border-hairline rounded-md p-2.5 text-ink outline-hidden focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-ink-muted uppercase tracking-wider block">
                Billing Address Line
              </label>
              <input
                type="text"
                required
                placeholder="123 Main St, Suite 4B"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                className="w-full text-xs bg-surface-inset border border-hairline rounded-md p-2.5 text-ink outline-hidden focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-ink-muted uppercase tracking-wider block">
                Postal Code (ZIP)
              </label>
              <input
                type="text"
                required
                placeholder="10001"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full text-xs bg-surface-inset border border-hairline rounded-md p-2.5 text-ink outline-hidden focus:border-primary font-mono"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Card details */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
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

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-ink-muted uppercase tracking-wider block">
                Card Number
              </label>
              <input
                type="text"
                required
                maxLength={16}
                placeholder="4111222233334444"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                className="w-full text-xs bg-surface-inset border border-hairline rounded-md p-2.5 text-ink outline-hidden focus:border-primary font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
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

              <div className="space-y-1.5">
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
        )}

        {/* STEP 3: Review and submit */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="border border-hairline rounded-lg p-5 bg-surface-inset space-y-4">
              <h3 className="font-sans font-semibold text-sm text-ink border-b border-hairline pb-2 flex justify-between">
                <span>Plan Upgrades</span>
                <span className="font-mono text-primary">${price} ({billingInterval})</span>
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-ink-faint">Subscription Tier</p>
                  <p className="text-ink font-medium mt-0.5">{planUpper} Analyst</p>
                </div>
                <div>
                  <p className="text-ink-faint">Billing Address</p>
                  <p className="text-ink font-medium mt-0.5 truncate">{addressLine}, {zip}</p>
                </div>
                <div>
                  <p className="text-ink-faint">Interval Details</p>
                  <p className="text-ink font-medium mt-0.5 capitalize">{billingInterval} Cycles</p>
                </div>
                <div>
                  <p className="text-ink-faint">Payment Method</p>
                  <p className="text-ink font-medium mt-0.5">Card ending in {cardNumber.slice(-4)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[10px] text-ink-muted">
              <ShieldCheck className="w-4 h-4 text-success shrink-0" />
              <span>Checkout utilizes secure tokenization. Card details are never saved in database records.</span>
            </div>
          </div>
        )}

        {/* Action button row */}
        <div className="flex justify-between items-center pt-6 border-t border-hairline/50 mt-6">
          {step > 0 ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="text-xs bg-transparent border border-hairline text-ink hover:bg-surface-inset h-10 px-4 cursor-pointer"
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-primary hover:bg-primary-hover text-on-primary text-xs font-sans font-semibold flex items-center gap-1.5 h-10 px-4 cursor-pointer"
            >
              Continue <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleProcessCheckout}
              className="bg-primary hover:bg-primary-hover text-on-primary text-xs font-sans font-semibold flex items-center gap-1.5 h-10 px-4 cursor-pointer"
            >
              Process Subscription
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
