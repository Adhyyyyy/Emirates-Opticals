"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/schemas";
import { signIn } from "@/actions/auth";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import * as z from "zod";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setAuthError(null);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await signIn(formData);
      if (result?.error) {
        setAuthError(result.error);
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication system failure.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 sm:p-6 bg-black z-20 overflow-hidden">
      
      {/* SAFE BROWSER AUTOFILL OVERRIDE (Neutralizes browser default light-blue container styling) */}
      <style dangerouslySetInnerHTML={{ __html: `
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 100px rgba(255, 255, 255, 0.25) inset !important;
          -webkit-text-fill-color: #0A0A0A !important;
          box-shadow: 0 0 0 100px rgba(255, 255, 255, 0.25) inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      ` }} />

      {/* 1. IMMERSIVE HERO IMAGE BACKGROUND FROM HOME PAGE */}
      <div 
        className="absolute inset-0 bg-cover bg-[center_30%] bg-no-repeat transition-transform duration-10000 hover:scale-[1.05]"
        style={{ 
          backgroundImage: `url('/Hero/Hero.webp')` 
        }}
      />
      
      {/* 2. DUSTY GOLD AND CHARCOAL GLASS FILTER OVERLAYS */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[6px] z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/35 to-transparent z-[2]" />

      {/* 3. CENTERED ULTRA-PREMIUM GLASSMORPHIC CARD */}
      <div className="relative z-10 w-full max-w-[440px] bg-white/80 border-t border-l border-white/70 border-r border-b border-white/20 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(201,168,76,0.12)] p-8 sm:p-12 rounded-[6px] flex flex-col items-center">
        
        {/* Return to Home Action */}
        <Link 
          href="/" 
          className="self-start mb-8 text-[10px] font-bold text-black/50 hover:text-black uppercase tracking-[0.25em] flex items-center gap-2 group/back transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover/back:-translate-x-1 transition-transform" />
          Back To Boutique
        </Link>

        {/* Crisp Branding Logo (Large Scale for High Visual Presence) */}
        <div className="flex items-center justify-center mb-6">
          <Image 
            src="/assets/emirates_logo.png" 
            alt="Emirates Opticians Logo" 
            width={240} 
            height={70} 
            className="h-20 w-auto object-contain"
            priority
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-xs font-bold text-[#C9A84C] uppercase tracking-[0.4em] mb-2">
            Control Center
          </h1>
          <p className="text-[11px] text-black/60 tracking-wider">
            Authorize connection to manage branch networks.
          </p>
        </div>

        {/* Form Submission */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <AnimatePresence mode="wait">
            {authError && (
              <m.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-50/70 border border-red-200 text-red-800 text-xs rounded-[3px] tracking-wide text-center backdrop-blur-md"
              >
                {authError}
              </m.div>
            )}
          </AnimatePresence>

          {/* Secure Email Input Capsule */}
          <div className="space-y-2 group">
            <label className="text-[9px] font-bold text-black/50 uppercase tracking-[0.3em] group-focus-within:text-[#C9A84C] transition-colors block">
              Secure Identifier
            </label>
            <div className="relative flex items-center bg-white/35 border border-black/5 focus-within:bg-white/60 focus-within:border-[#C9A84C]/50 focus-within:shadow-sm rounded-[3px] px-4 py-1 transition-all duration-300 backdrop-blur-md">
              <Mail className="w-4 h-4 text-black/30 group-focus-within:text-[#C9A84C] transition-colors mr-3 flex-shrink-0" />
              <input 
                {...register("email")}
                type="email" 
                placeholder="Enter admin email address"
                className="flex-1 bg-transparent py-2.5 text-sm font-medium text-[#0A0A0A] outline-none placeholder:text-black/25 rounded-none"
              />
            </div>
            {errors.email && (
              <p className="text-[9px] font-bold text-red-600 uppercase tracking-tighter mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Encrypted Key Input Capsule */}
          <div className="space-y-2 group">
            <label className="text-[9px] font-bold text-black/50 uppercase tracking-[0.3em] group-focus-within:text-[#C9A84C] transition-colors block">
              Encrypted Key
            </label>
            <div className="relative flex items-center bg-white/35 border border-black/5 focus-within:bg-white/60 focus-within:border-[#C9A84C]/50 focus-within:shadow-sm rounded-[3px] px-4 py-1 transition-all duration-300 backdrop-blur-md">
              <Lock className="w-4 h-4 text-black/30 group-focus-within:text-[#C9A84C] transition-colors mr-3 flex-shrink-0" />
              <input 
                {...register("password")}
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••••••"
                className="flex-1 bg-transparent py-2.5 text-sm font-medium text-[#0A0A0A] outline-none placeholder:text-black/25 rounded-none"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-black/30 hover:text-black/60 transition-colors flex-shrink-0"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-[9px] font-bold text-red-600 uppercase tracking-tighter mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Session Persistent Flag */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-3 cursor-pointer select-none group">
              <input 
                type="checkbox" 
                className="sr-only peer"
                defaultChecked
              />
              <div className="w-4 h-4 border border-black/10 bg-white/40 rounded-[2px] backdrop-blur-md flex items-center justify-center peer-checked:bg-[#C9A84C] peer-checked:border-[#C9A84C] transition-all duration-300">
                <svg 
                  className="w-2.5 h-2.5 text-[#0A0A0A] stroke-[4]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[10px] text-black/60 tracking-wider group-hover:text-black/90 transition-colors">
                Keep session active
              </span>
            </label>
          </div>

          {/* Luxury Login CTA */}
          <div className="pt-4">
            <LuxuryButton 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#0D0D0D] hover:text-white flex items-center justify-center gap-4 group/btn shadow-[0_12px_24px_-6px_rgba(201,168,76,0.25)] rounded-[3px] disabled:opacity-50 transition-all duration-500 font-bold"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span className="text-xs uppercase tracking-[0.25em]">Authenticate Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </LuxuryButton>
          </div>
        </form>
      </div>

    </div>
  );
}
