'use client'

import { useState } from 'react'
import { submitForm, isConfigured, type RegistrationFormData, type UserType } from '@/services/formSubmission'

interface StepTwoProps {
  onBack: () => void
  formData: RegistrationFormData
  setFormData: React.Dispatch<React.SetStateAction<RegistrationFormData>>
  userType: UserType
}

const StepTwo = ({ onBack, formData, setFormData, userType }: StepTwoProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null) // 'success' | 'error' | null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }) as RegistrationFormData)

    // Clear error when user makes selection
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const timeSlots = [
    'Select preferred time',
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ]

  const studentCounts = [
    'Select approximate count',
    '1 - 10 students',
    '11 - 25 students',
    '26 - 50 students',
    '51 - 100 students',
    '101 - 250 students',
    '251 - 500 students',
    '500+ students'
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.communicationMode) {
      newErrors.communicationMode = 'Please select a mode of communication'
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select your preferred time'
    }

    if (userType === 'institute' && !formData.studentCount) {
      newErrors.studentCount = 'Please select approximate student count'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    // Check if Google Apps Script is configured
    if (!isConfigured()) {
      alert('Form submission is not configured yet. Please contact the administrator.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const result = await submitForm(formData, userType)

      if (result.success) {
        setSubmitStatus('success')
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({})
          onBack() // Go back to step 1
        }, 3000)
      } else {
        setSubmitStatus('error')
        console.error('Submission failed:', result.error)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Availability Details</h3>
        <p className="text-sm text-gray-10">Help us schedule a call with you</p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm text-gray-10 mb-2">Mode of Communication *</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="communicationMode"
                value="phone"
                checked={formData.communicationMode === 'phone'}
                onChange={handleChange}
                className="w-5 h-5 accent-purple-500"
              />
              <span className="flex items-center gap-2 text-gray-300 group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone Call
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="communicationMode"
                value="email"
                checked={formData.communicationMode === 'email'}
                onChange={handleChange}
                className="w-5 h-5 accent-purple-500"
              />
              <span className="flex items-center gap-2 text-gray-300 group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </span>
            </label>
          </div>
          {errors.communicationMode && (
            <p className="text-red-400 text-xs mt-1">{errors.communicationMode}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-10 mb-2">Preferred Time of Call *</label>
          <select
            name="preferredTime"
            value={formData.preferredTime || ''}
            onChange={handleChange}
            className={`select-field ${errors.preferredTime ? 'border-red-500' : ''}`}
          >
            {timeSlots.map((slot) => (
              <option key={slot} value={slot === 'Select preferred time' ? '' : slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p className="text-red-400 text-xs mt-1">{errors.preferredTime}</p>
          )}
        </div>

        {userType === 'institute' && (
          <div>
            <label className="block text-sm text-gray-10 mb-2">
              How many students will approximately be registering from your institute? *
            </label>
            <select
              name="studentCount"
              value={formData.studentCount || ''}
              onChange={handleChange}
              className={`select-field ${errors.studentCount ? 'border-red-500' : ''}`}
            >
              {studentCounts.map((count) => (
                <option key={count} value={count === 'Select approximate count' ? '' : count}>
                  {count}
                </option>
              ))}
            </select>
            {errors.studentCount && (
              <p className="text-red-400 text-xs mt-1">{errors.studentCount}</p>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-10 mb-2">Additional Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes || ''}
            onChange={handleChange}
            placeholder="Any specific requirements or questions..."
            className="input-field min-h-[100px] resize-none"
            rows={3}
          />
        </div>
      </div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg animate-fadeIn">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-green-400 font-medium">Form submitted successfully!</p>
              <p className="text-green-300/80 text-sm mt-1">We will contact you soon. Redirecting...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg animate-fadeIn">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-red-400 font-medium">Submission failed</p>
              <p className="text-red-300/80 text-sm mt-1">Please try again or contact support if the problem persists.</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 py-3 px-6 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || submitStatus === 'success'}
          className="btn-gradient flex-1 py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : submitStatus === 'success' ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Submitted!
            </>
          ) : (
            <>
              Submit Application
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default StepTwo
