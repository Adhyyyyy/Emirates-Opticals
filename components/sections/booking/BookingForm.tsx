"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";

const BRANCHES = [
  { name: "Changanassery", phone: "918714032601" },
  { name: "Thiruvalla", phone: "918714032602" },
  { name: "Kumbanad", phone: "918714032603" },
  { name: "Kothamangalam", phone: "918714032607" },
  { name: "Pandalam", phone: "918714032606" },
  { name: "Kakkanad", phone: "917736441211" },
  { name: "Kottayam", phone: "918547866755" },
  { name: "Ettumanur", phone: "918714032604" },
  { name: "Angamaly", phone: "918714032605" },
  { name: "Irumpanam", phone: "918889990533" },
];

const TIMES = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM",
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
    const targetPhone = selectedBranch ? selectedBranch.phone : "919682929968";

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
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <section className="w-full bg-[#FAF9F6] pt-40 pb-16 md:py-24 overflow-hidden relative" id="booking-form">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        
        {/* Mobile-Only Page Title (no badges or underlines) */}
        <div className="md:hidden text-center mb-12">
          <h1 className="text-3xl font-light text-brand-charcoal tracking-[0.2em] uppercase font-heading">
            Book Eye Test
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          
          {/* Redundant header hidden on mobile, beautifully balanced on desktop */}
          <div className="hidden md:block text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-extralight text-brand-charcoal tracking-tighter uppercase leading-tight"
            >
              Schedule Your Appointment
            </motion.h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-16 h-[1px] bg-brand-gold/50 mx-auto mt-6"
            />
          </div>

          {/* Clean White Card Form Canvas */}
          <form onSubmit={handleSubmit} className="bg-white border border-black/[0.03] p-8 md:p-12 rounded-2xl shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Full Name *</label>
                <input 
                  type="text" name="name" required
                  value={formData.name} onChange={handleInputChange}
                  className="w-full bg-[#FAF9F6] border border-black/5 rounded-[3px] px-5 py-3.5 text-xs focus:border-brand-gold focus:ring-0 outline-none transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Phone Number *</label>
                <input 
                  type="tel" name="phone" required
                  value={formData.phone} onChange={handleInputChange}
                  className="w-full bg-[#FAF9F6] border border-black/5 rounded-[3px] px-5 py-3.5 text-xs focus:border-brand-gold focus:ring-0 outline-none transition-all duration-300"
                  placeholder="Your phone number"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Email Address</label>
                <input 
                  type="email" name="email"
                  value={formData.email} onChange={handleInputChange}
                  className="w-full bg-[#FAF9F6] border border-black/5 rounded-[3px] px-5 py-3.5 text-xs focus:border-brand-gold focus:ring-0 outline-none transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Preferred Branch */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Preferred Branch *</label>
                <select 
                  name="branch" required
                  value={formData.branch} onChange={handleInputChange}
                  className="w-full bg-[#FAF9F6] border border-black/5 rounded-[3px] px-5 py-3.5 text-xs focus:border-brand-gold focus:ring-0 outline-none transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Select a branch</option>
                  {BRANCHES.map(b => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                </select>
                <MapPin className="absolute right-4 top-10 w-4 h-4 text-brand-charcoal/20 pointer-events-none" />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Preferred Date *</label>
                <input 
                  type="date" name="date" required
                  value={formData.date} onChange={handleInputChange}
                  className="w-full bg-[#FAF9F6] border border-black/5 rounded-[3px] px-5 py-3.5 text-xs focus:border-brand-gold focus:ring-0 outline-none transition-all duration-300"
                />
                <Calendar className="absolute right-4 top-10 w-4 h-4 text-brand-charcoal/20 pointer-events-none" />
              </div>

              {/* Time */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Preferred Time *</label>
                <select 
                  name="time" required
                  value={formData.time} onChange={handleInputChange}
                  className="w-full bg-[#FAF9F6] border border-black/5 rounded-[3px] px-5 py-3.5 text-xs focus:border-brand-gold focus:ring-0 outline-none transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Select time</option>
                  {TIMES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <Clock className="absolute right-4 top-10 w-4 h-4 text-brand-charcoal/20 pointer-events-none" />
              </div>

            </div>

            {/* Notes */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">Additional Notes (Optional)</label>
              <textarea 
                name="notes" rows={4}
                value={formData.notes} onChange={handleInputChange}
                className="w-full bg-[#FAF9F6] border border-black/5 rounded-[3px] px-5 py-4 text-xs focus:border-brand-gold focus:ring-0 outline-none transition-all duration-300 resize-none"
                placeholder="Any specific requirements or questions?"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 flex flex-col items-center md:items-start gap-4">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-[#C9A84C] text-[#0D0D0D] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] px-10 py-4 rounded-[3px] hover:bg-[#B8952E] hover:text-white transition-all duration-500 w-full sm:w-auto shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Sending..." : "Book via WhatsApp"}</span>
              </button>
              <p className="text-[9px] text-brand-charcoal/30 font-light leading-relaxed">
                By submitting this form, you agree to be contacted by Emirates Optician regarding your appointment.
              </p>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
