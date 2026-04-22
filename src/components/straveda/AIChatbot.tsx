'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  source?: 'local' | 'grok' | 'fallback' | 'error';
}

const ORANGE = '#FF4800';
const BRAND_BG_LIGHT = 'rgba(255,255,255,0.96)';
const BRAND_BG_DARK = 'rgba(13,13,26,0.97)';

const SUGGESTED = [
  'What services do you offer?',
  'How much does it cost?',
  'How do I get started?',
  'How long does a project take?',
];

function TypingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', padding: '4px 0' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: ORANGE,
            display: 'inline-block',
            animation: `stravedaDot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes stravedaDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1;   }
        }
      `}</style>
    </span>
  );
}

interface AIChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  isDark: boolean;
}

export default function AIChatbot({ isOpen, onToggle, isDark }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm the **Straveda Assistant**. Ask me anything about our services, pricing, or how to get started.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const bg = isDark ? BRAND_BG_DARK : BRAND_BG_LIGHT;
  const textPrimary = isDark ? '#f0f0f5' : '#1a1a2e';
  const textMuted = isDark ? '#9ca3af' : '#6b7280';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
  const userBubble = isDark ? 'rgba(255,72,0,0.18)' : 'rgba(255,72,0,0.09)';
  const botBubble = isDark ? 'rgba(255,255,255,0.05)' : '#f5f5f0';
  const inputBg = isDark ? 'rgba(255,255,255,0.05)' : '#f9f9f9';

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const el = messagesRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }, 80);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = { id: Date.now().toString(), role: 'user', content: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setLoading(true);

      try {
        const history = messages
          .filter((m) => m.id !== 'welcome')
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, history }),
        });

        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + '-bot',
            role: 'assistant',
            content: data.reply ?? 'Sorry, something went wrong.',
            source: data.source,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + '-err',
            role: 'assistant',
            content: 'Network error — please try again or email **hello@straveda.com**.',
            source: 'error',
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages],
  );

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  // ── Toggle button ────────────────────────────────────────────────────────
  const toggleBtn = (
    <button
      onClick={onToggle}
      aria-label={isOpen ? 'Close assistant' : 'Open Straveda Assistant'}
      title="Straveda Assistant"
      style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        width:          52,
        height:         52,
        borderRadius:   '50%',
        background:     ORANGE,
        boxShadow:      isOpen
          ? '0 0 0 3px rgba(255,72,0,0.25), 0 4px 20px rgba(255,72,0,0.4)'
          : '0 4px 20px rgba(255,72,0,0.4)',
        transition:     'transform 0.2s ease, box-shadow 0.2s ease',
        border:         'none',
        cursor:         'pointer',
        flexShrink:     0,
        position:       'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {isOpen ? (
        /* X icon */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      ) : (
        /* AI Bot icon */
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8" width="18" height="11" rx="3"/>
          <circle cx="8.5" cy="13.5" r="1.5" fill="white" stroke="none"/>
          <circle cx="15.5" cy="13.5" r="1.5" fill="white" stroke="none"/>
          <path d="M12 3v5"/>
          <circle cx="12" cy="2.5" r="1" fill="white" stroke="none"/>
          <path d="M9 19v2M15 19v2"/>
        </svg>
      )}
      {/* Unread dot — show only when closed */}
      {!isOpen && (
        <span
          style={{
            position:   'absolute',
            top:        6,
            right:      6,
            width:      10,
            height:     10,
            borderRadius: '50%',
            background: '#ffffff',
            border:     `2px solid ${ORANGE}`,
          }}
        />
      )}
    </button>
  );

  // ── Chat panel ───────────────────────────────────────────────────────────
  const panel = (
    <div
      role="dialog"
      aria-label="Straveda AI Assistant"
      style={{
        position:     'absolute',
        bottom:       '100%',
        right:        0,
        marginBottom: 12,
        width:        'min(360px, calc(100vw - 48px))',
        maxHeight:    '70vh',
        borderRadius: 16,
        background:   bg,
        border:       `1px solid ${borderColor}`,
        boxShadow:    isDark
          ? '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,72,0,0.1)'
          : '0 24px 64px rgba(0,0,0,0.14), 0 0 0 1px rgba(255,72,0,0.08)',
        backdropFilter:       'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display:      'flex',
        flexDirection:'column',
        overflow:     'hidden',
        transformOrigin: 'bottom right',
        animation:    'stravedaSlideUp 0.22s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <style>{`
        @keyframes stravedaSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          display:      'flex',
          alignItems:   'center',
          gap:          10,
          padding:      '14px 16px',
          borderBottom: `1px solid ${borderColor}`,
          flexShrink:   0,
        }}
      >
        <div
          style={{
            width:          34,
            height:         34,
            borderRadius:   '50%',
            background:     ORANGE,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="11" rx="3"/>
            <circle cx="8.5" cy="13.5" r="1.2" fill="white" stroke="none"/>
            <circle cx="15.5" cy="13.5" r="1.2" fill="white" stroke="none"/>
            <path d="M12 3v5"/>
            <circle cx="12" cy="2.5" r="1" fill="white" stroke="none"/>
          </svg>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: textPrimary, lineHeight: 1.2 }}>
            Straveda Assistant
          </p>
          <p style={{ fontSize: 11, color: textMuted }}>
            Usually instant
          </p>
        </div>
        <button
          onClick={onToggle}
          aria-label="Close"
          style={{
            marginLeft:     'auto',
            background:     'none',
            border:         'none',
            cursor:         'pointer',
            color:          textMuted,
            display:        'flex',
            padding:        4,
            borderRadius:   6,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div
        ref={messagesRef}
        className="chatbot-messages"
        onWheel={(e) => e.stopPropagation()}
        style={{
          flex:             1,
          minHeight:        0,
          overflowY:        'scroll',
          overscrollBehavior: 'contain',
          padding:          '12px 14px',
          display:          'flex',
          flexDirection:    'column',
          gap:              10,
          scrollBehavior:   'smooth',
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display:       'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth:     '82%',
                padding:      '9px 13px',
                borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background:   msg.role === 'user' ? userBubble : botBubble,
                fontSize:     13,
                lineHeight:   1.6,
                color:        textPrimary,
                border:       msg.role === 'user'
                  ? `1px solid rgba(255,72,0,0.2)`
                  : `1px solid ${borderColor}`,
              }}
            >
              {msg.role === 'assistant' ? (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p style={{ margin: '4px 0', color: textPrimary }}>{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong style={{ color: ORANGE, fontWeight: 600 }}>{children}</strong>
                    ),
                    ul: ({ children }) => (
                      <ul style={{ paddingLeft: 16, margin: '6px 0', color: textPrimary }}>{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol style={{ paddingLeft: 16, margin: '6px 0', color: textPrimary }}>{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li style={{ marginBottom: 3, color: textPrimary }}>{children}</li>
                    ),
                    hr: () => (
                      <hr style={{ border: 'none', borderTop: `1px solid ${borderColor}`, margin: '8px 0' }} />
                    ),
                    a: ({ href, children }) => (
                      <a href={href} style={{ color: ORANGE, textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">{children}</a>
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                <span>{msg.content}</span>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div
              style={{
                padding:      '10px 14px',
                borderRadius: '14px 14px 14px 4px',
                background:   botBubble,
                border:       `1px solid ${borderColor}`,
              }}
            >
              <TypingDots />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts — shown only when no user message yet */}
      {messages.length === 1 && (
        <div
          style={{
            padding:  '8px 14px',
            display:  'flex',
            flexWrap: 'wrap',
            gap:      6,
            borderTop: `1px solid ${borderColor}`,
          }}
        >
          {SUGGESTED.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              style={{
                fontSize:     11,
                padding:      '5px 10px',
                borderRadius: 20,
                border:       `1px solid rgba(255,72,0,0.3)`,
                background:   'transparent',
                color:        ORANGE,
                cursor:       'pointer',
                transition:   'background 0.15s ease',
                fontFamily:   'inherit',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,72,0,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div
        style={{
          display:    'flex',
          gap:        8,
          padding:    '10px 12px',
          borderTop:  `1px solid ${borderColor}`,
          flexShrink: 0,
        }}
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask me anything…"
          rows={1}
          disabled={loading}
          style={{
            flex:        1,
            resize:      'none',
            border:      `1px solid ${borderColor}`,
            borderRadius: 10,
            padding:     '8px 12px',
            fontSize:    13,
            fontFamily:  'var(--font-geist-sans), sans-serif',
            background:  inputBg,
            color:       textPrimary,
            outline:     'none',
            lineHeight:  1.5,
            maxHeight:   80,
            overflowY:   'auto',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = ORANGE;
            e.currentTarget.style.boxShadow = `0 0 0 2px rgba(255,72,0,0.15)`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = borderColor;
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <button
          onClick={() => send(input)}
          disabled={loading || !input.trim()}
          aria-label="Send message"
          style={{
            width:          38,
            height:         38,
            borderRadius:   10,
            background:     input.trim() ? ORANGE : 'rgba(255,72,0,0.2)',
            border:         'none',
            cursor:         input.trim() ? 'pointer' : 'default',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexShrink:     0,
            alignSelf:      'flex-end',
            transition:     'background 0.15s ease',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>

      {/* Footer */}
      <p
        style={{
          textAlign:  'center',
          fontSize:   10,
          color:      textMuted,
          padding:    '4px 12px 8px',
          flexShrink: 0,
        }}
      >
        Str<span style={{ color: ORANGE }}>a</span>veda AI
      </p>
    </div>
  );

  return (
    <div style={{ position: 'relative' }}>
      {isOpen && panel}
      {toggleBtn}
    </div>
  );
}
