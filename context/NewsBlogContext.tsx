'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import newsBlogData from '@/content/news_blog.json'

export type NewsBlogData = typeof newsBlogData

export interface NewsBlogContextValue {
  newsBlogContent: NewsBlogData
  newsBlogIsLoading: boolean
}

const NewsBlogContext = createContext<NewsBlogContextValue | undefined>(undefined)

export const NewsBlogProvider = ({ children }: { children: ReactNode }) => {
  const [newsBlogContent] = useState<NewsBlogData>(newsBlogData)
  const [newsBlogIsLoading] = useState(false)

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

  const value: NewsBlogContextValue = {
    newsBlogContent,
    newsBlogIsLoading,
  }

  return (
    <NewsBlogContext.Provider value={value}>
      {children}
    </NewsBlogContext.Provider>
  )
}

export const useNewsBlog = (): NewsBlogContextValue => {
  const context = useContext(NewsBlogContext)
  if (!context) {
    throw new Error('useNewsBlog must be used within a NewsBlogProvider')
  }
  return context
}

export default NewsBlogContext
