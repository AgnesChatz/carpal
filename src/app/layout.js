import { Inter } from 'next/font/google';
import './app.css';
import { Providers } from '@/components/Providers';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { OfflineIndicator } from '@/components/ui';
import { ExtensionGuard } from '@/components/ExtensionGuard';

const inter = Inter({ subsets: ['latin', 'greek'] });

export const metadata = {
  metadataBase: new URL('https://carpal.gr'),
  title: {
    default: 'carpal - Μοιραστείτε τη διαδρομή σας',
    template: '%s | carpal'
  },
  description: 'Βρείτε ή προσφέρετε διαδρομές carpooling στη Θεσσαλονίκη. Οικονομικές, φιλικές προς το περιβάλλον μετακινήσεις για καθημερινές διαδρομές.',
  keywords: ['carpool', 'carpooling', 'ride sharing', 'Θεσσαλονίκη', 'μετακινήσεις', 'οδηγοί', 'επιβάτες'],
  authors: [{ name: 'carpal' }],
  creator: 'carpal',
  publisher: 'carpal',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'el_GR',
    url: 'https://carpal.gr',
    siteName: 'carpal',
    title: 'carpal - Μοιραστείτε τη διαδρομή σας',
    description: 'Βρείτε ή προσφέρετε διαδρομές carpooling στη Θεσσαλονίκη. Οικονομικές, φιλικές προς το περιβάλλον μετακινήσεις.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'carpal - Carpooling στη Θεσσαλονίκη',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'carpal - Μοιραστείτε τη διαδρομή σας',
    description: 'Βρείτε ή προσφέρετε διαδρομές carpooling στη Θεσσαλονίκη.',
    images: ['/og-image.jpg'],
    creator: '@carpal_gr',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#2563eb',
      },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://carpal.gr',
    languages: {
      'el-GR': 'https://carpal.gr',
      'en-US': 'https://carpal.gr/en',
    },
  },
  category: 'transportation',
  classification: 'Carpooling Service',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="el" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'carpal',
              url: 'https://carpal.gr',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://carpal.gr/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
              description: 'Υπηρεσία carpooling για τη Θεσσαλονίκη',
              inLanguage: 'el-GR',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'carpal',
              url: 'https://carpal.gr',
              logo: 'https://carpal.gr/logo.png',
              sameAs: [
                'https://twitter.com/carpal_gr',
                'https://www.instagram.com/carpal.gr',
                'https://www.linkedin.com/company/carpal',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'support@carpal.gr',
                contactType: 'customer support',
                availableLanguage: ['Greek', 'English'],
              },
            }),
          }}
        />
        <ExtensionGuard />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <Providers>
          <OfflineIndicator />
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
