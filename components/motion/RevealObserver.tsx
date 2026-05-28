"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * RevealObserver
 * Mounts an IntersectionObserver that adds the 'visible' class to any
 * element with the 'reveal' class when it enters the viewport.
 * CSS in globals.css handles the actual fade-up animation.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Once revealed, stop observing
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 100px 0px" }
    );

    // Observe all .reveal elements
    const observe = () => {
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    };

    observe();

    // Re-scan on route changes (for Next.js client navigation)
    const mutationObserver = new MutationObserver(observe);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Manually wake up all browser scroll & resize calculations for new page layout
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("resize"));
    }, 120);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
