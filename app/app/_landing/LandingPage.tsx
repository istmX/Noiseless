"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  BarChart2,
  Layers,
  Users,
  Lightbulb,
  Bell,
  Eye,
  Zap,
  Shield,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { Logo } from "@/shared/components/Logo";

gsap.registerPlugin(ScrollTrigger);

// ─── constants ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Products", href: "#features" },
  { label: "Solutions", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Company", href: "#about" },
];

const MARQUEE_ITEMS = [
  "FOLLOW THE SIGNAL",
  "COMPETITORS",
  "MARKETS",
  "TECHNOLOGY",
  "PEOPLE",
  "RESEARCH",
  "INTELLIGENCE",
  "SIGNALS",
  "DIGESTS",
  "INSIGHTS",
];

const FEATURE_CARDS = [
  {
    kicker: "Intelligent Prioritization",
    title: "Acme AI helps the work get done and go on from there.",
    body: "Acme AI accelerates the work and gives you an idea across all your sectors.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=85",
    alt: "Focused professional in an editorial setting",
  },
  {
    kicker: "Effortless Integration",
    title: "Drop in to the tools your team already uses, no learning curve.",
    body: "Acme AI integrates with the tools you single-use and gives you a drop in without disruption.",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=85",
    alt: "Model in atmospheric editorial light",
  },
];

const MINI_FEATURES = [
  { icon: BarChart2, label: "Smarter Analytics", body: "Deep data synthesis across every sector of your vertical." },
  { icon: Layers, label: "Seamless Workflow", body: "Drop in the one tool system and pair with the tools you use." },
  { icon: Users, label: "Team Alignment", body: "One view for the whole team so the work lines up continuously." },
  { icon: Lightbulb, label: "Clear Decision Support", body: "Acme AI contextualizes it. Always clear. Always driven by evidence." },
];

const PIPELINE_STEPS = [
  { icon: Eye, label: "Watch set", desc: "Define a topic and frequency" },
  { icon: Zap, label: "Agent runs", desc: "Searches, embeds, deduplicates" },
  { icon: Shield, label: "Scored", desc: "Significance ranked 1–10 by AI" },
  { icon: Bell, label: "Digest sent", desc: "Only when it crosses your bar" },
];

const TESTIMONIALS = [
  {
    quote: "Noiseless cut my weekly competitor review from two hours to ten minutes.",
    name: "Alicia Morgan",
    role: "Head of Strategy",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
  },
  {
    quote: "It caught a supply shift before our entire category team did.",
    name: "Sophie Tan",
    role: "Procurement Lead",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
  },
  {
    quote: "The digest format reads like a brief from a smart analyst, not a list of scraped links.",
    name: "Emily Carter",
    role: "Research Director",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80",
  },
  {
    quote: "Citations baked in means I share findings directly to leadership without re-sourcing.",
    name: "Hannah Lee",
    role: "Competitive Intelligence",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&q=80",
  },
];

const STATS = [
  { raw: 12500, display: "12,500+", label: "Watches created", suffix: "+" },
  { raw: 38, display: "38%", label: "Faster research cycles", suffix: "%" },
  { raw: 94, display: "94%", label: "Signal accuracy", suffix: "%" },
  { raw: 8, display: "8", label: "Global coverage zones", suffix: " zones" },
];

const PRICING_PLANS = [
  {
    tier: "Starter",
    price: "$0",
    cadence: "/month",
    description: "One watch. Enough to feel the difference.",
    features: ["1 active watch", "Daily frequency", "Email digests", "7-day history", "Community support"],
    cta: "Get started",
    href: "/register",
    featured: false,
  },
  {
    tier: "Pro",
    price: "$20",
    cadence: "/month",
    description: "For analysts running multiple topics in parallel.",
    features: ["Everything in Starter", "10 active watches", "Hourly frequency", "Real-time collaboration", "Priority support"],
    cta: "Get started",
    href: "/register?plan=pro",
    featured: true,
  },
  {
    tier: "Enterprise",
    price: "$90",
    cadence: "/month",
    description: "Team-wide intelligence with advanced controls.",
    features: ["Everything in Pro", "Unlimited watches", "All frequencies", "Unlimited history", "Customer success manager", "Custom integrations"],
    cta: "Contact sales",
    href: "mailto:hello@noiseless.ai",
    featured: false,
  },
];

