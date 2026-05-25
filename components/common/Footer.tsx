"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-8 border-t border-white/10" id="main-footer">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        
        {/* Top Grid Segment */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex flex-col items-start leading-none gap-0.5 group">
              <span className="font-heading text-xl lg:text-2xl font-bold tracking-tight text-white uppercase transition-colors group-hover:text-amber-400">
                EMIRATES
              </span>
              <span className="font-sans text-[9px] lg:text-[10px] uppercase tracking-[0.25em] text-neutral-400 group-hover:text-white transition-colors">
                OPTICIANS
              </span>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed mt-4 max-w-[220px]">
              Leading eyewear & sunglasses specialist in Kerala. Authentic brands, professional eye testing, and expert styling across multiple locations.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 font-medium mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/about" className="text-sm text-neutral-400 hover:text-white transition leading-loose cursor-pointer block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-neutral-400 hover:text-white transition leading-loose cursor-pointer block">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-sm text-neutral-400 hover:text-white transition leading-loose cursor-pointer block">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/branches" className="text-sm text-neutral-400 hover:text-white transition leading-loose cursor-pointer block">
                  Branches
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-neutral-400 hover:text-white transition leading-loose cursor-pointer block">
                  Careers
                </Link>
                <div className="text-[10px] text-amber-400 uppercase tracking-[0.1em] mt-1 select-none">
                  We are hiring
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 font-medium mb-5">
              Services
            </h4>
            <ul className="flex flex-col gap-2">
              <li className="text-sm text-neutral-400 hover:text-white transition leading-loose cursor-pointer">
                Free Eye Testing
              </li>
              <li className="text-sm text-neutral-400 hover:text-white transition leading-loose cursor-pointer">
                Quality Lenses
              </li>
              <li className="text-sm text-neutral-400 hover:text-white transition leading-loose cursor-pointer">
                Frames & Styling
              </li>
              <li className="text-sm text-neutral-400 hover:text-white transition leading-loose cursor-pointer">
                Sunglasses
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Hotline & Action */}
          <div className="flex flex-col items-start">
            <h4 className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 font-medium mb-5">
              Hotline Contact
            </h4>
            <a 
              href="tel:+919682929968" 
              className="text-xl font-light text-white hover:text-amber-400 transition block"
            >
              +91 96829 29968
            </a>
            
            <Link 
              href="/branches" 
              className="mt-4 bg-white text-neutral-950 text-xs uppercase tracking-[0.15em] px-6 py-3 rounded-full font-medium hover:bg-amber-400 hover:text-neutral-950 transition duration-300 inline-flex items-center justify-center"
            >
              Book Eye Test
            </Link>
          </div>

        </div>

        {/* Bottom Bar segment */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-[11px] text-neutral-600 gap-4">
          <span>
            © 2026 Emirates Opticians. All rights reserved.
          </span>

          <div className="flex items-center gap-6">
            <Link href="/about" className="text-neutral-500 hover:text-white transition">
              About
            </Link>
            <Link href="/contact" className="text-neutral-500 hover:text-white transition">
              Contact
            </Link>
            <Link href="/careers" className="text-neutral-500 hover:text-white transition">
              Careers
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
