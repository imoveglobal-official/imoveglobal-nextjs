'use client'

import { type ReactNode } from 'react'
import { ThemeProvider } from '@/context/ThemeContext'
import { ContentProvider } from '@/context/ContentContext'
import { NewsBlogProvider } from '@/context/NewsBlogContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ContentProvider>
        <NewsBlogProvider>{children}</NewsBlogProvider>
      </ContentProvider>
    </ThemeProvider>
  )
}
