"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, MapPin, Phone, Mail } from "lucide-react";

// Inline Social SVGs
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white pt-20 pb-8 border-t border-white/5" id="main-footer">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* Top Grid Segment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="flex flex-col items-start lg:pr-8">
            <Link href="/" className="group mb-6 block">
              <Image 
                src="/assets/emirates_logo.png" 
                alt="Emirates Optician" 
                width={180} 
                height={50} 
                className="h-9 lg:h-11 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-[1.02]" 
              />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed font-light mb-8">
              Kerala's premier destination for luxury eyewear, precision optometry, and exclusive designer collections.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/emiratesoptician_opticals?igsh=c2E1ZWNwcGQ0eWl1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-[#C9A84C] hover:text-[#0A0A0A] hover:border-[#C9A84C] transition-all duration-300">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61576396662769" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-[#C9A84C] hover:text-[#0A0A0A] hover:border-[#C9A84C] transition-all duration-300">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://wa.me/919988674574" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-[#C9A84C] hover:text-[#0A0A0A] hover:border-[#C9A84C] transition-all duration-300">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-bold mb-6">
              Explore
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/about" className="text-sm text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block w-fit font-light">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-sm text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block w-fit font-light">
                  Luxury Brands
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block w-fit font-light">
                  Eye Care Services
                </Link>
              </li>
              <li>
                <Link href="/branches" className="text-sm text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block w-fit font-light">
                  Boutique Locator
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Link href="/careers" className="text-sm text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block w-fit font-light">
                  Careers
                </Link>
                <span className="text-[9px] bg-white/10 text-white uppercase tracking-[0.1em] px-2 py-0.5 rounded-[2px] font-bold">
                  Hiring
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-bold mb-6">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-4 h-4 text-neutral-500 group-hover:text-white mt-1 shrink-0 transition-colors" />
                <span className="text-sm text-neutral-400 leading-relaxed font-light">
                  Manjippuzha Tower,<br />
                  Mathumoola, Changanassery,<br />
                  Kerala 686103
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="w-4 h-4 text-neutral-500 group-hover:text-white shrink-0 transition-colors" />
                <a href="tel:+919988674574" className="text-sm text-neutral-400 hover:text-white transition-colors font-light">
                  +91 99886 74574
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-4 h-4 text-neutral-500 group-hover:text-white shrink-0 transition-colors" />
                <a href="mailto:emiratesofficial1969@gmail.com" className="text-sm text-neutral-400 hover:text-white transition-colors font-light">
                  emiratesofficial1969@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Action */}
          <div className="flex flex-col items-start">
            <div className="bg-white/5 border border-white/10 p-6 rounded-[3px] w-full text-center">
              <h4 className="text-lg font-heading tracking-tight text-white mb-2">
                Vision Care Priority
              </h4>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                Schedule a comprehensive eye test with our certified optometrists today.
              </p>
              <Link 
                href="/book-eye-test" 
                className="w-full bg-[#C9A84C] text-[#0A0A0A] text-[10px] md:text-[11px] uppercase tracking-[0.2em] py-4 rounded-[3px] font-bold hover:bg-[#B8952E] hover:text-white transition-colors duration-500 flex items-center justify-center shadow-lg"
              >
                Book Appointment
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar segment */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-xs text-neutral-500 gap-4">
          <span className="font-light">
            &copy; {currentYear} Emirates Optician. All rights reserved.
          </span>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors font-light">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors font-light">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
