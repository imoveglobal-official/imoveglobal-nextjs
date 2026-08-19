'use client'

import { useEffect, useState, type ReactNode } from 'react'

export interface NewsItem {
  category: string
  title: string
  date: string
  image: string
  description_image?: string[]
  description: string[]
}

interface NewsModalProps {
  isOpen: boolean
  onClose: () => void
  item: NewsItem | null
}

const NewsModal = ({ isOpen, onClose, item }: NewsModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isExpanded) {
          setIsExpanded(false)
        } else {
          onClose()
        }
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, isExpanded])

  // Reset carousel index and close expanded view when modal opens with a new item.
  // Resetting internal UI state on prop change is intentional here.
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentImageIndex(0)
      setIsExpanded(false)
    }
  }, [isOpen, item])

  if (!isOpen || !item) return null

  // Parse inline formatting: **bold**, _italic_, __underline__
  const parseInline = (text: string): ReactNode[] => {
    const regex = /(\*\*(.+?)\*\*|__(.+?)__|_(.+?)_)/g
    const parts: ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
      if (match[0].startsWith('**')) parts.push(<strong key={match.index}>{match[2]}</strong>)
      else if (match[0].startsWith('__')) parts.push(<span key={match.index} className="underline">{match[3]}</span>)
      else parts.push(<em key={match.index}>{match[4]}</em>)
      lastIndex = regex.lastIndex
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex))
    return parts
  }

  // Format description: supports array (new) or legacy /n /t string (old)
  const formatDescription = (text: string[] | string | undefined): ReactNode => {
    if (!text) return ''
    const paragraphs = Array.isArray(text) ? text : text.split('/n')
    return paragraphs.map((paragraph, index) => {
      const isIndented = /^[•●\-]\s|^\d+\.\s/.test(paragraph.trimStart())
      return (
        <p key={index} className={`mb-3 last:mb-0${isIndented ? ' pl-6' : ''}`}>
          {parseInline(paragraph)}
        </p>
      )
    })
  }

  const hasCarousel = Boolean(item.description_image && item.description_image.length > 1)
  const singleImage: string | null = item.description_image && item.description_image.length === 1
    ? item.description_image[0]
    : (!item.description_image && item.image ? item.image : null)

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? (item.description_image?.length ?? 1) - 1 : prev - 1))
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === (item.description_image?.length ?? 1) - 1 ? 0 : prev + 1))
  }

  // Category colors matching the main component
  const categoryColors: Record<string, string> = {
    BLOG: 'from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-300',
    NEWS: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/30 text-emerald-300',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="relative w-full h-full overflow-y-auto bg-[#0a1420] animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group backdrop-blur-md"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Body */}
        <div className="max-w-4xl mx-auto px-6 py-16 md:px-12 md:py-24">
          {/* Category Badge */}
          <div className="mb-6">
            <span
              className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r border text-xs font-bold uppercase tracking-wider ${categoryColors[item.category] || 'from-white/10 to-white/5 border-white/20 text-white'
                }`}
            >
              {item.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {item.title}
          </h1>

          {/* Date */}
          <p className="text-gray-400 text-lg mb-8">{item.date}</p>

          {/* Featured Image / Carousel */}
          {singleImage && (
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8 group">
              <img
                src={singleImage}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1420] via-transparent to-transparent" />

              {/* Expand Button */}
              <button
                onClick={() => setIsExpanded(true)}
                className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                aria-label="Expand image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          )}

          {hasCarousel && (
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8 group">
              <img
                src={item.description_image?.[currentImageIndex]}
                alt={`${item.title} - ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1420] via-transparent to-transparent" />

              {/* Previous Button */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Expand Button */}
              <button
                onClick={() => setIsExpanded(true)}
                className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                aria-label="Expand image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {item.description_image?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentImageIndex
                      ? 'bg-white scale-110'
                      : 'bg-white/40 hover:bg-white/60'
                      }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Expanded Lightbox */}
          {isExpanded && (hasCarousel || singleImage) && (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md"
              onClick={() => setIsExpanded(false)}
            >
              {/* Close Expanded */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
                aria-label="Close expanded view"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Counter (only for carousel) */}
              {hasCarousel && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
                  {currentImageIndex + 1} / {item.description_image?.length}
                </div>
              )}

              {/* Previous (only for carousel) */}
              {hasCarousel && (
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage() }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Image */}
              <img
                src={(hasCarousel ? item.description_image?.[currentImageIndex] : singleImage) ?? undefined}
                alt={`${item.title}${hasCarousel ? ` - ${currentImageIndex + 1}` : ''}`}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Next (only for carousel) */}
              {hasCarousel && (
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Dots (only for carousel) */}
              {hasCarousel && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {item.description_image?.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index) }}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentImageIndex
                        ? 'bg-white scale-110'
                        : 'bg-white/40 hover:bg-white/60'
                        }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-gray-300 leading-relaxed text-base md:text-lg">
              {formatDescription(item.description)}
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <button
              onClick={onClose}
              className="btn-gradient px-8 py-3 text-sm font-bold uppercase tracking-widest inline-flex items-center gap-2 group"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to All Posts
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsModal
