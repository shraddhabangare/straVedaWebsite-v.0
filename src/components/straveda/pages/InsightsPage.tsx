'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, X, User, Clock } from 'lucide-react';
import { toast } from 'sonner';
import TextReveal from '@/components/straveda/TextReveal';

const featuredPost = {
  category: 'ENTERPRISE ARCHITECTURE',
  title: 'The Case for Open Standards in Modern Enterprise Architecture',
  date: 'March 2024',
  excerpt:
    'Why forward-thinking enterprises are choosing open-standards middleware over proprietary lock-in, and what this means for your technology roadmap.',
  readTime: '8 min read',
  author: { name: 'Raj Patel', title: 'Founder & CEO' },
  fullContent: [
    'The enterprise technology landscape has undergone a fundamental shift in the past decade. Where proprietary solutions once dominated, open standards have emerged as the cornerstone of resilient, future-proof architecture. Organizations that embrace open standards benefit from a vibrant ecosystem of interoperable tools, reduced dependency on single vendors, and the collective innovation of global developer communities.',
    'At the heart of this transition is middleware — the connective tissue between enterprise applications, data sources, and cloud services. Open-standards middleware, such as those built on Jakarta EE and MicroProfile specifications, provides enterprises with the flexibility to choose best-of-breed components without sacrificing integration capabilities. This approach eliminates the "rip and replace" cycles that characterize proprietary upgrades, enabling continuous evolution rather than disruptive overhauls.',
    'Vendor lock-in remains one of the most significant risks facing enterprise IT. When an organization is tethered to a single vendor\'s proprietary stack, licensing costs escalate predictably year over year, while the ability to negotiate favorable terms diminishes. Open standards invert this dynamic by creating competitive markets where vendors must earn continued business through innovation and service quality rather than contractual obligation.',
    'The total cost of ownership argument for open standards extends well beyond licensing fees. Organizations report 30-40% reductions in integration costs when adopting open-standards middleware, driven by standardized APIs, protocol compatibility, and the availability of open-source tooling. Combined with faster time-to-market for new capabilities and reduced risk during technology transitions, the business case for open standards has become compelling for enterprises of every size and industry.',
  ],
};

