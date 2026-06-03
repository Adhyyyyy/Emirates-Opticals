import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../styles/globals.css";
import { PageTransition } from "@/components/motion/PageTransition";

import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/common/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL('https://emiratesoptician.in'),
  title: {
    default: 'Emirates Optician | Authentic Luxury Eyewear & Eye Testing Kerala',
    template: '%s | Emirates Optician'
  },
  description: 'Experience authentic luxury eyewear, international boutique sunglasses, and computerized eye testing across our premium Kerala optician showrooms.',
  icons: {
    icon: [
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: "/assets/favicon.ico",
    apple: "/assets/apple-touch-icon.png",
  },
  manifest: "/assets/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: 'Emirates Optician | Premium Luxury Eyewear & Eye Testing Kerala',
    description: 'Explore authentic boutique sunglasses, frame styling consultations, and state-of-the-art optical computerized checks at Emirates Optician across Kerala.',
    url: 'https://emiratesoptician.in',
    siteName: 'Emirates Optician',
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: 'Emirates Optician Luxury Showroom' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emirates Optician | Premium Luxury Eyewear Kerala',
    description: 'Authentic international eyewear brands and professional optometry checks across multiple showrooms.',
    images: ['/og-image.jpg'],
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
};

import { MotionProvider } from "@/components/motion/MotionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.variable} ${playfair.variable} font-body overflow-x-hidden`}>
        <MotionProvider>
          <Preloader />
          <SmoothScroll>
            <PageTransition>
              <main className="min-h-screen">
                {children}
              </main>
            </PageTransition>
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
