/**
 * Lead domain model shared between the public website (write) and the admin
 * app (read/manage). Keep this in sync with the identical file in
 * imoveglobal-admin.
 */

export type LeadType = 'myself' | 'institute'

export const LEAD_STATUSES = [
  'new',
  'contacted',
  'qualified',
  'converted',
  'rejected',
] as const

export type LeadStatus = (typeof LEAD_STATUSES)[number]

/** The lead fields captured by the public registration form. */
export interface LeadInput {
  type: LeadType
  name: string
  email: string
  contact: string
  city: string
  state: string
  institute: string
  reason: string
  communicationMode: string
  preferredTime: string
  /** Individual ("myself") only. */
  education?: string
  /** Institute only. */
  designation?: string
  /** Institute only. */
  studentCount?: string
  notes?: string
  terms: boolean
}

/** A lead document as stored in MongoDB (serialized shape sent to clients). */
export interface Lead extends LeadInput {
  _id: string
  status: LeadStatus
  /** Internal notes added by an admin (not from the public form). */
  adminNotes?: string
  source: string
  createdAt: string
  updatedAt: string
  meta?: {
    userAgent?: string
    ip?: string
  }
}

export const COLLECTION = 'leads'

/**
 * Validate and normalize a raw form payload into a clean LeadInput.
 * Returns either the sanitized value or a list of human-readable errors.
 */
export function validateLeadInput(
  body: unknown
): { ok: true; value: LeadInput } | { ok: false; errors: string[] } {
  const errors: string[] = []
  const b = (body ?? {}) as Record<string, unknown>

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

  const type = str(b.type)
  if (type !== 'myself' && type !== 'institute') {
    errors.push('type must be "myself" or "institute"')
  }

  const name = str(b.name)
  if (name.length < 2) errors.push('name is required (min 2 characters)')

  const email = str(b.email)
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    errors.push('a valid email is required')
  }

  const contact = str(b.contact)
  const contactDigits = contact.replace(/[\s\-+]/g, '').replace(/^91/, '')
  if (!/^\d{10}$/.test(contactDigits)) {
    errors.push('a valid 10-digit contact number is required')
  }

  const city = str(b.city)
  if (!city) errors.push('city is required')
  const state = str(b.state)
  if (!state) errors.push('state is required')
  const institute = str(b.institute)
  if (!institute) errors.push('institute is required')
  const reason = str(b.reason)
  if (!reason) errors.push('reason is required')
  const communicationMode = str(b.communicationMode)
  if (!communicationMode) errors.push('communicationMode is required')
  const preferredTime = str(b.preferredTime)
  if (!preferredTime) errors.push('preferredTime is required')

  if (type === 'institute' && !str(b.studentCount)) {
    errors.push('studentCount is required for institute leads')
  }

  if (b.terms !== true) {
    errors.push('terms must be accepted')
  }

  if (errors.length > 0) return { ok: false, errors }

  const value: LeadInput = {
    type: type as LeadType,
    name,
    email,
    contact,
    city,
    state,
    institute,
    reason,
    communicationMode,
    preferredTime,
    terms: true,
  }

  const education = str(b.education)
  const designation = str(b.designation)
  const studentCount = str(b.studentCount)
  const notes = str(b.notes)
  if (type === 'myself' && education) value.education = education
  if (type === 'institute' && designation) value.designation = designation
  if (type === 'institute' && studentCount) value.studentCount = studentCount
  if (notes) value.notes = notes

  return { ok: true, value }
}
