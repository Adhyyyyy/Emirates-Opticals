import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/common/Footer";
import { PageTransition } from "@/components/motion/PageTransition";

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
        <Navbar />
        <PageTransition>
          <main className="min-h-screen pt-[55px] md:pt-[70px]">
            {children}
          </main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
