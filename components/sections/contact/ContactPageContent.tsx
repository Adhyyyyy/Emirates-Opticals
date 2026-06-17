"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Image from "next/image";

const BRANCHES = [
  { name: "Changanassery", phone: "918714032601" },
  { name: "Thiruvalla", phone: "918714032602" },
  { name: "Kumbanad", phone: "918714032603" },
  { name: "Kothamangalam", phone: "918714032607" },
  { name: "Pandalam", phone: "918714032606" },

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

const WHAT_TO_EXPECT = [
  "We'll confirm your appointment via phone",
  "Free professional eye examination (15–20 minutes)",
  "Personalized frame selection with expert guidance",
  "No obligation — just professional care",
];

export function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    branch: "",
    date: "",
    time: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const branch = BRANCHES.find((b) => b.name === formData.branch);
    const phone = branch?.phone ?? "919988674574";

    const msg =
      `Hello Emirates Optician,%0A%0A` +
      `I'd like to book a free eye test.%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Email:* ${formData.email || "N/A"}%0A` +
      `*Branch:* ${formData.branch}%0A` +
      `*Date:* ${formData.date}%0A` +
      `*Time:* ${formData.time}%0A` +
      `*Message:* ${formData.message || "No additional message"}%0A%0A` +
      `Thank you.`;

    setTimeout(() => {
      window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-brand-charcoal">

      {/* ─── LUXURY HERO ─── */}
      <section className="hidden md:flex relative w-full h-[60vh] min-h-[480px] flex-col overflow-hidden bg-neutral-100 pt-24 md:pt-32" id="contact-hero">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Hero/contact 2 hero.webp"
            alt="Book Your Eye Test"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Centered Title Overlay with standard clearance offset padding */}
        <div className="relative z-10 w-full h-full flex items-center justify-center pt-16 md:pt-20">
          <div className="max-w-[1240px] mx-auto px-6 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-light font-heading uppercase tracking-[0.25em] text-white drop-shadow-2xl select-none">
                Contact Us
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Decorative layout line */}
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-brand-gold/20 z-10" />
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="max-w-[1240px] mx-auto px-4 md:px-8 pt-40 pb-20 md:pt-20 md:pb-28">
        
        {/* Mobile-Only Page Title (no badges or underlines) */}
        <div className="md:hidden text-center mb-12">
          <h2 className="text-3xl font-light text-brand-charcoal tracking-[0.2em] uppercase font-heading">
            Contact Us
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">

          {/* ── LEFT: Contact Info ── */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="hidden md:block text-3xl md:text-5xl font-extralight text-brand-charcoal tracking-tighter uppercase leading-tight"
              >
                Get In Touch
              </motion.h2>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="hidden md:block w-12 h-[1px] bg-brand-gold/50"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-[13px] text-brand-charcoal/50 font-light leading-relaxed max-w-lg"
              >
                Have questions or need expert styling assistance? Reach out to our boutique network or book a complimentary vision consultation.
              </motion.p>
            </div>

            {/* Channels Grid */}
            <div className="space-y-4 pt-4">
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                href="tel:9988674574"
                className="flex items-start gap-5 p-6 border border-black/[0.03] rounded-2xl bg-white shadow-sm hover:shadow-2xl hover:shadow-brand-charcoal/[0.04] transition-all duration-700 group"
              >
                {/* Custom square bracket style */}
                <div className="w-10 h-10 rounded-[3px] border border-black/[0.03] bg-[#FAF9F6] flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500 shrink-0">
                  <Phone className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/30 block mb-1">Call Us</span>
                  <p className="text-sm font-bold text-brand-charcoal group-hover:text-brand-gold transition-colors duration-300">9988674574</p>
                  <p className="text-[11px] text-brand-charcoal/40 font-light mt-0.5">Monday – Sunday, 9 AM – 7 PM</p>
                </div>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 }}
                href="mailto:emiratesofficial1969@gmail.com"
                className="flex items-start gap-5 p-6 border border-black/[0.03] rounded-2xl bg-white shadow-sm hover:shadow-2xl hover:shadow-brand-charcoal/[0.04] transition-all duration-700 group"
              >
                <div className="w-10 h-10 rounded-[3px] border border-black/[0.03] bg-[#FAF9F6] flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500 shrink-0">
                  <Mail className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/30 block mb-1">Email</span>
                  <p className="text-sm font-bold text-brand-charcoal group-hover:text-brand-gold transition-colors duration-300">emiratesofficial1969@gmail.com</p>
                  <p className="text-[11px] text-brand-charcoal/40 font-light mt-0.5">We&apos;ll respond within 24 hours</p>
                </div>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                href="/branches"
                className="flex items-start gap-5 p-6 border border-black/[0.03] rounded-2xl bg-white shadow-sm hover:shadow-2xl hover:shadow-brand-charcoal/[0.04] transition-all duration-700 group"
              >
                <div className="w-10 h-10 rounded-[3px] border border-black/[0.03] bg-[#FAF9F6] flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-500 shrink-0">
                  <MapPin className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/30 block mb-1">Visit Us</span>
                  <p className="text-sm font-bold text-brand-charcoal">10 Luxury Galleries across Kerala</p>
                  <span className="text-[11px] font-bold text-brand-gold flex items-center gap-1 mt-1 group-hover:gap-2 transition-all">
                    View all locations <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex items-start gap-5 p-6 border border-black/[0.03] rounded-2xl bg-white shadow-sm shrink-0"
              >
                <div className="w-10 h-10 rounded-[3px] border border-black/[0.03] bg-[#FAF9F6] flex items-center justify-center text-brand-gold shrink-0">
                  <Clock className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/30 block mb-1">Business Hours</span>
                  <p className="text-sm font-bold text-brand-charcoal">Typically 9:30 AM – 7:30 PM</p>
                  <p className="text-[11px] text-brand-charcoal/40 font-light mt-0.5">Hours may vary slightly by showroom</p>
                </div>
              </motion.div>
            </div>

            {/* What to Expect (Gold Accent on Charcoal Box) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-brand-charcoal text-white rounded-2xl p-8 relative overflow-hidden border border-white/5 shadow-lg"
            >
              <div className="absolute inset-0 noise-overlay opacity-[0.02] pointer-events-none" />
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold mb-6">
                What to Expect
              </p>
              <ul className="space-y-4">
                {WHAT_TO_EXPECT.map((item, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-xs font-light text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ── RIGHT: Appointment Form (Clean Box Canvas) ── */}
          <div className="lg:col-span-7 bg-white border border-black/[0.03] p-8 md:p-12 rounded-2xl shadow-sm">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl font-light text-brand-charcoal tracking-tight uppercase mb-8"
            >
              Book Your Appointment
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-[#FAF9F6] border border-black/5 rounded-[3px] px-5 py-3.5 text-xs focus:border-brand-gold focus:ring-0 outline-none transition-all duration-300"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="w-full bg-[#FAF9F6] border border-black/5 rounded-[3px] px-5 py-3.5 text-xs focus:border-brand-gold focus:ring-0 outline-none transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-[#FAF9F6] border border-black/5 rounded-[3px] px-5 py-3.5 text-xs focus:border-brand-gold focus:ring-0 outline-none transition-all duration-300"
                  />
                </div>

                {/* Preferred Branch */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">
                    Preferred Branch *
                  </label>
                  <select
                    name="branch"
                    required
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full bg-[#FAF9F6] border border-black/5 rounded-[3px] px-5 py-3.5 text-xs focus:border-brand-gold focus:ring-0 outline-none transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="">Select a branch</option>
                    {BRANCHES.map((b) => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-[#FAF9F6] border border-black/5 rounded-[3px] px-5 py-3.5 text-xs focus:border-brand-gold focus:ring-0 outline-none transition-all duration-300"
                  />
                </div>

                {/* Time */}
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">
                    Preferred Time *
                  </label>
                  <select
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-[#FAF9F6] border border-black/5 rounded-[3px] px-5 py-3.5 text-xs focus:border-brand-gold focus:ring-0 outline-none transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="">Select time</option>
                    {TIMES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Additional Message */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40">
                  Additional Message (Optional)
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any specific requirements or questions?"
                  className="w-full bg-[#FAF9F6] border border-black/5 rounded-[3px] px-5 py-4 text-xs focus:border-brand-gold focus:ring-0 outline-none transition-all duration-300 resize-none"
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
                  <span>{isSubmitting ? "Sending..." : "Book Free Eye Test"}</span>
                </button>
                <p className="text-[9px] text-brand-charcoal/30 font-light leading-relaxed">
                  By submitting this form, you agree to be contacted by Emirates Optician regarding your appointment.
                </p>
              </div>

            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
