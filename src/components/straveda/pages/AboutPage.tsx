'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import {
  ArrowRight, Zap, Lock, Clock, Eye, TrendingUp, Users,
  Search, FileText, PlayCircle, Quote, MapPin, CheckCircle2
} from 'lucide-react';
import MagneticButton from '@/components/straveda/MagneticButton';

/* ─────────────────────────────────────────────────────────────────────── */
/* Styles & Brand Constants                                                */
/* ─────────────────────────────────────────────────────────────────────── */

const STYLES = `
  .masked-title {
    background: linear-gradient(125deg, #111111 35%, #FF4800 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
  }
  .dark .masked-title {
    background: linear-gradient(125deg, #ffffff 35%, #FF4800 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .stroke-text {
    -webkit-text-stroke: 1px rgba(0,0,0,0.12);
    color: transparent;
    letter-spacing: -2.05px;
  }
  .dark .stroke-text {
    -webkit-text-stroke: 1px rgba(255,255,255,0.12);
  }
`;

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease }
};

/* ─────────────────────────────────────────────────────────────────────── */
/* 1. Hero Section (Step 1)                                                */
/* ─────────────────────────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="relative bg-[#f5f5f0] dark:bg-[#030303] pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp}>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-[1px] w-8 bg-[#FF4800]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF4800]">
              About Straveda — Pune, India
            </span>
          </div>
          <div className="relative pl-8 md:pl-12">
            <div className="absolute left-0 top-0 h-full w-[2px] bg-[#FF4800]" />
            <h1 className="masked-title font-normal uppercase" style={{ fontSize: 'clamp(2rem, 7vw, 4.8rem)', lineHeight: 1.1, letterSpacing: '-2.05px' }}>
              We Get It. <br /> Because We've Lived It.
            </h1>
            <p className="mt-6 md:mt-8 text-base md:text-xl text-[#666] dark:text-[#9ca3af] max-w-3xl leading-relaxed">
              A small team of operators and builders who've been through the chaos of scaling.
              We've felt the frustration of bloated software, long implementation timelines, and vendors who don't understand your business.
              So we built Straveda as the antidote.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* 2. Our Story (Step 2)                                                   */
/* ─────────────────────────────────────────────────────────────────────── */

