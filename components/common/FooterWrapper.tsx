"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function FooterWrapper() {
  const pathname = usePathname();

  // Hide footer on /shop and /product/* pages
  if (pathname === "/shop" || pathname?.startsWith("/shop") || pathname?.startsWith("/product/")) {
    return null;
  }

  return <Footer />;
}
