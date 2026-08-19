const CourseOverview = () => {
  const stats = [
    {
      id: 1,
      number: '3',
      label: 'India Ranks no. 3 globally in terms of emigration',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 2,
      number: '3',
      label: 'upto 3 Real-Life Skill Workshops',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 3,
      number: '2',
      label: 'upto 2 Personalized Career Counselling Sessions',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  return (
    <section
      id="course-overview"
      className="max-w-full mx-auto mt-8 scroll-mt-20"
    >
      <div className="glass-card p-8 md:p-12">
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <h2 className="text-[28px] md:text-[44px] font-bold text-white mb-8 text-center">
            The Only Prep Test You Need
          </h2>

          {/* Description */}
          <div className="text-base sm:text-lg text-gray-300 leading-relaxed mb-12 max-w-6xl mx-auto text-justify">
            <p className="mb-6">
              The EGPT Tests are institutional assessments designed specifically for hands-on practice for major English proficiency exams like IELTS, TOEFL, and TOEIC. They simulate the real structure, timing, and pressure of international exams—so students don’t just study English, they experience the test environment early.
            </p>
            <p className="mb-6">
              Globally, migration is rising at record levels. According to the United Nations, there are over 280 million international migrants worldwide. India consistently ranks among the top countries of origin, with more than 18 million Indians living abroad—one of the largest diasporas in the world. The message is clear: <span className="font-semibold text-white">global mobility is no longer rare. It’s mainstream.</span> And English proficiency is the gateway.
            </p>
            <p className="mb-6">
              EGPT offers this preparation at a fraction of the cost of official exams, while delivering the exact feel of real tests like IELTS and TOEFL. When students grow up taking structured practice tests, they build exam confidence naturally—without last-minute panic or unnecessary coaching expenses.
            </p>
            <p className="mb-6">
              It also saves significant money. Alongside test preparation, pre-exam workshops include practical sessions on visa processes, global career pathways, and study-abroad guidance—areas where families often spend heavily on separate consultants.
              Most importantly, this is not just exam prep. English proficiency is a real-life, high-income skill. In a world where opportunities are global, every student should begin building this skill early—not when it’s urgent, but when it’s strategic.

            </p>
            {/* <p className="mb-4">
              You will begin by building a strong understanding of the fundamental concepts and tools essential to the subject. As you progress, you will explore its key components in depth, establishing a solid foundation before advancing to more sophisticated techniques. Through extensive <span className="font-semibold text-white">hands-on practice </span> and <span className="font-semibold text-white">guided exercises </span>, you will steadily develop practical experience and confidence. By the end of the course, you will have the knowledge and skills required to independently create and execute your own projects.
            </p>
            <p>
              At the end of the course, you will have enough experience and skills to{' '}
              <span className="font-semibold text-white">create your own projects</span>.
            </p> */}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 text-center">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className="flex flex-col items-center group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                }}
              >
                {/* Number */}
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-3 bg-gradient-to-br from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110 animate-pulse">
                  {stat.number}
                </div>

                {/* Label with Icon */}
                <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                  <span className="opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 inline-block">{stat.icon}</span>
                  <span className="font-medium">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseOverview
