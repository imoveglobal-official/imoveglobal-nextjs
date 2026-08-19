'use client'

import { useState } from 'react'
import { useContent } from '@/context/ContentContext'

interface Division {
  grades?: string
  rewards: { '1st'?: string; '2nd'?: string; '3rd'?: string }
}

interface PackageReward {
  position?: string
  prize?: string
}

interface PackageEvent {
  title?: string
  participants?: string
  menu?: string
}

interface SkillPackage {
  title?: string
  subtitle?: string
  divisions?: Division[]
  rewards?: PackageReward[]
  event?: PackageEvent | null
}

interface EventsSection {
  title?: string
  twoSkillEvent?: { participants?: string; menu?: string }
  threeSkillEvent?: { participants?: string; menu?: string }
}

interface DetailedInfo {
  twoSkillPackage?: SkillPackage
  threeSkillPackage?: SkillPackage
  fourSkillPackage?: SkillPackage
  events?: EventsSection
}

interface Scholarship {
  id: number
  title?: string
  institution?: string
  date?: string
  description?: string
  image?: string | null
  detailedInfo?: DetailedInfo
  socialLinks?: { twitter?: string; linkedin?: string }
}

const InstitutionalScholarships = () => {
  const [showInfo, setShowInfo] = useState(false)
  const [showAllDetails, setShowAllDetails] = useState(false)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const { scholarships, brand } = useContent()

  const defaultScholarships: Scholarship[] = [
    {
      id: 1,
      title: 'Global Excellence Scholarship',
      institution: 'Oxford University',
      date: '15 February 2026',
      description: 'Full scholarship for international students pursuing masters degree.',
      image: null,
      socialLinks: { twitter: '#', linkedin: '#' }
    }
  ]

  // Content comes from JSON with heterogeneous item shapes; typed permissively.
  const items: Scholarship[] = (scholarships?.items as unknown as Scholarship[]) || defaultScholarships
  const howItWorks = scholarships?.howItWorks || [
    'Browse available prep tests for your institution',
    'Click on any card to view full details',
    'Register your query through website to be a partner'
  ]

  return (
    <section id="scholarships" className="max-w-full mx-auto mt-8 scroll-mt-20">
      <div className="glass-card p-8 md:p-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {scholarships?.title || 'Institutional Scholarships & Events'}
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-4">
            {scholarships?.description || `A selection of the best scholarships and events curated by ${brand?.name || 'our'} partners.`}
          </p>
          <button
            onClick={() => setShowInfo(!showInfo)}
            style={{ color: 'var(--color-accent)' }}
            className="hover:opacity-80 underline text-sm font-medium transition-opacity"
          >
            How does it work?
          </button>

          {/* Info Dropdown */}
          {showInfo && (
            <div className="mt-4 p-4 bg-white/5 rounded-xl max-w-lg mx-auto text-left text-gray-300 text-sm animate-fadeIn">
              {howItWorks.map((step, index) => (
                <p key={index} className={index < howItWorks.length - 1 ? 'mb-2' : ''}>
                  <span style={{ color: 'var(--color-accent)' }} className="font-semibold">{index + 1}.</span> {step}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Scholarship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500">
          {items.map((scholarship) => (
            <div
              key={scholarship.id}
              className={`space-y-4 transition-all duration-500 ${expandedCard === scholarship.id || showAllDetails ? 'md:col-span-2' : ''
                }`}
            >
              {/* Main Card */}
              <div
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer hover:scale-[1.02]"
                style={{ background: 'linear-gradient(to bottom right, #1a1a3e, #2d1b4e)' }}
              >
                <div className="flex flex-col sm:flex-row" onClick={() => {
                  if (!showAllDetails) {
                    setExpandedCard(expandedCard === scholarship.id ? null : scholarship.id)
                  }
                }}>
                  {/* Image/Placeholder Section */}
                  <div
                    className="relative w-full sm:w-1/2 h-48 sm:h-auto overflow-hidden"
                    style={{ background: 'linear-gradient(to bottom right, var(--color-secondary), rgba(236, 72, 153, 0.3))' }}
                  >
                    {/* Decorative Background */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-full h-full"
                        style={{ background: 'linear-gradient(to bottom right, var(--color-glow), rgba(236, 72, 153, 0.2))' }}
                      ></div>
                      {/* Decorative Elements with animation */}
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-lg bg-orange-500/30 transform rotate-12 animate-pulse"></div>
                      <div className="absolute bottom-6 right-6 w-8 h-8 rounded bg-teal-500/30 animate-bounce"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-500">
                        <div className="text-center">
                          <img src={scholarship.image ?? undefined} alt={scholarship.title} className="w-full h-full object-cover animate-float" />
                          {/* <p className="text-white/80 font-bold text-lg">{scholarship.institution.split(' ')[0]}</p>
                        <p style={{ color: 'var(--color-accent)', opacity: 0.6 }} className="text-sm">{scholarship.institution.split(' ').slice(1).join(' ')}</p> */}
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: 'var(--color-glow)' }}
                    ></div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-5">
                    {/* Date & Social Links */}
                    <div className="flex items-center justify-between mb-3">
                      <span style={{ color: 'var(--color-accent)' }} className="text-base font-medium">
                        {scholarship.date}
                      </span>
                      {/* <div className="flex items-center gap-2">
                      <a href={scholarship.socialLinks?.twitter || '#'} className="text-gray-10 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                      <a href={scholarship.socialLinks?.linkedin || '#'} className="text-gray-10 hover:text-blue-400 transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div> */}
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-bold text-xl mb-2 transition-colors">
                      {scholarship.title}
                    </h3>

                    {/* Institution */}
                    <p style={{ color: 'var(--color-accent)' }} className="font-medium text-base mb-3">
                      {scholarship.institution}
                    </p>

                    {/* Description */}
                    <p className="text-gray-10 text-base line-clamp-2">
                      {scholarship.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Info Section - Rendered BELOW the card */}
              {scholarship.detailedInfo && (expandedCard === scholarship.id || showAllDetails) && (
                <div className="space-y-3 animate-fadeIn">
                  {/* 2-Skill and 3-Skill Packages - Side by Side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* 2-Skill Package */}
                    {scholarship.detailedInfo.twoSkillPackage && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white font-semibold text-lg mb-2">{scholarship.detailedInfo.twoSkillPackage.title}</h4>
                        <p className="text-gray-10 text-base mb-3">{scholarship.detailedInfo.twoSkillPackage.subtitle}</p>
                        <div className="space-y-2">
                          {scholarship.detailedInfo.twoSkillPackage.divisions ? (
                            scholarship.detailedInfo.twoSkillPackage.divisions.map((div, idx) => (
                              <div key={idx} className="text-sm">
                                <span style={{ color: 'var(--color-accent)' }} className="font-medium">{div.grades}: </span>
                                <span className="text-gray-300">
                                  🥇 {div.rewards['1st']} • 🥈 {div.rewards['2nd']} • 🥉 {div.rewards['3rd']}
                                </span>
                              </div>
                            ))
                          ) : scholarship.detailedInfo.twoSkillPackage.rewards ? (
                            scholarship.detailedInfo.twoSkillPackage.rewards.map((reward, idx) => (
                              <div key={idx} className="text-sm">
                                <span style={{ color: 'var(--color-accent)' }} className="font-medium">{reward.position}: </span>
                                <span className="text-gray-300">{reward.prize}</span>
                              </div>
                            ))
                          ) : null}
                        </div>
                        {scholarship.detailedInfo.twoSkillPackage.event === null && (
                          <p className="text-gray-500 text-sm mt-2 italic">*No event for this package</p>
                        )}
                      </div>
                    )}

                    {/* 3-Skill Package */}
                    {scholarship.detailedInfo.threeSkillPackage && (
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white font-semibold text-lg mb-2">{scholarship.detailedInfo.threeSkillPackage.title}</h4>
                        <p className="text-gray-10 text-base mb-3">{scholarship.detailedInfo.threeSkillPackage.subtitle}</p>
                        <div className="space-y-2">
                          {scholarship.detailedInfo.threeSkillPackage.divisions ? (
                            scholarship.detailedInfo.threeSkillPackage.divisions.map((div, idx) => (
                              <div key={idx} className="text-sm">
                                <span style={{ color: 'var(--color-accent)' }} className="font-medium">{div.grades}: </span>
                                <span className="text-gray-300">
                                  🥇 {div.rewards['1st']} • 🥈 {div.rewards['2nd']} • 🥉 {div.rewards['3rd']}
                                </span>
                              </div>
                            ))
                          ) : scholarship.detailedInfo.threeSkillPackage.rewards ? (
                            scholarship.detailedInfo.threeSkillPackage.rewards.map((reward, idx) => (
                              <div key={idx} className="text-sm">
                                <span style={{ color: 'var(--color-accent)' }} className="font-medium">{reward.position}: </span>
                                <span className="text-gray-300">{reward.prize}</span>
                              </div>
                            ))
                          ) : null}
                        </div>
                        {scholarship.detailedInfo.threeSkillPackage.event && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <h5 className="text-white font-medium text-sm mb-1 flex items-center gap-1">
                              🎉 {scholarship.detailedInfo.threeSkillPackage.event.title}
                            </h5>
                            <p className="text-gray-10 text-sm">{scholarship.detailedInfo.threeSkillPackage.event.participants}</p>
                            <p className="text-gray-10 text-sm">{scholarship.detailedInfo.threeSkillPackage.event.menu}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 4-Skill Package */}
                  {scholarship.detailedInfo.fourSkillPackage && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white font-semibold text-lg mb-2">{scholarship.detailedInfo.fourSkillPackage.title}</h4>
                      <p className="text-gray-10 text-base mb-3">{scholarship.detailedInfo.fourSkillPackage.subtitle}</p>
                      <div className="space-y-2">
                        {scholarship.detailedInfo.fourSkillPackage.rewards && scholarship.detailedInfo.fourSkillPackage.rewards.map((reward, idx) => (
                          <div key={idx} className="text-sm">
                            <span style={{ color: 'var(--color-accent)' }} className="font-medium">{reward.position}: </span>
                            <span className="text-gray-300">{reward.prize}</span>
                          </div>
                        ))}
                      </div>
                      {scholarship.detailedInfo.fourSkillPackage.event && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <h5 className="text-white font-medium text-sm mb-1 flex items-center gap-1">
                            🎉 {scholarship.detailedInfo.fourSkillPackage.event.title}
                          </h5>
                          <p className="text-gray-10 text-sm">{scholarship.detailedInfo.fourSkillPackage.event.participants}</p>
                          <p className="text-gray-10 text-sm">{scholarship.detailedInfo.fourSkillPackage.event.menu}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Events Section (for Card 1 style with combined events) */}
                  {scholarship.detailedInfo.events && (
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/20">
                      <h4 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                        🎉 {scholarship.detailedInfo.events.title}
                      </h4>
                      <div className="space-y-1.5 text-base text-gray-300">
                        {scholarship.detailedInfo.events.twoSkillEvent && (
                          <div>
                            <span className="font-medium text-purple-300">2-Skill Event:</span> {scholarship.detailedInfo.events.twoSkillEvent.participants}
                            <div className="text-gray-10 ml-2">{scholarship.detailedInfo.events.twoSkillEvent.menu}</div>
                          </div>
                        )}
                        {scholarship.detailedInfo.events.threeSkillEvent && (
                          <div>
                            <span className="font-medium text-pink-300">3-Skill Event:</span> {scholarship.detailedInfo.events.threeSkillEvent.participants}
                            <div className="text-gray-10 ml-2">{scholarship.detailedInfo.events.threeSkillEvent.menu}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Button - Toggles detailed info */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAllDetails(!showAllDetails)}
            className="btn-gradient px-8 py-3 text-base font-medium"
          >
            {showAllDetails ? 'Hide Details' : (scholarships?.viewAllButton || 'View All Scholarships & Events')}
          </button>
        </div>
      </div>
    </section>
  )
}

export default InstitutionalScholarships
