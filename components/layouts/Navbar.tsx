"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, ChevronDown, Calendar, Menu, X, ArrowRight } from "lucide-react";
import { AnnouncementBar } from "./AnnouncementBar";
import { cn } from "@/lib/utils";
import { Interactive } from "@/components/ui/LuxuryButton";
import { EASE_LUXURY } from "@/lib/motion";

const NAV_LINKS = [
  { name: "Home", href: "/", hasDropdown: false },
  { name: "Shop", href: "/shop/optical", hasDropdown: true },
  { name: "Brands", href: "/brands", hasDropdown: true },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Branches", href: "/branches", hasDropdown: false },
  { name: "About", href: "/about", hasDropdown: false },
  { name: "Careers", href: "/careers", hasDropdown: false },
  { name: "Contact", href: "/contact", hasDropdown: false },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <AnnouncementBar />
      
      <nav className={cn(
        "w-full transition-all duration-700 ease-in-out border-b",
        isScrolled 
          ? "py-2 bg-white/80 backdrop-blur-xl border-black/5 shadow-sm" 
          : "py-6 bg-transparent border-transparent"
      )}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-4 lg:gap-8 xl:gap-12">
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-1 text-black"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo - Emirates Opticians */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
              <span className="text-lg md:text-2xl font-bold tracking-[-0.02em] text-black uppercase whitespace-nowrap">
                Emirates<span className="text-black/60 font-medium ml-1">Opticians</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-4 xl:gap-5">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="flex items-center gap-1 text-[10px] xl:text-[11px] font-bold text-black/80 hover:text-black transition-colors uppercase tracking-[0.05em] whitespace-nowrap"
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-3 h-3 opacity-40" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 xl:gap-8">
            {/* CTA - Book Eye Test */}
            <Link 
              href="/book-eye-test"
              className="hidden lg:flex items-center gap-2 px-5 py-2 bg-black text-white text-[10px] xl:text-[11px] font-bold hover:bg-black/80 transition-all whitespace-nowrap uppercase tracking-widest"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Eye Test
            </Link>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <Interactive hoverScale={1.1}>
                <Search className="w-5 h-5 text-black stroke-[1.5]" />
              </Interactive>
              <Interactive hoverScale={1.1} className="hidden md:block">
                <User className="w-5 h-5 text-black stroke-[1.5]" />
              </Interactive>
              <Interactive hoverScale={1.1} className="relative flex items-center gap-1">
                <ShoppingBag className="w-5 h-5 text-black stroke-[1.5]" />
                <span className="text-[12px] font-bold">(0)</span>
              </Interactive>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.6, ease: EASE_LUXURY }}
            className="fixed inset-0 z-[100] bg-white flex flex-col p-8 md:p-16 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl tracking-[-0.02em] font-bold uppercase">Emirates Opticians</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X className="w-8 h-8 stroke-[1.5]" />
              </button>
            </div>
            
            <nav className="flex-1">
              <ul className="flex flex-col gap-6 md:gap-8">
                {NAV_LINKS.map((link, idx) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl md:text-4xl uppercase font-bold tracking-tighter flex justify-between items-center group"
                    >
                      {link.name}
                      <ArrowRight className="w-6 h-6 opacity-40" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-12 pt-8 border-t border-black/5 flex flex-col gap-4">
              <Link href="/book-eye-test" className="w-full py-4 bg-black text-white uppercase tracking-widest text-sm font-bold flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Book Eye Test
              </Link>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                <span>Shop Local</span>
                <span>My Account</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
