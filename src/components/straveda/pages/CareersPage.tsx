'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease },
};

const OPEN_ROLES = [
  {
    title: 'Full-Stack Engineer',
    type: 'Full-time',
    location: 'Remote / Nashik',
    tags: ['Next.js', 'TypeScript', 'Node.js'],
    desc: 'Build scalable web applications and internal tools for our clients. You will own features end-to-end, from API design to pixel-perfect UI.',
  },
  {
    title: 'AI/ML Engineer',
    type: 'Full-time',
    location: 'Remote / Nashik',
    tags: ['Python', 'LLMs', 'LangChain'],
    desc: 'Design and deploy AI-powered workflows and automation pipelines. Work directly with cutting-edge language models and integrate them into production systems.',
  },
  {
    title: 'Automation Specialist',
    type: 'Full-time',
    location: 'Remote',
    tags: ['n8n', 'WhatsApp API', 'Zapier'],
    desc: 'Architect end-to-end automation workflows that eliminate manual operations for growing businesses. Deep knowledge of integration platforms is a plus.',
  },
  {
    title: 'Product Designer',
    type: 'Contract',
    location: 'Remote',
    tags: ['Figma', 'UX Research', 'Design Systems'],
    desc: 'Translate complex business requirements into clean, intuitive interfaces. You care deeply about user experience and push back on anything that gets in the user\'s way.',
  },
];

const VALUES = [
  {
    title: 'Build for impact',
    body: 'Every system we ship eliminates real operational pain. We measure our work by the hours saved and revenue unlocked, not lines of code.',
  },
  {
    title: 'Move with ownership',
    body: 'Small team, high trust. You own your work from scoping to handover. No hand-holding, no permission-seeking for every small decision.',
  },
  {
    title: 'Grow in the open',
    body: 'We share what we learn — internally and publicly. When you discover something useful, you teach it. Everyone here makes everyone better.',
  },
  {
    title: 'Craft over cargo-cult',
    body: 'We pick the right tool for the job, not the trendiest one. We take pride in clean architecture, clear docs, and systems that don\'t surprise you at 2am.',
  },
];

