'use client'

import { useRouter } from 'next/navigation'

const ActiveCommunity = () => {
  const router = useRouter()

  const cards = [
    {
      id: 1,
      title: 'EGPT Primary',
      subtitle: 'English Global Prep Test Primary',
      description: 'Designed for young learners to build strong English foundations.',
      ageGroup: 'Age 8-14',
      standard: 'Standard 5th – 8th',
      linkText: 'Learn more about EGPT Primary',
    },
    {
      id: 2,
      title: 'EGPT Junior',
      subtitle: 'English Global Prep Test Jr.',
      description: 'Comprehensive English assessment for secondary school students.',
      ageGroup: 'Age 11-17',
      standard: 'Standard 9th – 12th',
      linkText: 'Learn more about EGPT Junior',
    },
    {
      id: 3,
      title: 'EGPT Unite',
      subtitle: 'English Global Prep Test Unite',
      description: 'Beginner-intermediate assessment of everyday and professional reading/listening',
      ageGroup: 'All Ages',
      standard: 'Beginner to Intermediate',
      linkText: 'Learn more about EGPT Unite',
    },
    {
      id: 4,
      title: 'EGPT Senior',
      subtitle: 'English Global Prep Test Senior',
      description: 'Advanced English proficiency assessment for undergraduate and postgraduate students.',
      ageGroup: 'UG/PG',
      standard: 'University Level',
      linkText: 'Learn more about EGPT Senior',
    }
  ]

  return (
    <section
      id="active-community"
      className="max-w-full mx-auto mt-8 scroll-mt-20"
    >
      <div className="glass-card p-8 md:p-12">
        {/* Header with Animated Icon */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Animated Sphere Icon */}
            <div className="relative w-20 h-20">
              {/* Floating sphere */}
              <div className="relative" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <img
                  src="/sphere.webp"
                  alt="Sphere"
                  className="w-full h-full object-contain"
                  style={{ animation: 'spin-slow 8s linear infinite' }}
                />
              </div>

              {/* Transparent shadow */}
              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                style={{
                  width: '60px',
                  height: '8px',
                  background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.3) 0%, transparent 70%)',
                  filter: 'blur(4px)',
                  animation: 'shadowPulse 3s ease-in-out infinite'
                }}
              />
            </div>

            <h2 className="text-[28px] md:text-[44px] font-bold text-white">
              Details of Our Programs
            </h2>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mx-auto">
          {cards?.map((card, index) => (
            <div
              key={card.id}
              className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 group hover:shadow-2xl shadow-2xl shadow-purple-500/20"
              style={{
                backdropFilter: 'blur(20px)',
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
              }}
            >
              {/* Card Content */}
              <div className="p-6 md:p-8 lg:p-10">
                {/* Card Header */}
                <h1 className="text-3xl md:text-4xl lg:text-4xl text-white mb-2 text-center leading-tight min-h-[4rem] flex items-center justify-center font-extrabold">
                  {card.title}
                </h1>

                {/* Subtitle */}
                <p className="text-white text-sm md:text-base text-center mb-6 font-medium min-h-[2.5rem] flex items-center justify-center">
                  {card.subtitle}
                </p>

                {/* Description */}
                <p className="text-white/90 text-center mb-6 md:mb-8 leading-relaxed text-sm md:text-base min-h-[4rem] flex items-center justify-center">
                  {card.description}
                </p>

                {/* Subtle Divider */}
                <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-6 md:mb-8"></div>

                {/* Program Details */}
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {/* Age Group Badge */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 min-w-[140px]">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-white font-semibold text-sm md:text-base">{card.ageGroup}</span>
                    </div>
                  </div>

                  {/* Standard Badge */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 min-w-[180px]">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="text-white font-semibold text-sm md:text-base">{card.standard}</span>
                    </div>
                  </div>
                </div>

                {/* Link */}
                <div className="text-center">
                  <button onClick={() => router.push('/registration')} className="text-white font-semibold hover:text-purple-300 transition-all duration-300 flex items-center justify-center gap-2 mx-auto group/btn text-base">
                    <span>{card.linkText}</span>
                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ActiveCommunity
