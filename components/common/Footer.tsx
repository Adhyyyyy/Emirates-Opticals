"use client";

import React from "react";
import Link from "next/link";
import { Phone, ArrowRight, Sparkles, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white text-black pt-24 pb-12 border-t border-black/5 relative overflow-hidden" id="main-footer">
      <div className="absolute inset-0 noise-overlay opacity-[0.02] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        
        {/* Top Segment: Brand & Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-24">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col items-start max-w-sm">
            <Link href="/" className="flex flex-col items-start leading-none gap-0.5 mb-6 group">
              <span className="font-heading text-xl lg:text-2xl font-bold tracking-tight text-brand-charcoal uppercase transition-colors group-hover:text-brand-gold">
                EMIRATES
              </span>
              <span className="font-sans text-[9px] lg:text-[10px] uppercase tracking-[0.25em] text-brand-charcoal/80 group-hover:text-brand-charcoal transition-colors">
                OPTICIANS
              </span>
            </Link>
            <p className="text-xs text-brand-charcoal/50 font-light leading-relaxed mb-6">
              Leading eyewear & sunglasses specialist in Kerala. Authentic brands, professional eye testing, and expert styling across multiple locations.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/30 mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3.5">
              <li>
                <Link href="/about" className="text-xs font-light text-brand-charcoal/70 hover:text-brand-charcoal transition-colors uppercase tracking-wider">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-xs font-light text-brand-charcoal/70 hover:text-brand-charcoal transition-colors uppercase tracking-wider">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-xs font-light text-brand-charcoal/70 hover:text-brand-charcoal transition-colors uppercase tracking-wider">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/branches" className="text-xs font-light text-brand-charcoal/70 hover:text-brand-charcoal transition-colors uppercase tracking-wider">
                  Branches
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Link href="/careers" className="text-xs font-light text-brand-charcoal/70 hover:text-brand-charcoal transition-colors uppercase tracking-wider">
                  Careers
                </Link>
                <span className="bg-brand-gold text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-full tracking-widest leading-none scale-90">
                  Hiring
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/30 mb-6">Services</h4>
            <ul className="flex flex-col gap-3.5">
              <li className="text-xs font-light text-brand-charcoal/70 uppercase tracking-wider">
                Free Eye Testing
              </li>
              <li className="text-xs font-light text-brand-charcoal/70 uppercase tracking-wider">
                Quality Lenses
              </li>
              <li className="text-xs font-light text-brand-charcoal/70 uppercase tracking-wider">
                Frames & Styling
              </li>
              <li className="text-xs font-light text-brand-charcoal/70 uppercase tracking-wider">
                Sunglasses
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Hotline & Action */}
          <div className="flex flex-col items-start">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/30 mb-6">Hotline Contact</h4>
            <a 
              href="tel:+919682929968" 
              className="group flex items-center gap-3 mb-6 hover:text-brand-gold transition-colors duration-500"
            >
              <div className="p-3 bg-brand-pearl border border-black/5 rounded-full group-hover:bg-brand-gold group-hover:text-white transition-colors duration-500">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-brand-charcoal/40 font-bold">Call Us</span>
                <span className="text-sm font-bold tracking-wider text-brand-charcoal group-hover:text-brand-gold transition-colors font-sans">
                  9682929968
                </span>
              </div>
            </a>
            
            <Link 
              href="/branches" 
              className="w-full bg-brand-charcoal hover:bg-brand-gold text-white font-bold text-[9px] uppercase tracking-widest py-3 px-5 rounded-xl shadow-lg transition-all duration-500 flex items-center justify-center gap-2 group/btn"
            >
              <span>Book Eye Test</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

        {/* Bottom Segment: Copyright & Logo */}
        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6">
            <div className="relative w-10 h-6">
              <div className="absolute left-0 top-0 w-6 h-6 border-[1.5px] border-brand-charcoal rounded-full mix-blend-multiply opacity-25" />
              <div className="absolute left-4 top-0 w-6 h-6 border-[1.5px] border-brand-charcoal rounded-full mix-blend-multiply opacity-25" />
            </div>
            <span className="text-[10px] text-brand-charcoal/40 font-light tracking-wider">
              © 2026 Emirates Optician. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/about" className="text-[10px] text-brand-charcoal/40 hover:text-brand-charcoal transition-colors uppercase tracking-widest font-light">
              About
            </Link>
            <Link href="/contact" className="text-[10px] text-brand-charcoal/40 hover:text-brand-charcoal transition-colors uppercase tracking-widest font-light">
              Contact
            </Link>
            <Link href="/careers" className="text-[10px] text-brand-charcoal/40 hover:text-brand-charcoal transition-colors uppercase tracking-widest font-light">
              Careers
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
