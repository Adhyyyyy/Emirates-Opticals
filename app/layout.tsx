import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/motion/PageTransition";

import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/common/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL('https://emiratesoptician.in'),
  title: {
    default: 'Emirates Opticians | Authentic Luxury Eyewear & Eye Testing Kerala',
    template: '%s | Emirates Opticians'
  },
  description: 'Experience authentic luxury eyewear, international boutique sunglasses, and computerized eye testing across our premium Kerala optician showrooms.',
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: 'Emirates Opticians | Premium Luxury Eyewear & Eye Testing Kerala',
    description: 'Explore authentic boutique sunglasses, frame styling consultations, and state-of-the-art optical computerized checks at Emirates Opticians across Kerala.',
    url: 'https://emiratesopticians.com',
    siteName: 'Emirates Opticians',
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: 'Emirates Opticians Luxury Showroom' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emirates Opticians | Premium Luxury Eyewear Kerala',
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
