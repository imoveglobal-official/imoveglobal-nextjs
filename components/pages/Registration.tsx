'use client'

import { useState } from 'react'
import type { RegistrationFormData } from '@/services/formSubmission'
import ForMyselfForm from '@/components/forms/ForMyselfForm'
import ForInstituteForm from '@/components/forms/ForInstituteForm'
import StepTwo from '@/components/forms/StepTwo'

const Registration = () => {
  const [activeTab, setActiveTab] = useState<'myself' | 'institute'>('myself')
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<RegistrationFormData>({})
  const [showTermsInfo, setShowTermsInfo] = useState(false)

  const handleNext = () => {
    setCurrentStep(2)
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleTabChange = (tab: 'myself' | 'institute') => {
    setActiveTab(tab)
    setCurrentStep(1)
    setFormData({})
  }

  const handleTermsClick = (event: React.MouseEvent) => {
    event.preventDefault()
    setShowTermsInfo((prev) => !prev)
  }

  return (
    <section id="registration" className="max-w-2xl mx-auto mt-8 scroll-mt-20">
      {/* Title Section */}
      <div className="text-center mb-10 animate-fadeIn">
        <h1 className="text-[28px] md:text-[44px] font-bold text-white mb-4 tracking-tight">
          Collaborate with{' '}
          <span className="bg-theme-gradient-text">
            Imoveglobal
          </span>
        </h1>
        <p className="text-gray-10 text-lg">
          Join our partnership program and grow together
        </p>
      </div>

      {/* Form Card */}
      <div className="glass-card p-6 sm:p-8 md:p-10 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div style={{ color: currentStep === 1 ? 'var(--color-accent)' : '#6b7280' }} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep === 1
                ? 'text-white'
                : 'bg-gray-700 text-gray-10'
                }`}
              style={currentStep === 1 ? { background: 'var(--gradient-primary)' } : {}}
            >
              1
            </div>
            <span className="hidden sm:inline text-sm font-medium">Details</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-700">
            <div
              className={`h-full transition-all duration-500 ${currentStep === 2 ? 'w-full' : 'w-0'
                }`}
              style={{ backgroundColor: 'var(--color-primary)' }}
            ></div>
          </div>
          <div style={{ color: currentStep === 2 ? 'var(--color-accent)' : '#6b7280' }} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep === 2
                ? 'text-white'
                : 'bg-gray-700 text-gray-10'
                }`}
              style={currentStep === 2 ? { background: 'var(--gradient-primary)' } : {}}
            >
              2
            </div>
            <span className="hidden sm:inline text-sm font-medium">Availability</span>
          </div>
        </div>

        {/* Tab Navigation - Only show on Step 1 */}
        {currentStep === 1 && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-[rgba(255,255,255,0.05)] rounded-full p-1">
              <button
                onClick={() => handleTabChange('myself')}
                className={`tab-button flex items-center gap-2 ${activeTab === 'myself' ? 'active' : ''}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                For myself
              </button>
              <button
                onClick={() => handleTabChange('institute')}
                className={`tab-button flex items-center gap-2 ${activeTab === 'institute' ? 'active' : ''}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                For my Institute
              </button>
            </div>
          </div>
        )}

        {/* Form Content */}
        {currentStep === 1 ? (
          activeTab === 'myself' ? (
            <ForMyselfForm
              onNext={handleNext}
              formData={formData}
              setFormData={setFormData}
              onTermsClick={handleTermsClick}
            />
          ) : (
            <ForInstituteForm
              onNext={handleNext}
              formData={formData}
              setFormData={setFormData}
              onTermsClick={handleTermsClick}
            />
          )
        ) : (
          <StepTwo
            onBack={handleBack}
            formData={formData}
            setFormData={setFormData}
            userType={activeTab}
          />
        )}
      </div>
      {showTermsInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setShowTermsInfo(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-gray-900/95 p-6 text-gray-300 text-base shadow-2xl animate-fadeIn"
            id="footer-note"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close terms information"
              className="absolute right-3 top-3 text-gray-10 hover:text-white transition-colors"
              onClick={() => setShowTermsInfo(false)}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-white text-2xl font-semibold mb-4">
              Terms & Conditions
            </h2>
            <p className="mb-4">
              1. Any Information shared will be trated as confidential and used soley for the purpose of responding to your enquiry, in accordance with our Privacy Policy.
            </p>
            <p>
              2. While we aim to respond promptly, submission of an enquiry does not guarantee a response within a specific timeframe. We appreciate your patience and will do our best to get back to you as soon as possible.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Registration
