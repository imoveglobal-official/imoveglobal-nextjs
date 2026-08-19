'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import contentData from '@/content/content.json'

export type ContentData = typeof contentData

export interface ContentContextValue {
  content: ContentData
  isLoading: boolean
  brand: ContentData['brand']
  navigation: ContentData['navigation']
  cta: ContentData['cta']
  home: ContentData['home']
  egpt_primary: ContentData['egpt_primary']
  egpt_junior: ContentData['egpt_junior']
  egpt_senior: ContentData['egpt_senior']
  egpt_unite: ContentData['egpt_unite']
  egpt_braille: ContentData['egpt_braille']
  exams: ContentData['exams']
  studyAbroad: ContentData['studyAbroad']
  scholarships: ContentData['scholarships']
  reviews: ContentData['reviews']
}

const ContentContext = createContext<ContentContextValue | undefined>(undefined)

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content] = useState<ContentData>(contentData)
  const [isLoading] = useState(false)

  // This can be extended to fetch from an API in the future
  // useEffect(() => {
  //   setIsLoading(true)
  //   fetch('/api/content')
  //     .then(res => res.json())
  //     .then(data => {
  //       setContent(data)
  //       setIsLoading(false)
  //     })
  // }, [])

  const value: ContentContextValue = {
    content,
    isLoading,
    brand: content?.brand,
    navigation: content?.navigation,
    cta: content?.cta,
    home: content?.home,
    egpt_primary: content?.egpt_primary,
    egpt_junior: content?.egpt_junior,
    egpt_senior: content?.egpt_senior,
    egpt_unite: content?.egpt_unite,
    egpt_braille: content?.egpt_braille,
    exams: content?.exams,
    studyAbroad: content?.studyAbroad,
    scholarships: content?.scholarships,
    reviews: content?.reviews,
  }

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = (): ContentContextValue => {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}

export default ContentContext
