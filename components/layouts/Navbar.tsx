"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { Calendar, Menu, X, ArrowRight, Search, Heart, User } from "lucide-react";
import { AnnouncementBar } from "./AnnouncementBar";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Brands", href: "/brands" }, 
  { name: "Services", href: "/services" },
  { name: "Branches", href: "/branches" },
  { name: "About", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
  
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full flex flex-col pointer-events-none">
      
      {/* 1. Gold Announcement bar wrapper */}
      <div className="pointer-events-auto w-full">
        <AnnouncementBar onDismissToggle={(visible) => setIsAnnouncementVisible(visible)} />
      </div>
      
      {/* 2. Main Luxury Navbar Panel */}
      <nav 
        className={cn(
          "w-full transition-all duration-300 ease-in-out border-b pointer-events-auto flex items-center justify-between px-6 lg:px-12",
          isScrolled 
            ? "bg-white/95 backdrop-blur-[20px] border-black/10 h-[56px] lg:h-[64px]" 
            : "bg-white/70 backdrop-blur-[16px] border-black/5 h-[64px] lg:h-[72px]"
        )}
      >
        {/* Symmetrical Left: Logo Branding */}
        <div className="flex items-center justify-start shrink-0">
          <Link href="/" className="flex flex-col items-start leading-none gap-0.5 group">
            <span className="font-heading text-[20px] lg:text-[22px] font-bold tracking-tight text-black uppercase transition-colors group-hover:text-[#C9A84C]">
              EMIRATES
            </span>
            <span className="font-sans text-[9px] lg:text-[11px] uppercase tracking-[0.25em] text-black/80 group-hover:text-black transition-colors">
              OPTICIANS
            </span>
          </Link>
        </div>

        {/* Symmetrical Center: Navigation list */}
        <ul className="hidden lg:flex items-center justify-center gap-7 xl:gap-9 mx-6 h-full">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name} className="relative flex items-center h-full">
                <Link 
                  href={link.href}
                  className={cn(
                    "text-[10.5px] font-sans font-medium uppercase tracking-[0.2em] transition-all duration-500 py-2 relative block",
                    "after:content-[''] after:absolute after:bottom-[-2px] after:left-1/2 after:w-0 after:h-[1.5px] after:bg-[#C9A84C] after:transition-all after:duration-500 hover:after:w-full hover:after:left-0",
                    isActive 
                      ? "text-[#C9A84C] after:w-full after:left-0 font-semibold" 
                      : "text-black/80 hover:text-[#C9A84C]"
                  )}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Symmetrical Right: Action tools */}
        <div className="flex items-center justify-end gap-5 lg:gap-6 shrink-0">
          
    

          {/* Responsive Luxury "BOOK EYE TEST" CTA */}
          <Link 
            href="/book-eye-test"
            className="inline-flex items-center justify-center bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#B8952E] hover:text-white px-4 md:px-6 h-[36px] lg:h-[48px] text-[10px] lg:text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-300 rounded-[3px] whitespace-nowrap shadow-md lg:shadow-lg"
          >
            <span className="lg:hidden">Book</span>
            <span className="hidden lg:inline">Book Eye Test</span>
          </Link>

          <button 
            className="lg:hidden p-1 text-black hover:text-[#C9A84C] transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-7 h-7 stroke-[1.5]" />
          </button>

        </div>
      </nav>

      {/* 3. Mobile Fullscreen Overlay Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#FAF9F6] flex flex-col p-6 md:p-12 overflow-y-auto pointer-events-auto"
          >
            {/* Header branding in Drawer */}
            <div className="flex justify-between items-center mb-16">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-start leading-none gap-0.5">
                <span className="font-heading text-[20px] font-bold tracking-tight text-black uppercase">
                  EMIRATES
                </span>
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-black/80">
                  OPTICIANS
                </span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="p-2 text-black hover:text-[#C9A84C] transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-8 h-8 stroke-[1.5]" />
              </button>
            </div>
            
            {/* Drawer stacked links */}
            <nav className="flex-1 flex flex-col justify-center py-6">
              <ul className="flex flex-col gap-1 text-left">
                {NAV_LINKS.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <m.li 
                      key={link.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <Link 
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "text-[14px] sm:text-[16px] font-sans font-normal uppercase tracking-[0.22em] transition-all duration-300 flex items-center justify-between py-4 border-b border-black/[0.04]",
                          isActive 
                            ? "text-[#C9A84C] font-semibold border-b-[#C9A84C]/30 pl-2" 
                            : "text-black/80 hover:text-[#C9A84C] hover:pl-2"
                        )}
                      >
                        <div className="flex items-center">
                          <span className="text-[9px] font-sans font-bold text-[#C9A84C]/70 tracking-widest mr-4 select-none w-5">
                            {(idx + 1).toString().padStart(2, '0')}
                          </span>
                          <span>{link.name}</span>
                        </div>
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                        )}
                      </Link>
                    </m.li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile Actions bottom block */}
            <div className="mt-12 pt-8 border-t border-black/10 flex flex-col gap-6">
              <Link 
                href="/book-eye-test" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full h-[52px] bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#B8952E] hover:text-white uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 rounded-[3px] transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book Eye Test
              </Link>
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                <span>Shop Local</span>
                <span>My Account</span>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

    </header>
  );
}
