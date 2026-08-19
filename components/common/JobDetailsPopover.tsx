'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface JobDetailsPopoverProps {
  isOpen: boolean
  onClose: () => void
}

const JobDetailsPopover = ({ isOpen, onClose }: JobDetailsPopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        ref={popoverRef}
        className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-gray-900/95 p-6 text-gray-300 text-base shadow-2xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close information"
          className="absolute right-3 top-3 text-gray-10 hover:text-white transition-colors"
          onClick={onClose}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-white text-2xl font-semibold mb-4">
          Share Your Resume &amp; Job Details
        </h2>
        <p className="mb-4">
          Please upload your resume and provide the following information to help us process your application:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><span className="font-semibold text-white">Job Title</span></li>
          <li><span className="font-semibold text-white">Qualification</span></li>
          <li><span className="font-semibold text-white">Location</span></li>
          <li><span className="font-semibold text-white">Detailed Responsibilities</span></li>
        </ul>
        <p>
          Once completed, please send the details along with your resume to{' '}
          <a
            href="mailto:info@imoveglobal.org?subject=Job Application - Resume Submission&body=Dear Imoveglobal Team,%0D%0A%0D%0AI am writing to submit my resume for consideration.%0D%0A%0D%0APlease find the following details:%0D%0A%0D%0AJob Title: [Please specify]%0D%0A%0D%0AQualification: [Please specify]%0D%0A%0D%0ALocation: [Please specify]%0D%0A%0D%0ADetailed Responsibilities: [Please provide]%0D%0A%0D%0AI have attached my resume for your review.%0D%0A%0D%0AThank you for your consideration.%0D%0A%0D%0ABest regards,%0D%0A%0D%0A[Your Name]%0D%0A%0D%0A[Your Contact Information]"
            className="text-white hover:text-[var(--color-accent)] transition-colors font-semibold underline"
          >
            info@imoveglobal.org
          </a>.
        </p>
      </div>
    </div>,
    document.body
  )
}

export default JobDetailsPopover
