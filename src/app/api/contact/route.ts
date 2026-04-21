import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendContactEmail } from '@/lib/email'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  // Reject non-JSON content types
  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json(
      { error: 'Content-Type must be application/json' },
      { status: 415 }
    )
  }

  try {
    const body = await request.json()
    const { name, company, email, phone, service, message } = body

    // Validate required fields
    if (!name || !company || !email || !service || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!EMAIL_REGEX.test(String(email))) {
      return NextResponse.json(
        { error: 'Invalid email address format' },
        { status: 400 }
      )
    }

    // Sanitize string lengths
    if (
      String(name).length > 200 ||
      String(company).length > 200 ||
      String(email).length > 320 ||
      String(message).length > 5000
    ) {
      return NextResponse.json(
        { error: 'Field value exceeds maximum length' },
        { status: 400 }
      )
    }

    const cleanData = {
      name: String(name).trim(),
      company: String(company).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      service: String(service).trim(),
      message: String(message).trim(),
    }

    // Save to database
    await db.contactSubmission.create({ data: cleanData })

    // Send email notification (non-blocking — don't fail the request if SMTP is misconfigured)
    sendContactEmail(cleanData).catch((err) =>
      console.error('[contact] email error:', err instanceof Error ? err.message : err)
    )

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    // Log error server-side without exposing details
    console.error('[contact] submission error:', error instanceof Error ? error.message : 'unknown')
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
