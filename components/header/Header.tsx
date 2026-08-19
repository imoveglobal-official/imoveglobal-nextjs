'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useContent } from '@/context/ContentContext'
import JobDetailsPopover from '@/components/common/JobDetailsPopover'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [examsDropdownOpen, setExamsDropdownOpen] = useState(false)
  const [showHelpPopup, setShowHelpPopup] = useState(false)
  const { brand, navigation, cta } = useContent()
  const router = useRouter()
  const pathname = usePathname()
  const examsDropdownRef = useRef<HTMLDivElement>(null)

  const navLinks = navigation || []

  // Exam details data
  const examDetails = {
    toefl: {
      title: 'TOEFL EXAM DETAILS',
      items: [
        { text: 'TOEFL Exam Registration', sectionId: 'toefl-registration' },
        { text: 'TOEFL Exam Eligibility', sectionId: 'toefl-eligibility' },
        { text: 'TOEFL Exam Pattern', sectionId: 'toefl-pattern' },
        { text: 'TOEFL Exam Fees', sectionId: 'toefl-fees' },
        { text: 'Preparation for TOEFL', sectionId: 'toefl-preparation' },
      ],
    },
    ielts: {
      title: 'IELTS EXAM DETAILS',
      items: [
        { text: 'IELTS Exam Registration', sectionId: 'ielts-registration' },
        { text: 'IELTS Exam Exam Eligibility', sectionId: 'ielts-eligibility' },
        { text: 'IELTS Exam Pattern', sectionId: 'ielts-pattern' },
        { text: 'IELTS Exam Fees', sectionId: 'ielts-fees' },
        { text: 'Preparation for IELTS', sectionId: 'ielts-preparation' },
      ],
    },
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (examsDropdownRef.current && !examsDropdownRef.current.contains(event.target as Node)) {
        setExamsDropdownOpen(false)
      }
    }

    if (examsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [examsDropdownOpen])

  // Map navigation keys to route paths
  const routeMap: Record<string, string> = {
    'home': '/',
    'exams': '/exams',
    'study': '/study-abroad',
    'scholarships': '/scholarships',
    'reviews': '/reviews',
    'more': '/#course-modules',
    'course-modules': '/course-modules',
    'career-boost': '/career-boost',
    'course-overview': '/course-overview',
    'community': '/community',
    'registration': '/registration',
    'newsandblogs': '/news-and-blogs',
  }

  const handleNavClick = (key: string) => {
    // Special handling for 'more' to scroll to first course module
    if (key === 'more') {
      router.push('/')
      setMobileMenuOpen(false)
      setTimeout(() => {
        // Scroll to the first course module specifically
        const firstModule = document.querySelector('[data-module-id="1"]')
        if (firstModule) {
          firstModule.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          // Fallback to course modules section if module not found
          const courseModulesSection = document.getElementById('course-modules')
          if (courseModulesSection) {
            courseModulesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      }, 100)
      return
    }

    const path = routeMap[key] || '/'
    router.push(path)
    setMobileMenuOpen(false)
  }

  // Navigate to Exams page with specific section
  const handleExamSectionClick = (sectionId: string) => {
    router.push(`/exams?section=${sectionId}`)
    setExamsDropdownOpen(false)
    setMobileMenuOpen(false)
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // If already on home page, scroll to top
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Navigate to home page from other routes
      router.push('/')
    }
  }

  // Check if a navigation item is active based on current route
  const isActive = (key: string) => {
    const path = routeMap[key] || '/'
    return pathname === path
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg">
      <div className="max-w-full mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left - Logo + Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <a
              href="/"
              onClick={handleLogoClick}
              className=" logo-wave flex items-center gap-2 group"
            >
              <div
                className="logo-icon w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
              >
                <img src="/logo.png" alt="Logo" />
              </div>
              <span style={{ color: 'var(--color-accent)' }} className="logo-text text-2xl font-bold tracking-tight">
                {(brand?.name || 'Brand')?.split('')?.map((letter, i) => (
                  <span key={i}>{letter}</span>
                ))}
                <sup className='text-white m-0.5 text-xs'>
                  EGPT
                </sup>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks?.map((link) => (
                <div
                  key={link.name}
                  className={`relative ${link.key === 'exams' ? 'exams-dropdown-container' : ''}`}
                  ref={link.key === 'exams' ? examsDropdownRef : null}
                >
                  <button
                    onClick={() => {
                      if (link.key === 'exams') {
                        setExamsDropdownOpen(!examsDropdownOpen)
                        setShowHelpPopup(false)
                      } else {
                        setExamsDropdownOpen(false)
                        setShowHelpPopup(false)
                        handleNavClick(link.key)
                      }
                    }}
                    className={`
                      relative px-5 py-2.5 text-base font-medium
                      transition-all duration-300
                      ${isActive(link.key)
                        ? 'text-white'
                        : 'text-gray-10 hover:text-gray-200 hover:underline'
                      }
                    `}
                    style={isActive(link.key) ? {
                      backgroundColor: 'rgba(var(--color-primary-rgb, 2, 132, 199), 0.08)',
                    } : {}}
                  >
                    {/* Top Border - touches the very top of header */}
                    {isActive(link.key) && (
                      <div
                        className="absolute left-0 right-0 h-[3px] rounded-b-sm"
                        style={{
                          top: '-12px',
                          background: 'var(--gradient-primary)',
                          boxShadow: '0 2px 8px var(--color-glow)'
                        }}
                      />
                    )}
                    {link.name}
                  </button>

                  {/* Exams Dropdown Panel */}
                  {link.key === 'exams' && examsDropdownOpen && (
                    <div
                      className="absolute left-0 top-full mt-3 w-[900px] rounded-2xl shadow-2xl border border-[darkcyan] z-50 overflow-hidden"
                      style={{
                        background: 'linear-gradient(180deg, #0a1420 0%, #1a2a3e 50%, #152030 100%)',
                        animation: 'fadeIn 0.3s ease-in-out',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <div className="p-8">
                        <div className="grid grid-cols-2 gap-6">
                          {/* TOEFL Column */}
                          <div className="text-white rounded-xl p-6 border border-[darkcyan] hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-5">
                              <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{
                                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                  boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
                                }}
                              >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-white mb-1">
                                  {examDetails.toefl.title}
                                </h3>
                                <p className="text-xs text-gray-300">Test of English as a Foreign Language</p>
                              </div>
                            </div>
                            <ul className="space-y-2.5">
                              {examDetails.toefl.items.map((item, index) => (
                                <li key={index}>
                                  <a
                                    href="#"
                                    className="group flex items-center gap-3 text-sm text-white hover:text-orange-600 transition-all duration-200 p-2 rounded-lg hover:bg-white"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleExamSectionClick(item.sectionId)
                                    }}
                                  >
                                    <svg className="w-4 h-4 text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.text}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* IELTS Column */}
                          <div className="text-white rounded-xl p-6 border border-[darkcyan] hover:shadow-lg transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-5">
                              <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{
                                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                }}
                              >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-white mb-1">
                                  {examDetails.ielts.title}
                                </h3>
                                <p className="text-xs text-gray-300">International English Language Testing System</p>
                              </div>
                            </div>
                            <ul className="space-y-2.5">
                              {examDetails.ielts.items.map((item, index) => (
                                <li key={index}>
                                  <a
                                    href="#"
                                    className="group flex items-center gap-3 text-sm text-white hover:text-blue-400 transition-all duration-200 p-2 rounded-lg hover:bg-blue-900/30"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleExamSectionClick(item.sectionId)
                                    }}
                                  >
                                    <svg className="w-4 h-4 text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.text}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Footer CTA */}
                        <div className="mt-4 flex items-center justify-between">
                          {/* Need help choosing - with inline popover */}
                          <div className="relative">
                            <button
                              type="button"
                              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
                              onClick={() => setShowHelpPopup((prev) => !prev)}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm font-medium">Need help choosing?</span>
                            </button>

                            {/* Inline Popover - appears above the button */}
                            <JobDetailsPopover
                              isOpen={showHelpPopup}
                              onClose={() => setShowHelpPopup(false)}
                            />
                          </div>
                          <button
                            className="btn-gradient group px-6 py-2.5 rounded-lg font-semibold text-sm text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
                            onClick={() => {
                              handleNavClick('registration');
                              setExamsDropdownOpen(false)
                            }}
                          >
                            Explore More
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </button>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right - Login + CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            {/* Login Button */}
            {/* <button
              onClick={() => handleNavClick('registration')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Login
            </button> */}

            {/* Be a Partner Button */}
            <button
              onClick={() => handleNavClick('registration')}
              className="btn-gradient flex items-center gap-2 text-md font-semibold"
            >
              {cta?.partnerButton || 'Be a Partner'}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 border-t border-white/10 animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks?.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.key)}
                className={`
                  text-left text-sm font-medium px-4 py-3 rounded-lg
                  transition-all duration-300 relative
                  ${isActive(link.key)
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }
                `}
                style={isActive(link.key) ? {
                  backgroundColor: 'rgba(var(--color-primary-rgb, 2, 132, 199), 0.1)',
                  borderLeft: '3px solid var(--color-primary)'
                } : {}}
              >
                {link.name}
              </button>
            ))}
            <hr className="border-white/10 my-2" />

            {/* Mobile Login */}
            {/* <button
              onClick={() => handleNavClick('registration')}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Login
            </button> */}

            {/* Mobile CTA */}
            <button
              onClick={() => handleNavClick('registration')}
              className="btn-gradient flex items-center justify-center gap-2 text-sm font-semibold mt-2"
            >
              {cta?.partnerButton || 'Start learning now'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
