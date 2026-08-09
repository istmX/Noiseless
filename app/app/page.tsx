"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Plus, Minus } from "lucide-react";
import { Logo } from "@/shared/components/Logo";
import { gsap } from "gsap";

// ---------------------------------------------------------------------------
// Copy — outcome-first, no tech jargon
// ---------------------------------------------------------------------------

const TICKER_ITEMS = [
  { id: "t1", label: "SIGNAL", text: "Anthropic raises $5 billion series D", score: "9.2", ago: "2h ago" },
  { id: "t2", label: "SIGNAL", text: "NVDA Q3 guidance raised by 18%", score: "8.7", ago: "45m ago" },
  { id: "t3", label: "FILTERED", text: "Duplicate story about NVDA earnings removed", score: "", ago: "44m ago" },
  { id: "t4", label: "SIGNAL", text: "Palantir expands DoD contract by $400M", score: "9.1", ago: "1h ago" },
  { id: "t5", label: "FILTERED", text: "Earlier Palantir story already captured", score: "", ago: "58m ago" },
  { id: "t6", label: "SIGNAL", text: "OpenAI launches GPT-5 in limited preview", score: "9.8", ago: "3h ago" },
  { id: "t7", label: "SIGNAL", text: "Stripe files confidentially for IPO", score: "9.6", ago: "5h ago" },
];

const STATS = [
  { value: "47,000", label: "Signals caught this month" },
  { value: "94%", label: "Noise filtered before it reaches you" },
  { value: "3.2h", label: "Saved per analyst per day" },
];

const TESTIMONIALS = [
  {
    id: "tm1",
    quote: "I caught a competitor filing four hours before anyone else in my firm did. Noiseless pinged me on Slack while I was still asleep.",
    name: "Sarah Chen",
    role: "Principal, Redwood Capital Partners",
  },
  {
    id: "tm2",
    quote: "I used to spend ninety minutes every morning triaging Google Alerts. Now I open one digest, read three paragraphs, and I am done.",
    name: "Marcus Webb",
    role: "M&A Associate, Sullivan & Cromwell",
  },
  {
    id: "tm3",
    quote: "My beat used to produce two hundred articles a day. Noiseless surfaces the four that actually matter. That is not an exaggeration.",
    name: "Priya Anand",
    role: "Senior Reporter, The Information",
  },
];

const BEFORE_SIGNALS = [
  "Nvidia beats earnings estimates",
  "NVDA Q3 results: record revenue",
  "Nvidia quarterly results smash forecasts",
  "Nvidia earnings recap: what analysts said",
  "NVDA stock surges on Q3 beat",
  "Nvidia revenue hits all-time high",
  "Chip giant Nvidia posts record quarter",
];

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    note: "Good for getting started",
    features: ["3 active watches", "Daily monitoring runs", "Email digest on signal", "7-day finding history"],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: 29, yearly: 290 },
    note: "Most analysts pick this",
    features: ["10 active watches", "Hourly monitoring runs", "Email and Slack digest", "Unlimited finding history", "Configurable thresholds"],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: 99, yearly: 990 },
    note: "For teams that cannot miss anything",
    features: ["Unlimited watches", "15-minute monitoring runs", "API webhook notifications", "Dedicated vector storage", "Priority support"],
    popular: false,
  },
];

const FAQS = [
  {
    id: "faq1",
    q: "How does it know what is important?",
    a: "You set your own threshold for each watch, from 1 to 10. Our AI grades every finding on that scale. Raise it to only hear about major events. Lower it to catch early signals before they become headlines.",
  },
  {
    id: "faq2",
    q: "Will I get the same story twice?",
    a: "No. Every finding is compared against everything we have already shown you from that watch. If it is too similar, it is silently discarded. You only see things that are genuinely new.",
  },
  {
    id: "faq3",
    q: "What does the digest look like?",
    a: "A short, cited research brief — usually three to five paragraphs with direct links to the original sources. It goes to your email or Slack the moment a batch crosses your threshold.",
  },
  {
    id: "faq4",
    q: "Can I monitor competitors, people, or stock tickers?",
    a: "Yes to all of them. Anything you can search for on the web, you can watch. Each watch has its own queries, frequency, and notification settings.",
  },
  {
    id: "faq5",
    q: "Is there a free plan?",
    a: "Yes. Three watches, daily runs, email notifications. No credit card required. Upgrade any time if you need hourly runs or Slack alerts.",
  },
];

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const T = { duration: 0.55, ease: "easeOut" } as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink overflow-x-hidden">
      <LandingNav />
      <main>
        <HeroSection />
        <TickerStrip />
        <StatsStrip />
        <TestimonialsSection />
        <BeforeAfterSection />
        <PricingSection />
        <FaqSection />
      </main>
      <LandingFooter />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------

