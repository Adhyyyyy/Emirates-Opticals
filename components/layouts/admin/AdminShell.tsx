"use client";

import React from "react";
import { m } from "framer-motion";
import { useStore } from "@/store/useStore";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useStore();

  return (
    <m.div
      initial={false}
      animate={{ 
        marginLeft: isSidebarOpen ? 280 : 80,
        width: isSidebarOpen ? "calc(100% - 280px)" : "calc(100% - 80px)"
      }}
      className="flex-1 flex flex-col min-h-screen transition-all duration-300"
    >
      {children}
    </m.div>
  );
}
