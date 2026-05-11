import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layouts/Navbar";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

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
    <html lang="en" className={cn("antialiased", "font-sans", geist.variable)}>
      <body className={`${inter.variable} font-body`}>
        <Navbar />
        <main className="min-h-screen pt-[120px] md:pt-[140px]">
          {children}
        </main>
      </body>
    </html>
  );
}
