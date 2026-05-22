"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";

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
    const phone = branch?.phone ?? "919682929968";

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
    <div className="bg-white min-h-screen text-black">

      {/* ─── HERO ─── */}
      <section className="relative w-full h-[75vh] min-h-[550px] flex flex-col justify-center items-center overflow-hidden bg-brand-charcoal pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000"
            alt="Book Your Eye Test"
            className="w-full h-full"
            distance={100}
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent z-10" />
        </div>

        <div className="relative z-10 container-tight text-center">
          <div className="max-w-4xl mx-auto">
            <Reveal delay={0.2}>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-brand-gold mb-4 block drop-shadow-md">
                Free Professional Eye Examination
              </span>
            </Reveal>
            <Reveal delay={0.4}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal text-white uppercase tracking-[-0.03em] leading-[1.0] drop-shadow-lg font-heading">
                Book Your<br />
                Free <em className="italic font-light text-brand-gold/90">Eye Test</em>
              </h1>
            </Reveal>
          </div>
        </div>
        <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none z-20" />
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

          {/* ── LEFT: Contact Info ── */}
          <div className="lg:col-span-4 space-y-10">

            <div>
              <Reveal>
                <h2 className="text-3xl md:text-4xl font-extralight uppercase tracking-tight text-black font-heading mb-4">
                  Get In Touch
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-sm text-black/55 font-light leading-relaxed">
                  Have questions or need assistance? We&apos;re here to help. Reach out through any of the channels below.
                </p>
              </Reveal>
            </div>

            <div className="space-y-5">

              <Reveal delay={0.1}>
                <a href="tel:9682929968" className="flex items-start gap-4 p-6 border border-black/8 rounded-3xl hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-black/35 block mb-1">Call Us</span>
                    <p className="text-base font-semibold text-black group-hover:text-brand-gold transition-colors">9682929968</p>
                    <p className="text-[11px] text-black/45 font-light mt-0.5">Monday – Sunday, 9 AM – 7 PM</p>
                  </div>
                </a>
              </Reveal>

              <Reveal delay={0.15}>
                <a href="mailto:info@emiratesoptician.com" className="flex items-start gap-4 p-6 border border-black/8 rounded-3xl hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-black/35 block mb-1">Email</span>
                    <p className="text-sm font-semibold text-black group-hover:text-brand-gold transition-colors">info@emiratesoptician.com</p>
                    <p className="text-[11px] text-black/45 font-light mt-0.5">We&apos;ll respond within 24 hours</p>
                  </div>
                </a>
              </Reveal>

              <Reveal delay={0.2}>
                <a href="/branches" className="flex items-start gap-4 p-6 border border-black/8 rounded-3xl hover:border-brand-gold/30 hover:shadow-md transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-black/35 block mb-1">Visit Us</span>
                    <p className="text-sm font-semibold text-black">10 branches across Kerala</p>
                    <span className="text-[11px] font-bold text-brand-gold flex items-center gap-1 mt-1 group-hover:gap-2 transition-all">
                      View all locations <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="flex items-start gap-4 p-6 border border-black/8 rounded-3xl">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-black/35 block mb-1">Business Hours</span>
                    <p className="text-sm font-semibold text-black">Typically 9 AM – 7 PM</p>
                    <p className="text-[11px] text-black/45 font-light mt-0.5">Hours may vary by branch</p>
                  </div>
                </div>
              </Reveal>

            </div>

            {/* What to Expect */}
            <Reveal delay={0.3}>
              <div className="bg-brand-charcoal rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-brand-gold/8 rounded-full blur-3xl" />
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-6">
                  What to Expect
                </p>
                <ul className="space-y-4">
                  {WHAT_TO_EXPECT.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-light text-white/75">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

          </div>

          {/* ── RIGHT: Appointment Form ── */}
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-extralight uppercase tracking-tight text-black font-heading mb-10">
                Book Your Appointment
              </h2>
            </Reveal>

            <form onSubmit={handleSubmit} className="space-y-8">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Full Name */}
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-3 block">
                    Full Name <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="text" name="name" required
                    value={formData.name} onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-transparent border-b border-black/12 py-3 text-base font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 placeholder:text-black/25"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold group-focus-within:w-full transition-all duration-700" />
                </div>

                {/* Phone */}
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-3 block">
                    Phone Number <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="tel" name="phone" required
                    value={formData.phone} onChange={handleChange}
                    placeholder="Your phone number"
                    className="w-full bg-transparent border-b border-black/12 py-3 text-base font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 placeholder:text-black/25"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold group-focus-within:w-full transition-all duration-700" />
                </div>

                {/* Email */}
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-3 block">
                    Email <span className="text-black/30 normal-case font-light">(Optional)</span>
                  </label>
                  <input
                    type="email" name="email"
                    value={formData.email} onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-transparent border-b border-black/12 py-3 text-base font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 placeholder:text-black/25"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold group-focus-within:w-full transition-all duration-700" />
                </div>

                {/* Preferred Branch */}
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-3 block">
                    Preferred Branch <span className="text-brand-gold">*</span>
                  </label>
                  <select
                    name="branch" required
                    value={formData.branch} onChange={handleChange}
                    className="w-full bg-transparent border-b border-black/12 py-3 text-base font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 appearance-none cursor-pointer"
                  >
                    <option value="">Select a branch</option>
                    {BRANCHES.map((b) => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold group-focus-within:w-full transition-all duration-700" />
                </div>

                {/* Date */}
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-3 block">
                    Preferred Date <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="date" name="date" required
                    value={formData.date} onChange={handleChange}
                    className="w-full bg-transparent border-b border-black/12 py-3 text-base font-light focus:outline-none focus:border-brand-gold transition-colors duration-500"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold group-focus-within:w-full transition-all duration-700" />
                </div>

                {/* Time */}
                <div className="group relative">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-3 block">
                    Preferred Time <span className="text-brand-gold">*</span>
                  </label>
                  <select
                    name="time" required
                    value={formData.time} onChange={handleChange}
                    className="w-full bg-transparent border-b border-black/12 py-3 text-base font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 appearance-none cursor-pointer"
                  >
                    <option value="">Select time</option>
                    {TIMES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-gold group-focus-within:w-full transition-all duration-700" />
                </div>

              </div>

              {/* Additional Message */}
              <div className="group relative">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-3 block">
                  Additional Message <span className="text-black/30 normal-case font-light">(Optional)</span>
                </label>
                <textarea
                  name="message" rows={4}
                  value={formData.message} onChange={handleChange}
                  placeholder="Any specific requirements or questions?"
                  className="w-full bg-transparent border border-black/10 rounded-2xl p-5 text-base font-light focus:outline-none focus:border-brand-gold transition-colors duration-500 placeholder:text-black/25 resize-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto px-16 py-4 bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-brand-gold transition-colors duration-500 rounded-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Book Free Eye Test"}
                </motion.button>
                <p className="mt-5 text-[11px] text-black/35 font-light">
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
