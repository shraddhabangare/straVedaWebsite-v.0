'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    category: 'TECHNOLOGY STRATEGY',
    title: 'How to Align IT Investment with Business Goals',
    date: 'February 2024',
    excerpt:
      'Learn how enterprise leaders bridge the gap between IT spending and measurable business outcomes.',
  },
  {
    category: 'MANAGEMENT',
    title: 'Eliminating Enterprise Delivery Bottlenecks',
    date: 'January 2024',
    excerpt:
      'Practical strategies for identifying and removing the obstacles that slow enterprise delivery.',
  },
  {
    category: 'SOFTWARE SOLUTIONS',
    title: 'Red Hat Middleware: Lowering TCO at Scale',
    date: 'December 2023',
    excerpt:
      'How Red Hat Enterprise Middleware delivers measurable cost savings for large-scale deployments.',
  },
  {
    category: 'ENTERPRISE ARCHITECTURE',
    title: 'Microservices vs. Monolith: An Enterprise Decision Framework',
    date: 'November 2023',
    excerpt:
      'A structured approach to choosing between microservices and monolithic architecture for your enterprise.',
  },
  {
    category: 'TECHNOLOGY STRATEGY',
    title: 'Building a Digital Transformation Roadmap That Works',
    date: 'October 2023',
    excerpt:
      'Step-by-step framework for creating and executing a digital transformation strategy.',
  },
  {
    category: 'MANAGEMENT',
    title: 'Agile PMO: Bridging Traditional Governance and Modern Delivery',
    date: 'September 2023',
    excerpt:
      'How to build a PMO that supports agile delivery without sacrificing governance and compliance.',
  },
];

const ease = [0.4, 0, 0.2, 1] as const;

const postCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export default function InsightsPage() {
  const heroHeadline = 'Enterprise thinking for modern organizations.';

  return (
    <div className="bg-black min-h-screen">
      {/* 4A — HERO */}
      <section className="relative flex items-center justify-center bg-black" style={{ minHeight: '50vh' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="text-[11px] uppercase tracking-[0.2em] text-[#FF4800] font-medium mb-6"
          >
            Insights & Perspectives
          </motion.p>
          <h1 className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-semibold text-white leading-tight">
            {heroHeadline.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            style={{ transformOrigin: 'left center' }}
            className="h-[2px] w-16 bg-[#FF4800] mx-auto mt-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease }}
            className="text-[#A1A1A1] text-lg md:text-xl mt-6"
          >
            Strategy, architecture, and management insights from the Straveda
            team.
          </motion.p>
        </div>
      </section>

      {/* 4B — FEATURED POST */}
      <section className="px-6 py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="bg-[#2B2358] rounded-xl overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image placeholder */}
              <div className="lg:w-[60%] w-full">
                <div className="relative w-full aspect-video lg:aspect-[16/9] bg-[#1e1a3f]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1e1a3f] via-[#2B2358]/50 to-[#1e1a3f]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border-2 border-white/10 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#FF4800] border-b-8 border-b-transparent ml-1" />
                    </div>
                  </div>
                  {/* Subtle grid pattern */}
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                </div>
              </div>

              {/* Text content */}
              <div className="lg:w-[40%] w-full p-8 lg:p-10 flex flex-col justify-center">
                <span className="inline-block text-[11px] uppercase tracking-[0.15em] font-medium text-[#FF4800] bg-[#FF4800]/10 px-3 py-1 rounded-full w-fit mb-5">
                  Enterprise Architecture
                </span>
                <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-medium text-white leading-snug mb-4">
                  The Case for Open Standards in Modern Enterprise Architecture
                </h2>
                <p className="text-[#A1A1A1] text-[13px] mb-4">March 2024</p>
                <p className="text-[#A1A1A1] text-[15px] leading-relaxed mb-8">
                  Why forward-thinking enterprises are choosing
                  open-standards middleware over proprietary lock-in, and what
                  this means for your technology roadmap.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-white border border-white/20 rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-white/5 transition-colors w-fit"
                >
                  Read article
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4C — POST GRID */}
      <section className="px-6 py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post, index) => (
              <motion.article
                key={index}
                variants={postCardVariants}
                className="bg-[#2B2358] rounded-xl p-6 border border-white/[0.06] hover:bg-[#1e1a3f] transition-all duration-300 cursor-pointer group"
              >
                <span className="inline-block text-[10px] uppercase tracking-[0.15em] font-medium text-[#FF4800] bg-[#FF4800]/10 px-2.5 py-1 rounded-full mb-4">
                  {post.category}
                </span>
                <h3 className="text-[18px] sm:text-[20px] lg:text-[22px] font-medium text-white leading-snug mb-3">
                  {post.title}
                </h3>
                <p className="text-[#A1A1A1] text-[13px] mb-3">{post.date}</p>
                <p className="text-[#A1A1A1] text-[14px] sm:text-[15px] leading-relaxed mb-5">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[#A1A1A1] text-sm font-medium group-hover:text-[#FF4800] transition-colors">
                  Read
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4D — NEWSLETTER CTA */}
      <section className="px-6 py-16 md:py-24 bg-black">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="bg-[#2B2358] rounded-xl py-16 px-6 md:px-12 text-center"
          >
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium text-white mb-3">
              Stay ahead of enterprise trends.
            </h2>
            <p className="text-[#A1A1A1] text-[15px] sm:text-[16px] mb-8">
              Monthly insights for enterprise leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mt-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#1e1a3f] border border-[#27272A] focus:border-[#FF4800] text-white rounded-lg px-4 py-3 text-[15px] placeholder-[#52525B] outline-none transition-colors"
              />
              <button className="bg-[#FF4800] hover:bg-[#e63f00] text-white font-medium text-[15px] rounded-lg px-6 py-3 transition-colors flex items-center justify-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[#52525B] text-[12px] mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
