"use client";

import React, { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Compass, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuickContactBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal the sticky bar after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="fixed bottom-6 inset-x-4 sm:left-auto sm:right-6 sm:w-96 z-[999] pointer-events-none"
        >
          {/* Premium Black Shell */}
          <div className="w-full bg-[#0D0D0D] border border-[#C9A84C]/60 p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex items-center justify-between gap-4 pointer-events-auto relative overflow-hidden">
            


            {/* Left: Contact Info */}
            <div className="flex flex-col gap-0.5 select-none">
              <span className="text-[7px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]">
                Emirates Optician
              </span>
              <span className="text-[10px] font-medium text-white/80 tracking-wide uppercase">
                Direct Assistance
              </span>
            </div>

            {/* Middle: Actions Dock */}
            <div className="flex items-center gap-2">
              
              {/* Call hotline */}
              <a
                href="tel:+919988674574"
                className="w-10 h-10 rounded-xl bg-white hover:bg-[#C9A84C] text-black hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg group"
                title="Call Now"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              {/* WhatsApp enquiry */}
              <a
                href="https://wa.me/919988674574?text=Hi%20Emirates%20Optician%2C%20I%20would%20like%20to%20chat%20with%20an%20expert%20stylist."
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-black/40 hover:bg-[#C9A84C] border border-white/10 text-white hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg group"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A84C] group-hover:text-white group-hover:scale-110 transition-transform" />
              </a>

              {/* Directions */}
              <button
                onClick={() => {
                  const target = document.getElementById("boutique-locator");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = "/branches";
                  }
                }}
                className="w-10 h-10 rounded-xl bg-black/40 hover:bg-[#C9A84C] border border-white/10 text-white hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg group"
                title="Find Boutique"
              >
                <Compass className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>

            </div>

            {/* Dismiss trigger */}
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/80 border border-white/20 hover:border-[#C9A84C] flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer shadow-lg"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>

          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
