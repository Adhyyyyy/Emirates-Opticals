"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How quickly will branches respond?",
    a: "Our branch teams typically respond within 30 minutes during business hours. For urgent enquiries, we recommend calling the branch directly."
  },
  {
    q: "Can I directly WhatsApp a branch?",
    a: "Yes, you can use our Smart Contact form to route a message to a specific branch, or use the WhatsApp buttons in the Branch Showcase section."
  },
  {
    q: "How do I book an eye test?",
    a: "You can book a free eye test by visiting our dedicated 'Book Eye Test' page or by contacting your nearest branch via WhatsApp."
  },
  {
    q: "Can I enquire about product availability?",
    a: "Absolutely. Simply select the branch nearest to you in our contact form and mention the brand or model you are looking for."
  },
  {
    q: "Can I contact multiple branches?",
    a: "You can send separate enquiries to different branches. However, for general Kerala-wide enquiries, you can select any branch and our team will guide you."
  }
];

export function ContactFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="w-full bg-white section-padding overflow-hidden">
      <div className="container-tight">
        
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading">
              Enquiry <em className="italic text-brand-gold">FAQ</em>
            </h2>
          </Reveal>
        </div>

        <div className="max-w-4xl mx-auto">
          <GridStagger className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <StaggerItem key={idx}>
                  <div className={`border border-black/5 transition-all duration-700 ${isOpen ? 'bg-brand-pearl border-brand-gold/20' : 'bg-white'}`}>
                    <button 
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="w-full px-8 md:px-12 py-8 flex items-center justify-between group text-left"
                    >
                      <h3 className="text-lg md:text-xl font-normal text-brand-charcoal uppercase tracking-tighter group-hover:tracking-normal transition-all duration-700">
                        {faq.q}
                      </h3>
                      <div className={`p-2 rounded-full border border-black/5 transition-all duration-500 ${isOpen ? 'bg-brand-gold text-white rotate-180' : 'group-hover:bg-brand-charcoal group-hover:text-white'}`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                        >
                          <div className="px-8 md:px-12 pb-10 pt-2">
                            <p className="text-brand-charcoal/60 font-light leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                </StaggerItem>
              );
            })}
          </GridStagger>
        </div>

      </div>
    </section>
  );
}
