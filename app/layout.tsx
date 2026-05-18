import type { Metadata } from 'next';
import { Geist, Big_Shoulders } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const bigShoulders = Big_Shoulders({
  subsets: ['latin'],
  variable: '--font-big-shoulders',
  display: 'swap',
  weight: ['700', '900'],
});

const SITE_URL = 'https://luizmeneghim.com'; // update if your domain differs
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Luiz Meneghim - Frontend Developer & AI Engineer',
    template: '%s | Luiz Meneghim',
  },
  description:
    'Frontend engineer and AI builder. I ship React + Next.js apps and wire LLMs into products that work.',
  openGraph: {
    title: 'Luiz Meneghim - Frontend Developer & AI Engineer',
    description:
      'Frontend engineer and AI builder. I ship React + Next.js apps and wire LLMs into products that work.',
    url: SITE_URL,
    siteName: 'Luiz Meneghim',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Luiz Meneghim — Frontend Developer & AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luiz Meneghim - Frontend Developer & AI Engineer',
    description:
      'Frontend engineer and AI builder. I ship React + Next.js apps and wire LLMs into products that work.',
    images: [OG_IMAGE],
    creator: '@Goofer_G',
  },
};

const themeInitScript = `
(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t='dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${bigShoulders.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
