"use client";

import { motion } from "framer-motion";

export function AnnouncementBar() {
  return (
    <div className="w-full bg-brand-pearl border-b border-black/5 py-1.5 md:py-2 px-4 md:px-6">
      <div className="max-w-[1800px] mx-auto flex justify-between items-center text-[9px] md:text-[11px] tracking-[0.1em] md:tracking-[0.15em] uppercase font-medium text-brand-charcoal/80">
        <div className="hidden md:block flex-1" />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center flex-[2] md:flex-1 px-2"
        >
          Flex Spending Accepted: Use your FSA/HSA cards.
        </motion.p>
        <div className="hidden md:flex flex-1 justify-end gap-6">
          <button className="hover:text-brand-gold transition-colors duration-300">Shop Local</button>
        </div>
      </div>
    </div>
  );
}
