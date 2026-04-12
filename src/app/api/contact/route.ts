import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
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

    // Save to database
    await db.contactSubmission.create({
      data: { name, company, email, phone: phone || '', service, message }
    })

    // Keep console.log as backup
    console.log('Contact form submission:', { name, company, email, phone, service, message })

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
