import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'

export const metadata: Metadata = {
  title: 'Imoveglobal | EGPT',
  description: 'Collaborate with Imoveglobal - Partner registration for individuals and institutes',
  icons: {
    icon: '/logo.png',
  },
  verification: {
    google: 'npMcG5dnB10iP099J8NUOuSIRerTpWznWcC-SB4RLxA',
  },
}

// Set data-theme before hydration to avoid any theme flash on first paint.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var theme=(t==='arctic-aurora')?t:'arctic-aurora';document.documentElement.setAttribute('data-theme',theme);}catch(e){document.documentElement.setAttribute('data-theme','arctic-aurora');}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Providers>
          <div className="min-h-screen bg-[#0a1420] flex flex-col">
            <Header />
            <main className="pt-20 pb-16 px-4 sm:px-6 max-w-full mx-auto flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
