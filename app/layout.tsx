import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/common/Footer";
import { PageTransition } from "@/components/motion/PageTransition";

import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Preloader } from "@/components/common/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Emirates Opticians | Luxury Eyewear",
  description: "Experience the finest eyewear with Emirates Opticians. Premium lenses, luxury frames, and expert care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.variable} ${playfair.variable} font-body`}>
        <Preloader />
        <SmoothScroll>
          <Navbar />
          <PageTransition>
            <main className="min-h-screen pt-[90px] md:pt-[110px]">
              {children}
            </main>
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
