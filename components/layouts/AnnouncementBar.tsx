"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getOffers } from "@/actions/cms-marketing";
import { X } from "lucide-react";

interface AnnouncementBarProps {
  onDismissToggle?: (visible: boolean) => void;
}

export function AnnouncementBar({ onDismissToggle }: AnnouncementBarProps) {
  const [offers, setOffers] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    async function loadOffers() {
      const data = await getOffers();
      if (data && data.length > 0) {
        const now = new Date();
        const active = data.filter((o: any) => {
          if (!o.isActive) return false;
          if (o.startDate && new Date(o.startDate) > now) return false;
          if (o.endDate && new Date(o.endDate) < now) return false;
          return true;
        });
        setOffers(active);
      }
    }
    loadOffers();
  }, []);

  useEffect(() => {
    if (offers.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [offers]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismissToggle) {
      onDismissToggle(false);
    }
  };

  if (!mounted || !isVisible) return null;

  // Exact fallback if no active offers, or dynamic text if offers exist
  const activeText = offers.length > 0 
    ? `${offers[currentIndex].title}: ${offers[currentIndex].description} — CODE: ${offers[currentIndex].promoCode}`
    : "Flex Spending Accepted: Use your FSA/HSA cards on Emirates Opticians.";

  return (
    <div className="w-full bg-[#C9A84C] text-[#0A0A0A] h-[36px] flex items-center justify-center relative px-8 z-50">
      
      {/* Centered Announcement Message */}
      <div className="flex items-center justify-center gap-3 text-[12px] font-sans font-medium uppercase tracking-[0.1em] text-center w-full">
        <div className="relative overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="truncate max-w-[280px] sm:max-w-none text-[#0A0A0A]"
            >
              {activeText}
            </motion.span>
          </AnimatePresence>
        </div>

        <a 
          href="/offers" 
          className="underline font-bold text-[#0A0A0A] hover:text-black transition-colors shrink-0 ml-1"
        >
          CLAIM OFFER
        </a>
      </div>

      {/* Dismiss Button on Right Edge */}
      <button
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0A0A0A] hover:text-black/60 transition-colors p-1"
        aria-label="Dismiss Announcement"
      >
        <X className="w-4 h-4 stroke-[2]" />
      </button>

    </div>
  );
}
