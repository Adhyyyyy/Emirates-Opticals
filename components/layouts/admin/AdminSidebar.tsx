"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { ADMIN_NAV_ITEMS } from "@/lib/admin/nav";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { ChevronLeft, LogOut, Shield } from "lucide-react";
import { signOut } from "@/actions/auth";

interface AdminSidebarProps {
  userRole: string;
}

export function AdminSidebar({ userRole }: AdminSidebarProps) {
  const pathname = usePathname();
  const { isSidebarOpen, setSidebarOpen } = useStore();

  const filteredNav = ADMIN_NAV_ITEMS.filter(item => 
    item.roles.includes(userRole as any)
  );

  return (
    <m.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 280 : 80 }}
      className="fixed left-0 top-0 bottom-0 bg-brand-charcoal text-white z-50 flex flex-col border-r border-white/5"
    >
      {/* Sidebar Header */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
        <AnimatePresence mode="wait">
          {isSidebarOpen ? (
            <m.div
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-brand-charcoal" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Emirates Control</span>
            </m.div>
          ) : (
            <m.div
              key="mini"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex justify-center"
            >
              <Shield className="w-5 h-5 text-brand-gold" />
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 scrollbar-hide">
        {filteredNav.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                isActive 
                  ? "bg-brand-gold text-brand-charcoal font-bold" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                isActive ? "text-brand-charcoal" : "text-brand-gold/60"
              )} />
              {isSidebarOpen && (
                <m.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[11px] uppercase tracking-widest"
                >
                  {item.title}
                </m.span>
              )}
              {isActive && isSidebarOpen && (
                <m.div 
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-charcoal"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5 space-y-4">
        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="w-full flex items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className={cn(
            "w-4 h-4 text-brand-gold transition-transform duration-500",
            !isSidebarOpen && "rotate-180"
          )} />
        </button>

        <form action={signOut}>
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all group">
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            {isSidebarOpen && (
              <span className="text-[11px] uppercase tracking-widest font-bold">End Session</span>
            )}
          </button>
        </form>
      </div>
    </m.aside>
  );
}
