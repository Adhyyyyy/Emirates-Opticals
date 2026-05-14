"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { Calendar, Clock, MapPin, MessageCircle } from "lucide-react";

const BRANCHES = [
  { name: "Changanassery", phone: "918000000001" },
  { name: "Thiruvalla", phone: "918000000002" },
  { name: "Kumbanad", phone: "918000000003" },
  { name: "Kothamangalam", phone: "918000000004" },
  { name: "Pandalam", phone: "918000000005" },
  { name: "Kakkanad", phone: "918000000006" }
];

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    branch: "",
    date: "",
    time: "",
    notes: ""
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
    const targetPhone = selectedBranch ? selectedBranch.phone : "918000000000"; // Fallback

    // Construct WhatsApp Message
    const message = `*Emirates Optician Eye Test Booking*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Email:* ${formData.email || 'N/A'}%0A` +
      `*Branch:* ${formData.branch}%0A` +
      `*Date:* ${formData.date}%0A` +
      `*Time:* ${formData.time}%0A` +
      `*Notes:* ${formData.notes || 'None'}%0A%0A` +
      `_Sent via website booking form._`;

    const waUrl = `https://wa.me/${targetPhone}?text=${message}`;
    
    // Simulate luxury "Preparing" state
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="w-full bg-brand-pearl section-padding overflow-hidden relative" id="booking-form">
      <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-brand-charcoal uppercase font-heading mb-6">
                Schedule Your<br />Appointment
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="w-16 h-[2px] bg-brand-gold mx-auto" />
            </Reveal>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-16 border border-black/5 shadow-[0_30px_100px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-12">
              
              {/* Full Name */}
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-3 block">Full Name</label>
                <input 
                  type="text" name="name" required
                  value={formData.name} onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-black/10 py-3 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                  placeholder="Enter your name"
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
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-3 block">Email Address (Optional)</label>
                <input 
                  type="email" name="email"
                  value={formData.email} onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-black/10 py-3 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                  placeholder="name@example.com"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold group-focus-within:w-full transition-all duration-700" />
              </div>

              {/* Branch Selection */}
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-3 block">Preferred Branch</label>
                <select 
                  name="branch" required
                  value={formData.branch} onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-black/10 py-3 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 appearance-none cursor-pointer"
                >
                  <option value="">Select Branch</option>
                  {BRANCHES.map(b => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                </select>
                <MapPin className="absolute right-0 top-10 w-4 h-4 text-brand-charcoal/20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold group-focus-within:w-full transition-all duration-700" />
              </div>

              {/* Date */}
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-3 block">Preferred Date</label>
                <input 
                  type="date" name="date" required
                  value={formData.date} onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-black/10 py-3 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                />
                <Calendar className="absolute right-0 top-10 w-4 h-4 text-brand-charcoal/20 pointer-events-none" />
              </div>

              {/* Time */}
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-3 block">Preferred Time</label>
                <input 
                  type="time" name="time" required
                  value={formData.time} onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-black/10 py-3 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                />
                <Clock className="absolute right-0 top-10 w-4 h-4 text-brand-charcoal/20 pointer-events-none" />
              </div>

            </div>

            {/* Notes */}
            <div className="group relative mb-12">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-charcoal/40 mb-3 block">Additional Notes</label>
              <textarea 
                name="notes" rows={3}
                value={formData.notes} onChange={handleInputChange}
                className="w-full bg-transparent border border-black/10 p-6 text-lg font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                placeholder="Any specific requirements..."
              />
            </div>

            <div className="flex flex-col items-center">
              <LuxuryButton 
                disabled={isSubmitting}
                className="w-full md:w-auto px-20 py-6 bg-brand-charcoal text-white hover:bg-brand-gold flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  "Preparing Your Appointment..."
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Book Via WhatsApp
                  </>
                )}
              </LuxuryButton>
              <p className="mt-8 text-[10px] text-brand-charcoal/30 uppercase tracking-widest text-center max-w-sm">
                By submitting this form, you agree to be contacted by Emirates Optician regarding your appointment.
              </p>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
