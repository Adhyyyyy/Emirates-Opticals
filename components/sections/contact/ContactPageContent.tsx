"use client";

import React, { useState } from "react";
import { m } from "framer-motion";
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
    <div className="bg-white min-h-screen text-neutral-900">

      {/* ─── HERO ─── */}
      <section className="relative w-full h-[75vh] min-h-[550px] flex flex-col justify-center items-center overflow-hidden bg-neutral-950 pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000"
            alt="Book Your Eye Test"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent z-10" />
        </div>

        <div className="relative z-10 max-w-[1140px] mx-auto px-4 md:px-8 w-full text-center">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] text-amber-400/80 mb-4 block"
          >
            Free Professional Eye Examination
          </m.span>
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light text-white uppercase tracking-tight leading-[1.05] font-heading drop-shadow-lg"
          >
            Book Your
            <br />
            Free <em className="italic font-light text-amber-400/90">Eye Test</em>
          </m.h1>
        </div>
        <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none z-20" />
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="max-w-[1140px] mx-auto px-4 md:px-8 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ── LEFT: Contact Info ── */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <m.span
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
              >
                Reach Out
              </m.span>
              <m.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase"
              >
                Get In Touch
              </m.h2>
              <m.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm text-neutral-500 font-light leading-relaxed mt-3"
              >
                Have questions or need assistance? We&apos;re here to help. Reach out through any of the channels below.
              </m.p>
            </div>

            <div className="space-y-4">
              <m.a
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                href="tel:9682929968"
                className="flex items-start gap-4 p-6 border border-neutral-200 rounded-2xl hover:border-neutral-300 hover:shadow-sm transition-all duration-300 group bg-white"
              >
                <div className="w-10 h-10 rounded-xl border border-neutral-200 flex items-center justify-center bg-white text-neutral-700 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200 shrink-0">
                  <Phone className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">Call Us</span>
                  <p className="text-base font-semibold text-neutral-900 group-hover:text-amber-600 transition-colors">9682929968</p>
                  <p className="text-[11px] text-neutral-500 font-light mt-0.5">Monday – Sunday, 9 AM – 7 PM</p>
                </div>
              </m.a>

              <m.a
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                href="mailto:info@emiratesoptician.com"
                className="flex items-start gap-4 p-6 border border-neutral-200 rounded-2xl hover:border-neutral-300 hover:shadow-sm transition-all duration-300 group bg-white"
              >
                <div className="w-10 h-10 rounded-xl border border-neutral-200 flex items-center justify-center bg-white text-neutral-700 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200 shrink-0">
                  <Mail className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">Email</span>
                  <p className="text-sm font-semibold text-neutral-900 group-hover:text-amber-600 transition-colors">info@emiratesoptician.com</p>
                  <p className="text-[11px] text-neutral-500 font-light mt-0.5">We&apos;ll respond within 24 hours</p>
                </div>
              </m.a>

              <m.a
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                href="/branches"
                className="flex items-start gap-4 p-6 border border-neutral-200 rounded-2xl hover:border-neutral-300 hover:shadow-sm transition-all duration-300 group bg-white"
              >
                <div className="w-10 h-10 rounded-xl border border-neutral-200 flex items-center justify-center bg-white text-neutral-700 group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-200 shrink-0">
                  <MapPin className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">Visit Us</span>
                  <p className="text-sm font-semibold text-neutral-900">10 branches across Kerala</p>
                  <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1 mt-1 group-hover:gap-2 transition-all">
                    View all locations <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </m.a>

              <m.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-start gap-4 p-6 border border-neutral-200 rounded-2xl bg-white"
              >
                <div className="w-10 h-10 rounded-xl border border-neutral-200 flex items-center justify-center bg-white text-neutral-700 shrink-0">
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">Business Hours</span>
                  <p className="text-sm font-semibold text-neutral-900">Typically 9 AM – 7 PM</p>
                  <p className="text-[11px] text-neutral-500 font-light mt-0.5">Hours may vary by branch</p>
                </div>
              </m.div>
            </div>

            {/* What to Expect */}
            <m.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-neutral-950 text-white rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-amber-400/5 rounded-full blur-3xl" />
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400/80 mb-6">
                What to Expect
              </p>
              <ul className="space-y-4">
                {WHAT_TO_EXPECT.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-light text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </m.div>
          </div>

          {/* ── RIGHT: Appointment Form ── */}
          <div className="lg:col-span-8 bg-[#FAF8F5] border border-neutral-200 p-8 md:p-12 rounded-2xl">
            <m.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight uppercase mb-8"
            >
              Book Your Appointment
            </m.h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-3.5 text-xs focus:border-amber-400 outline-none transition-all duration-300"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-3.5 text-xs focus:border-amber-400 outline-none transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-3.5 text-xs focus:border-amber-400 outline-none transition-all duration-300"
                  />
                </div>

                {/* Preferred Branch */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    Preferred Branch *
                  </label>
                  <select
                    name="branch"
                    required
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-3.5 text-xs focus:border-amber-400 outline-none transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="">Select a branch</option>
                    {BRANCHES.map((b) => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-3.5 text-xs focus:border-amber-400 outline-none transition-all duration-300"
                  />
                </div>

                {/* Time */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    Preferred Time *
                  </label>
                  <select
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-3.5 text-xs focus:border-amber-400 outline-none transition-all duration-300 appearance-none cursor-pointer"
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
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Additional Message (Optional)
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any specific requirements or questions?"
                  className="w-full bg-white border border-neutral-200 rounded-2xl px-5 py-4 text-xs focus:border-amber-400 outline-none transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-2 flex flex-col items-center md:items-start gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-neutral-900 text-white text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-full font-medium hover:bg-neutral-700 transition-all duration-200 inline-flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Sending..." : "Book Free Eye Test"}</span>
                </button>
                <p className="text-[9px] text-neutral-400 font-light leading-relaxed">
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
