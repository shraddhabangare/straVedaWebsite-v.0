export interface KnowledgeEntry {
  id: string;
  topic: string;
  keywords: string[];
  content: string;
}

export const SITE_KNOWLEDGE: KnowledgeEntry[] = [

  // ── PRICING ────────────────────────────────────────────────────────────
  {
    id: 'pricing-overview',
    topic: 'pricing',
    keywords: ['price', 'cost', 'pricing', 'how much', 'budget', 'rates', 'fee', 'charge', 'afford', 'expensive', 'cheap', 'quote', 'rupees', '₹'],
    content:
      'Straveda has three engagement tiers:\n\n1. **Focused Automation Builds** — starts at ₹5L, first deployment in 4 weeks.\n2. **Custom Software & AI Systems** — milestone-based pricing, scoped after discovery call.\n3. **Ongoing Optimization & Scale** — monthly retainer, pricing based on scope.\n\nAll engagements include full source code ownership and a fixed-price quote after a 30-min discovery call.',
  },
  {
    id: 'pricing-automation',
    topic: 'pricing',
    keywords: ['5l', '5 lakh', 'automation sprint', 'focused automation', 'cheapest', 'minimum', 'starting', 'entry'],
    content:
      'The **Focused Automation Build** starts at ₹5L. It covers one custom automation workflow, seamless integration into your existing tech stack, comprehensive documentation, and first deployment within **4 weeks**.',
  },
  {
    id: 'pricing-custom',
    topic: 'pricing',
    keywords: ['custom software', 'ai system', 'dashboard', 'crm', 'platform', '15l', '30l', 'mid range'],
    content:
      '**Custom Software & AI Systems** are priced per milestone based on project scope. Services include end-to-end software architecture, bespoke AI integration, and full codebase ownership. Book a discovery call for a fixed-price quote within 48 hours.',
  },
  {
    id: 'pricing-ongoing',
    topic: 'pricing',
    keywords: ['ongoing', 'monthly', 'retainer', 'support', 'maintenance', 'scale', 'optimize', 'recurring'],
    content:
      'The **Ongoing Optimization & Scale** plan is a monthly retainer covering system health checks, priority feature deployment, and iterative workflow refinements. Contact us for a scoped monthly rate.',
  },
  {
    id: 'pricing-fixed',
    topic: 'pricing',
    keywords: ['fixed price', 'no hidden', 'hidden cost', 'surprise', 'invoice', 'billing', 'hourly', 'per hour'],
    content:
      'Straveda does **fixed-price engagements only** — no hourly billing, no surprise invoices. You get a written quote after the discovery call and we only start once you approve it.',
  },

  // ── SERVICES ───────────────────────────────────────────────────────────
  {
    id: 'services-overview',
    topic: 'services',
    keywords: ['services', 'what do you do', 'what you offer', 'what you build', 'offerings', 'capabilities', 'straveda services'],
    content:
      'Straveda offers four core service areas:\n\n1. **Focused Automation Builds** — WhatsApp automation, lead flows, process optimization.\n2. **Custom Software & AI Systems** — AI-powered CRMs, dashboards, internal tools.\n3. **Ongoing Optimization & Scale** — monthly retainer for active growth.\n4. **Web Development** — Next.js websites, 3D experiences, landing pages.\n\nAll work ships with full documentation and zero vendor lock-in.',
  },
  {
    id: 'service-whatsapp',
    topic: 'services',
    keywords: ['whatsapp', 'whatsapp automation', 'whatsapp bot', 'whatsapp flow', 'messaging', 'chat bot'],
    content:
      '**WhatsApp automation** is one of our core offerings. We build WhatsApp flows that handle lead qualification, appointment booking, customer support, and follow-up sequences — fully automated and integrated with your CRM or ops stack.',
  },
  {
    id: 'service-ai',
    topic: 'services',
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'llm', 'gpt', 'agent', 'intelligent', 'smart', 'chatbot', 'generative'],
    content:
      'We build and deploy **AI-powered systems** — custom AI agents, LLM-integrated workflows, intelligent document processing, AI-augmented CRMs, and GPT-class models wired directly into your operations stack.',
  },
  {
    id: 'service-crm',
    topic: 'services',
    keywords: ['crm', 'customer relationship', 'sales pipeline', 'leads', 'contacts', 'salesforce', 'hubspot', 'replace'],
    content:
      'We build **custom AI-powered CRMs** tailored to your exact sales process — not a generic SaaS tool bent to fit your workflow. Typically replaces 3–5 SaaS subscriptions and eliminates integration debt.',
  },
  {
    id: 'service-dashboard',
    topic: 'services',
    keywords: ['dashboard', 'analytics', 'reporting', 'real-time', 'monitor', 'metrics', 'kpi', 'data'],
    content:
      'We build **real-time internal dashboards** that replace tab-switching and spreadsheet chaos. Live KPIs, ops monitoring, and reporting — built around your data sources, not a predefined template.',
  },
  {
    id: 'service-internal-tools',
    topic: 'services',
    keywords: ['internal tool', 'internal app', 'admin panel', 'ops tool', 'back office', 'employee tool'],
    content:
      'We specialize in **internal tools** — custom admin panels, ops dashboards, workflow managers, and back-office platforms that your team will actually use (unlike off-the-shelf tools that fight your process).',
  },
  {
    id: 'service-web',
    topic: 'services',
    keywords: ['website', 'web', 'landing page', 'nextjs', 'react', '3d', 'design', 'ui', 'ux', 'frontend', 'web design'],
    content:
      'We build **high-performance Next.js websites** — conversion-optimised landing pages, 3D interactive experiences, and product interfaces deployed to edge infrastructure. Fast, accessible, and polished.',
  },
  {
    id: 'service-integration',
    topic: 'services',
    keywords: ['integrate', 'integration', 'connect', 'api', 'third party', 'zapier', 'n8n', 'existing system', 'stack'],
    content:
      'We handle all **third-party integrations** — connecting your new system to your existing CRM, ERP, payment gateway, communication tools, or any REST/webhook API. We document every integration for your team.',
  },
  {
    id: 'service-strategy',
    topic: 'services',
    keywords: ['strategy', 'consulting', 'advice', 'recommend', 'audit', 'review', 'assess', 'roadmap'],
    content:
      'The **30-minute discovery call** is essentially a free strategy session. We audit your current ops, identify the highest-leverage automation or build opportunity, and give you a concrete recommendation — whether you work with us or not.',
  },

  // ── PROCESS / HOW IT WORKS ─────────────────────────────────────────────
  {
    id: 'process-start',
    topic: 'process',
    keywords: ['start', 'begin', 'get started', 'onboard', 'first step', 'how to', 'process', 'next step', 'sign up'],
    content:
      'Getting started:\n1. **Book a 30-min discovery call** — free, no obligation.\n2. We send a **fixed-price proposal within 48 hours**.\n3. Sprint begins after sign-off.\n\nVisit the Contact page or WhatsApp us directly to schedule.',
  },
  {
    id: 'process-timeline',
    topic: 'process',
    keywords: ['timeline', 'how long', 'duration', 'weeks', 'months', 'delivery', 'time', 'when', 'fast', 'quick'],
    content:
      'Most projects ship their **first working deployment in 4–6 weeks**. We don\'t do 6-month black-box builds — you see real progress every week with milestone check-ins.',
  },
  {
    id: 'process-discovery',
    topic: 'process',
    keywords: ['discovery call', 'call', 'meeting', 'consultation', '30 min', 'free call', 'schedule', 'book'],
    content:
      'The **30-minute discovery call** is free. You\'ll walk away with a clear hypothesis for what to automate or build first. If it\'s a fit, we send a fixed-price proposal within 48 hours. Book it on the Contact page.',
  },
  {
    id: 'process-proposal',
    topic: 'process',
    keywords: ['proposal', 'quote', 'estimate', '48 hours', 'how soon', 'response time'],
    content:
      'After the discovery call, we send a **fixed-price proposal within 48 hours**. It includes scope, deliverables, timeline, and price — no ambiguity.',
  },
  {
    id: 'process-team',
    topic: 'process',
    keywords: ['team', 'work together', 'collaborate', 'existing', 'developers', 'in-house', 'our team'],
    content:
      'We integrate with your **existing in-house developers, ops team, or IT partner**. We document everything at every milestone so knowledge never gets stuck in our heads.',
  },
  {
    id: 'process-ownership',
    topic: 'process',
    keywords: ['ownership', 'source code', 'code owner', 'lock in', 'vendor lock', 'ip', 'intellectual property', 'rights'],
    content:
      'You get **full source code ownership** on every engagement. No vendor lock-in, no SaaS dependency, no licensing fees. The code is yours on day one of delivery.',
  },
  {
    id: 'process-documentation',
    topic: 'process',
    keywords: ['documentation', 'docs', 'handover', 'knowledge transfer', 'training', 'guide'],
    content:
      'Every engagement includes **comprehensive documentation and structured handover** — technical docs, workflow diagrams, and a walkthrough session so your team can own and extend the system without us.',
  },

  // ── ABOUT / COMPANY ────────────────────────────────────────────────────
  {
    id: 'about-company',
    topic: 'about',
    keywords: ['straveda', 'founded', 'located', 'nashik', 'pune', 'india', 'based', 'origin', 'who is straveda', 'what is straveda'],
    content:
      '**Straveda** is a software and AI automation company based in **Pune (Nashik), India**, founded in 2024. We\'re a small, focused team of builders who\'ve run companies and lived operational chaos — we build the systems that eliminate it.',
  },
  {
    id: 'about-team',
    topic: 'about',
    keywords: ['team', 'who are', 'people', 'founder', 'engineer', 'designer', 'staff', 'employees', 'size'],
    content:
      'Straveda is a **small, senior team** — no bloated hierarchies, no juniors assigned to your project. The engineers and strategists you meet in the discovery call are the ones who build your system.',
  },
  {
    id: 'about-mission',
    topic: 'about',
    keywords: ['mission', 'vision', 'values', 'believe', 'philosophy', 'why', 'purpose'],
    content:
      'Our mission: **eliminate the operational chaos** that slows growing businesses. We believe great software should be built around your workflow — not the other way around. We automate before we build and ship weekly, not quarterly.',
  },
  {
    id: 'about-differentiator',
    topic: 'about',
    keywords: ['different', 'unique', 'better', 'compare', 'vs', 'agency', 'advantage', 'why choose', 'why straveda'],
    content:
      'Three things set Straveda apart:\n1. **Priced for mid-market** — not enterprise bloat.\n2. **Ship weekly** — not quarterly black-box builds.\n3. **Automate first, build second** — full code ownership, zero vendor lock-in.',
  },
  {
    id: 'about-clients',
    topic: 'about',
    keywords: ['client', 'customer', 'who do you work with', 'industry', 'sector', 'type of business'],
    content:
      'We work primarily with **50–500 person mid-market companies** across India — in operations-heavy industries like logistics, real estate, edtech, healthcare ops, and professional services.',
  },

  // ── TECHNICAL ─────────────────────────────────────────────────────────
  {
    id: 'tech-stack',
    topic: 'technical',
    keywords: ['technology', 'tech stack', 'built with', 'framework', 'language', 'nextjs', 'react', 'python', 'node'],
    content:
      'Straveda typically builds with **Next.js, React, Node.js, Python, and PostgreSQL** — battle-tested choices that are easy for your team to maintain. We pick the right tool for each job, not the trendiest one.',
  },
  {
    id: 'tech-hosting',
    topic: 'technical',
    keywords: ['hosting', 'deploy', 'cloud', 'aws', 'vercel', 'server', 'infrastructure', 'where', 'hosted'],
    content:
      'We deploy to your preferred cloud or ours — **Vercel, AWS, or any VPS**. You own the infrastructure from day one. No platform dependency.',
  },
  {
    id: 'tech-security',
    topic: 'technical',
    keywords: ['security', 'secure', 'data', 'privacy', 'gdpr', 'safe', 'encrypt', 'compliance'],
    content:
      'Security is built in from architecture design — **encrypted data at rest and in transit, role-based access control, audit logs**. We follow OWASP best practices and can accommodate GDPR or DPDP compliance requirements.',
  },
  {
    id: 'tech-maintenance',
    topic: 'technical',
    keywords: ['maintenance', 'bug', 'fix', 'update', 'break', 'down', 'support after', 'post launch'],
    content:
      'All deliverables come with a **30-day post-launch support window** for bug fixes. After that, you can continue with our Ongoing Optimization retainer or maintain the system in-house — the code is fully yours either way.',
  },

  // ── CONTACT / CTA ──────────────────────────────────────────────────────
  {
    id: 'contact',
    topic: 'contact',
    keywords: ['contact', 'email', 'reach', 'talk', 'call', 'phone', 'whatsapp', 'message', 'connect', 'hello', 'enquiry'],
    content:
      'Reach Straveda at **hello@straveda.com** or WhatsApp us directly. To book a discovery call, visit the **Contact page** — we respond within one business day.',
  },
  {
    id: 'contact-location',
    topic: 'contact',
    keywords: ['address', 'office', 'location', 'visit', 'where', 'nashik', 'pune', 'maharashtra'],
    content:
      'Straveda is based in **Pune, Maharashtra, India — 411001**. We work with clients remotely across India and engage in person for clients in Pune/Nashik.',
  },

  // ── OBJECTIONS / CONCERNS ─────────────────────────────────────────────
  {
    id: 'objection-small',
    topic: 'objections',
    keywords: ['too small', 'small company', 'startup', 'early stage', 'just started', 'not big enough'],
    content:
      'Straveda is built for companies that are **growing, not just large**. If you have a specific operational bottleneck you want to solve, a discovery call will tell you whether automation is the right move — no commitment required.',
  },
  {
    id: 'objection-enterprise',
    topic: 'objections',
    keywords: ['enterprise', 'large scale', 'big company', '1000 employees', 'enterprise ready', 'scalable'],
    content:
      'We build **scale-ready architecture from day one** and are sized for mid-market execution (50–500 people). For very large enterprises, we\'d recommend discussing scope on the discovery call first.',
  },
  {
    id: 'objection-existing-vendor',
    topic: 'objections',
    keywords: ['already have', 'existing vendor', 'current developer', 'agency', 'switching', 'replace', 'second opinion'],
    content:
      'We often work **alongside existing vendors or internal teams**. We can audit your current system, take over a stalled project, or build a specific new layer on top of what you already have.',
  },
  {
    id: 'objection-risk',
    topic: 'objections',
    keywords: ['risk', 'worried', 'guarantee', 'what if', 'fail', 'cancel', 'refund', 'trust'],
    content:
      'Risk is managed through **fixed-price milestones** — you only pay for what\'s delivered and approved. No long-term lock-in. If a milestone isn\'t right, we fix it before moving forward.',
  },

  // ── CAREERS ────────────────────────────────────────────────────────────
  {
    id: 'careers',
    topic: 'careers',
    keywords: ['job', 'career', 'hiring', 'work at', 'join', 'vacancy', 'opening', 'apply', 'role', 'position', 'internship'],
    content:
      'Straveda is **actively hiring** engineers, AI specialists, and designers. Visit the **Careers page** on this site to see open roles and apply. We hire for ownership, not just skills.',
  },

];

