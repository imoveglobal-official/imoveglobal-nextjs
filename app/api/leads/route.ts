import { NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { COLLECTION, validateLeadInput } from '@/lib/leads'

// Leads must hit the database on every request — never cache/prerender.
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Public endpoint the registration form posts to. Validates the payload and
 * stores a new lead in the shared MongoDB collection. The admin app reads from
 * the same collection.
 */
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON body.' },
      { status: 400 }
    )
  }

  const parsed = validateLeadInput(body)
  if (!parsed.ok) {
    return NextResponse.json(
      { success: false, message: 'Validation failed.', errors: parsed.errors },
      { status: 400 }
    )
  }

  const now = new Date()
  const doc = {
    ...parsed.value,
    status: 'new' as const,
    source: 'website',
    createdAt: now,
    updatedAt: now,
    meta: {
      userAgent: request.headers.get('user-agent') ?? undefined,
      ip:
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
        request.headers.get('x-real-ip') ??
        undefined,
    },
  }

  try {
    const db = await getDb()
    const result = await db.collection(COLLECTION).insertOne(doc)
    return NextResponse.json(
      { success: true, message: 'Lead submitted successfully.', id: result.insertedId.toString() },
      { status: 201 }
    )
  } catch (error) {
    console.error('Failed to save lead:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to save your submission. Please try again.' },
      { status: 500 }
    )
  }
}
