"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/schemas";
import { signIn } from "@/actions/auth";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Reveal, GridStagger, StaggerItem } from "@/components/motion/Reveal";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Loader2, 
  Compass,
  Monitor
} from "lucide-react";
import { cn } from "@/lib/utils";
import * as z from "zod";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    const result = await signIn(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Cinematic Background Grain */}
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />

      <div className="w-full h-full min-h-screen flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT SIDE: LUXURY EDITORIAL NARRATIVE */}
        <div className="hidden md:flex md:w-7/12 bg-brand-charcoal relative overflow-hidden flex-col justify-between p-20">
          {/* Animated Gradient Orbs */}
          <m.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
              x: [0, 50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-brand-gold rounded-full blur-[150px] pointer-events-none" 
          />
          
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent opacity-80" />

          <div className="relative z-10">
            <Reveal>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-[1px] bg-brand-gold" />
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.6em]">
                  Emirates Optician
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="text-5xl lg:text-8xl font-extralight tracking-tight text-white uppercase font-heading leading-[0.9]">
                Precision<br />
                <em className="italic text-brand-gold">Crafted</em><br />
                Vision.
              </h2>
            </Reveal>
          </div>

          <div className="relative z-10 flex flex-col gap-8">
            <GridStagger className="flex flex-col gap-6">
              {[
                { icon: ShieldCheck, text: "Enterprise Grade Security" },
                { icon: Monitor, text: "Centralized Multi-Branch Control" },
                { icon: Compass, text: "Intelligent Inventory Protocol" }
              ].map((item, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex items-center gap-4 group">
                    <div className="p-2 bg-white/5 border border-white/10 rounded-full text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-700">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                      {item.text}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </GridStagger>
          </div>
        </div>

        {/* RIGHT SIDE: PREMIUM CONTROL CENTER AUTH */}
        <div className="flex-1 bg-white p-8 md:p-24 flex flex-col justify-center relative">
          <div className="max-w-md mx-auto w-full">
            
            <header className="mb-16">
              <Reveal>
                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.5em] mb-6 block">
                  Admin Access
                </span>
              </Reveal>
              <Reveal delay={0.2}>
                <h1 className="text-4xl lg:text-5xl font-extralight tracking-tighter text-brand-charcoal uppercase font-heading leading-tight mb-6">
                  Welcome Back To<br />
                  <em className="italic">Emirates Control Center</em>
                </h1>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="text-sm text-brand-charcoal/40 font-light leading-relaxed">
                  Access the Emirates Optician multi-branch management platform.
                </p>
              </Reveal>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              <div className="space-y-8">
                {/* Email Field */}
                <div className="group relative">
                  <div className="flex justify-between mb-4">
                    <label className={cn(
                      "text-[10px] font-bold uppercase tracking-widest transition-colors duration-500",
                      errors.email ? "text-red-500" : "text-brand-charcoal/30 group-focus-within:text-brand-gold"
                    )}>
                      Secure Identifier
                    </label>
                  </div>
                  <div className="relative">
                    <Mail className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-500",
                      errors.email ? "text-red-400" : "text-brand-charcoal/20 group-focus-within:text-brand-gold"
                    )} />
                    <input 
                      {...register("email")}
                      type="email" 
                      placeholder="Enter Admin Email"
                      className="w-full bg-transparent border-b border-black/10 py-5 pl-10 pr-4 text-sm font-medium outline-none focus:border-brand-gold transition-all duration-500 placeholder:text-black/10"
                    />
                  </div>
                  {errors.email && <p className="text-[9px] font-bold text-red-500 uppercase tracking-tighter mt-2">{errors.email.message}</p>}
                </div>

                {/* Password Field */}
                <div className="group relative">
                  <div className="flex justify-between mb-4">
                    <label className={cn(
                      "text-[10px] font-bold uppercase tracking-widest transition-colors duration-500",
                      errors.password ? "text-red-500" : "text-brand-charcoal/30 group-focus-within:text-brand-gold"
                    )}>
                      Encrypted Key
                    </label>
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[9px] font-bold uppercase tracking-widest text-brand-gold hover:text-brand-charcoal transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-500",
                      errors.password ? "text-red-400" : "text-brand-charcoal/20 group-focus-within:text-brand-gold"
                    )} />
                    <input 
                      {...register("password")}
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••••••"
                      className="w-full bg-transparent border-b border-black/10 py-5 pl-10 pr-4 text-sm font-medium outline-none focus:border-brand-gold transition-all duration-500 placeholder:text-black/10"
                    />
                  </div>
                  {errors.password && <p className="text-[9px] font-bold text-red-500 uppercase tracking-tighter mt-2">{errors.password.message}</p>}
                </div>
              </div>

              {/* Error Alert */}
              <AnimatePresence>
                {error && (
                  <m.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 bg-red-50 border-l-2 border-red-500 flex items-center gap-4"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <p className="text-[11px] font-bold text-red-700 uppercase tracking-tight">{error}</p>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Remember Session & Action */}
              <div className="pt-4 space-y-8">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-4 h-4 border border-black/10 rounded-sm flex items-center justify-center group-hover:border-brand-gold transition-colors">
                    <div className="w-2 h-2 bg-brand-gold scale-0 group-hover:scale-100 transition-transform" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40 group-hover:text-brand-charcoal transition-colors">
                    Keep Control Session Active
                  </span>
                </div>

                <LuxuryButton 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-6 bg-brand-charcoal text-white hover:bg-brand-gold flex items-center justify-center gap-4 group/btn shadow-2xl disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span className="text-xs uppercase tracking-[0.3em] font-bold">Login To Dashboard</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </LuxuryButton>
              </div>
            </form>

            <footer className="mt-24 pt-10 border-t border-black/5">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/20 text-center leading-relaxed">
                Licensed To Emirates Optician LLC<br />
                Enterprise Management Protocol v2.4
              </p>
            </footer>
          </div>
        </div>

      </div>
    </main>
  );
}
