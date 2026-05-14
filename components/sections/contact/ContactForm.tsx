"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { MessageCircle, Send } from "lucide-react";

const BRANCHES = [
  { name: "Changanassery Branch", phone: "919682929968" }, // Added 91 for India
  { name: "Thiruvalla Branch", phone: "918000000002" },
  { name: "Kumbanad Branch", phone: "918000000003" },
  { name: "Kothamangalam Branch", phone: "918000000004" },
  { name: "Pandalam Branch", phone: "918000000005" },
  { name: "Kakkanad Branch", phone: "918000000006" }
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    branch: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedBranch = BRANCHES.find(b => b.name === formData.branch);
    const targetPhone = selectedBranch ? selectedBranch.phone : "918000000000";

    // Format Message as requested
    const message = `Hello Emirates Optician,%0A%0A` +
      `My name is ${formData.name}.%0A%0A` +
      `*Branch Selected:*%0A${formData.branch}%0A%0A` +
      `*Phone Number:*%0A${formData.phone}%0A%0A` +
      `*Email:*%0A${formData.email || 'N/A'}%0A%0A` +
      `*Subject:*%0A${formData.subject}%0A%0A` +
      `*Message:*%0A${formData.message}%0A%0A` +
      `Please contact me regarding my enquiry.%0A%0A` +
      `Thank you.`;

    const waUrl = `https://wa.me/${targetPhone}?text=${message}`;
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative" id="contact-form">
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-6">
                Smart Contact
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="w-16 h-[2px] bg-brand-gold mx-auto" />
            </Reveal>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-16 border border-black/5 shadow-[0_30px_100px_rgba(0,0,0,0.05)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-12">
              
              {/* Name */}
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-3 block">Full Name</label>
                <input 
                  type="text" name="name" required
                  value={formData.name} onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-black/10 py-3 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                  placeholder="Your full name"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold group-focus-within:w-full transition-all duration-700" />
              </div>

              {/* Phone */}
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-3 block">Phone Number</label>
                <input 
                  type="tel" name="phone" required
                  value={formData.phone} onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-black/10 py-3 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                  placeholder="+91 00000 00000"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold group-focus-within:w-full transition-all duration-700" />
              </div>

              {/* Email */}
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-3 block">Email Address</label>
                <input 
                  type="email" name="email" required
                  value={formData.email} onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-black/10 py-3 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                  placeholder="name@example.com"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold group-focus-within:w-full transition-all duration-700" />
              </div>

              {/* Branch */}
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-3 block">Selected Branch</label>
                <select 
                  name="branch" required
                  value={formData.branch} onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-black/10 py-3 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 appearance-none cursor-pointer"
                >
                  <option value="">Choose Branch</option>
                  {BRANCHES.map(b => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                </select>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold group-focus-within:w-full transition-all duration-700" />
              </div>

              {/* Subject */}
              <div className="group relative md:col-span-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-3 block">Subject</label>
                <input 
                  type="text" name="subject" required
                  value={formData.subject} onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-black/10 py-3 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                  placeholder="How can we help you?"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold group-focus-within:w-full transition-all duration-700" />
              </div>

            </div>

            {/* Message */}
            <div className="group relative mb-12">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-3 block">Message</label>
              <textarea 
                name="message" rows={4} required
                value={formData.message} onChange={handleInputChange}
                className="w-full bg-transparent border border-black/10 p-6 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                placeholder="Enter your detailed enquiry..."
              />
            </div>

            <div className="flex flex-col items-center">
              <LuxuryButton 
                disabled={isSubmitting}
                className="w-full md:w-auto px-20 py-6 bg-brand-charcoal text-white hover:bg-brand-gold flex items-center justify-center gap-3 transition-all duration-700"
              >
                {isSubmitting ? (
                  "Initiating WhatsApp..."
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Send WhatsApp Message
                  </>
                )}
              </LuxuryButton>
              <p className="mt-8 text-[10px] text-brand-charcoal/30 uppercase tracking-widest text-center max-w-sm">
                Fast response guaranteed. Our branch team will assist you shortly.
              </p>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
