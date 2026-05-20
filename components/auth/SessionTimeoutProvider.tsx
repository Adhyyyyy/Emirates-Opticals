"use client";

import React, { useState, useEffect, useRef } from "react";
import { signOut } from "@/actions/auth";
import { ShieldAlert, RefreshCw, LogOut } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

// Inactivity limits
const DEFAULT_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const WARNING_THRESHOLD = 60 * 1000; // Warn 60 seconds before auto-logout

export function SessionTimeoutProvider({ children }: { children: React.ReactNode }) {
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_TIMEOUT);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  
  const lastActiveRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset inactive timer
  const resetTimer = () => {
    lastActiveRef.current = Date.now();
    setTimeLeft(DEFAULT_TIMEOUT);
    if (showWarning) {
      setShowWarning(false);
    }
  };

  // Setup user activity listeners
  useEffect(() => {
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click"
    ];

    const handleActivity = () => {
      resetTimer();
    };

    // Bind listeners
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Start background ticking
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - lastActiveRef.current;
      const remaining = Math.max(0, DEFAULT_TIMEOUT - elapsed);
      
      setTimeLeft(remaining);

      if (remaining <= WARNING_THRESHOLD && remaining > 0) {
        setShowWarning(true);
      } else if (remaining === 0) {
        // De-initialize and perform secure logout
        if (timerRef.current) clearInterval(timerRef.current);
        handleLogout();
      }
    }, 1000);

    return () => {
      // Cleanup
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showWarning]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      // Force reload to login if action fails
      window.location.href = "/auth/login?expired=true";
    }
  };

  const formatSeconds = (ms: number) => {
    const totalSecs = Math.ceil(ms / 1000);
    return `${totalSecs}s`;
  };

  return (
    <>
      {children}

      {/* Cinematic Luxury Timeout Alert Overlay */}
      <AnimatePresence>
        {showWarning && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-white max-w-md w-full rounded-[2.5rem] p-10 border border-black/5 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col items-center text-center">
                {/* Warning Icon with Pulse */}
                <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-6 border border-amber-100 relative">
                  <div className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping" />
                  <ShieldAlert className="w-8 h-8 text-amber-500 relative z-10" />
                </div>

                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] mb-3 block">
                  Security Protocol
                </span>

                <h3 className="text-2xl font-light text-brand-charcoal font-heading uppercase leading-snug mb-4">
                  Admin Session <br />
                  <em className="italic">Timing Out</em>
                </h3>

                <p className="text-xs text-brand-charcoal/50 font-light leading-relaxed mb-8">
                  For your protection, you will be securely logged out due to inactivity in <strong className="font-bold text-brand-charcoal text-sm">{formatSeconds(timeLeft)}</strong>.
                </p>

                {/* Interaction Buttons */}
                <div className="w-full flex flex-col gap-3">
                  <button
                    onClick={resetTimer}
                    className="w-full py-4 bg-brand-charcoal text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-brand-gold hover:shadow-lg transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Keep Session Active
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full py-4 bg-transparent border border-black/10 text-brand-charcoal/40 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-black hover:border-black transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Secure Logout Now
                  </button>
                </div>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