function StorySection() {
  return (
    <section className="bg-white dark:bg-[#030303] py-16 md:py-32 px-6 border-y border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 h-full w-[2px] bg-[#FF4800]" />
              <h2 className="masked-title text-2xl md:text-3xl font-normal uppercase tracking-[-1.8px] leading-tight">
                From frustration to a different kind of software company.
              </h2>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-8 text-[#666] dark:text-[#9ca3af] text-base md:text-lg leading-relaxed">
          <p>
            Every growing company hits the same wall. Too many tools. Spreadsheets that don't sync.
            Your best people spending Friday afternoons doing work that shouldn't exist. Decisions
            delayed because information lives in the last person who touched it, not in a system.
          </p>
          <p>
            We've been there—on both sides. We've built companies. We've watched smart, ambitious founders
            lose momentum to operational drag. We've felt the frustration of paying for five tools when
            you really need one well-designed system that your team actually understands.
          </p>
          <p>
            That experience shaped everything we do.
          </p>
          <p className="text-black dark:text-white font-medium">
            We started Straveda because we got tired of watching growing companies struggle with bad software.
            The kind that forces your process into a vendor's mold instead of supporting how you actually work.
            The kind that takes six months to implement while your best people are stuck in "the project."
          </p>
          <p>
            So we built something different: a small, focused team that specializes in one thing—replacing
            chaos with structure through AI-powered automation and custom software.
          </p>
          <p>
            We're not trying to be everything to everyone. We're sized for mid-market speed. We're built to move fast.
            And we measure success the only way that matters: what changes in your business.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* 3. Operating Principles (Step 3)                                        */
/* ─────────────────────────────────────────────────────────────────────── */

const principles = [
  { title: "Automation First", desc: "Before we build feature one, we ask: 'What can we eliminate?' We prune scope then automate what's left.", icon: <Zap size={20} /> },
  { title: "You Own Everything", desc: "Full code ownership. Complete documentation. Zero vendor lock-in. If we disappear, your team runs the system.", icon: <Lock size={20} /> },
  { title: "Speed Over Perfection", desc: "Shipping fast beats planning perfectly. Weekly sprints. Friday builds. Working software by week 4.", icon: <Clock size={20} /> },
  { title: "Transparency", desc: "No black boxes. No 'trust us' architecture. We document as we build, not after. You know the 'why'.", icon: <Eye size={20} /> },
  { title: "Priced for ROI", desc: "If a project doesn't pay for itself in 90 days, we don't build it. We'd rather lose the deal than waste your time.", icon: <TrendingUp size={20} /> },
  { title: "Senior Execution", desc: "We cap engagements so you get senior attention on every build—not kickoff with partners and delivery from juniors.", icon: <Users size={20} /> },
];

function PrinciplesSection() {
  return (
    <section className="bg-[#fcfcf7] dark:bg-[#030303] py-16 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative pl-8 mb-10 md:mb-20">
          <div className="absolute left-0 top-0 h-full w-[2px] bg-[#FF4800]" />
          <h2 className="masked-title text-3xl md:text-4xl font-normal uppercase tracking-[-1.5px]">Our operating principles.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {principles.map((p, i) => (
            <motion.div key={i} {...fadeUp} className="group p-6 md:p-10 rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-white/[0.01] hover:border-[#FF4800]/20 transition-all">
              <div className="text-[#FF4800] mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">{p.icon}</div>
              <h4 className="text-black dark:text-white text-lg md:text-xl font-normal mb-3 md:mb-4 tracking-tight">{p.title}</h4>
              <p className="text-[#666] dark:text-[#8a8a8a] text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* 4. Company Stats (Step 5)                                               */
/* ─────────────────────────────────────────────────────────────────────── */

const stats = [
  { label: "Founded", value: "2024", count: 2024, suffix: "", prefix: "", barClass: "h-12 md:h-32" },
  { label: "Projects", value: "20+", count: 20, suffix: "+", prefix: "", barClass: "h-24 md:h-56" },
  { label: "Avg ROI", value: "3–5x", count: null, suffix: "", prefix: "", barClass: "h-20 md:h-44" },
  { label: "Retention", value: "88%+", count: 88, suffix: "%+", prefix: "", barClass: "h-28 md:h-64" },
  { label: "Impl. Time", value: "4-5w", count: null, suffix: "", prefix: "", barClass: "h-20 md:h-48" },
  { label: "Uptime", value: "99.5%", count: 99.5, suffix: "%", prefix: "", barClass: "h-16 md:h-36" },
];

function AnimatedStatValue({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || stat.count === null) return;
    const target = stat.count;
    const duration = 1800;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.round(current));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [inView, stat.count]);

  if (stat.count === null) {
    return <span ref={ref}>{stat.value}</span>;
  }
  return <span ref={ref}>{stat.prefix}{count}{stat.suffix}</span>;
}

function StatsSection() {
  return (
    <section className="bg-[#030303] py-16 md:py-32 px-6 overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF4800] mb-4 block">
            By The Numbers
          </span>
          <h2 className="text-white text-xl md:text-2xl font-normal tracking-tighter uppercase">
            Measurable Operational Impact
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-end border-b border-white/5 pb-1">
          {stats.map((s, i) => (
            <div key={i} className="relative group flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease }}
                className="mb-4 md:mb-5"
              >
                <p className="text-2xl md:text-4xl font-normal text-white tracking-tighter group-hover:text-[#FF4800] transition-colors duration-500 text-center">
                  <AnimatedStatValue stat={s} />
                </p>
                <p className="text-[10px] text-[#666] uppercase tracking-widest mt-2 text-center">{s.label}</p>
              </motion.div>

              <div className="relative">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.1 + 0.2, ease }}
                  style={{
                    originY: 1,
                    background: 'linear-gradient(to bottom, #FF4800 0%, rgba(255,72,0,0.5) 50%, transparent 100%)',
                    boxShadow: '0 0 8px 1px rgba(255,72,0,0.35)',
                  }}
                  className={`w-[2px] ${s.barClass} group-hover:w-[3px] transition-all duration-500`}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FF4800] rounded-full blur-[3px] opacity-60 group-hover:opacity-100 group-hover:blur-[5px] transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-[#555] gap-3 md:gap-0">
          <p>Typical Client Size: <span className="text-[#888]">₹1Cr–₹50Cr Annual Revenue</span></p>
          <p>Location: <span className="text-[#888]">Pune, Maharashtra</span></p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* 5. Results / Testimonials (Step 6)                                      */
/* ─────────────────────────────────────────────────────────────────────── */

const testimonials = [
  {
    quote: "We were drowning in manual lead qualification work. Straveda built a WhatsApp bot that handles 80% of our lead flow now. We went from 200 monthly leads processed to 1,200 in the same time. It's been a total game-changer.",
    impact: "80% manual work reduction / 6x lead throughput",
    company: "D2C Fashion Brand, Mumbai",
    role: "Operations Director",
    timeline: "4 weeks"
  },
  {
    quote: "Our CRM was killing us—it didn't match our sales process. We had to make the process fit the software. Straveda built us a custom CRM in 8 weeks. Our team adoption was instant because it actually makes sense to us. Sales velocity is up 3x.",
    impact: "3x sales velocity / 90% team adoption",
    company: "SaaS Startup, Bangalore",
    role: "Founder",
    timeline: "8 weeks"
  },
  {
    quote: "We were paying for six different tools. Straveda consolidated everything into one integrated platform. It's faster, cheaper, and our team actually understands how it works. ROI in first quarter, hands down.",
    impact: "50% cost reduction / Unified data / Faster decisions",
    company: "E-Commerce, Delhi NCR",
    role: "CEO",
    timeline: "10 weeks"
  }
];

function ResultsSection() {
  return (
    <section className="bg-white dark:bg-[#030303] py-16 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative pl-8 mb-10 md:mb-20">
          <div className="absolute left-0 top-0 h-full w-[2px] bg-[#FF4800]" />
          <h2 className="masked-title text-3xl md:text-4xl font-normal uppercase tracking-[-1.5px]">Results that speak.</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((t, i) => (
            <div key={i} className="flex flex-col">
              <Quote className="text-[#FF4800]/20 mb-6" size={36} />
              <p className="text-[#555] dark:text-[#9ca3af] text-base md:text-lg italic leading-relaxed mb-8 flex-grow">"{t.quote}"</p>
              <div className="border-t border-black/5 dark:border-white/5 pt-6">
                <p className="text-[#FF4800] text-[10px] font-bold uppercase tracking-widest mb-1">{t.impact}</p>
                <p className="text-black dark:text-white text-xs font-medium uppercase tracking-widest opacity-60 mb-1">— {t.role}, {t.company}</p>
                <p className="text-[#FF4800]/60 text-[10px] uppercase tracking-widest">Timeline: {t.timeline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/* 6. Work With Us (Step 7)                                                */
/* ─────────────────────────────────────────────────────────────────────── */

const roadmap = [
  { step: "01", title: "Book a Strategy Call", meta: "30 min, free", desc: "We audit your operations and biggest bottlenecks, recommend what to automate or build first. You get value even if you don't hire us.", cta: "Book Now" },
  { step: "02", title: "Get a Custom Proposal", meta: "48 hours", desc: "Fixed-price quote for your specific project. Timeline and success metrics included. No surprises, no fine print.", cta: "Request Proposal" },
  { step: "03", title: "Start Building", meta: "4–6 weeks", desc: "Weekly sprints with visible progress. Your team, our team, one shared goal. Go live and reclaim your time.", cta: null },
];

function WorkWithUsSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <section className="bg-[#fcfcf7] dark:bg-[#030303] py-16 md:py-32 px-6 border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="masked-title text-3xl md:text-4xl font-normal uppercase tracking-tighter mb-10 md:mb-20">Let's build something that matters.</h2>
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
          {roadmap.map((r, i) => (
            <motion.div key={i} {...fadeUp} className="flex flex-col p-6 md:p-10 rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-white/[0.01]">
              <div className="flex justify-between items-start mb-8 md:mb-10">
                <span className="stroke-text text-5xl md:text-6xl font-black opacity-30">{r.step}</span>
                <span className="text-[10px] font-bold uppercase text-[#FF4800] bg-[#FF4800]/10 px-3 py-1 rounded-full">{r.meta}</span>
              </div>
              <h4 className="text-black dark:text-white text-lg md:text-xl font-normal mb-3 md:mb-4">{r.title}</h4>
              <p className="text-[#666] dark:text-[#8a8a8a] text-sm leading-relaxed flex-grow">{r.desc}</p>
              {r.cta && (
                <button
                  onClick={() => onNavigate('contact')}
                  className="mt-6 md:mt-8 self-start bg-[#FF4800] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#e03f00] transition-colors"
                >
                  {r.cta} →
                </button>
              )}
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <MagneticButton>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#FF4800] text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-[#e03f00] transition-colors"
            >
              Book Strategy Call →
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <main className="min-h-screen bg-[#f5f5f0] dark:bg-[#030303]">
      <style>{STYLES}</style>
      <HeroSection />
      <StorySection />
      <PrinciplesSection />
      <StatsSection />
      <ResultsSection />
      <WorkWithUsSection onNavigate={onNavigate} />
    </main>
  );
}
