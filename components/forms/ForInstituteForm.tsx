'use client'

import { useState } from 'react'
import type { RegistrationFormData } from '@/services/formSubmission'

interface ForInstituteFormProps {
  onNext: () => void
  formData: RegistrationFormData
  setFormData: React.Dispatch<React.SetStateAction<RegistrationFormData>>
  onTermsClick: (event: React.MouseEvent) => void
}

const ForInstituteForm = ({ onNext, formData, setFormData, onTermsClick }: ForInstituteFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }) as RegistrationFormData)

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    validateField(field, formData[field as keyof RegistrationFormData] as string | undefined)
  }

  const validateField = (field: string, value: string | undefined) => {
    let error = ''

    switch (field) {
      case 'name':
        if (!value || value.trim() === '') {
          error = 'Your name is required'
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters'
        }
        break

      case 'email':
        if (!value || value.trim() === '') {
          error = 'Email is required'
        } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())) {
          error = 'Please enter a valid official email address'
        }
        break

      case 'contact':
        if (!value || value.trim() === '') {
          error = 'Contact number is required'
        } else {
          // Remove all spaces, hyphens, and +91 prefix
          const cleanedNumber = value.replace(/[\s-]/g, '').replace(/^\+?91/, '')
          if (!/^\d{10}$/.test(cleanedNumber)) {
            error = 'Please enter a valid 10-digit mobile number.'
          }
        }
        break

      case 'city':
        if (!value || value.trim() === '') {
          error = 'City is required'
        }
        break

      case 'state':
        if (!value || value === '') {
          error = 'Please select a state'
        }
        break

      case 'institute':
        if (!value || value.trim() === '') {
          error = 'Institute name is required'
        }
        break

      case 'designation':
        if (!value || value === '') {
          error = 'Please select your designation'
        }
        break

      case 'reason':
        if (!value || value.trim() === '') {
          error = 'Please provide a reason for partnership'
        } else if (value.trim().length < 10) {
          error = 'Please provide at least 10 characters'
        }
        break
    }

    setErrors(prev => ({ ...prev, [field]: error }))
    return error === ''
  }

  const validateForm = () => {
    const fields = ['name', 'email', 'contact', 'city', 'state', 'institute', 'designation', 'reason']
    let isValid = true
    const newErrors: Record<string, string> = {}

    fields.forEach(field => {
      if (!validateField(field, formData[field as keyof RegistrationFormData] as string | undefined)) {
        isValid = false
      }
    })

    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions'
      isValid = false
    }

    setErrors(prev => ({ ...prev, ...newErrors }))
    setTouched(fields.reduce<Record<string, boolean>>((acc, field) => ({ ...acc, [field]: true }), { terms: true }))

    return isValid
  }

  const handleClear = () => {
    setFormData({})
    setErrors({})
    setTouched({})
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  const designations = [
    'Select Designation',
    'Principal',
    'Vice Principal',
    'Dean',
    'HOD',
    'Professor',
    'Associate Professor',
    'Assistant Professor',
    'Lecturer',
    'Training & Placement Officer',
    'Administrator',
    'Other'
  ]

  const indianStates = [
    'Select State',
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Other'
  ]

  return (
    <div className="animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-10 mb-2">Your Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('name')}
            placeholder="Enter your full name"
            className={`input-field ${touched.name && errors.name ? 'border-red-500' : ''}`}
          />
          {touched.name && errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-10 mb-2">Official Email *</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              placeholder="official@institute.edu"
              className={`input-field pr-12 ${touched.email && errors.email ? 'border-red-500' : ''}`}
            />
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          {touched.email && errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-10 mb-2">Contact Number *</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('contact')}
            placeholder="+91 XXXXX XXXXX"
            className={`input-field ${touched.contact && errors.contact ? 'border-red-500' : ''}`}
          />
          {touched.contact && errors.contact && (
            <p className="text-red-400 text-xs mt-1">{errors.contact}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-10 mb-2">City *</label>
          <input
            type="text"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('city')}
            placeholder="Institute city"
            className={`input-field ${touched.city && errors.city ? 'border-red-500' : ''}`}
          />
          {touched.city && errors.city && (
            <p className="text-red-400 text-xs mt-1">{errors.city}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-10 mb-2">State *</label>
          <select
            name="state"
            value={formData.state || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('state')}
            className={`select-field ${touched.state && errors.state ? 'border-red-500' : ''}`}
          >
            {indianStates.map((state) => (
              <option key={state} value={state === 'Select State' ? '' : state}>
                {state}
              </option>
            ))}
          </select>
          {touched.state && errors.state && (
            <p className="text-red-400 text-xs mt-1">{errors.state}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-10 mb-2">Institute Name *</label>
          <input
            type="text"
            name="institute"
            value={formData.institute || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('institute')}
            placeholder="Official institute name"
            className={`input-field ${touched.institute && errors.institute ? 'border-red-500' : ''}`}
          />
          {touched.institute && errors.institute && (
            <p className="text-red-400 text-xs mt-1">{errors.institute}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-10 mb-2">Your Designation *</label>
          <select
            name="designation"
            value={formData.designation || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('designation')}
            className={`select-field ${touched.designation && errors.designation ? 'border-red-500' : ''}`}
          >
            {designations.map((designation) => (
              <option key={designation} value={designation === 'Select Designation' ? '' : designation}>
                {designation}
              </option>
            ))}
          </select>
          {touched.designation && errors.designation && (
            <p className="text-red-400 text-xs mt-1">{errors.designation}</p>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-10 mb-2">Reason for Partnership *</label>
          <input
            type="text"
            name="reason"
            value={formData.reason || ''}
            onChange={handleChange}
            onBlur={() => handleBlur('reason')}
            placeholder="Why do you want to partner?"
            className={`input-field ${touched.reason && errors.reason ? 'border-red-500' : ''}`}
          />
          {touched.reason && errors.reason && (
            <p className="text-red-400 text-xs mt-1">{errors.reason}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6 mb-6">
        <input
          type="checkbox"
          name="terms"
          id="instituteTerms"
          checked={formData.terms || false}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, terms: e.target.checked }))
            if (errors.terms) {
              setErrors(prev => ({ ...prev, terms: '' }))
            }
          }}
          className="custom-checkbox mt-1 shrink-0"
        />
        <label htmlFor="instituteTerms" className="text-sm text-gray-10 cursor-pointer">
          I acknowledge and agree to the{' '}
          <a
            href="#footer-note"
            onClick={onTermsClick}
            style={{ color: 'var(--color-accent)' }}
            className="hover:opacity-80 underline transition-opacity"
          >
            Terms & Conditions
          </a>
        </label>
      </div>
      {errors.terms && (
        <p className="text-red-400 text-xs mt-1 -mt-4 mb-4">{errors.terms}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          type="button"
          onClick={handleClear}
          className="flex-1 py-3 px-6 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="btn-gradient flex-1"
        >
          Next step
        </button>
      </div>
    </div>
  )
}

export default ForInstituteForm