function HeroSection() {
  return (
    <section className="relative bg-[#f5f5f0] dark:bg-[#030303] pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp}>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-[1px] w-8 bg-[#FF4800]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF4800]">
              Careers at Straveda
            </span>
          </div>
          <h1 className="text-[48px] md:text-[72px] font-light leading-[0.95] tracking-[-2px] mb-6 text-[#1a1a2e] dark:text-[#f0f0f5]">
            Build systems<br />
            <span style={{ color: '#FF4800' }}>that matter.</span>
          </h1>
          <p className="text-[18px] leading-[1.7] text-[#6b7280] dark:text-[#9ca3af] max-w-xl">
            We&apos;re a small, focused team in Nashik building automation and software for businesses that move fast. If you want real ownership and real impact, you belong here.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-[#0d0d1a]">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="mb-14">
          <h2 className="text-[32px] md:text-[40px] font-light tracking-[-1px] text-[#1a1a2e] dark:text-[#f0f0f5]">
            How we work
          </h2>
          <p className="mt-3 text-[15px] text-[#6b7280] dark:text-[#9ca3af] max-w-lg">
            Four principles that shape every decision, sprint, and hire.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="glass-card rounded-xl p-7"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#FF4800' }} />
                <p className="text-[14px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5]">{v.title}</p>
              </div>
              <p className="text-[14px] leading-[1.7] text-[#6b7280] dark:text-[#9ca3af]">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  whyJoin: string;
  resume: File | null;
}

const EMPTY_FORM: ApplicationForm = {
  name: '', email: '', phone: '', linkedin: '', portfolio: '', whyJoin: '', resume: null,
};

function ApplyForm({ roleTitle, onClose }: { roleTitle: string; onClose: () => void }) {
  const [form, setForm] = useState<ApplicationForm>(EMPTY_FORM);
  const [status, setStatus] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof ApplicationForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((f) => ({ ...f, resume: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.resume) { setErrorMsg('Please attach your resume (PDF).'); return; }
    setStatus('loading');
    setErrorMsg('');
    const fd = new FormData();
    fd.append('role', roleTitle);
    fd.append('name', form.name);
    fd.append('email', form.email);
    fd.append('phone', form.phone);
    fd.append('linkedin', form.linkedin);
    fd.append('portfolio', form.portfolio);
    fd.append('whyJoin', form.whyJoin);
    fd.append('resume', form.resume);
    try {
      const res = await fetch('/api/careers', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  const inputCls = "w-full rounded-lg px-4 py-2.5 text-[13px] border border-black/[0.1] dark:border-white/[0.1] bg-white/60 dark:bg-white/[0.04] text-[#1a1a2e] dark:text-[#f0f0f5] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#FF4800]/40 transition";

  if (status === 'success') {
    return (
      <div className="px-7 pb-8 pt-6 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,72,0,0.1)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF4800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p className="text-[15px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] mb-1">Application submitted!</p>
        <p className="text-[13px] text-[#6b7280] dark:text-[#9ca3af]">We&apos;ll review it and get back to you within 5 business days.</p>
        <button onClick={onClose} className="mt-5 text-[12px] text-[#FF4800] font-medium hover:underline">Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="px-7 pb-8 pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
      <p className="text-[12px] font-bold uppercase tracking-widest text-[#FF4800] mb-5 mt-5">Apply — {roleTitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Full Name *</label>
          <input required value={form.name} onChange={set('name')} placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Email *</label>
          <input required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className={inputCls} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Phone</label>
          <input value={form.phone} onChange={set('phone')} placeholder="+91 98000 00000" className={inputCls} />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">LinkedIn URL</label>
          <input value={form.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/in/you" className={inputCls} />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Portfolio / GitHub</label>
        <input value={form.portfolio} onChange={set('portfolio')} placeholder="github.com/you or yoursite.com" className={inputCls} />
      </div>

      <div className="mb-3">
        <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Why do you want to join Straveda? *</label>
        <textarea required rows={4} value={form.whyJoin} onChange={set('whyJoin')} placeholder="Tell us what excites you about this role..." className={inputCls + ' resize-none'} />
      </div>

      <div className="mb-5">
        <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Resume (PDF, max 5 MB) *</label>
        <input ref={fileRef} type="file" accept=".pdf" onChange={handleFile} className="hidden" />
        <button type="button" onClick={() => fileRef.current?.click()}
          className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] border border-dashed border-[#FF4800]/40 text-[#FF4800] hover:bg-[#FF4800]/5 transition w-full justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          {form.resume ? form.resume.name : 'Upload Resume PDF'}
        </button>
      </div>

      {errorMsg && <p className="text-[12px] text-red-500 mb-3">{errorMsg}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={status === 'loading'}
          className="rounded-lg px-6 py-2.5 text-[13px] font-medium text-white transition-all duration-200 disabled:opacity-60"
          style={{ background: '#FF4800' }}
          onMouseEnter={(e) => { if (status !== 'loading') e.currentTarget.style.background = '#e03e00'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#FF4800'; }}>
          {status === 'loading' ? 'Submitting…' : 'Submit Application →'}
        </button>
        <button type="button" onClick={onClose} className="text-[12px] text-[#9ca3af] hover:text-[#6b7280] transition">
          Cancel
        </button>
      </div>
    </form>
  );
}

function OpenApplicationSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', whatYouBuild: '' });
  const [resume, setResume] = useState<File | null>(null);
  const [status, setStatus] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) { setErrorMsg('Please attach your resume (PDF).'); return; }
    setStatus('loading');
    setErrorMsg('');
    const fd = new FormData();
    fd.append('role', 'Open Application');
    fd.append('name', form.name);
    fd.append('email', form.email);
    fd.append('phone', form.phone);
    fd.append('linkedin', '');
    fd.append('portfolio', '');
    fd.append('whyJoin', form.whatYouBuild);
    fd.append('resume', resume);
    try {
      const res = await fetch('/api/careers', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  const inputCls = "w-full rounded-lg px-4 py-2.5 text-[13px] border border-black/[0.1] dark:border-white/[0.1] bg-white/60 dark:bg-white/[0.04] text-[#1a1a2e] dark:text-[#f0f0f5] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#FF4800]/40 transition";

  return (
    <section className="py-20 px-6 bg-white dark:bg-[#0d0d1a]">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="glass-card rounded-2xl overflow-hidden">
          {/* Header strip */}
          <div className="px-10 py-8 md:px-14" style={{ background: 'linear-gradient(135deg, #FF4800 0%, #cc3900 100%)' }}>
            <h2 className="text-[26px] md:text-[32px] font-light text-white mb-2 tracking-[-0.5px]">
              Don&apos;t see your role?
            </h2>
            <p className="text-[14px] text-white/80 max-w-md leading-[1.7]">
              We&apos;re always open to exceptional people. Drop your resume and tell us what you build — we read every application.
            </p>
          </div>

          {/* Form body */}
          <div className="px-10 py-8 md:px-14">
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,72,0,0.1)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF4800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <p className="text-[15px] font-semibold text-[#1a1a2e] dark:text-[#f0f0f5] mb-1">We&apos;ve got your application!</p>
                <p className="text-[13px] text-[#6b7280] dark:text-[#9ca3af]">If there&apos;s a fit, you&apos;ll hear from us directly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Full Name *</label>
                    <input required value={form.name} onChange={set('name')} placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Email *</label>
                    <input required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className={inputCls} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Phone</label>
                    <input value={form.phone} onChange={set('phone')} placeholder="+91 98000 00000" className={inputCls} />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">What do you build & why Straveda? *</label>
                  <textarea required rows={4} value={form.whatYouBuild} onChange={set('whatYouBuild')}
                    placeholder="Tell us about yourself, your skills, and what excites you about working with us..."
                    className={inputCls + ' resize-none'} />
                </div>

                <div className="mb-6">
                  <label className="block text-[11px] font-semibold text-[#6b7280] mb-1">Resume (PDF, max 5 MB) *</label>
                  <input ref={fileRef} type="file" accept=".pdf" onChange={(e) => setResume(e.target.files?.[0] ?? null)} className="hidden" />
                  <button type="button" onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] border border-dashed border-[#FF4800]/40 text-[#FF4800] hover:bg-[#FF4800]/5 transition w-full justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    {resume ? resume.name : 'Upload Resume PDF'}
                  </button>
                </div>

                {errorMsg && <p className="text-[12px] text-red-500 mb-3">{errorMsg}</p>}

                <button type="submit" disabled={status === 'loading'}
                  className="rounded-lg px-7 py-3 text-[13px] font-medium text-white transition-all duration-200 disabled:opacity-60"
                  style={{ background: '#FF4800' }}
                  onMouseEnter={(e) => { if (status !== 'loading') e.currentTarget.style.background = '#e03e00'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#FF4800'; }}>
                  {status === 'loading' ? 'Submitting…' : 'Send Open Application →'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface CareersPageProps {
  onNavigate: (page: string) => void;
}

export default function CareersPage({ onNavigate: _onNavigate }: CareersPageProps) {
  return (
    <div>
      <HeroSection />
      <ValuesSection />
      <OpenApplicationSection />
    </div>
  );
}
