"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Layers,
  Search,
  Shield,
  Check,
  Cpu,
  ArrowDown,
  Lock,
  Database,
  Key,
  Send,
  Plus,
  Minus,
  Mail,
  Eye,
  Compass,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Logo } from "@/shared/components/Logo";
import { toast } from "sonner";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SIMULATED_STREAM = [
  {
    id: "s-1",
    query: "OpenAI release",
    title: "OpenAI launches GPT-4o model",
    similarity: "0.45",
    status: "new",
    score: 9,
    category: "Product Launch",
  },
  {
    id: "s-2",
    query: "OpenAI release",
    title: "Introducing OpenAI GPT-4o flagship",
    similarity: "0.94",
    status: "duplicate",
    score: 9,
    category: "Product Launch",
  },
  {
    id: "s-3",
    query: "Nvidia earnings",
    title: "Nvidia reports record high revenues",
    similarity: "0.32",
    status: "new",
    score: 8,
    category: "Financials",
  },
  {
    id: "s-4",
    query: "Nvidia earnings",
    title: "Nvidia revenue details summary",
    similarity: "0.89",
    status: "duplicate",
    score: 7,
    category: "Financials",
  },
];

// SplitText helper component for character stagger animations
function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block split-char origin-bottom"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// Magnetic interactive button component
function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull animation
      gsap.to(btn, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      // Snap back to origin
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button ref={btnRef} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default function StandaloneLandingPage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");
  
  // Contact state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const linePathRef = useRef<SVGPathElement>(null);

  // Cycle through deduplication simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % SIMULATED_STREAM.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  
  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".split-char", {
        y: 60,
        rotate: 8,
        opacity: 0,
        duration: 0.9,
        stagger: 0.02,
        ease: "power4.out",
      });

      gsap.from(".animate-hero-badge", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(".animate-hero-sub", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.from(".animate-hero-btn", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.65,
        ease: "power3.out",
      });

      // Scroll pinned simulator panel (Desktop only)
      ScrollTrigger.create({
        trigger: ".pin-trigger-wrapper",
        start: "top 20%",
        end: "bottom 80%",
        pin: ".pinned-simulator",
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      // Animated drawing connector line path
      const path = linePathRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: ".timeline-trigger-wrapper",
            start: "top 65%",
            end: "bottom 35%",
            scrub: 0.8,
          },
        });
      }

   
      const scrollItems = gsap.utils.toArray(".scroll-reveal");
      scrollItems.forEach((el: any) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      toast.error("Please fill out all fields.");
      return;
    }
    toast.success("Message received. Our support team will respond shortly.");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-canvas text-ink relative overflow-x-hidden select-none">
      {/* Visual grid lines and light halo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.06)_0%,transparent_65%)] pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between z-20 shrink-0 border-b border-hairline bg-canvas/80 backdrop-blur-md sticky top-0">
        <Logo size={24} />
        
        {/* Navigation anchors */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-[10px] font-mono font-medium text-ink-muted hover:text-ink transition-colors">
            FEATURES
          </a>
          <a href="#how-it-works" className="text-[10px] font-mono font-medium text-ink-muted hover:text-ink transition-colors">
            HOW IT WORKS
          </a>
          <a href="#pricing" className="text-[10px] font-mono font-medium text-ink-muted hover:text-ink transition-colors">
            PRICING
          </a>
          <a href="#security" className="text-[10px] font-mono font-medium text-ink-muted hover:text-ink transition-colors">
            SECURITY
          </a>
          <a href="#faq" className="text-[10px] font-mono font-medium text-ink-muted hover:text-ink transition-colors">
            FAQ
          </a>
          <a href="#about" className="text-[10px] font-mono font-medium text-ink-muted hover:text-ink transition-colors">
            ABOUT
          </a>
          <a href="#contact" className="text-[10px] font-mono font-medium text-ink-muted hover:text-ink transition-colors">
            CONTACT
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <span className="text-[10px] font-mono font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer">
              SIGN IN
            </span>
          </Link>
          <Link href="/register">
            <Button className="bg-primary hover:bg-primary-hover text-on-primary rounded-full px-5 text-xs font-sans font-semibold cursor-pointer">
              GET STARTED
            </Button>
          </Link>
        </div>
      </header>

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col z-10 w-full max-w-7xl mx-auto px-6 divide-y divide-hairline">
        
        {/* 1. HERO SECTION & SIMULATOR (Pinnable layout wrapper) */}
        <div className="pin-trigger-wrapper">
          <section className="flex flex-col lg:flex-row items-start justify-between gap-12 py-24 min-w-0 min-h-[80vh] relative">
            <div className="flex-1 flex flex-col gap-6 text-left w-full min-w-0 lg:max-w-xl">
              <div className="animate-hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-inset border border-hairline text-[10px] font-mono font-medium text-ink-muted w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>VECTOR DEDUPLICATION ACTIVE</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold leading-tight tracking-tight bg-gradient-to-r from-ink via-zinc-800 to-zinc-650 bg-clip-text text-transparent">
                  <SplitText text="Signal only intelligence workspace." />
                </h1>
                <p className="animate-hero-sub text-sm sm:text-base font-sans text-ink-muted leading-relaxed">
                  Noiseless continuously searches the web, filters duplicates via cosine similarity vector match, and warns you only when key metrics change.
                </p>
              </div>

              <div className="animate-hero-btn pt-2 flex">
                <Link href="/register">
                  <MagneticButton className="bg-primary hover:bg-primary-hover text-on-primary rounded-full px-8 py-4 text-xs font-sans font-bold flex items-center gap-2 shadow-low hover:shadow-medium cursor-pointer transition-colors">
                    <span>CREATE FREE WORKSPACE</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                </Link>
              </div>
            </div>

            {/* Pinned simulator container */}
            <div className="flex-1 w-full max-w-lg min-w-0 lg:sticky lg:top-28 pinned-simulator">
              <div className="bg-surface/85 backdrop-blur-md rounded-2xl p-6 border border-hairline flex flex-col gap-6 shadow-medium w-full relative overflow-hidden group hover:border-accent/40 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />

                <div className="flex items-center justify-between border-b border-hairline pb-4 shrink-0">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-accent" />
                    <span className="text-xs font-mono font-bold text-ink-muted">similarity-analyzer.ts</span>
                  </div>
                  <span className="text-[10px] font-mono text-ink-faint">threshold: 0.88</span>
                </div>

                <div className="flex flex-col gap-3 min-h-[140px] justify-center relative">
                  <AnimatePresence mode="popLayout">
                    {SIMULATED_STREAM.map((item, idx) => {
                      if (idx !== stepIndex) return null;
                      const isDuplicate = parseFloat(item.similarity) > 0.88;

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -16 }}
                          transition={{ duration: 0.4 }}
                          className={`p-4 rounded-xl border flex flex-col gap-2 transition-colors ${
                            isDuplicate
                              ? "bg-danger-soft/10 border-danger/20 text-ink-muted"
                              : "bg-surface-inset border-hairline text-ink"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="px-2 py-0.5 rounded bg-white border border-hairline text-ink-muted uppercase">
                              {item.category}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span>Similarity: {item.similarity}</span>
                              {isDuplicate ? (
                                <span className="text-danger font-semibold">DUPLICATE</span>
                              ) : (
                                <span className="text-accent font-semibold">NOVEL</span>
                              )}
                            </div>
                          </div>

                          <h4 className="text-xs font-sans font-semibold leading-snug truncate">
                            {item.title}
                          </h4>

                          <div className="flex items-center justify-between border-t border-hairline/60 pt-2 mt-1">
                            <span className="text-[10px] font-mono text-ink-faint">Query: {item.query}</span>
                            {isDuplicate ? (
                              <span className="text-[10px] font-mono text-danger line-through">DISCARDED</span>
                            ) : (
                              <span className="text-[10px] font-mono text-accent flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" />
                                <span>SCORED {item.score}/10</span>
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <div className="bg-surface-inset rounded-xl p-3.5 border border-hairline flex items-center justify-between text-xs font-mono text-ink-muted">
                  <span>Status: Processing Pipeline</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce delay-75" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce delay-150" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce delay-300" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 2. FEATURES GRID SECTION */}
        <section id="features" className="scroll-reveal py-24 flex flex-col gap-12 scroll-mt-20">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] font-mono text-accent font-bold tracking-widest uppercase">
              Capabilities
            </span>
            <h2 className="text-3xl font-sans font-bold text-ink tracking-tight">
              Engineered for high volume research.
            </h2>
            <p className="text-xs text-ink-muted leading-relaxed font-sans">
              Noiseless combines web search and vector matching to deliver clean updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-surface/50 border border-hairline rounded-xl flex flex-col gap-3 hover:border-accent/30 hover:shadow-low transition-colors duration-300">
              <div className="p-2.5 bg-surface-inset border border-hairline rounded-lg w-fit text-accent">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-sans font-bold text-ink">Deep Web Searches</h3>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Queries run in background intervals via Tavily advanced searches to extract clean contents without clutter.
              </p>
            </div>
            <div className="p-6 bg-surface/50 border border-hairline rounded-xl flex flex-col gap-3 hover:border-accent/30 hover:shadow-low transition-colors duration-300">
              <div className="p-2.5 bg-surface-inset border border-hairline rounded-lg w-fit text-accent">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-sans font-bold text-ink">Similarity Filtering</h3>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Embeds findings using fast local transformers to compare against previous collections in Qdrant database.
              </p>
            </div>
            <div className="p-6 bg-surface/50 border border-hairline rounded-xl flex flex-col gap-3 hover:border-accent/30 hover:shadow-low transition-colors duration-300">
              <div className="p-2.5 bg-surface-inset border border-hairline rounded-lg w-fit text-accent">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-sans font-bold text-ink">Significance Scoring</h3>
              <p className="text-xs text-ink-muted leading-relaxed font-sans">
                Grades signals on a scale of one to ten using fast cloud inference and dispatches briefs instantly.
              </p>
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS TIMELINE (Animated drawing path) */}
        <section id="how-it-works" className="timeline-trigger-wrapper scroll-reveal py-24 flex flex-col gap-12 scroll-mt-20 relative">
          <div className="space-y-3 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono text-accent font-bold tracking-widest uppercase">
              Process Flow
            </span>
            <h2 className="text-3xl font-sans font-bold text-ink tracking-tight">
              How Noiseless processes web signals.
            </h2>
          </div>

          <div className="flex flex-col gap-12 max-w-3xl mx-auto w-full relative pl-8 md:pl-0">
            {/* SVG Connecting Drawing Line */}
            <div className="absolute top-[40px] bottom-[40px] left-[20px] md:left-1/2 md:-translate-x-1/2 w-[2px] bg-zinc-200 pointer-events-none">
              <svg className="w-full h-full" overflow="visible">
                <path
                  ref={linePathRef}
                  d="M 1 0 L 1 500"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="2.5"
                />
              </svg>
            </div>

            {[
              {
                icon: Search,
                title: "1. Web Search Execution",
                description: "Our background scheduler queries Tavily API for fresh news updates on your watch topics.",
              },
              {
                icon: Database,
                title: "2. Vector Filtering",
                description: "Matches incoming text fragments against previous collection entries in Qdrant database.",
              },
              {
                icon: Cpu,
                title: "3. LLM Significance Grading",
                description: "Grades signals from one to ten using fast cloud inference and saves raw data.",
              },
              {
                icon: Mail,
                title: "4. Notification Dispatch",
                description: "Sends customized alerts to Slack hooks or Brevo email servers.",
              },
            ].map((step, idx) => (
              <div key={step.title} className={`flex items-start md:w-1/2 relative ${
                idx % 2 === 0 ? "md:mr-auto md:pr-10 text-left" : "md:ml-auto md:pl-10 text-left"
              }`}>
                {/* Visual node anchor point */}
                <div className="absolute left-[-20px] md:left-auto md:right-[-25px] top-[14px] w-3 h-3 rounded-full bg-accent border-2 border-canvas z-10"
                     style={idx % 2 !== 0 ? { left: "-20px", right: "auto" } : undefined} />

                <div className="w-full p-6 bg-surface/50 border border-hairline rounded-xl flex gap-4 items-start hover:border-accent/30 transition-colors">
                  <div className="p-3 bg-surface-inset border border-hairline rounded-lg text-accent shrink-0">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-sans font-bold text-ink">{step.title}</h3>
                    <p className="text-xs text-ink-muted leading-relaxed font-sans">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PRICING TIERS */}
        <section id="pricing" className="scroll-reveal py-24 flex flex-col gap-12 scroll-mt-20">
          <div className="space-y-3 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono text-accent font-bold tracking-widest uppercase">
              Plans & Tiers
            </span>
            <h2 className="text-3xl font-sans font-bold text-ink tracking-tight">
              Flexible pricing built for scale.
            </h2>

            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setBillingInterval("monthly")}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer ${
                  billingInterval === "monthly"
                    ? "bg-primary text-on-primary font-bold"
                    : "text-ink-muted hover:text-ink hover:bg-surface-inset"
                }`}
              >
                MONTHLY
              </button>
              <button
                onClick={() => setBillingInterval("yearly")}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer ${
                  billingInterval === "yearly"
                    ? "bg-primary text-on-primary font-bold"
                    : "text-ink-muted hover:text-ink hover:bg-surface-inset"
                }`}
              >
                YEARLY (SAVE 15%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                name: "FREE",
                price: 0,
                desc: "Ideal for basic industry tracking and personal interest watches.",
                feats: ["Three active watches", "Daily background runs", "Vector deduplication filter", "Email notifications"],
              },
              {
                name: "PRO",
                price: billingInterval === "monthly" ? 29 : 290,
                desc: "Perfect for research professionals needing frequent updates.",
                feats: ["Ten active watches", "Hourly background runs", "Private vector collections", "Email and Slack notifications"],
                popular: true,
              },
              {
                name: "ENTERPRISE",
                price: billingInterval === "monthly" ? 99 : 990,
                desc: "Designed for operations requiring scale and custom rules.",
                feats: ["Unlimited active watches", "Fifteen minute background runs", "Dedicated vector storage", "API webhook notifications"],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`p-6 bg-surface/50 border rounded-xl flex flex-col gap-6 justify-between relative transition-all duration-300 ${
                  plan.popular ? "border-accent shadow-[0_0_20px_rgba(124,58,237,0.08)]" : "border-hairline"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-accent text-white border border-accent/25">
                    POPULAR PLAN
                  </span>
                )}
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold text-ink-muted uppercase block">{plan.name}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-sans font-bold text-ink">${plan.price}</span>
                    <span className="text-xs font-mono text-ink-faint">/{billingInterval === "monthly" ? "mo" : "yr"}</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed font-sans">{plan.desc}</p>
                  <div className="border-t border-hairline/40 pt-4 space-y-2.5">
                    {plan.feats.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-ink font-sans">
                        <Check className="w-4 h-4 text-accent shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link href="/register" className="pt-6">
                  <Button className="w-full bg-primary hover:bg-primary-hover text-on-primary text-xs font-bold rounded-lg h-10 cursor-pointer">
                    GET STARTED
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 5. SECURITY PROTOCOLS */}
        <section id="security" className="scroll-reveal py-24 flex flex-col gap-12 scroll-mt-20">
          <div className="space-y-3 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono text-accent font-bold tracking-widest uppercase">
              Security
            </span>
            <h2 className="text-3xl font-sans font-bold text-ink tracking-tight">
              Secure data processing protocols.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
            {[
              {
                icon: Database,
                title: "Isolated Vector Collections",
                description: "Each watch created is allocated its own isolated collection namespace within our Qdrant vector database.",
              },
              {
                icon: Lock,
                title: "Transport Layer Encryption",
                description: "All database queries and API transmissions use TLS connections. We enforce encrypted transactions.",
              },
              {
                icon: Key,
                title: "Credential Hashing",
                description: "User authentication credentials use secure hash algorithm processes. We do not store plain text passwords.",
              },
              {
                icon: Send,
                title: "Webhook Tokenization",
                description: "Notification Slack webhooks and email variables store encrypted tokens.",
              },
            ].map((policy) => (
              <div key={policy.title} className="p-6 bg-surface/50 border border-hairline rounded-xl flex gap-4 items-start hover:border-accent/30 transition-all hover:shadow-low">
                <div className="p-2.5 bg-surface-inset border border-hairline rounded-lg text-accent shrink-0">
                  <policy.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-sans font-bold text-ink">{policy.title}</h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-sans">{policy.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FAQ COLLAPSIBLE ACCORDION */}
        <section id="faq" className="scroll-reveal py-24 flex flex-col gap-12 scroll-mt-20">
          <div className="space-y-3 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono text-accent font-bold tracking-widest uppercase">
              Faq
            </span>
            <h2 className="text-3xl font-sans font-bold text-ink tracking-tight">
              Frequently asked questions.
            </h2>
          </div>

          <div className="flex flex-col border border-hairline rounded-xl divide-y divide-hairline bg-surface/50 overflow-hidden max-w-3xl mx-auto w-full">
            {[
              {
                q: "How does vector deduplication prevent noise?",
                a: "Every search finding is transformed into a vector embedding. We measure the cosine similarity against findings from that watch collection. If similarity exceeds 0.88, the system flags it as a duplicate and discards it.",
              },
              {
                q: "What search engines does Noiseless query?",
                a: "We query the Tavily search engine with advanced search depths. It retrieves fresh news listings without ads or trackers.",
              },
              {
                q: "Can I customize the alerts significance threshold?",
                a: "Yes. Each watch is configured with its own significance threshold. You can set the target score from one to ten.",
              },
            ].map((faq, idx) => (
              <FAQItem key={faq.q} question={faq.q} answer={faq.a} delay={idx * 0.05} />
            ))}
          </div>
        </section>

        {/* 7. ABOUT VISION */}
        <section id="about" className="scroll-reveal py-24 flex flex-col gap-12 scroll-mt-20">
          <div className="space-y-3 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-mono text-accent font-bold tracking-widest uppercase">
              Vision
            </span>
            <h2 className="text-3xl font-sans font-bold text-ink tracking-tight">
              A workstation built for signal filters.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
            {[
              {
                icon: Eye,
                title: "Clarity over Volume",
                description: "We believe professionals do not need more information. They need better filters. We design to deliver signal, not noise.",
              },
              {
                icon: Compass,
                title: "Data Sovereignty",
                description: "Your search topics and watched companies belong to you. We namespace all collections to protect data ownership.",
              },
              {
                icon: ShieldCheck,
                title: "Trustworthy Citations",
                description: "Our LLM digest prompts require source citations. We never invent facts or report unsourced speculations.",
              },
            ].map((val) => (
              <div key={val.title} className="p-5 bg-surface/50 border border-hairline rounded-xl flex flex-col gap-3 hover:border-accent/30 transition-all hover:shadow-low">
                <div className="p-2.5 bg-surface-inset border border-hairline rounded-lg text-accent w-fit">
                  <val.icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-sans font-bold text-ink">{val.title}</h3>
                <p className="text-[11px] text-ink-muted leading-relaxed font-sans">{val.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. CONTACT FORM */}
        <section id="contact" className="scroll-reveal py-24 flex flex-col md:flex-row gap-12 items-center justify-center scroll-mt-20">
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-accent font-bold tracking-widest uppercase">
                Contact
              </span>
              <h2 className="text-3xl font-sans font-bold text-ink tracking-tight">
                Connect with our team.
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed font-sans max-w-sm">
                Have questions about Qdrant namespaces, billing configurations, or Tavily search capacities? Send us a message.
              </p>
            </div>
            <div className="space-y-3 text-xs font-sans text-ink-body">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent animate-pulse" />
                <span>support@noiseless.ai</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md">
            <form onSubmit={handleContactSubmit} className="bg-surface/50 border border-hairline rounded-2xl p-6 flex flex-col gap-4 shadow-medium hover:border-accent/30 transition-all duration-300">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-ink-muted uppercase tracking-wider block">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full text-xs bg-surface-inset border border-hairline rounded-md p-2.5 text-ink outline-hidden focus:border-primary"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-ink-muted uppercase tracking-wider block">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full text-xs bg-surface-inset border border-hairline rounded-md p-2.5 text-ink outline-hidden focus:border-primary"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-ink-muted uppercase tracking-wider block">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your research requirements..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full text-xs bg-surface-inset border border-hairline rounded-md p-2.5 text-ink outline-hidden focus:border-primary resize-none font-sans"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary-hover text-on-primary text-xs font-bold rounded-lg h-10 flex items-center justify-center gap-2 cursor-pointer mt-2">
                <Send className="w-3.5 h-3.5" />
                <span>SEND INQUIRY</span>
              </Button>
            </form>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 h-16 border-t border-hairline flex items-center justify-between text-[10px] font-mono text-ink-faint z-10 shrink-0">
        <span>© 2026 NOISELESS INC</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-ink">PRIVACY POLICY</Link>
          <Link href="/terms" className="hover:text-ink">TERMS OF SERVICE</Link>
        </div>
      </footer>
    </div>
  );
}

function FAQItem({ question, answer, delay }: { question: string; answer: string; delay: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left font-sans font-bold text-sm text-ink hover:bg-surface-inset transition-colors cursor-pointer"
      >
        <span>{question}</span>
        {isOpen ? (
          <Minus className="w-4 h-4 text-ink-muted shrink-0 ml-4" />
        ) : (
          <Plus className="w-4 h-4 text-ink-muted shrink-0 ml-4" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-xs text-ink-muted leading-relaxed font-sans">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
