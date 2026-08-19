/**
 * Form Submission Service
 *
 * Submits registration/lead form data to the app's own `/api/leads` endpoint,
 * which persists it to the shared MongoDB database. The admin app reads leads
 * from that same database.
 */

export type UserType = 'institute' | 'myself'

// Form values are collected from text/select/checkbox inputs; `terms` is a
// boolean, every other field is a string. All optional to match the original
// loose runtime object that starts as `{}`.
export interface RegistrationFormData {
  name?: string
  email?: string
  contact?: string
  city?: string
  state?: string
  institute?: string
  education?: string
  designation?: string
  reason?: string
  communicationMode?: string
  preferredTime?: string
  studentCount?: string
  notes?: string
  terms?: boolean
}

export interface SubmitResult {
  success: boolean
  message: string
  error?: string
}

/**
 * Submit form data to the MongoDB-backed API route.
 */
export const submitForm = async (
  formData: RegistrationFormData,
  userType: UserType
): Promise<SubmitResult> => {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, type: userType }),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      return {
        success: false,
        message:
          (data && data.message) ||
          'Failed to submit form. Please try again or contact support.',
        error: data?.errors ? data.errors.join(', ') : `HTTP ${response.status}`,
      }
    }

    return {
      success: true,
      message: (data && data.message) || 'Form submitted successfully!',
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return {
      success: false,
      message: 'Failed to submit form. Please try again or contact support.',
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

/**
 * The form now posts to a first-party API route, so it is always configured.
 * Kept for backwards compatibility with existing callers.
 */
export const isConfigured = (): boolean => true
