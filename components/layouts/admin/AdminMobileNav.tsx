"use client";

import React from "react";
import { m, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { ADMIN_NAV_ITEMS } from "@/lib/admin/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminMobileNav({ userRole }: { userRole: string }) {
  const { isSidebarOpen, setSidebarOpen } = useStore();
  const pathname = usePathname();

  const filteredNav = ADMIN_NAV_ITEMS.filter(item => 
    item.roles.includes(userRole as any)
  );

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
          />

          {/* Drawer */}
          <m.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-brand-charcoal z-[70] md:hidden flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-brand-gold" />
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-white">Control</span>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 bg-white/5 rounded-full text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {filteredNav.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl transition-all",
                      isActive 
                        ? "bg-brand-gold text-brand-charcoal font-bold" 
                        : "text-white/40 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-[11px] uppercase tracking-widest">{item.title}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-8 border-t border-white/5">
               <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20">
                 Emirates Optician Enterprise
               </p>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
