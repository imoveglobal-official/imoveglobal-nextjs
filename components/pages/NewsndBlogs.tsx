'use client'

import { useState } from "react";
// import { ContentContext } from "../../context/ContentContext";
import { useNewsBlog } from "@/context/NewsBlogContext";
import NewsModal, { type NewsItem } from "@/components/common/NewsModal";

const categories = ["ALL", "BLOG", "NEWS"];

const categoryColors: Record<string, string> = {
  BLOG: "from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-300",
  NEWS: "from-emerald-500/20 to-teal-500/20 border-emerald-400/30 text-emerald-300",
};

const NewsAndBlogs = () => {
  //   const { content } = useContext(ContentContext);
  const { newsBlogContent } = useNewsBlog();
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get news and blogs data from content
  const newsAndBlogs = newsBlogContent || { news: [], blogs: [] };
  const allItems: NewsItem[] = ([
    ...(newsAndBlogs.news || []),
    ...(newsAndBlogs.blogs || []),
  ] as unknown as NewsItem[]).sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    if (isNaN(dateA.getTime())) return 1
    if (isNaN(dateB.getTime())) return -1
    return dateB.getTime() - dateA.getTime()
  });

  // Handle card click
  const handleCardClick = (item: NewsItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300); // Clear after animation
  };

  return (
    <section id="insights" className="max-w-full mx-auto mt-8 scroll-mt-20">
      <div className="glass-card p-8 md:p-16 lg:p-20">
        {/* ── Header ── */}
        <div className="text-center mb-12">
          <h1 className="text-[32px] md:text-[52px] font-bold text-white leading-tight mb-6">
            News <span className="bg-theme-gradient-text">&</span> Blogs
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Stay tuned for the updates on our latest news, insightful blogs, and
            in-depth research related to the English Global Preparation Test
            (EGPT) and the broader landscape of English education. We are
            committed to sharing valuable information, success stories, and
            expert perspectives to help you stay informed and inspired on your
            journey with EGPT.
          </p>
        </div>

        {/* ── Category Filter Tabs ── */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-[rgba(255,255,255,0.05)] rounded-full p-1">
            {categories?.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveCategory(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === filter
                  ? "btn-gradient"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* ── Publication Cards Grid ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {allItems
            .filter(
              (item) =>
                activeCategory === "ALL" || item.category === activeCategory,
            )
            .map((item, index) => (
              <div
                id={`news-blog-card-${index}`}
                key={`${item.category}-${index}`}
                onClick={() => item.description ? handleCardClick(item) : null}
                className="relative overflow-hidden border-r border-white/10 last:border-r-0 transition-all duration-500 group hover:shadow-2xl benefit-card-hover animate-premiumFadeInUp flex flex-col cursor-pointer"
                style={{
                  backdropFilter: "blur(20px)",
                  background: "rgba(255,255,255,0.04)",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Content Section - Top */}
                <div className="p-6 pb-4 flex-grow">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r border text-xs font-bold uppercase tracking-wider ${categoryColors[item.category] || "from-white/10 to-white/5 border-white/20 text-white"}`}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-xl leading-snug mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Date */}
                  <p className="text-gray-400 text-sm mb-4">{item.date}</p>

                  {/* Read More Link */}
                  {item.description && (
                    <button
                      className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/btn"
                      style={{ color: "var(--color-accent)" }}
                    >
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Image Section - Bottom */}
                <div className="relative h-64 overflow-hidden mt-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1420] via-[#0a1420]/40 to-transparent" />
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

      {/* Modal */}
      <NewsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem}
      />
    </section>
  );
};

export default NewsAndBlogs;
