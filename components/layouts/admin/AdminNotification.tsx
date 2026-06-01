"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export function AdminNotification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const success = searchParams.get("success");
    if (success) {
      if (success === "created") {
        setNotification("Product established and synchronized successfully!");
      } else if (success === "updated") {
        setNotification("Product changes successfully saved and published!");
      }
      
      // Clean up the URL query parameter so refreshing doesn't show it again
      const params = new URLSearchParams(searchParams.toString());
      params.delete("success");
      const newQuery = params.toString() ? `?${params.toString()}` : "";
      router.replace(`${pathname}${newQuery}`);
      
      // Auto-dismiss after 4 seconds
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router, pathname]);

  return (
    <AnimatePresence>
      {notification && (
        <m.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-6 right-6 z-[9999] bg-[#0D0D0D] text-white px-6 py-4.5 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.25)] border border-[#C9A84C]/30 flex items-center gap-4 select-none min-w-[320px] max-w-md pointer-events-auto"
        >
          <div className="bg-[#C9A84C]/10 p-2.5 rounded-xl border border-[#C9A84C]/20 shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#C9A84C]" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#C9A84C]">SUCCESS CONTEXT</p>
            <p className="text-[11.5px] text-[#FAF9F6]/90 font-light mt-1 leading-relaxed">{notification}</p>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-white/30 hover:text-[#C9A84C] transition-colors p-1.5 shrink-0 ml-1.5"
            aria-label="Dismiss Notification"
          >
            <X className="w-4 h-4" />
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
