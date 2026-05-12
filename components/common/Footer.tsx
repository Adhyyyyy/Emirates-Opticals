"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const FOOTER_LINKS = {
  inside: [
    { label: "Our Story", href: "#" },
    { label: "Meet the Visionists", href: "#" },
    { label: "Rewards Club", href: "#" },
    { label: "Reviews", href: "#" },
    { label: "Wholesale", href: "#" },
    { label: "Emirates Blog", href: "#" },
  ],
  support: [
    { label: "Frequently Asked Questions", href: "#" },
    { label: "Frame & Lens Warranties", href: "#" },
    { label: "Flex Spending (HSA/FSA)", href: "#" },
    { label: "Return Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Accessibility Statement", href: "#" },
    { label: "Privacy", href: "#" },
  ],
  connect: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Snapchat", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white text-black pt-24 pb-12 border-t border-black/5">
      <div className="container-tight">
        
        {/* Top Section: Links & Newsletter */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* Inside Column */}
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-widest mb-6">Inside Emirates</h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.inside.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-black/70 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-widest mb-6">Support</h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-black/70 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-widest mb-6">Connect</h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.connect.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-black/70 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-[13px] font-bold uppercase tracking-widest mb-6">Join the Vision-List</h4>
            <p className="text-sm text-black/70 mb-8 leading-relaxed">
              Sign up for inspiration and education on all things eyewear.
            </p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-black pb-3 text-sm focus:outline-none placeholder:text-black/30 transition-colors"
              />
              <button className="absolute right-0 bottom-3 text-sm font-bold uppercase tracking-widest hover:text-black/60 transition-colors">
                Sign Up
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section: Logo & Legal */}
        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6">
            {/* Geometric Bottom Icon (Same as TrustSection) */}
            <div className="relative w-10 h-6">
              <div className="absolute left-0 top-0 w-6 h-6 border-[1.5px] border-black rounded-full mix-blend-multiply" />
              <div className="absolute left-4 top-0 w-6 h-6 border-[1.5px] border-black rounded-full mix-blend-multiply" />
            </div>
            <span className="text-[11px] text-black/50 tracking-widest uppercase">
              © Emirates Opticians 2026
            </span>
          </div>

          <div className="flex items-center gap-8">
            <Link href="#" className="text-[11px] text-black/50 hover:text-black transition-colors uppercase tracking-widest">
              Terms & Conditions
            </Link>
            <Link href="#" className="text-[11px] text-black/50 hover:text-black transition-colors uppercase tracking-widest">
              Privacy Notice
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