const INSIGHTS = [
  {
    tag: "How AI Helps Teams Stay in Flow",
    body: "Automated insight has never been so focused. It means your team always gets the information they need, fast.",
    author: "Brand Author",
    role: "Noiseless",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
  },
  {
    tag: "The Use of Context Switching",
    body: "Here is how to not lose the thread when you move across tools. One view for the whole team.",
    author: "Brand Author",
    role: "Noiseless",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  },
  {
    tag: "Why Small Teams Win Big with AI",
    body: "Smaller teams move faster with the right signal. Here is how they use Noiseless to stay on the front edge.",
    author: "Brand Author",
    role: "Noiseless",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
  },
];

const FAQ_ITEMS = [
  { q: "What is Noiseless?", a: "Noiseless is an autonomous research analyst. It monitors the open web for any topic you define and delivers concise, cited digests when something genuinely new happens." },
  { q: "Who is Noiseless for?", a: "Strategy teams, competitive intelligence analysts, market researchers, and any professional who needs to stay informed without spending hours reading." },
  { q: "How much does it cost?", a: "The Starter plan is free forever for one watch. Pro is $20 for ten watches. Enterprise is $90 for unlimited coverage." },
  { q: "Do I need technical skills?", a: "No. You describe your topic, set a frequency, and Noiseless handles search, deduplication, scoring, and delivery automatically." },
  { q: "Can I try it before I buy?", a: "Yes. Sign up for free and explore one watch on the daily frequency with no credit card required." },
  { q: "How does Noiseless handle my data?", a: "Your watch queries and findings are stored securely. We never sell your data or use your queries to train shared models." },
];

const FOOTER_COLS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "News Items", href: "#" },
      { label: "Sign up", href: "/register" },
      { label: "Power", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Competitors", href: "#" },
      { label: "Markets", href: "#" },
      { label: "Technology", href: "#" },
      { label: "People", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "mailto:hello@noiseless.ai" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Settings", href: "#" },
      { label: "GDPR", href: "#" },
    ],
  },
];

// ─── Animated FAQ accordion item ──────────────────────────────────────────────

function FaqItem({ item, index }: { item: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    if (tlRef.current) tlRef.current.kill();

    if (open) {
      el.style.height = "auto";
      const fullHeight = el.scrollHeight;
      el.style.height = "0px";
      el.style.opacity = "0";

      tlRef.current = gsap.to(el, {
        height: fullHeight,
        opacity: 1,
        duration: 0.38,
        ease: "power3.out",
        onComplete: () => { el.style.height = "auto"; },
      });
    } else {
      const currentHeight = el.scrollHeight;
      el.style.height = `${currentHeight}px`;

      tlRef.current = gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.28,
        ease: "power3.in",
      });
    }
  }, [open]);

  return (
    <div className="border-b border-hairline" data-reveal>
      <button
        type="button"
        id={`faq-btn-${index}`}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left bg-transparent border-none cursor-pointer font-sans group"
      >
        <span className="text-[14px] font-semibold text-ink group-hover:text-accent transition-colors duration-150">
          {item.q}
        </span>
        <span
          className="shrink-0 w-6 h-6 rounded-full border border-hairline grid place-items-center transition-all duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <ChevronDown size={13} className="text-ink-faint" />
        </span>
      </button>
      <div
        ref={bodyRef}
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
      >
        <p className="text-sm text-ink-body leading-relaxed pb-5">{item.a}</p>
      </div>
    </div>
  );
}

// ─── Animated number counter ──────────────────────────────────────────────────

