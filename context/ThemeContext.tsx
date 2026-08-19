'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface ThemeConfig {
  name: string
  primary: string
  accent: string
  secondary: string
  glow: string
  glowHover: string
}

// Theme configurations for 8 aesthetic themes
export const themes: Record<string, ThemeConfig> = {
  'arctic-aurora': {
    name: 'Arctic Aurora',
    primary: '#0284c7',
    accent: '#38bdf8',
    secondary: '#0369a1',
    glow: 'rgba(2, 132, 199, 0.4)',
    glowHover: 'rgba(2, 132, 199, 0.6)',
  },
}

export interface ThemeContextValue {
  theme: string
  setTheme: (theme: string) => void
  themeConfig: ThemeConfig
  themeList: Array<{ key: string } & ThemeConfig>
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window === 'undefined') return 'arctic-aurora'
    const saved = localStorage.getItem('theme')
    return saved && themes[saved] ? saved : 'arctic-aurora'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const themeConfig = themes[theme]
  const themeList = Object.entries(themes).map(([key, value]) => ({
    key,
    ...value,
  }))

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeConfig, themeList }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
