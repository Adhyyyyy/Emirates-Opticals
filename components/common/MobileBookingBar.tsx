"use client";

import Link from "next/link";

export function MobileBookingBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-3 bg-[#0D0D0D] border-t border-[#C9A84C]/60 lg:hidden">
      <span className="text-[13px] text-white/50 font-light">Free Eye Testing Available</span>
      <Link
        href="/book-eye-test"
        className="bg-[#C9A84C] text-[#0D0D0D] text-[11px] font-bold uppercase tracking-[0.1em] px-5 py-2.5 rounded-[3px] hover:bg-[#B8952E] transition-colors whitespace-nowrap"
      >
        BOOK NOW
      </Link>
    </div>
  );
}