function CounterStat({ raw, display, label, suffix }: { raw: number; display: string; label: string; suffix: string }) {
  const elRef = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.textContent = display;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered.current) {
          triggered.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: raw,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              const v = Math.round(obj.val);
              if (raw >= 1000) {
                el.textContent = v.toLocaleString() + suffix;
              } else {
                el.textContent = v + suffix;
              }
            },
            onComplete: () => {
              el.textContent = display;
            },
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [raw, display, suffix]);

  return (
    <span ref={elRef} className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink tabular-nums">
      0
    </span>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function LandingPage() {
  const [email, setEmail] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Smooth scroll init
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => { lenis.raf(time * 1000) });
    };
  }, []);

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set("[data-reveal]", { opacity: 1, y: 0, scale: 1 });
      gsap.set(".hero-word, .hero-kicker, .hero-headline, .hero-lead, .hero-actions, .hero-panel", { opacity: 1, y: 0, scale: 1 });
      gsap.set(".feature-card, .mini-feature, .testimonial-card, .pricing-card, .insight-card, .cta-inner", { opacity: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {

      // ── Hero entrance ──
      gsap.fromTo(".hero-nav", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
      gsap.fromTo(".hero-kicker", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power4.out", delay: 0.1 });
      
      const headlineWords = gsap.utils.toArray<HTMLElement>(".hero-word");
      gsap.fromTo(headlineWords, 
        { y: 80, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.08, delay: 0.15 }
      );
      
      gsap.fromTo(".hero-lead", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: "power4.out", delay: 0.45 });
      gsap.fromTo(".hero-actions", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.55 });
      gsap.fromTo(".hero-panel", { opacity: 0, y: 60, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power4.out", delay: 0.65 });

      // ── The Magazine Pin ──
      // Pin the hero image to the background as the page scrolls
      ScrollTrigger.create({
        trigger: ".hero-panel-wrapper",
        start: "top top+=140",
        end: "+=150%", 
        pin: ".hero-panel",
        pinSpacing: false,
        scrub: 1,
      });

      // ── Feature Cards Image Parallax ──
      gsap.utils.toArray<HTMLElement>(".feature-card-img").forEach((img) => {
        gsap.fromTo(img, 
          { y: -30 }, 
          { y: 30, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });

      // ── Generic scroll reveals ──
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
      });

      // ── Feature cards stagger ──
      const featureCards = gsap.utils.toArray<HTMLElement>(".feature-card");
      if (featureCards.length) {
        gsap.fromTo(featureCards,
          { opacity: 0, y: 48, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: featureCards[0], start: "top 85%", once: true } }
        );
      }

      // ── Mini feature stagger ──
      const miniCards = gsap.utils.toArray<HTMLElement>(".mini-feature");
      if (miniCards.length) {
        gsap.fromTo(miniCards,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: miniCards[0], start: "top 88%", once: true } }
        );
      }

      // ── Pipeline steps stagger ──
      const pipelineSteps = gsap.utils.toArray<HTMLElement>(".pipeline-step");
      if (pipelineSteps.length) {
        gsap.fromTo(pipelineSteps,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.07, scrollTrigger: { trigger: pipelineSteps[0], start: "top 88%", once: true } }
        );
      }

      // ── Testimonial cards stagger ──
      const testimonials = gsap.utils.toArray<HTMLElement>(".testimonial-card");
      if (testimonials.length) {
        gsap.fromTo(testimonials,
          { opacity: 0, x: -20, y: 16 },
          { opacity: 1, x: 0, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.09, scrollTrigger: { trigger: testimonials[0], start: "top 88%", once: true } }
        );
      }

      // ── Pricing cards stagger ──
      const pricingCards = gsap.utils.toArray<HTMLElement>(".pricing-card");
      if (pricingCards.length) {
        gsap.fromTo(pricingCards,
          { opacity: 0, y: 36, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: pricingCards[0], start: "top 85%", once: true } }
        );
      }

      // ── Insight cards stagger ──
      const insightCards = gsap.utils.toArray<HTMLElement>(".insight-card");
      if (insightCards.length) {
        gsap.fromTo(insightCards,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.11, scrollTrigger: { trigger: insightCards[0], start: "top 88%", once: true } }
        );
      }

      // ── CTA section ──
      gsap.fromTo(".cta-inner",
        { opacity: 0, scale: 0.97, y: 24 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".cta-inner", start: "top 88%", once: true } }
      );

      // ── Footer columns stagger ──
      const footerCols = gsap.utils.toArray<HTMLElement>(".footer-col");
      if (footerCols.length) {
        gsap.fromTo(footerCols,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.07, scrollTrigger: { trigger: footerCols[0], start: "top 95%", once: true } }
        );
      }

      // ── Magnetic micro-interaction on CTAs ──
      const magnetEls = gsap.utils.toArray<HTMLElement>("[data-magnetic]");
      const cleanups: Array<() => void> = [];
      magnetEls.forEach((el) => {
        const moveX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        const moveY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          moveX((e.clientX - (r.left + r.width / 2)) * 0.14);
          moveY((e.clientY - (r.top + r.height / 2)) * 0.14);
        };
        const onLeave = () => { moveX(0); moveY(0); };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    }, root);

    return () => ctx.revert();
  }, { scope: root });

  return (
    <div ref={root} className="bg-canvas text-ink font-sans antialiased overflow-x-hidden">

      {/* ── Nav ── */}
      <header className="hero-nav sticky top-0 z-50 bg-canvas/95 backdrop-blur-sm border-b border-hairline">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-8">
          <Logo href="/" size={28} textClassName="text-sm" />

          <nav className="hidden md:flex items-center gap-1 flex-1" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href}
                className="px-3 py-1.5 text-[13px] font-medium text-ink-muted rounded hover:text-ink hover:bg-surface-inset transition-colors no-underline">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Link href="/login" className="text-[13px] font-medium text-ink-muted px-3 py-1.5 rounded hover:text-ink transition-colors no-underline">
              Login
            </Link>
            <Link href="/register" data-magnetic
              className="flex items-center gap-1.5 px-4 py-2 bg-accent text-on-accent text-[13px] font-semibold rounded-md hover:bg-accent-hover active:scale-[0.97] transition-all no-underline shadow-sm">
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero — centered ── */}
      <section className="pt-20 pb-20 text-center relative" aria-label="Hero">
        <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-5 relative z-10">
          <p className="hero-kicker font-mono text-[10px] tracking-widest uppercase text-ink-faint opacity-0">
            The research analyst that never stops
          </p>
          <h1 className="hero-headline text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight text-ink flex flex-col items-center">
            <span className="overflow-hidden inline-block py-1"><span className="hero-word inline-block opacity-0">Make Better</span></span>
            <span className="overflow-hidden inline-block py-1"><em style={{ fontStyle: "italic" }} className="hero-word inline-block opacity-0">Decisions,</em></span>
            <span className="overflow-hidden inline-block py-1"><span className="hero-word inline-block opacity-0">With Ease</span></span>
          </h1>
          <p className="hero-lead text-base text-ink-body leading-relaxed max-w-xl opacity-0">
            Noiseless watches your topics around the clock, removes the noise, and delivers a crisp digest only when the story changes.
          </p>
          <div className="hero-actions opacity-0">
            <Link href="/register" data-magnetic
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-on-accent text-sm font-semibold rounded-md hover:bg-accent-hover active:scale-[0.97] transition-all no-underline shadow-md">
              Get started <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Full-width editorial image panel — Pin Trigger */}
        <div className="hero-panel-wrapper w-full h-[520px] mt-14 relative z-0">
          <div className="hero-panel mx-4 md:mx-10 lg:mx-16 rounded-2xl overflow-hidden shadow-2xl opacity-0 will-change-transform bg-canvas" style={{ height: 520 }}>
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=90"
              alt="Research team working together in a modern workspace"
              width={1400}
              height={700}
              priority
              className="w-full h-full object-cover object-top"
            />
            {/* Dark gradient overlay at the bottom so the content sliding up has a dramatic contrast */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── Content Wrapper (Slides over the pinned hero) ── */}
      <div className="relative z-10 bg-canvas shadow-[0_-20px_40px_rgba(0,0,0,0.05)] border-t border-hairline pt-0">

        {/* ── Marquee ── */}
        <section className="py-5 border-b border-hairline bg-surface overflow-hidden" aria-label="Topics" aria-hidden="true">
          <div className="flex items-center" style={{ animation: "ticker 30s linear infinite" }}>
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center gap-6 shrink-0 pr-6">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-faint font-semibold whitespace-nowrap">
                  {item}
                </span>
                <span className="w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
              </span>
            ))}
          </div>
        </section>

        {/* ── Logo Bar ── */}
        <section className="py-10 border-b border-hairline" aria-label="Trusted by">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-5" data-reveal>
            <p className="font-mono text-[10px] tracking-widest uppercase text-ink-faint">
              Trusted by leading companies
            </p>
            <div className="flex items-center justify-center gap-12 flex-wrap">
              {["Logoipsum", "Logoipsum", "Logoipsum", "Logoipsum"].map((name, i) => (
                <span key={i} className="text-sm font-bold text-ink-faint opacity-40 tracking-tight">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feature cards ── */}
        <section id="features" className="py-24" aria-label="Features">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14 flex flex-col gap-3" data-reveal>
              <p className="font-mono text-[10px] tracking-widest uppercase text-ink-faint">AI That Works Your Way</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-ink leading-tight">
                From open web to clear brief.
              </h2>
              <p className="text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
                How we give you the right idea across all your sectors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FEATURE_CARDS.map((card) => (
                <article key={card.kicker}
                  className="feature-card opacity-0 bg-surface border border-hairline rounded-2xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 group">
                  <div className="overflow-hidden aspect-[4/3]">
                    <Image
                      src={card.img}
                      alt={card.alt}
                      width={900}
                      height={675}
                      className="feature-card-img w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500 ease-out scale-[1.12]"
                    />
                  </div>
                  <div className="p-7 flex flex-col gap-3">
                    <p className="font-mono text-[10px] tracking-widest uppercase text-ink-faint">{card.kicker}</p>
                    <h3 className="text-xl font-bold tracking-tight text-ink leading-snug">{card.title}</h3>
                    <p className="text-sm text-ink-body leading-relaxed">{card.body}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Mini features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
              {MINI_FEATURES.map(({ icon: Icon, label, body }) => (
                <div key={label}
                  className="mini-feature opacity-0 flex flex-col gap-2 p-5 bg-surface border border-hairline rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-default group">
                  <div className="w-8 h-8 bg-accent-soft rounded-md grid place-items-center text-accent group-hover:scale-110 transition-transform duration-200">
                    <Icon size={16} strokeWidth={1.8} />
                  </div>
                  <p className="text-[13px] font-bold text-ink tracking-tight">{label}</p>
                  <p className="text-xs text-ink-muted leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pipeline steps ── */}
        <section className="py-20 bg-surface-inset border-t border-b border-hairline" aria-label="How it works">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10" data-reveal>
              <p className="font-mono text-[10px] tracking-widest uppercase text-ink-faint mb-2">Smarter Workflow</p>
              <h2 className="text-3xl font-bold tracking-tight text-ink">Four steps. Zero manual effort.</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {PIPELINE_STEPS.map(({ icon: Icon, label, desc }) => (
                <div key={label}
                  className="pipeline-step opacity-0 flex flex-col gap-3 p-6 bg-surface border border-hairline rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                  <div className="w-10 h-10 bg-accent-soft rounded-lg grid place-items-center text-accent">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-sm font-bold text-ink">{label}</h3>
                  <p className="text-xs text-ink-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Big Testimonial + Photo + Stats ── */}
        <section className="py-24" aria-label="Featured testimonial">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6" data-reveal>
                <div className="flex items-center gap-3">
                  <Logo href="/" size={28} showText={false} />
                  <span className="text-sm font-semibold text-ink">Logoipsum</span>
                </div>
                <blockquote className="text-2xl md:text-3xl font-semibold leading-snug tracking-tight text-ink">
                  &ldquo;Our team at Noiseless has seen a huge boost in research productivity. Designers, analysts, and PMs are all working more seamlessly together.&rdquo;
                </blockquote>
                <footer className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-ink">Alicia Morgan</p>
                  <p className="text-xs text-ink-faint font-mono tracking-wide uppercase">Head of Strategy, June 2026</p>
                </footer>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-hairline shadow-lg" data-reveal>
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85"
                  alt="Research analyst in editorial portrait setting"
                  width={800}
                  height={1066}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Animated stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-16 border border-hairline rounded-2xl overflow-hidden">
              {STATS.map((stat, i) => (
                <div key={stat.display}
                  className={`p-8 flex flex-col gap-2 bg-surface ${i < STATS.length - 1 ? "border-r border-hairline" : ""}`}>
                  <CounterStat raw={stat.raw} display={stat.display} label={stat.label} suffix={stat.suffix} />
                  <span className="text-xs text-ink-faint font-mono tracking-wide uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonial cards ── */}
        <section className="py-24 bg-canvas-subtle border-t border-hairline" aria-label="Testimonials">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14 flex flex-col gap-2" data-reveal>
              <p className="font-mono text-[10px] tracking-widest uppercase text-ink-faint">Trusted by Teams Everywhere</p>
              <h2 className="text-4xl font-bold tracking-tight text-ink">What analysts say.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {TESTIMONIALS.map((t) => (
                <blockquote key={t.name}
                  className="testimonial-card opacity-0 bg-surface border border-hairline rounded-xl p-5 flex flex-col gap-4 hover:-translate-y-1.5 hover:shadow-md transition-all duration-200">
                  <div className="flex gap-0.5 text-accent text-sm">{"★★★★★"}</div>
                  <p className="text-sm leading-relaxed text-ink-body flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={36}
                      height={36}
                      className="rounded-full object-cover w-9 h-9 shrink-0"
                    />
                    <div>
                      <p className="text-xs font-semibold text-ink leading-tight">{t.name}</p>
                      <p className="text-[10px] text-ink-faint font-mono tracking-wide">{t.role}</p>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="py-24 border-t border-hairline" aria-label="Pricing">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14 flex flex-col gap-3" data-reveal>
              <p className="font-mono text-[10px] tracking-widest uppercase text-ink-faint">Pricing</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-ink">Simple Pricing, Smarter Work</h2>
              <p className="text-sm text-ink-muted max-w-sm mx-auto">Start free. Upgrade when you need more power.</p>
              <span className="inline-flex self-center items-center px-4 py-1 text-xs font-medium text-ink-faint bg-surface border border-hairline rounded-full">
                Billed monthly
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              {PRICING_PLANS.map((plan) => (
                <div key={plan.tier}
                  className={`pricing-card opacity-0 relative rounded-2xl p-8 flex flex-col gap-5 border transition-all duration-200 hover:shadow-xl
                    ${plan.featured
                      ? "bg-primary border-primary text-on-primary scale-[1.03]"
                      : "bg-surface border-hairline hover:-translate-y-1"
                    }`}>
                  {plan.featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-on-accent text-[10px] font-bold tracking-widest uppercase rounded-full whitespace-nowrap shadow-sm">
                      Most popular
                    </span>
                  )}
                  <div>
                    <p className={`font-mono text-[10px] tracking-widest uppercase mb-4 ${plan.featured ? "text-on-primary opacity-60" : "text-ink-faint"}`}>
                      {plan.tier}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-6xl font-extrabold tracking-tight leading-none ${plan.featured ? "text-on-primary" : "text-ink"}`}>
                        {plan.price}
                      </span>
                      <span className={`text-sm ${plan.featured ? "text-on-primary opacity-60" : "text-ink-muted"}`}>{plan.cadence}</span>
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed ${plan.featured ? "text-on-primary opacity-75" : "text-ink-body"}`}>
                    {plan.description}
                  </p>
                  <ul className="flex flex-col gap-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-center gap-2.5 text-sm ${plan.featured ? "text-on-primary" : "text-ink-body"}`}>
                        <Check size={13} strokeWidth={2.5} className={plan.featured ? "text-on-primary opacity-80" : "text-success"} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}
                    className={`flex items-center justify-center gap-1.5 py-3.5 px-5 rounded-lg text-sm font-semibold no-underline transition-all active:scale-[0.97] hover:-translate-y-0.5 mt-2
                      ${plan.featured
                        ? "bg-on-primary text-primary hover:opacity-90 shadow-sm"
                        : "bg-surface-inset border border-hairline text-ink hover:bg-surface-elevated"
                      }`}>
                    {plan.cta} <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Insights ── */}
        <section className="py-24 bg-canvas-subtle border-t border-hairline" aria-label="Insights">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10" data-reveal>
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold tracking-tight text-ink">Noiseless Insights</h2>
                <p className="text-sm text-ink-muted">Insights, tips, and articles to help you push smarter and faster.</p>
              </div>
              <Link href="/register"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-surface border border-hairline rounded-lg text-sm font-medium text-ink hover:bg-surface-elevated transition-colors no-underline">
                See all <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {INSIGHTS.map((item) => (
                <article key={item.tag}
                  className="insight-card opacity-0 bg-surface border border-hairline rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow group">
                  <div className="overflow-hidden aspect-video">
                    <Image
                      src={item.img}
                      alt={item.tag}
                      width={600}
                      height={338}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <h3 className="text-[15px] font-bold text-ink leading-snug tracking-tight">{item.tag}</h3>
                    <p className="text-sm text-ink-body leading-relaxed flex-1">{item.body}</p>
                    <footer className="flex items-center gap-2 pt-2 border-t border-hairline">
                      <Image
                        src={item.avatar}
                        alt={item.author}
                        width={28}
                        height={28}
                        className="rounded-full object-cover w-7 h-7 shrink-0"
                      />
                      <div>
                        <p className="text-xs font-semibold text-ink leading-tight">{item.author}</p>
                        <p className="text-[10px] text-ink-faint font-mono tracking-wide">{item.role}</p>
                      </div>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 border-t border-hairline" aria-label="Frequently asked questions">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14" data-reveal>
              <h2 className="text-4xl font-bold tracking-tight text-ink">Frequently Asked Questions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
              {FAQ_ITEMS.map((item, i) => (
                <FaqItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section className="py-24 bg-canvas-subtle border-t border-hairline" aria-label="Get started">
          <div className="max-w-lg mx-auto px-6 text-center">
            <div className="cta-inner opacity-0 flex flex-col gap-5 items-center">
              <p className="font-mono text-[10px] tracking-widest uppercase text-ink-faint">Want to know more?</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-ink leading-tight">
                Start watching.<br />Stop searching.
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed max-w-sm">
                Join analysts and researchers who turned continuous monitoring into a quiet background process.
              </p>

              {/* Animated input + button */}
              <form
                className="flex gap-2 w-full max-w-sm mt-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `/register?email=${encodeURIComponent(email)}`;
                }}
              >
                <div className="relative flex-1">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    aria-label="Your email address"
                    className="w-full h-12 px-4 text-sm text-ink bg-surface border rounded-lg outline-none font-sans placeholder:text-ink-faint transition-all duration-200"
                    style={{
                      borderColor: inputFocused ? "var(--color-accent)" : "var(--color-hairline)",
                      boxShadow: inputFocused ? "0 0 0 3px var(--color-accent-soft)" : "none",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  data-magnetic
                  className="h-12 px-6 bg-accent text-on-accent text-sm font-semibold rounded-lg flex items-center gap-1.5 whitespace-nowrap hover:bg-accent-hover active:scale-[0.97] transition-all cursor-pointer border-none font-sans"
                >
                  Sign up <ArrowRight size={13} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ── Big Footer ── */}
        <footer className="bg-ink text-on-primary" aria-label="Site footer">
          {/* Top: brand + newsletter */}
          <div className="border-b" style={{ borderColor: "rgba(255,243,232,0.08)" }}>
            <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-start justify-between gap-10">
              <div className="flex flex-col gap-4 max-w-sm">
                <Logo href="/" size={32} textClassName="text-base text-on-primary" />
                <p className="text-sm text-on-primary leading-relaxed" style={{ opacity: 0.55 }}>
                  Research without the noise. The signal-only intelligence layer for analysts, strategists, and researchers who can not afford to miss a move.
                </p>
                <div className="flex gap-3 mt-1">
                  {["Twitter", "LinkedIn", "GitHub"].map((s) => (
                    <a key={s} href="#" aria-label={s}
                      className="px-3 py-1.5 rounded border text-[11px] font-mono tracking-wide no-underline transition-all duration-150 hover:-translate-y-0.5"
                      style={{ borderColor: "rgba(255,243,232,0.15)", color: "rgba(255,243,232,0.55)" }}>
                      {s}
                    </a>
                  ))}
                </div>
              </div>

              {/* Footer newsletter */}
              <div className="flex flex-col gap-3 min-w-[300px]">
                <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,243,232,0.4)" }}>
                  Stay in the loop
                </p>
                <p className="text-sm" style={{ color: "rgba(255,243,232,0.6)" }}>
                  Full subscription, product updates, and productivity tips straight to your inbox.
                </p>
                <form
                  className="flex gap-2 mt-1"
                  onSubmit={(e) => {
                    e.preventDefault();
                    window.location.href = `/register?email=${encodeURIComponent(footerEmail)}`;
                  }}
                >
                  <input
                    id="footer-email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    aria-label="Footer email signup"
                    className="flex-1 h-10 px-3.5 text-sm rounded-lg outline-none font-sans transition-all duration-200 focus:ring-2"
                    style={{
                      background: "rgba(255,243,232,0.07)",
                      border: "1px solid rgba(255,243,232,0.12)",
                      color: "rgba(255,243,232,0.9)",
                    }}
                  />
                  <button
                    type="submit"
                    className="h-10 px-4 text-sm font-semibold rounded-lg border-none cursor-pointer flex items-center gap-1.5 transition-all active:scale-[0.97] hover:opacity-90 font-sans"
                    style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
                  >
                    Sign up <ArrowRight size={12} />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Middle: link columns */}
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {FOOTER_COLS.map((col) => (
                <div key={col.title} className="footer-col flex flex-col gap-4">
                  <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,243,232,0.35)" }}>
                    {col.title}
                  </p>
                  {col.links.map((link) => (
                    <a key={link.label} href={link.href}
                      className="text-sm no-underline transition-opacity duration-150 hover:opacity-100"
                      style={{ color: "rgba(255,243,232,0.55)" }}>
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,243,232,0.08)" }}>
            <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="font-mono text-[10px] tracking-wide uppercase" style={{ color: "rgba(255,243,232,0.28)" }}>
                © 2026 Noiseless Inc. All rights reserved.
              </span>
              <div className="flex gap-6 flex-wrap justify-center">
                {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((label) => (
                  <a key={label} href="#"
                    className="font-mono text-[10px] tracking-wide no-underline transition-opacity hover:opacity-100"
                    style={{ color: "rgba(255,243,232,0.35)" }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
