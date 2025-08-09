import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import ErrorBoundary from './components/ErrorBoundary'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'School Management System',
  description: 'A comprehensive school management system built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins min-h-screen bg-gradient-to-br from-[#250c38] via-[#3c225a] to-slate-800 text-white`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
