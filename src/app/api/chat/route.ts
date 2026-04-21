import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledge, SITE_SUMMARY } from '@/lib/site-knowledge';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  message: string;
  history?: ChatMessage[];
}

const XAI_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const XAI_MODEL = 'llama-3.3-70b-versatile';

async function callGrok(
  userMessage: string,
  history: ChatMessage[],
  localContext: string | null,
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured.');
  }

  const systemContent = [
    'You are the Straveda Assistant — a helpful, concise AI for the Straveda website.',
    'Always be friendly and professional. Keep answers short (2–4 sentences unless a list is better).',
    'Use the following site data if relevant, otherwise answer generally.',
    '',
    '--- SITE DATA ---',
    SITE_SUMMARY,
    localContext ? `\n--- RELEVANT KNOWLEDGE ---\n${localContext}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const messages: ChatMessage[] = [
    { role: 'system', content: systemContent },
    // Keep last 6 turns to stay within token budget
    ...history.slice(-6),
    { role: 'user', content: userMessage },
  ];

  const res = await fetch(XAI_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: XAI_MODEL,
      messages,
      max_tokens: 512,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`xAI API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }

    const trimmed = message.trim();

    // ── Step A: Search local knowledge base ─────────────────────────────
    const localHit = searchKnowledge(trimmed);

    if (localHit) {
      // High-confidence local match — return directly without calling Grok
      // Wrap in a light assistant-style framing
      const reply = localHit;
      return NextResponse.json({ reply, source: 'local' });
    }

    // ── Step B: Fallback to Grok with injected site context ─────────────
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        reply:
          "I don't have a specific answer for that right now. Please reach out to us at **hello@straveda.com** or use the Contact page — we reply within one business day.",
        source: 'fallback',
      });
    }

    const reply = await callGrok(trimmed, history, localHit);
    return NextResponse.json({ reply, source: 'grok' });
  } catch (err) {
    console.error('[/api/chat]', err);
    return NextResponse.json(
      {
        reply:
          'Something went wrong on my end. Please try again or contact us at **hello@straveda.com**.',
        source: 'error',
      },
      { status: 500 },
    );
  }
}
