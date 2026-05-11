"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { AnnouncementBar } from "./AnnouncementBar";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Optical", href: "/optical", hasDropdown: true },
  { name: "Sun", href: "/sun", hasDropdown: true },
  { name: "Brands", href: "/brands", hasDropdown: true },
  { name: "Lenses", href: "/lenses", hasDropdown: true },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Build a Pair", href: "/build", hasDropdown: true },
  { name: "Bundles", href: "/bundles", hasDropdown: true },
  { name: "Sale", href: "/sale", hasDropdown: false },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for background styles
      setIsScrolled(currentScrollY > 20);

      // Handle visibility (Hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -160 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
    >
      <AnnouncementBar />
      
      <nav className={cn(
        "w-full transition-all duration-500 border-b",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md py-3 border-black/5 shadow-sm" 
          : "bg-white py-6 border-transparent"
      )}>
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 -ml-2 text-brand-charcoal"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <span className="text-sm md:text-2xl tracking-[0.2em] md:tracking-[0.3em] font-light uppercase font-heading text-brand-charcoal whitespace-nowrap">
              Emirates<span className="font-medium text-brand-gold ml-1 md:ml-3">Opticians</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.name} className="group relative">
                <Link 
                  href={link.href}
                  className="flex items-center gap-1.5 text-[10px] xl:text-[11px] uppercase tracking-[0.25em] font-semibold text-brand-charcoal/80 hover:text-brand-charcoal transition-colors duration-300 whitespace-nowrap"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />}
                </Link>
                <motion.div 
                  className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold group-hover:w-full transition-all duration-500"
                />
              </li>
            ))}
            
            {/* CTA Button */}
            <li>
              <Link 
                href="/virtual-try-on"
                className="ml-2 px-5 py-2.5 bg-black text-white text-[9px] uppercase tracking-[0.25em] font-bold hover:bg-brand-gold transition-all duration-500 whitespace-nowrap inline-block"
              >
                Virtual Try-On
              </Link>
            </li>
          </ul>

          {/* Action Icons */}
          <div className="flex items-center gap-2 md:gap-6">
            <button className="p-1.5 md:p-2 text-brand-charcoal hover:text-brand-gold transition-colors duration-300">
              <Search className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5]" />
            </button>
            <button className="hidden md:block p-2 text-brand-charcoal hover:text-brand-gold transition-colors duration-300">
              <User className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button className="group relative p-1.5 md:p-2 text-brand-charcoal hover:text-brand-gold transition-colors duration-300">
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5]" />
              <span className="ml-0.5 md:ml-1 text-[9px] md:text-[11px] font-medium tracking-tighter">(0)</span>
            </button>
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
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl tracking-[0.2em] font-light uppercase">Emirates</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <ul className="flex flex-col gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl uppercase tracking-[0.1em] font-light flex justify-between items-center"
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-5 h-5" />}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8 border-t flex flex-col gap-6">
              <Link href="/account" className="flex items-center gap-4 text-sm tracking-widest uppercase">
                <User className="w-5 h-5" /> My Account
              </Link>
              <button className="w-full py-4 bg-black text-white uppercase tracking-widest text-sm">
                Virtual Try-On
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
