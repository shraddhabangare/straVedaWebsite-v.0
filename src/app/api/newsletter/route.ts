import { NextResponse } from 'next/server'
import { z } from 'zod'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = newsletterSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.issues[0]?.message || 'Invalid input' },
        { status: 400 }
      )
    }

    const { email } = result.data

    // Simulate check for already subscribed (test@example.com as example)
    if (email === 'test@example.com') {
      return NextResponse.json(
        { success: false, message: 'This email is already subscribed.' },
        { status: 409 }
      )
    }

    // Log the email (in production, save to database)
    console.log('Newsletter subscription:', email)

    return NextResponse.json(
      { success: true, message: 'Subscribed!' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process request' },
      { status: 500 }
    )
  }
}
