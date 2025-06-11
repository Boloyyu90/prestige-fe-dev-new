import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { AppProviders } from '@/shared/providers/app-providers'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Prestige Academy - Platform Tryout CASN Terpercaya',
    template: '%s | Prestige Academy'
  },
  description: 'Platform tryout online untuk persiapan ujian CASN dengan sistem CAT yang terintegrasi',
  keywords: ['tryout', 'CASN', 'CPNS', 'PPPK', 'CAT', 'ujian online'],
  authors: [{ name: 'Prestige Academy' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Prestige Academy',
  },
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
    <body className={`${poppins.variable} font-sans antialiased`}>
    <AppProviders>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </AppProviders>
    </body>
    </html>
  )
}