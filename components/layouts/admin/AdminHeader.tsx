"use client";

import React from "react";
import { useStore } from "@/store/useStore";
import { usePathname } from "next/navigation";
import { Bell, Search, User, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { AdminBreadcrumbs } from "./AdminBreadcrumbs";

interface AdminHeaderProps {
  userName: string | null;
  userRole: string;
}

export function AdminHeader({ userName, userRole }: AdminHeaderProps) {
  const pathname = usePathname();
  const { isSidebarOpen, setSidebarOpen } = useStore();

  // Generate breadcrumbs from pathname
  const segments = pathname.split('/').filter(Boolean);
  
  return (
    <header className="h-20 bg-white border-b border-black/5 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-8">
        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumbs System */}
        <div className="hidden sm:block">
          <AdminBreadcrumbs />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-3 bg-brand-pearl px-4 py-2 rounded-full border border-black/5 w-64 group focus-within:border-brand-gold transition-all">
          <Search className="w-4 h-4 text-brand-charcoal/30" />
          <input 
            type="text" 
            placeholder="Search Protocol..." 
            aria-label="Search dashboard intelligence"
            className="bg-transparent border-none outline-none text-[11px] font-medium w-full placeholder:text-black/10"
          />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4 pl-6 border-l border-black/5" role="region" aria-label="User Profile">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-tight text-brand-charcoal">{userName || "Administrator"}</p>
            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-brand-gold">{userRole.replace('_', ' ')}</p>
          </div>
          <div className="w-10 h-10 bg-brand-charcoal rounded-full flex items-center justify-center text-white border-2 border-brand-pearl">
             <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