/** Simple keyword scorer — returns top matching content or null. */
export function searchKnowledge(query: string): string | null {
  const lower = query.toLowerCase();

  const scored = SITE_KNOWLEDGE.map((entry) => {
    const score = entry.keywords.reduce(
      (acc, kw) => acc + (lower.includes(kw.toLowerCase()) ? 1 : 0),
      0,
    );
    return { entry, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return null;

  // Return top 2 matches, de-duplicated by topic
  const seen = new Set<string>();
  const results: string[] = [];
  for (const { entry } of scored) {
    if (!seen.has(entry.topic)) {
      seen.add(entry.topic);
      results.push(entry.content);
    }
    if (results.length >= 2) break;
  }
  return results.join('\n\n---\n\n');
}

/** Compact summary injected into every Groq system prompt. */
export const SITE_SUMMARY = `
Straveda is an AI automation & custom software company based in Pune (Nashik), India.
Founded 2024. Serves 50–500 person mid-market companies.
Core services: Focused Automation Builds (from ₹5L, 4 weeks), Custom Software & AI Systems (milestone-based), Ongoing Optimization & Scale (monthly retainer).
Key differentiators: ships weekly, fixed-price quotes, full code ownership, zero vendor lock-in.
Email: hello@straveda.com
`.trim();
