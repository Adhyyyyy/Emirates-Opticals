"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
import { m } from "framer-motion";

interface WhatsAppButtonProps {
  phone: string;
  message: string;
  label?: string;
  variant?: "primary" | "outline" | "sticky";
  className?: string;
  iconOnly?: boolean;
}

export function WhatsAppButton({ 
  phone, 
  message, 
  label = "Chat on WhatsApp", 
  variant = "primary",
  className,
  iconOnly = false
}: WhatsAppButtonProps) {
  
  const handleChat = () => {
    const url = generateWhatsAppUrl(phone, message);
    window.open(url, "_blank");
  };

  const variants = {
    primary: "bg-[#25D366] text-white hover:bg-[#128C7E] shadow-xl",
    outline: "border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white",
    sticky: "fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95"
  };

  if (variant === "sticky") {
    return (
      <m.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleChat}
        className={cn(variants.sticky, className)}
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </m.button>
    );
  }

  return (
    <button
      onClick={handleChat}
      className={cn(
        "flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-500",
        variants[variant],
        className
      )}
    >
      <MessageCircle className="w-4 h-4" />
      {!iconOnly && <span>{label}</span>}
    </button>
  );
}
