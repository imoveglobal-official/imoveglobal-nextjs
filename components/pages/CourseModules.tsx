'use client'

import { useContent } from '@/context/ContentContext'
import { useState, useEffect, useRef, type ReactNode } from 'react'
import CareerBoost from './CareerBoost'
import CourseOverview from './CourseOverview'
import ActiveCommunity from './ActiveCommunity'

interface Lesson {
  id: string
  title: string
  duration: string
  isFree: boolean
  content: string
}

interface Section {
  id: number
  number: string
  title: string
  image: string
  description: ReactNode
  lessons: Lesson[]
  accentColor: string
  numberColor: string
  hoverBorder: string
}

interface DescriptionObject {
  line1?: string
  line2?: string
  line3?: string
}

const CourseModules = () => {
  const { egpt_primary, egpt_junior, egpt_senior, egpt_unite, egpt_braille } = useContent()
  const [activeStep, setActiveStep] = useState(1)
  // value intentionally unused (kept for parity with source runtime behavior)
  const [, setIsInView] = useState(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionWrapperRef = useRef<HTMLElement>(null)
  const isScrollingProgrammatically = useRef(false)

  // Helper to render description which can be an object or undefined
  const renderDescription = (desc: DescriptionObject | string | undefined): ReactNode => {
    if (!desc) return null
    if (typeof desc === 'object') {
      return (
        <>
          {desc.line1} <span className="text-white font-semibold">{desc.line2}</span> {desc.line3}
        </>
      )
    }
    // If it's a string or other, just render it directly (though current JSON structure suggests objects for primary)
    return desc
  }

  // Course sections data
  const sections: Section[] = [
    {
      id: 1,
      number: '01',
      title: egpt_primary?.title || 'EGPT Primary',
      image: '/courses/Primary.gif',
      description: renderDescription(egpt_primary?.description),
      lessons: egpt_primary?.lessons || [],
      accentColor: '#ff6b6b',
      numberColor: 'text-orange-500',
      hoverBorder: 'hover:border-orange-500/30',
    },
    {
      id: 2,
      number: '02',
      title: egpt_junior?.title || 'EGPT Junior',
      image: '/courses/Junior.gif',
      description: renderDescription(egpt_junior?.description),
      lessons: egpt_junior?.lessons || [],
      accentColor: '#22d3ee',
      numberColor: 'text-cyan-400',
      hoverBorder: 'hover:border-cyan-400/30',
    },
    {
      id: 3,
      number: '03',
      title: egpt_senior?.title || 'EGPT Senior',
      image: '/courses/Senior.gif',
      description: renderDescription(egpt_senior?.description),
      lessons: egpt_senior?.lessons || [],
      accentColor: '#eab308',
      numberColor: 'text-yellow-500',
      hoverBorder: 'hover:border-yellow-500/30',
    },
    {
      id: 4,
      number: '04',
      title: egpt_unite?.title || 'EGPT Unite',
      image: '/courses/Unite.gif',
      description: renderDescription(egpt_unite?.description),
      lessons: egpt_unite?.lessons || [],
      accentColor: '#a855f7',
      numberColor: 'text-purple-400',
      hoverBorder: 'hover:border-purple-500/30',
    },
    {
      id: 5,
      number: '05',
      title: egpt_braille?.title || 'EGPT Braille',
      image: '/courses/Braille.gif', // Placeholder or reuse
      description: renderDescription(egpt_braille?.description),
      lessons: [], // No lessons for Braille yet
      accentColor: '#ec4899', // Pink for Braille
      numberColor: 'text-pink-500',
      hoverBorder: 'hover:border-pink-500/30',
    },
  ]

  // Optimized scroll-based step activation using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: [0.3, 0.5, 0.7],
      rootMargin: '-20% 0px -20% 0px'
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingProgrammatically.current) return

      // Find the entry with the highest intersection ratio
      let maxRatio = 0
      let maxIndex = 0

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio
          const index = sectionRefs.current.indexOf(entry.target as HTMLDivElement)
          if (index !== -1) {
            maxIndex = index
          }
        }
      })

      if (maxRatio > 0) {
        setActiveStep(maxIndex + 1)
      }
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  // Track if section is in viewport
  useEffect(() => {
    const wrapper = sectionWrapperRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    if (wrapper) {
      observer.observe(wrapper)
    }

    return () => {
      if (wrapper) {
        observer.unobserve(wrapper)
      }
    }
  }, [])

  // Optimized click to scroll to section
  const scrollToStep = (stepNumber: number) => {
    if (activeStep === stepNumber) return // Already at this step

    setActiveStep(stepNumber)
    isScrollingProgrammatically.current = true

    const section = sectionRefs.current[stepNumber - 1]
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

      // Re-enable observer after animation
      setTimeout(() => {
        isScrollingProgrammatically.current = false
      }, 600)
    }
  }

  return (
    <>
      <ActiveCommunity />
      <section
        ref={sectionWrapperRef}
        id="course-modules"
        className="w-full scroll-mt-20 mt-8 relative"
      >
        <div className="flex glass-card min-h-screen">
          {/* Left Step Bar - Sticky */}
          <div className="hidden lg:flex flex-col justify-start w-24 flex-shrink-0 bg-gray-900/40 backdrop-blur-sm border border-white/20 rounded-tl-[18px] rounded-bl-[18px] sticky top-0 h-screen">
            <div className="flex flex-col gap-2">
              {sections?.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToStep(section.id)}
                  className={`
                    relative flex items-center justify-center py-4 px-6 transition-all duration-300
                    ${activeStep === section.id ? 'bg-gray-800/60 rounded-tl-[18px]' : 'hover:bg-gray-800/30 rounded-tl-[18px]'}
                  `}
                >
                  {/* Active indicator bar */}
                  {activeStep === section.id && (
                    <div
                      className="absolute right-0 w-1 h-full rounded-l-full transition-all duration-300"
                      style={{
                        backgroundColor: section.accentColor,
                        boxShadow: `0 0 20px ${section.accentColor}90`
                      }}
                    />
                  )}

                  <span
                    className={`
                      font-bold transition-all duration-300
                      ${activeStep === section.id
                        ? 'text-white text-3xl'
                        : 'text-gray-500 text-2xl hover:text-gray-10'
                      }
                    `}
                  >
                    {section?.number}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area - Natural page flow */}
          <div className="flex-1">
            <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-6">
              {sections?.map((section, index) => (
                <div
                  key={section.id}
                  ref={(el) => { sectionRefs.current[index] = el }}
                  data-module-id={section.id}
                  className="min-h-[100vh] flex flex-col xl:flex-row items-center justify-center gap-10 xl:gap-48 pt-12 pb-16"
                >
                  {/* Section Content */}
                  <div className="flex-1 max-w-2xl">
                    {/* Title */}
                    <h2 className="text-5xl font-bold text-white tracking-tight animate-fadeInUp">
                      {section.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-10 text-xl mb-3 leading-relaxed animate-fadeInUp font-light" style={{ animationDelay: '200ms' }}>
                      {section.description}
                    </p>

                    {/* Lessons List */}
                    <div className="space-y-1">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id}>
                          <div
                            className={`
                              group flex items-center justify-between py-3 px-4
                              rounded-xl hover:bg-white/[0.03]
                              border-b border-white/5 last:border-0
                              transition-all duration-300 cursor-pointer
                              animate-fadeInUp
                            `}
                            style={{ animationDelay: `${300 + lessonIndex * 50}ms` }}
                          >
                            <div className="flex items-center gap-6 flex-1">
                              <span
                                className={`${section.numberColor} font-black text-lg min-w-[3rem] opacity-50 group-hover:opacity-100 transition-opacity`}
                              >
                                {lesson.id}
                              </span>
                              <span className="text-gray-300 group-hover:text-white transition-colors text-lg font-semibold">
                                {lesson.title}
                              </span>
                            </div>

                            {/* <div className="flex items-center gap-6">
                              {lesson.isFree && (
                                <span
                                  className="px-3 py-1 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg"
                                  style={{ backgroundColor: '#ff6b6b' }}
                                >
                                  free
                                </span>
                              )}
                              <span className="text-gray-500 font-mono text-sm tracking-tighter w-16 text-right">
                                {lesson.duration}
                              </span>
                            </div> */}
                          </div>

                          {/* Lesson Content Description */}
                          {lesson.content && (
                            <div className="pl-16 pr-4 pb-4 pt-0 animate-fadeInUp" style={{ animationDelay: `${350 + lessonIndex * 50}ms` }}>
                              <p className="text-gray-10 text-base leading-relaxed font-light opacity-80 border-l-2 border-white/10 pl-4">
                                {lesson.content}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section Image - Clean and Simple */}
                  <div className="relative flex-shrink-0 w-64 h-64 sm:w-80 sm:h-80 xl:w-[450px] xl:h-[450px] flex items-center justify-center group cursor-pointer">
                    {/* Subtle background glow effect */}
                    <div
                      className="absolute inset-0 rounded-full blur-[80px] transition-opacity duration-700 group-hover:opacity-30"
                      style={{
                        backgroundColor: section.accentColor,
                        opacity: 0.15,
                      }}
                    />

                    {/* Image - Let the GIF animation shine */}
                    <img
                      src={section.image}
                      alt={section.title}
                      loading="lazy"
                      className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CareerBoost />
      <CourseOverview />
    </>
  )
}

export default CourseModules