const posts = [
  {
    category: 'TECHNOLOGY STRATEGY',
    title: 'How to Align IT Investment with Business Goals',
    date: 'February 2024',
    excerpt:
      'Learn how enterprise leaders bridge the gap between IT spending and measurable business outcomes.',
    readTime: '5 min read',
    author: { name: 'Anika Sharma', title: 'VP of Technology Strategy' },
    fullContent: [
      'Enterprise IT spending continues to reach record levels, yet many organizations struggle to demonstrate clear connections between technology investments and business value. The root cause often lies not in the technology itself, but in the governance frameworks that guide investment decisions. Without a structured approach to aligning IT expenditure with strategic business objectives, even well-intentioned technology initiatives can drift into cost centers rather than value drivers.',
      'The most effective IT alignment frameworks begin with a thorough understanding of business capabilities and the technology services that enable them. By mapping each business capability to its supporting technology stack, organizations can identify redundancy, gaps, and opportunities for optimization. This capability-based approach ensures that every dollar of IT spend is traceable to a specific business outcome, whether that is revenue growth, operational efficiency, or risk mitigation.',
      'Leading organizations are adopting technology investment committees that bring together business unit leaders, finance executives, and IT architects. These cross-functional bodies evaluate proposed investments against a balanced scorecard that considers financial return, strategic fit, operational risk, and innovation potential. This collaborative model replaces the traditional "IT budget" mindset with a shared responsibility for technology-enabled business outcomes.',
    ],
  },
  {
    category: 'MANAGEMENT',
    title: 'Eliminating Enterprise Delivery Bottlenecks',
    date: 'January 2024',
    excerpt:
      'Practical strategies for identifying and removing the obstacles that slow enterprise delivery.',
    readTime: '6 min read',
    author: { name: 'Marcus Chen', title: 'Director of Delivery' },
    fullContent: [
      'Enterprise delivery bottlenecks are rarely caused by a single factor. Instead, they emerge from a complex interplay of organizational structure, process maturity, tooling choices, and cultural dynamics. The most persistent bottlenecks tend to cluster around environment provisioning, cross-team coordination, approval workflows, and testing infrastructure — areas where accumulated technical debt and bureaucratic overhead compound over time.',
      'Value stream mapping has proven to be an invaluable diagnostic tool for identifying delivery bottlenecks. By tracing the flow of work from ideation through production deployment, organizations can quantify lead time at each stage, pinpoint queues and wait states, and measure the ratio of value-adding activities to overhead. This data-driven approach transforms bottleneck resolution from a subjective exercise into a systematic, continuous improvement process.',
      'The most impactful bottleneck interventions often address organizational design rather than technology. Conway\'s Law — the observation that system architecture mirrors communication structures — means that team boundaries, reporting lines, and decision-making authority have a direct and measurable impact on delivery velocity. Restructuring teams around value streams rather than technical layers can eliminate entire categories of coordination overhead.',
      'Automation plays a critical supporting role in bottleneck elimination, but it must be applied strategically. Premature automation of broken processes simply accelerates the delivery of poor outcomes. The most effective approach is to first streamline and simplify the underlying process, then automate the optimized workflow. This "simplify first, automate second" principle ensures that automation investments amplify efficiency gains rather than entrench inefficiencies.',
    ],
  },
  {
    category: 'SOFTWARE SOLUTIONS',
    title: 'Red Hat Middleware: Lowering TCO at Scale',
    date: 'December 2023',
    excerpt:
      'How Red Hat Enterprise Middleware delivers measurable cost savings for large-scale deployments.',
    readTime: '7 min read',
    author: { name: 'David Okonkwo', title: 'Senior Solutions Architect' },
    fullContent: [
      'Total cost of ownership for enterprise middleware extends far beyond the initial licensing or subscription fees. A comprehensive TCO analysis must account for infrastructure requirements, operational staffing, training and certification, security compliance, integration development, and ongoing maintenance. For large-scale deployments spanning hundreds of applications and thousands of endpoints, these operational costs typically dwarf the software costs by a factor of three to five.',
      'Red Hat Enterprise Middleware, built on open-source foundations like JBoss EAP, AMQ, and Fuse, offers a fundamentally different cost structure than proprietary alternatives. The subscription model provides predictable annual costs with no surprise licensing audits or escalating maintenance fees. More importantly, the open-source lineage means a deep talent pool, extensive community documentation, and a rich ecosystem of complementary tools that reduce integration and customization costs.',
      'In comparative analyses across financial services, healthcare, and manufacturing sectors, Red Hat middleware deployments consistently demonstrate 25-45% lower five-year TCO compared to proprietary equivalents. The primary drivers of this advantage include reduced infrastructure footprint through container-native design, lower staffing costs due to standardized skillsets, and faster time-to-value for new integration projects.',
    ],
  },
  {
    category: 'ENTERPRISE ARCHITECTURE',
    title: 'Microservices vs. Monolith: An Enterprise Decision Framework',
    date: 'November 2023',
    excerpt:
      'A structured approach to choosing between microservices and monolithic architecture for your enterprise.',
    readTime: '6 min read',
    author: { name: 'Elena Vasquez', title: 'Principal Architect' },
    fullContent: [
      'The microservices versus monolith debate has generated more heat than light in enterprise architecture circles. Both architectural styles have legitimate strengths and trade-offs, and the optimal choice depends on a constellation of factors including organizational maturity, team structure, deployment infrastructure, and the specific characteristics of the application portfolio. Dogmatic adherence to either approach is a recipe for architectural mismatch.',
      'Microservices excel in environments characterized by autonomous teams, independent deployment pipelines, polyglot technology needs, and high scalability requirements for specific subsystems. However, they introduce significant complexity in service discovery, distributed data management, observability, and operational governance. Organizations without mature DevOps practices and robust platform engineering capabilities often find that microservices amplify operational overhead faster than they deliver agility benefits.',
      'Monolithic architectures, often dismissed as legacy, offer compelling advantages for many enterprise contexts. They simplify development, testing, and deployment for organizations with constrained platform capabilities. They eliminate the network boundary as a failure domain and reduce latency for tightly coupled operations. The modular monolith pattern — organizing code into well-defined internal modules with explicit boundaries — can deliver many of microservices\' design benefits without the operational complexity.',
      'The most pragmatic decision framework evaluates four dimensions: organizational scaling needs, deployment independence requirements, technology heterogeneity, and team autonomy. When these factors strongly favor decomposition, microservices with a robust service mesh and platform layer provide the foundation for sustainable scale. When they do not, a well-architected modular monolith preserves optionality for future decomposition while minimizing current operational burden.',
    ],
  },
  {
    category: 'TECHNOLOGY STRATEGY',
    title: 'Building a Digital Transformation Roadmap That Works',
    date: 'October 2023',
    excerpt:
      'Step-by-step framework for creating and executing a digital transformation strategy.',
    readTime: '5 min read',
    author: { name: 'Sarah Kim', title: 'Managing Consultant' },
    fullContent: [
      'Digital transformation initiatives fail at alarming rates — industry estimates suggest that 70-80% of large-scale transformation programs do not achieve their stated objectives. The primary failure mode is not technology but strategy execution. Organizations often define ambitious transformation visions but lack the structured roadmaps, governance mechanisms, and adaptive planning processes needed to navigate the complexity of large-scale change.',
      'An effective transformation roadmap must balance ambition with pragmatism. It should identify quick-win initiatives that demonstrate value within 60-90 days, building organizational momentum and stakeholder confidence. Simultaneously, it must lay the architectural foundations — data platforms, integration layer, cloud infrastructure — that enable subsequent capability releases. This dual-track approach ensures that transformation delivers tangible results while building the technical scaffolding for long-term vision.',
      'Success measurement is the most commonly underestimated element of digital transformation roadmaps. Organizations that define clear, quantifiable success metrics at the outset — customer acquisition cost, order-to-cash cycle time, employee productivity, system uptime — are significantly more likely to sustain executive sponsorship and organizational commitment through the inevitable challenges of large-scale change.',
    ],
  },
  {
    category: 'MANAGEMENT',
    title: 'Agile PMO: Bridging Traditional Governance and Modern Delivery',
    date: 'September 2023',
    excerpt:
      'How to build a PMO that supports agile delivery without sacrificing governance and compliance.',
    readTime: '5 min read',
    author: { name: 'James Mitchell', title: 'Practice Lead, Management Consulting' },
    fullContent: [
      'The traditional Project Management Office was designed for a world of sequential, plan-driven delivery. In that context, its value was clear: centralized resource management, standardized reporting, risk governance, and organizational learning. However, as enterprises have adopted agile and product-centric operating models, the traditional PMO has become a source of friction rather than a catalyst for effective delivery.',
      'The Agile PMO represents an evolution rather than an abandonment of traditional governance principles. Its mandate shifts from controlling project execution to enabling effective product delivery. This means lightweight portfolio management that aligns investment with strategic priorities, automated metrics collection that replaces manual status reporting, and embedded compliance checks that satisfy regulatory requirements without impeding team velocity.',
      'Leading organizations are reconstituting their PMOs as "Delivery Enablement" functions that provide shared services — tooling, training, coaching, environment management — to autonomous delivery teams. This model preserves the coordination and governance benefits of centralized project management while respecting the autonomy and speed that agile delivery demands. The result is a governance model that scales with organizational complexity without becoming a bottleneck for innovation and delivery.',
    ],
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

function BlogPostModal({
  post,
  onClose,
}: {
  post: typeof featuredPost | (typeof posts)[number];
  onClose: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-2xl bg-[#0a0a0a] border border-white/[0.08]"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-12">
          {/* Category badge */}
          <span className="inline-block text-[10px] uppercase tracking-[0.15em] font-medium text-[#FF4800] bg-[#FF4800]/10 px-3 py-1 rounded-full mb-6">
            {post.category}
          </span>

          {/* Title */}
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-white leading-tight mb-6">
            {post.title}
          </h2>

          {/* Author + date + read time */}
          <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#A1A1A1] mb-8">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span className="text-white font-medium">{post.author.name}</span>
              <span className="text-[#52525B]">— {post.author.title}</span>
            </span>
            <span className="text-[#52525B]">|</span>
            <span>{post.date}</span>
            <span className="text-[#52525B]">|</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Decorative gradient divider */}
          <div className="h-[2px] w-full bg-gradient-to-r from-[#FF4800] via-[#2B2358] to-transparent mb-8" />

          {/* Full content paragraphs */}
          <div className="space-y-6">
            {post.fullContent.map((paragraph, i) => (
              <p
                key={i}
                className="text-[15px] sm:text-[16px] leading-[1.8] text-[#D4D4D8]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Back to all articles */}
          <div className="mt-10 pt-8 border-t border-white/[0.06]">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-[#A1A1A1] hover:text-[#FF4800] text-sm font-medium transition-colors"
            >
              <span className="inline-flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                Back to all articles
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function InsightsPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Subscribed!');
        setEmail('');
      } else if (res.status === 409) {
        toast.error(data.message || 'This email is already subscribed.');
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <TextReveal delay={0.2} stagger={0.08}>Enterprise thinking for modern organizations.</TextReveal>
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
            className="bg-[#2B2358] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setSelectedPost(-1)}
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
                <span className="inline-flex items-center gap-2 text-white border border-white/20 rounded-lg px-5 py-2.5 text-sm font-medium group-hover:bg-white/5 transition-colors w-fit">
                  Read article
                  <ArrowRight className="w-4 h-4" />
                </span>
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
                className="bg-[#2B2358] rounded-xl p-6 border border-white/[0.06] hover:bg-[#1e1a3f] hover:border-[#FF4800]/20 transition-all duration-300 cursor-pointer group card-glow"
                onClick={() => setSelectedPost(index)}
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

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost !== null && (
          <BlogPostModal
            post={selectedPost === -1 ? featuredPost : posts[selectedPost]}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>

      {/* 4D — NEWSLETTER CTA */}
      <section className="px-6 py-16 md:py-24 bg-black">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease }}
            className="bg-[#2B2358] rounded-xl py-16 px-6 md:px-12 text-center bg-noise-subtle border-glow-top"
          >
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium text-white mb-3">
              Stay ahead of enterprise trends.
            </h2>
            <p className="text-[#A1A1A1] text-[15px] sm:text-[16px] mb-8">
              Monthly insights for enterprise leaders.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mt-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className="flex-1 bg-[#1e1a3f] border border-[#27272A] focus:border-[#FF4800] text-white rounded-lg px-4 py-3 text-[15px] placeholder-[#52525B] outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FF4800] hover:bg-[#e63f00] text-white font-medium text-[15px] rounded-lg px-6 py-3 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                Subscribe
              </button>
            </form>
            <p className="text-[#52525B] text-[12px] mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
