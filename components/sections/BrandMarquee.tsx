"use client";

import React from "react";

const BRANDS = [
  "Ray-Ban", "Oliver Peoples", "DITA", "Cartier", "Gucci", "Prada",
  "Maui Jim", "Tom Ford", "Chrome Hearts", "Oakley", "Lindberg", "Persol",
];

export function BrandMarquee() {
  // Duplicate for seamless infinite loop
  const display = [...BRANDS, ...BRANDS];

  return (
    <div className="w-full bg-brand-charcoal border-t border-white/5 border-b border-b-white/5 overflow-hidden py-4 select-none">
      <div
        className="flex gap-12 items-center"
        style={{
          animation: "marquee-scroll 28s linear infinite",
          width: "max-content",
        }}
      >
        {display.map((brand, idx) => (
          <div key={idx} className="flex items-center gap-12 shrink-0">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/40 hover:text-brand-gold transition-colors duration-300 whitespace-nowrap cursor-default"
            >
              {brand}
            </span>
            <span className="text-brand-gold/20 text-lg font-thin">âœ¦</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
