"use client";

import React, { useState, useEffect } from "react";
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
    ? `[${offers[currentIndex].percentage}] ${offers[currentIndex].title} — ${offers[currentIndex].description}`
    : "Flex Spending Accepted: Use your FSA/HSA cards on Emirates Opticians.";

  const ctaText = "EXPLORE SHOWROOMS";
  const ctaLink = "/branches";

  return (
    <div className="announcement-bar-wrap w-full bg-white border-b border-black/5 text-[#0A0A0A] h-[36px] flex items-center overflow-hidden relative px-8 z-50">
      
      {/* Scrolling Ticker */}
      <div className="flex-1 overflow-hidden">
        <div className="announcement-ticker flex whitespace-nowrap items-center">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.08em] text-[#0A0A0A] mr-20">
            {activeText} &nbsp;•&nbsp; <a href={ctaLink} className="underline font-bold">{ctaText}</a>
          </span>
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.08em] text-[#0A0A0A] mr-20">
            {activeText} &nbsp;•&nbsp; <a href={ctaLink} className="underline font-bold">{ctaText}</a>
          </span>
        </div>
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
