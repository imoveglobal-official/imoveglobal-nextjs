const CareerBoost = () => {
  const features = [
    {
      id: 1,
      icon: '/goal.svg',
      title: 'Targeted strategies for Listening, Reading, Speaking, Writing',
    },
    {
      id: 2,
      icon: '/performance.svg',
      title: 'Performance-based scoring with actionable improvement insights',
    },
    {
      id: 3,
      icon: '/competition.svg',
      title: 'Practical strategies to boost scores quickly',
    },
    {
      id: 4,
      icon: '/rate.svg',
      title: 'Unlock Global Salaries with TOEFL/IELTS.',
    },
  ]

  return (
    <section
      id="career-boost"
      className="max-w-full mx-auto mt-8 scroll-mt-20"
    >
      <div className="glass-card p-12 md:p-16 lg:p-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Boost Your English and Ace TOEFL/IELTS
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mt-6 max-w-5xl mx-auto">
              Exam-Aligned Preparation Content and practice tests are designed strictly as per TOEFL &
              IELTS standards, ensuring real exam familiarity and confidence.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center group cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Icon */}
                <div
                  className="h-[140px] mb-8 flex items-center justify-center transition-all duration-300 group-hover:[animation:iconShake_0.5s_ease-in-out]"
                >
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                  />
                </div>

                {/* Title */}
                <span className="font-semibold text-white leading-relaxed w-full text-lg">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareerBoost
