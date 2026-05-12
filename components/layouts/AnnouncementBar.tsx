"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const CAMPAIGNS = [
  {
    text: "Flex Spending Accepted: New Year, New You: use your FSA/HSA cards on Emirates Opticians.",
    href: "/fsa-hsa",
  }
];

export function AnnouncementBar() {
  return (
    <div className="w-full bg-white border-b border-black/5 py-1.5 px-6">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        <div className="flex-1" />
        
        {/* Dynamic Campaign Center */}
        <div className="flex items-center justify-center">
          <span className="text-[9px] md:text-[10px] tracking-[0.05em] font-medium text-black leading-tight">
            {CAMPAIGNS[0].text}
          </span>
        </div>

        {/* Right utility */}
        <div className="flex-1 flex justify-end items-center">
          <button className="text-[9px] md:text-[10px] tracking-[0.05em] font-medium text-black hover:text-black/60 transition-colors">
            Shop Local
          </button>
        </div>
      </div>
    </div>
  );
}
