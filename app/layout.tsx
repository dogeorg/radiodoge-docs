import { RootProvider } from 'fumadocs-ui/provider/next';
import '@/styles/global.css';
import { Comic_Neue } from 'next/font/google';
import { TopNav } from '@/components/layout/TopNav';

const comicNeue = Comic_Neue({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

const baseUrl = 'https://radio.dogecoin.org';

const siteTitle = 'RadioÐoge - Send and Receive Dogecoin transactions using radio waves. Such Learn!';
const siteDescription =
  'RadioDoge - Send and Receive Dogecoin transactions using radio waves without internet. Blockchain-like mesh network, LoRa technology, secure cold storage, web interface, and comprehensive API. Complete guide to installation, usage, and development. Much features, very wow!';
const ogTitle = 'RadioDoge - Send Dogecoin via Radio Waves';
const ogDescription =
  'RadioDoge enables Dogecoin transactions using radio waves without internet. Blockchain-like mesh network, LoRa technology, secure cold storage, web interface, and comprehensive REST API. Perfect for remote areas and financial inclusion.';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    'radiodoge',
    'dogecoin',
    'radio waves',
    'lora',
    'offline transactions',
    'mesh network',
    'blockchain',
    'cryptocurrency',
    'esp32',
    'heltec',
    'firmware',
    'cold storage',
    'wallet',
    'decentralized',
    'financial inclusion',
  ],
  authors: [{ name: 'Dogecoin Foundation' }],
  robots: 'index, follow',
  applicationName: 'RadioDoge',
  appleWebApp: {
    capable: true,
    title: 'RadioDoge',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    siteName: 'RadioDoge',
    title: ogTitle,
    description: ogDescription,
    url: baseUrl,
    images: [
      {
        url: '/img/social-card.png',
        width: 1200,
        height: 630,
        alt: ogTitle,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dogecoin',
    creator: '@dogecoin',
    title: ogTitle,
    description: ogDescription,
    images: ['/img/social-card.png'],
    imagesAlt: ogTitle,
  },
  alternates: { canonical: baseUrl },
  icons: {
    icon: '/img/radiodoge-logo-dark.png',
    apple: '/img/radiodoge-logo-dark.png',
  },
  other: {
    'article:section': 'Technology',
    'article:tag': 'RadioDoge, Dogecoin, LoRa, Offline Transactions, Mesh Network, Blockchain, ESP32, Financial Inclusion',
    'mobile-web-app-capable': 'yes',
    language: 'English',
    'geo.region': 'US',
    'geo.placename': 'United States',
  },
};

export const viewport = {
  themeColor: '#ffc107',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={comicNeue.className} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider search={{ enabled: true, options: { type: 'static' } }}>
          <TopNav />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
