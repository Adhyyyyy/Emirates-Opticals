"use client";

import { m } from "framer-motion";

const TRUST_HIGHLIGHTS = [
  "100% Authentic Brands",
  "Free Eye Testing",
  "Advanced Lenses",
  "Expert Styling",
  "Branches Across Kerala",
];

export function TrustStrip() {
  return (
    <section className="bg-brand-pearl border-y border-brand-charcoal/5 py-5 overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10">

          {/* Label */}
          <m.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/30 whitespace-nowrap shrink-0"
          >
            The Emirates Promise
          </m.span>

          {/* Divider */}
          <div className="hidden sm:block w-[1px] h-4 bg-brand-charcoal/10 shrink-0" />

          {/* Scrolling highlights */}
          <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start">
            {TRUST_HIGHLIGHTS.map((highlight, idx) => (
              <m.span
                key={highlight}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-charcoal/50 hover:text-brand-gold transition-colors cursor-default"
              >
                {highlight}
                {idx < TRUST_HIGHLIGHTS.length - 1 && (
                  <span className="ml-6 text-brand-charcoal/15">Â·</span>
                )}
              </m.span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
