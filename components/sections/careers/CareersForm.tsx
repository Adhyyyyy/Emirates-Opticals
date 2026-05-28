"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, AlertTriangle, UploadCloud } from "lucide-react";
import { applyForJob } from "@/actions/cms-careers";
import { cn } from "@/lib/utils";

interface CareersFormProps {
  branches: { id: string; name: string; }[];
}

export function CareersForm({ branches = [] }: CareersFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
    experience: "",
    location: "",
    preferredBranch: "",
    coverLetter: ""
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await applyForJob({
        ...formData,
        resumeUrl: resumeFile ? `/resumes/${resumeFile.name}` : undefined
      });

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Application submitted successfully! Our recruitment team will review your profile and contact you soon."
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          position: "",
          experience: "",
          location: "",
          preferredBranch: "",
          coverLetter: ""
        });
        setResumeFile(null);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to submit application. Please try again."
        });
      }
    } catch (err) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-white py-20 md:py-24 overflow-hidden text-neutral-900 border-t border-neutral-100" id="apply-form">
      <div className="max-w-[1140px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-col items-center text-center mb-14">
          <m.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-3 block"
          >
            Apply Now
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tight uppercase"
          >
            Join Our Team
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-neutral-500 font-light mt-4 max-w-xl mx-auto leading-relaxed"
          >
            Take the first step towards a rewarding career in optical retail. Submit your application below.
          </m.p>
        </div>

        <div className="max-w-3xl mx-auto bg-[#FAF8F5] border border-neutral-200 p-8 md:p-12 rounded-2xl relative">
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
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-3.5 text-xs focus:border-amber-400 outline-none transition-all duration-300"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Phone Number *
                </label>
                <input
                  type="focus"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-3.5 text-xs focus:border-amber-400 outline-none transition-all duration-300"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-3.5 text-xs focus:border-amber-400 outline-none transition-all duration-300"
                />
              </div>

              {/* Position Applying For */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Position Applying For *
                </label>
                <select
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-3.5 text-xs focus:border-amber-400 outline-none transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Select Position</option>
                  <option value="Optometrist">Optometrist</option>
                  <option value="Optical Fitter">Optical Fitter</option>
                  <option value="Sales Staff">Sales Staff</option>
                  <option value="Other">Other / Not Listed</option>
                </select>
              </div>

              {/* Years of Experience */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Years of Experience *
                </label>
                <select
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-3.5 text-xs focus:border-amber-400 outline-none transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Select Experience</option>
                  <option value="Freshers / Under 1 year">Freshers / Under 1 year</option>
                  <option value="1 - 3 years">1 - 3 years</option>
                  <option value="3 - 5 years">3 - 5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              {/* Current Location */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Current Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, District"
                  className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-3.5 text-xs focus:border-amber-400 outline-none transition-all duration-300"
                />
              </div>

              {/* Preferred Branch */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Preferred Branch (Optional)
                </label>
                <select
                  name="preferredBranch"
                  value={formData.preferredBranch}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-5 py-3.5 text-xs focus:border-amber-400 outline-none transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Any branch / No preference</option>
                  {branches.map(branch => (
                    <option key={branch.id} value={branch.name}>{branch.name}</option>
                  ))}
                </select>
              </div>

              {/* Resume File Upload */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Upload Resume (PDF, DOC, DOCX - Max 5MB)
                </label>
                <div className="relative group border border-dashed border-neutral-300 hover:border-amber-400 rounded-2xl p-6 transition-all duration-300 bg-white/50 flex flex-col items-center justify-center text-center gap-3 cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <UploadCloud className="w-8 h-8 text-neutral-400 group-hover:text-amber-500 transition-colors duration-300" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-semibold text-neutral-700">
                      {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
                    </span>
                    <span className="text-[9px] text-neutral-400 font-light">
                      {resumeFile ? `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB` : "PDF, DOC, DOCX (Max 5MB)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                  Cover Letter / Additional Information (Optional)
                </label>
                <textarea
                  name="coverLetter"
                  rows={5}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself, your experience, and why you'd like to join Emirates Optician..."
                  className="w-full bg-white border border-neutral-200 rounded-2xl px-5 py-4 text-xs focus:border-amber-400 outline-none transition-all duration-300 resize-none"
                />
              </div>

            </div>

            {/* Submit Application Button */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "bg-[#C9A84C] text-[#0D0D0D] text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-[3px] font-bold hover:bg-[#B8952E] hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-2",
                  isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Submitting..." : "Submit Application"}</span>
              </button>
              <p className="text-[9px] text-neutral-400 text-center font-light leading-relaxed">
                By submitting this application, you agree to be contacted by Emirates Optician regarding employment opportunities.
              </p>
            </div>
          </form>

          {/* Success / Error Toast Overlays */}
          <AnimatePresence>
            {submitStatus && (
              <m.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-8 text-center z-20"
              >
                {submitStatus.type === "success" ? (
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-6" />
                ) : (
                  <AlertTriangle className="w-12 h-12 text-amber-500 mb-6" />
                )}
                <h3 className="text-lg font-semibold uppercase tracking-[0.15em] mb-4 text-neutral-900">
                  {submitStatus.type === "success" ? "Thank You!" : "Application Error"}
                </h3>
                <p className="text-sm font-light text-neutral-500 max-w-md mb-8 leading-relaxed">
                  {submitStatus.message}
                </p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="bg-[#C9A84C] text-[#0D0D0D] text-xs uppercase tracking-[0.15em] px-8 py-3 rounded-[3px] font-bold hover:bg-[#B8952E] hover:text-white transition-all duration-300"
                >
                  Dismiss
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
