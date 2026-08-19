import type { MetadataRoute } from 'next'

const BASE_URL = 'https://imoveglobal.in'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/career-boost`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/course-overview`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/community`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/registration`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/exams`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/scholarships`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/study-abroad`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/commitments`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/news-and-blogs`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/faqs`, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
