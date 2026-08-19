'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const ExamsSection = () => {
  const searchParams = useSearchParams()
  const section = searchParams.get('section')

  // Determine exam type from section ID (derived from the query string)
  const activeExam: 'TOEFL' | 'IELTS' | null = section?.startsWith('toefl')
    ? 'TOEFL'
    : section?.startsWith('ielts')
      ? 'IELTS'
      : null

  // Scroll to the matching section when the query string changes
  useEffect(() => {
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [section])

  // Exam sections data
  const examSections = {
    // TOEFL Sections
    'toefl-registration': {
      title: 'TOEFL Exam Registration',
      exam: 'TOEFL',
      icon: '📝',
      color: 'from-orange-500 to-red-500',
      content: {
        overview: 'Register for the TOEFL iBT test online through the official ETS website. The registration process is simple and can be completed in a few steps.',
        steps: [
          'Create an ETS account on the official website',
          'Select your preferred test date and location',
          'Fill in your personal information accurately',
          'Upload a valid photo ID for verification',
          'Pay the registration fee online',
          'Receive confirmation email with test details'
        ],
        importantPoints: [
          'Register at least 2-3 months in advance for preferred dates',
          'Valid passport required as ID proof',
          'Registration can be modified up to 4 days before test',
          'Check test center availability in your city'
        ]
      }
    },
    'toefl-eligibility': {
      title: 'TOEFL Exam Eligibility',
      exam: 'TOEFL',
      icon: '✅',
      color: 'from-orange-500 to-amber-600',
      content: {
        overview: 'There are no specific eligibility criteria for taking the TOEFL test. Anyone can register regardless of age or educational background.',
        steps: [
          'No minimum age requirement',
          'No specific educational qualification needed',
          'Valid identification document required',
          'Basic English language understanding recommended',
          'Computer literacy for iBT version'
        ],
        importantPoints: [
          'Test takers under 18 need parental consent',
          'Multiple attempts allowed with no restrictions',
          'Score validity is 2 years from test date',
          'Accepted by 11,500+ institutions worldwide'
        ]
      }
    },
    'toefl-pattern': {
      title: 'TOEFL Exam Pattern',
      exam: 'TOEFL',
      icon: '📋',
      color: 'from-orange-600 to-red-600',
      content: {
        overview: 'The TOEFL iBT test measures your ability to use and understand English in academic settings. It consists of four sections.',
        steps: [
          'Reading Section: 54-72 minutes, 30-40 questions',
          'Listening Section: 41-57 minutes, 28-39 questions',
          'Speaking Section: 17 minutes, 4 tasks',
          'Writing Section: 50 minutes, 2 tasks',
          'Total Duration: Approximately 3 hours',
          'Score Range: 0-120 (30 points per section)'
        ],
        importantPoints: [
          'Computer-based test format',
          'Integrated tasks test multiple skills',
          'Academic English content',
          'Results available within 6 days'
        ]
      }
    },
    'toefl-fees': {
      title: 'TOEFL Exam Fees',
      exam: 'TOEFL',
      icon: '💰',
      color: 'from-red-500 to-pink-600',
      content: {
        overview: 'TOEFL test fees vary by country and location. Additional services are available for an extra charge.',
        steps: [
          'Standard Registration: $185-$300 (varies by country)',
          'India: ₹16,900 approximately',
          'Late Registration: Additional $40',
          'Rescheduling Fee: $60',
          'Score Review: $80 per section',
          'Additional Score Reports: $20 each'
        ],
        importantPoints: [
          'Payment via credit/debit card or other methods',
          'Fee waivers not typically available',
          'Refunds subject to cancellation policy',
          'Check current fees on official ETS website'
        ]
      }
    },
    'toefl-preparation': {
      title: 'Preparation for TOEFL',
      exam: 'TOEFL',
      icon: '📚',
      color: 'from-orange-500 to-yellow-600',
      content: {
        overview: 'Effective preparation is key to achieving your target TOEFL score. A structured study plan spanning 2-3 months is recommended.',
        steps: [
          'Practice with official ETS materials',
          'Take full-length practice tests regularly',
          'Improve reading speed and comprehension',
          'Practice note-taking for listening section',
          'Record and review speaking responses',
          'Write timed essays on various topics'
        ],
        importantPoints: [
          'Focus on academic vocabulary',
          'Familiarize with computer-based format',
          'Join study groups or online forums',
          'Consider prep courses for structured learning'
        ]
      }
    },

    // IELTS Sections
    'ielts-registration': {
      title: 'IELTS Exam Registration',
      exam: 'IELTS',
      icon: '📝',
      color: 'from-blue-500 to-cyan-600',
      content: {
        overview: 'Register for IELTS through authorized test centers. You can choose between Academic or General Training based on your requirements.',
        steps: [
          'Find nearest authorized IELTS test center',
          'Choose between Academic or General Training',
          'Select preferred test date',
          'Complete online registration form',
          'Upload passport-size photograph',
          'Pay registration fee and receive confirmation'
        ],
        importantPoints: [
          'Register at least 2 weeks before test date',
          'Valid passport/national ID required',
          'Test available 48 times a year',
          'Computer-delivered or paper-based options'
        ]
      }
    },
    'ielts-eligibility': {
      title: 'IELTS Exam Eligibility',
      exam: 'IELTS',
      icon: '✅',
      color: 'from-blue-500 to-indigo-600',
      content: {
        overview: 'IELTS has no age or qualification restrictions. It is open to anyone who wants to demonstrate their English proficiency.',
        steps: [
          'No age limit for test takers',
          'No educational prerequisites',
          'Valid identification mandatory',
          'Suitable for students, professionals, migrants',
          'Choose Academic or General Training based on purpose'
        ],
        importantPoints: [
          'Minors need parental consent',
          'No limit on number of attempts',
          'Scores valid for 2 years',
          'Accepted by 10,000+ organizations globally'
        ]
      }
    },
    'ielts-pattern': {
      title: 'IELTS Exam Pattern',
      exam: 'IELTS',
      icon: '📋',
      color: 'from-blue-600 to-purple-600',
      content: {
        overview: 'IELTS tests four language skills: Listening, Reading, Writing, and Speaking. The test takes approximately 2 hours 45 minutes.',
        steps: [
          'Listening: 30 minutes + 10 min transfer time',
          'Reading: 60 minutes (40 questions)',
          'Writing: 60 minutes (2 tasks)',
          'Speaking: 11-14 minutes (face-to-face interview)',
          'Total Duration: ~2 hours 45 minutes',
          'Band Score: 0-9 (with 0.5 increments)'
        ],
        importantPoints: [
          'Same Listening and Speaking for both versions',
          'Different Reading and Writing for Academic/General',
          'Speaking may be on different day',
          'Results within 3-5 days (computer) or 13 days (paper)'
        ]
      }
    },
    'ielts-fees': {
      title: 'IELTS Exam Fees',
      exam: 'IELTS',
      icon: '💰',
      color: 'from-cyan-500 to-blue-600',
      content: {
        overview: 'IELTS fees vary by country and test center. Computer-delivered and paper-based tests may have different pricing.',
        steps: [
          'India: ₹16,250 (paper-based)',
          'India: ₹16,250 (computer-delivered)',
          'UK: £170-£190',
          'USA: $245-$255',
          'Rescheduling: Full fee less admin charge',
          'Additional score reports: Variable charges'
        ],
        importantPoints: [
          'Payment methods vary by test center',
          'Refund policies differ by location',
          'Late registration may incur extra fees',
          'Check official IELTS website for current fees'
        ]
      }
    },
    'ielts-preparation': {
      title: 'Preparation for IELTS',
      exam: 'IELTS',
      icon: '📚',
      color: 'from-blue-500 to-teal-600',
      content: {
        overview: 'Prepare systematically for IELTS with a 6-8 week study plan. Practice all four skills regularly to achieve your target band score.',
        steps: [
          'Use official Cambridge IELTS practice materials',
          'Take mock tests under timed conditions',
          'Practice reading various text types',
          'Listen to podcasts, news, and lectures',
          'Practice speaking on diverse topics',
          'Write essays and get feedback'
        ],
        importantPoints: [
          'Understand band descriptors for each section',
          'Familiarize with question types',
          'Time management is crucial',
          'Consider joining IELTS preparation courses'
        ]
      }
    }
  }

  return (
    <section className="max-w-full mx-auto mt-8">
      <div className="glass-card p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[28px] md:text-[54px] font-bold text-white mb-6 leading-tight">
            Complete <span className="text-[var(--color-primary)]">TOEFL & IELTS</span> Guide
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Everything you need to know about TOEFL and IELTS exams - from registration to preparation strategies.
          </p>
        </div>

        {/* Filtered Exam Sections */}
        <div className="space-y-12">
          {Object.entries(examSections)
            .filter(([, section]) => !activeExam || section.exam === activeExam)
            .map(([sectionId, section]) => (
              <div
                key={sectionId}
                id={sectionId}
                className="scroll-mt-24 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {/* Section Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}
                  >
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${section.exam === 'TOEFL' ? 'bg-orange-500/20 text-orange-300' : 'bg-blue-500/20 text-blue-300'
                        }`}>
                        {section.exam}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {section.title}
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {section.content.overview}
                    </p>
                  </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Steps/Details Column */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Key Details
                    </h4>
                    <ul className="space-y-3">
                      {section.content.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5">
                            {idx + 1}
                          </div>
                          <span className="text-sm leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Important Points Column */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Important Points
                    </h4>
                    <ul className="space-y-3">
                      {section.content.importantPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300">
                          <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* IELTS vs TOEFL Comparison Table */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
              IELTS vs TOEFL: <span className="text-[var(--color-primary)]">Quick Comparison</span>
            </h3>
            <p className="text-gray-300 text-lg">
              Understanding the key differences to choose the right exam for your goals
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-b border-white/10">
                  <th className="px-6 py-5 text-left text-white font-bold text-lg border-r border-white/10">
                    Features
                  </th>
                  <th className="px-6 py-5 text-left font-bold text-lg border-r border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                      </div>
                      <span className="text-blue-300">IELTS</span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-left font-bold text-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <span className="text-orange-300">TOEFL</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Reading Row */}
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5 text-white font-semibold border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Reading
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-300 text-sm border-r border-white/10">
                    3 passages with varied academic difficulty; 40 questions
                  </td>
                  <td className="px-6 py-5 text-gray-300 text-sm">
                    2-3 academic passages; 20 questions; integrated question styles
                  </td>
                </tr>

                {/* Listening Row */}
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5 text-white font-semibold border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                      Listening
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-300 text-sm border-r border-white/10">
                    Mix of conversations & monologues with multiple accents
                  </td>
                  <td className="px-6 py-5 text-gray-300 text-sm">
                    Academic lectures & conversations; primarily North American accents
                  </td>
                </tr>

                {/* Writing Row */}
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5 text-white font-semibold border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Writing
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-300 text-sm border-r border-white/10">
                    2 tasks: data interpretation + essay
                  </td>
                  <td className="px-6 py-5 text-gray-300 text-sm">
                    2 tasks: integrated writing + independent essay
                  </td>
                </tr>

                {/* Speaking Row */}
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5 text-white font-semibold border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Speaking
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-300 text-sm border-r border-white/10">
                    Face-to-face interview with an examiner
                  </td>
                  <td className="px-6 py-5 text-gray-300 text-sm">
                    Recorded responses to timed prompts
                  </td>
                </tr>

                {/* Test Mode Row */}
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5 text-white font-semibold border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Test Mode
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-300 text-sm border-r border-white/10">
                    Paper or computer based
                  </td>
                  <td className="px-6 py-5 text-gray-300 text-sm">
                    Fully computer based
                  </td>
                </tr>

                {/* Scoring System Row */}
                <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5 text-white font-semibold border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Scoring System
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-300 text-sm border-r border-white/10">
                    Band range (0-9)
                  </td>
                  <td className="px-6 py-5 text-gray-300 text-sm">
                    Score range (0-120)
                  </td>
                </tr>

                {/* Validity Row */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-5 text-white font-semibold border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Validity
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-300 text-sm border-r border-white/10">
                    2 years
                  </td>
                  <td className="px-6 py-5 text-gray-300 text-sm">
                    2 years
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bottom Note */}
          <div className="mt-8 text-center">
            <p className="text-gray-10 text-sm">
              💡 <span className="font-semibold text-gray-300">Pro Tip:</span> Choose based on your destination country&apos;s preference and your comfort with the test format.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExamsSection
