'use client';

import { useRef } from 'react';
import { Mail, MapPin, ArrowUp } from 'lucide-react';
import { useCursorStyle } from '@/lib/cursor-context';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const FOOTER_LINKS = {
  EXPLORE: [
    { label: 'Home', page: 'home' },
    { label: 'What We Build', page: 'services' },
    { label: 'Why Straveda', page: 'about' },
    { label: 'Insights', page: 'insights' },
    { label: 'Contact', page: 'contact' },
  ],
  SERVICES: [
    { label: 'AI & Automation', page: 'services' },
    { label: 'Custom Software', page: 'services' },
    { label: 'AI Strategy & Integration', page: 'services' },
    { label: 'Web Development & 3D', page: 'services' },
  ],
  RESOURCES: [
    { label: 'Insights (Blog)', page: 'insights' },
    { label: 'Discovery Call Guide', page: 'contact' },
    { label: 'Pricing & Timeline', page: 'contact' },
    { label: 'Contact Us', page: 'contact' },
  ],
} as const;

export default function Footer({ onNavigate }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const { setCursorStyle } = useCursorStyle();

  return (
    <footer
      ref={footerRef}
      className="relative mt-auto overflow-hidden bg-[#fffaf8] py-20 pb-12 dark:bg-[#0a0a14]"
      onMouseEnter={() => setCursorStyle('nav')}
      onMouseLeave={() => setCursorStyle('default')}
    >
      {/* ── 1. BACKGROUND GRADIENTS ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute -right-[10%] -top-[20%] w-[70%] h-[140%] rounded-full opacity-[0.65] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #FF4800 0%, #ff8c00 100%)' }}
        />
        <div 
          className="absolute -left-[5%] bottom-[-10%] w-[50%] h-[70%] rounded-full opacity-[0.3] blur-[100px]"
          style={{ background: 'radial-gradient(circle, #ffebd5 0%, #FF4800 100%)' }}
        />
      </div>

      {/* ── 2. EXACT EVERLIVE WATERMARK (Solid & Sharp) ── */}
      <div className="absolute inset-0 z-1 flex items-end justify-center px-4 pb-4 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="text-[20vw] font-bold uppercase tracking-tighter"
          style={{ 
            color: 'rgba(15, 23, 42, 0.06)', // Slightly darker for visibility
            fontFamily: 'Inter, sans-serif',
            lineHeight: '0.8',
            marginBottom: '20px',
          }}>
          Straveda
        </span>
      </div>

      {/* ── 3. MAIN CONTENT (High Visibility) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Back to Top */}
        <div className="flex justify-end mb-12">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#0f172a] hover:text-[#FF4800] transition-colors"
          >
            <ArrowUp size={14} strokeWidth={3} /> BACK TO TOP
          </button>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <span className="text-3xl font-black tracking-tighter text-[#0f172a] dark:text-white">
                Str<span className="text-[#FF4800]">a</span>veda
              </span>
              <p className="mt-4 text-[16px] text-[#0f172a] dark:text-gray-300 font-bold leading-snug max-w-[280px]">
                Exceptional value.<br/>Cost-effective solutions.
              </p>
            </div>
            
            <div className="flex gap-4">
               {['LN', 'GH'].map(icon => (
                <div key={icon} className="w-11 h-11 rounded-full border-2 border-[#0f172a]/10 flex items-center justify-center font-black text-[11px] text-[#0f172a] hover:bg-[#FF4800] hover:text-white hover:border-[#FF4800] transition-all cursor-pointer">
                    {icon}
                </div>
               ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="lg:col-span-2 space-y-8">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-[#FF4800]">{title}</h3>
              <ul className="space-y-4">
                {links.map(link => (
                  <li key={link.label}>
                    <button 
                      onClick={() => onNavigate(link.page)}
                      className="text-[15px] font-bold text-[#0f172a] dark:text-gray-200 hover:text-[#FF4800] transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Details */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-[#FF4800]">CONTACT US</h3>
            <div className="space-y-6 text-[15px] font-bold text-[#0f172a] dark:text-gray-200">
                <a href="mailto:hello@straveda.com" className="flex items-center gap-3 group">
                    <Mail size={18} className="text-[#FF4800] shrink-0" />
                    <span className="border-b-2 border-[#0f172a]/10 group-hover:border-[#FF4800] transition-all">hello@straveda.com</span>
                </a>
                <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#FF4800] mt-1 shrink-0" />
                    <span className="leading-tight">Pune, Maharashtra<br/>411001, India</span>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t-2 border-[#0f172a]/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-black text-[#0f172a]/40 uppercase tracking-[0.2em]">
          <p>© 2026 Straveda Tech. All rights reserved.</p>
          <div className="flex gap-10">
            <button className="hover:text-[#FF4800]">Privacy Policy</button>
            <button className="hover:text-[#FF4800]">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}