"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { m } from "framer-motion";

/**
 * ENTERPRISE BREADCRUMB SYSTEM
 * Automatically generates luxury navigation trails from URL segments
 */
export function AdminBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Skip the first "admin" segment for a cleaner look
  const displaySegments = segments.length > 1 ? segments.slice(1) : segments;

  return (
    <nav className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
      <Link 
        href="/admin"
        className="text-brand-charcoal/30 hover:text-brand-gold transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>

      {displaySegments.map((segment, idx) => {
        const path = `/admin/${displaySegments.slice(0, idx + 1).join("/")}`;
        const isLast = idx === displaySegments.length - 1;
        const title = segment.replace(/-/g, " ");

        return (
          <React.Fragment key={path}>
            <ChevronRight className="w-3 h-3 text-brand-charcoal/10 flex-shrink-0" />
            <m.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {isLast ? (
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold whitespace-nowrap">
                  {title}
                </span>
              ) : (
                <Link 
                  href={path}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/30 hover:text-brand-charcoal transition-colors whitespace-nowrap"
                >
                  {title}
                </Link>
              )}
            </m.div>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
