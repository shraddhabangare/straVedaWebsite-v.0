import { NextResponse } from 'next/server'
import { sendCareerEmail } from '@/lib/email'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_RESUME_BYTES = 5 * 1024 * 1024 // 5 MB

export async function POST(request: Request) {
  try {
    const form = await request.formData()

    const name      = String(form.get('name') ?? '').trim()
    const email     = String(form.get('email') ?? '').trim().toLowerCase()
    const phone     = String(form.get('phone') ?? '').trim()
    const role      = String(form.get('role') ?? '').trim()
    const linkedin  = String(form.get('linkedin') ?? '').trim()
    const portfolio = String(form.get('portfolio') ?? '').trim()
    const whyJoin   = String(form.get('whyJoin') ?? '').trim()
    const resume    = form.get('resume') as File | null

    // Required field validation
    if (!name || !email || !role || !whyJoin || !resume) {
      return NextResponse.json(
        { error: 'Name, email, role, why-join, and resume are required.' },
        { status: 400 }
      )
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: 'Resume must be under 5 MB.' }, { status: 400 })
    }

    if (!resume.type.includes('pdf')) {
      return NextResponse.json({ error: 'Resume must be a PDF file.' }, { status: 400 })
    }

    const resumeBuffer = Buffer.from(await resume.arrayBuffer())

    // Send email (team notification + applicant auto-reply)
    await sendCareerEmail(
      { role, name, email, phone, linkedin, portfolio, whyJoin, resumeName: resume.name },
      resumeBuffer
    )

    return NextResponse.json({ success: true, message: 'Application submitted successfully.' })
  } catch (error) {
    console.error('[careers] submission error:', error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Failed to process application.' }, { status: 500 })
  }
}
