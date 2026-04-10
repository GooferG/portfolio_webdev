import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Luiz Meneghim — Web Developer & AI Engineer',
    template: '%s | Luiz Meneghim',
  },
  description:
    'I build things for the web — and teach machines to think. Web development, AI consulting, LLM engineering, and freelance tech services.',
  openGraph: {
    title: 'Luiz Meneghim — Web Developer & AI Engineer',
    description:
      'Web development, AI consulting, LLM engineering, and freelance tech services.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
