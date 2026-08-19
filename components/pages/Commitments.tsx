// const categories = ['ALL', 'PUBLICATION', 'BLOG', 'NEWS', 'RESEARCH']

// const categoryColors = {
//     PUBLICATION: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30 text-blue-300',
//     BLOG: 'from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-300',
//     NEWS: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/30 text-emerald-300',
//     RESEARCH: 'from-amber-500/20 to-orange-500/20 border-amber-400/30 text-amber-300',
// }

const Commitments = () => {
  return (
    <section id="insights" className="max-w-full mx-auto mt-8 scroll-mt-20">
      <div className="glass-card p-8 md:p-16 lg:p-20">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <h1 className="text-[32px] md:text-[52px] font-bold text-white leading-tight mb-6">
            Our{' '}
            <span className="bg-theme-gradient-text">Commitments</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            We believe every child deserves access to quality English education. A portion of our revenue is dedicated to supporting students from underprivileged backgrounds through subsidized testing, scholarships, and skill-development programs.
          </p>
        </div>

        {/* ── Category Filter Tabs ── */}
        {/* <div className="flex justify-center mb-10">
                    <div className="inline-flex bg-[rgba(255,255,255,0.05)] rounded-full p-1">
                        {categories?.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveCategory(filter)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === filter
                                    ? 'btn-gradient'
                                    : 'text-gray-10 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div> */}

        {/* ── Publication Cards Grid ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {[
            {
              id: 1,
              category: 'PUBLICATION',
              title: 'Coming Soon',
              image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
            },
            {
              id: 2,
              category: 'PUBLICATION',
              title: 'Coming Soon',
              image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80',
            },
            {
              id: 3,
              category: 'PUBLICATION',
              title: 'Coming Soon',
              image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
            },
          ].map((item, index) => (
            <div
              key={item.id}
              className="relative overflow-hidden border-r border-white/10 last:border-r-0 transition-all duration-500 group hover:shadow-2xl benefit-card-hover animate-premiumFadeInUp flex flex-col"
              style={{
                backdropFilter: 'blur(20px)',
                background: 'rgba(255,255,255,0.04)',
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Content Section - Top */}
              <div className="p-6 pb-4 flex-grow">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-xl leading-snug mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Learn More Link */}
                {/* <button
                                    onClick={() => navigate('/registration')}
                                    className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/btn"
                                    style={{ color: 'var(--color-accent)' }}
                                >
                                    <span>Learn more</span>
                                    <svg
                                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button> */}
              </div>

              {/* Image Section - Bottom */}
              <div className="relative h-64 overflow-hidden mt-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1420] via-[#0a1420]/40 to-transparent" />

                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 bg-[#0a1420]/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center px-6">
                    <p className="text-white text-lg font-semibold mb-2">All this shall be</p>
                    <p className="text-white text-2xl font-bold">coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        {/* <div className="mt-12 text-center">
                    <p className="text-gray-400 text-base mb-6">
                        All this shall be{' '}
                        <span className="font-semibold text-white">coming soon</span> — stay
                        tuned for more research and insights from Imoveglobal.
                    </p>
                    <button
                        onClick={() => navigate('/registration')}
                        className="btn-gradient px-8 py-3 text-sm font-bold uppercase tracking-widest"
                    >
                        Get Notified
                    </button>
                </div> */}

      </div>
    </section>
  )
}

export default Commitments