function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo size={20} />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted transition-colors hover:text-ink sm:block">
            Sign in
          </Link>
          <Link href="/register" className="inline-flex min-h-9 items-center gap-2 rounded-md bg-accent px-4 text-xs font-semibold text-on-accent transition-colors hover:bg-accent-hover">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>(".hero-char");
    const tl = gsap.timeline();
    tl.from(chars, { y: 48, opacity: 0, duration: 0.8, stagger: 0.018, ease: "power4.out" });
    tl.from(".hero-sub", { y: 18, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    tl.from(".hero-cta", { y: 14, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.35");
    return () => { tl.kill(); };
  }, []);

  const words = ["Stop", "drowning", "in", "information.", "Start", "seeing", "what", "changed."];
  const line1 = words.slice(0, 4);
  const line2 = words.slice(4);

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-0 pt-24 text-center sm:pt-32">
      <h1
        ref={headlineRef}
        className="text-[2.8rem] font-bold leading-[1.07] tracking-[-0.03em] text-ink sm:text-[3.75rem] lg:text-[4.5rem]"
        aria-label="Stop drowning in information. Start seeing what changed."
      >
        <span className="block">
          {line1.map((word, wi) => (
            <span key={wi} className="inline-block">
              {word.split("").map((char, ci) => (
                <span key={ci} className="hero-char inline-block">{char}</span>
              ))}
              {wi < line1.length - 1 && <span className="hero-char inline-block">&nbsp;</span>}
            </span>
          ))}
        </span>
        <span className="block">
          {line2.map((word, wi) => (
            <span key={wi} className="inline-block">
              {word.split("").map((char, ci) => (
                <span key={ci} className="hero-char inline-block">{char}</span>
              ))}
              {wi < line2.length - 1 && <span className="hero-char inline-block">&nbsp;</span>}
            </span>
          ))}
        </span>
      </h1>

      <p className="hero-sub mt-6 max-w-xl text-base font-sans leading-[1.8] text-ink-muted sm:text-lg">
        Noiseless watches the web for you. It surfaces only what genuinely changed across your topics — and stays silent the rest of the time.
      </p>

      <div className="hero-cta mt-8 flex flex-col items-center gap-3">
        <Link
          href="/register"
          className="inline-flex min-h-12 items-center gap-2.5 rounded-md bg-accent px-8 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
        >
          Start monitoring free
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
          No credit card required &middot; 3 watches free
        </span>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Ticker strip
// ---------------------------------------------------------------------------

function TickerStrip() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="mt-16 overflow-hidden border-y border-hairline" aria-hidden="true">
      <div className="flex animate-ticker gap-0 whitespace-nowrap py-3">
        {doubled.map((item, idx) => (
          <span key={`${item.id}-${idx}`} className="flex shrink-0 items-center gap-3 px-6 font-mono text-[11px]">
            <span className={item.label === "FILTERED" ? "text-ink-faint" : "font-semibold text-accent"}>
              {item.label}
            </span>
            <span className="text-ink-muted">{item.text}</span>
            {item.score && <span className="text-success">{item.score}/10</span>}
            <span className="text-ink-faint">{item.ago}</span>
            <span className="text-hairline-strong">&nbsp;&middot;&nbsp;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

function StatsStrip() {
  return (
    <motion.section
      id="features"
      className="scroll-mt-20 border-b border-hairline"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={T}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-hairline px-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center py-12 text-center">
            <span className="text-4xl font-bold tabular-nums text-ink sm:text-5xl">{stat.value}</span>
            <span className="mt-2 max-w-[12ch] font-mono text-[11px] uppercase leading-5 tracking-[0.1em] text-ink-faint sm:max-w-none">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={T}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
            Used by analysts who cannot afford to be slow
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <motion.figure
              key={t.id}
              className="flex flex-col justify-between rounded-lg border border-hairline bg-surface p-7 shadow-low"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.1 }}
            >
              <blockquote className="text-sm font-sans leading-7 text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-hairline pt-5">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">{t.name}</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Before / After
// ---------------------------------------------------------------------------

function BeforeAfterSection() {
  return (
    <section className="border-y border-hairline bg-surface-inset py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={T}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">The difference</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Same event. Completely different experience.
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={T}
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-sm bg-danger-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-danger">Before</span>
              <span className="font-mono text-[11px] text-ink-faint">Your inbox this morning</span>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-hairline bg-surface p-5">
              {BEFORE_SIGNALS.map((signal, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-md border border-hairline p-3"
                  style={{ opacity: Math.max(0.22, 1 - idx * 0.13) }}
                >
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint" />
                  <span className="text-xs font-sans text-ink-muted">{signal}</span>
                </div>
              ))}
              <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
                + 194 more results
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-sm bg-success-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-success">After</span>
              <span className="font-mono text-[11px] text-ink-faint">What Noiseless surfaces</span>
            </div>
            <div className="flex flex-col gap-3 rounded-lg border border-accent/25 bg-surface p-5 shadow-low">
              <div className="rounded-md border border-hairline bg-canvas p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-sm bg-success-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-success">Signal</span>
                  <span className="font-mono text-[10px] text-ink-faint">8.7/10 &middot; 45m ago</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-ink">
                  Nvidia Q3 revenue beats by 18% — raises full-year guidance
                </p>
                <p className="mt-2 text-xs font-sans leading-6 text-ink-muted">
                  Quarterly results exceeded consensus estimates by $2.1B. Management raised FY guidance by 18%. Options market pricing in continued upside. Four prior stories on this topic were filtered as duplicates.
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <Link href="/register" className="text-xs font-medium text-accent hover:text-ink">Read full brief</Link>
                  <span className="text-hairline-strong">&middot;</span>
                  <span className="font-mono text-[10px] text-ink-faint">4 duplicates removed</span>
                </div>
              </div>
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.1em] text-success">
                That is all. Nothing else crossed your threshold today.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={T}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">Pricing</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Simple, honest pricing.</h2>
          <div className="mt-6 inline-flex items-center rounded-md border border-hairline bg-surface p-1">
            {(["monthly", "yearly"] as const).map((interval) => (
              <button
                key={interval}
                type="button"
                onClick={() => setBilling(interval)}
                className={`cursor-pointer rounded-sm px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
                  billing === interval ? "bg-primary text-on-primary" : "text-ink-muted hover:text-ink"
                }`}
              >
                {interval === "monthly" ? "Monthly" : "Yearly · 17% off"}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.id}
              className={`relative flex flex-col rounded-lg border bg-surface p-8 ${
                plan.popular ? "border-accent shadow-medium" : "border-hairline"
              }`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.09 }}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-5 rounded-sm bg-accent px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-on-accent">
                  {plan.note}
                </span>
              )}
              <div className="flex flex-1 flex-col gap-5">
                <div>
                  {!plan.popular && (
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">{plan.note}</p>
                  )}
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-ink">{plan.name}</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-ink">${plan.price[billing]}</span>
                    <span className="font-mono text-xs text-ink-faint">/{billing === "monthly" ? "mo" : "yr"}</span>
                  </div>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm font-sans text-ink-body">
                      <Check className="h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/register"
                className={`mt-8 inline-flex min-h-10 w-full items-center justify-center rounded-md text-sm font-semibold transition-colors ${
                  plan.popular
                    ? "bg-accent text-on-accent hover:bg-accent-hover"
                    : "border border-hairline bg-canvas text-ink hover:bg-surface-inset"
                }`}
              >
                {plan.price.monthly === 0 ? "Get started free" : "Start free trial"}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-20 border-t border-hairline bg-surface-inset py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={T}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">FAQ</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink">Common questions.</h2>
        </motion.div>

        <div className="divide-y divide-hairline border-y border-hairline">
          {FAQS.map((faq, idx) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.05 }}
            >
              <button
                type="button"
                onClick={() => setOpen(open === idx ? null : idx)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-ink transition-colors hover:text-accent"
                aria-expanded={open === idx}
              >
                {faq.q}
                <span className="shrink-0 text-ink-faint" aria-hidden="true">
                  {open === idx ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <AnimatePresence>
                {open === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm font-sans leading-7 text-ink-muted">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          className="mt-16 rounded-lg border border-hairline bg-surface p-10 text-center shadow-low"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={T}
        >
          <h2 className="text-2xl font-bold text-ink">Ready to stop missing what matters?</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm font-sans leading-7 text-ink-muted">
            Set up three watches in under two minutes. No credit card required.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-flex min-h-11 items-center gap-2.5 rounded-md bg-accent px-8 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
          >
            Start monitoring free
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

function LandingFooter() {
  return (
    <footer className="border-t border-hairline py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6">
        <Logo size={18} />
        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>
        <Link
          href="/register"
          className="inline-flex min-h-9 items-center gap-2 rounded-md bg-accent px-4 text-xs font-semibold text-on-accent transition-colors hover:bg-accent-hover"
        >
          Get started free <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
      <p className="mt-6 text-center font-mono text-[10px] text-ink-faint">
        &copy; {new Date().getFullYear()} Noiseless. Signal-only intelligence.
      </p>
    </footer>
  );
}
