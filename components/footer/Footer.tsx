'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import JobDetailsPopover from '@/components/common/JobDetailsPopover'

const Footer = () => {
  const router = useRouter()
  const [showCareerPopup, setShowCareerPopup] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigation = (path: string) => {
    router.push(path)
    scrollToTop()
  }

  const scrollToCourseModule = (moduleId: string) => {
    // Navigate to home page first
    router.push('/')

    // Wait for navigation to complete, then scroll to the module
    setTimeout(() => {
      const moduleSection = document.querySelector(`[data-module-id="${moduleId}"]`)
      if (moduleSection) {
        moduleSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <>
      <footer className="w-full mt-8">
        <div className="p-6 md:p-8 lg:p-10" style={{
          background: 'rgba(26, 42, 62, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(56, 189, 248, 0.15)',
          borderRadius: '0'
        }}>
          <div className="max-w-7xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-6">
              {/* Brand & Contact Info */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <img src="/logo.png" alt="Logo" className="h-6 w-6" />

                    <h3 className="text-xl font-bold text-white">Imove<span className="bg-theme-gradient-text">global</span></h3>
                  </div>
                </div>

                <div>
                  <h4 className="bg-theme-gradient-text font-bold mb-2 text-md">Contact</h4>
                  <div className="space-y-1.5">
                    <a href="mailto:info@imoveglobal.org" className="text-gray-10 hover:text-white transition-colors flex items-start gap-2 text-sm group">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>info@imoveglobal.org</span>
                    </a>
                    <a href="mailto:Ceo@imoveglobal.org" className="text-gray-10 hover:text-white transition-colors flex items-start gap-2 text-sm group">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Ceo@imoveglobal.org</span>
                    </a>
                    <a href="tel:+919639599700" className="text-gray-10 hover:text-white transition-colors flex items-start gap-2 text-sm group">
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>+91-9639599700</span>
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="bg-theme-gradient-text font-bold mb-2 text-md">Address:</h4>
                  <p className="text-gray-10 text-sm leading-relaxed">
                    4th Floor, Imoveglobal Pvt. Ltd.<br />
                    3, Ashirwad Enclave,<br />
                    Beside HDFC Bank Ballupur,<br />
                    Dehradun, 248007<br />
                    India
                  </p>
                </div>

                <div>
                  <h4 className="bg-theme-gradient-text font-bold mb-2 text-md">Registered Number:</h4>
                  <p className="text-gray-10 text-sm">
                    CIN- U85499UT2026PTC020623
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="bg-theme-gradient-text font-bold mb-2 text-md">Quick Links</h4>
                <div>
                  <ul className="space-y-1.5 text-sm">
                    <li>
                      <button
                        onClick={() => scrollToCourseModule('1')}
                        className="text-gray-10 hover:text-white transition-colors hover:underline"
                      >
                        EGPT Primary
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToCourseModule('2')}
                        className="text-gray-10 hover:text-white transition-colors hover:underline"
                      >
                        EGPT Junior
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToCourseModule('3')}
                        className="text-gray-10 hover:text-white transition-colors hover:underline"
                      >
                        EGPT Senior
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToCourseModule('4')}
                        className="text-gray-10 hover:text-white transition-colors hover:underline"
                      >
                        EGPT Unite
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToCourseModule('5')}
                        className="text-gray-10 hover:text-white transition-colors hover:underline"
                      >
                        EGPT Braille
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Other & Career */}
              <div>
                <h4 className="bg-theme-gradient-text font-bold mb-2 text-md">Other</h4>
                <ul className="space-y-1.5 text-sm">
                  <li className="relative">
                    <button
                      onClick={() => setShowCareerPopup((prev) => !prev)}
                      className="text-gray-10 hover:text-white transition-colors hover:underline"
                    >
                      Career
                    </button>

                    {/* Inline Popover - appears above or absolute relative to the button */}
                    <JobDetailsPopover
                      isOpen={showCareerPopup}
                      onClose={() => setShowCareerPopup(false)}
                    />
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation('/commitments')}
                      className="text-gray-10 hover:text-white transition-colors hover:underline"
                    >
                      Our Commitments
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation('/news-and-blogs')}
                      className="text-gray-10 hover:text-white transition-colors hover:underline"
                    >
                      News & Blogs
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigation('/faqs')}
                      className="text-gray-10 hover:text-white transition-colors hover:underline"
                    >
                      FAQs
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-center items-center">
                <p className="text-gray-500 text-sm text-center">
                  © 2026 Imoveglobal Pvt. Ltd. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
