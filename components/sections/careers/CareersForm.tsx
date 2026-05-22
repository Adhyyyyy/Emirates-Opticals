"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <section className="w-full bg-white section-padding overflow-hidden text-black border-t border-black/5" id="apply-form">
      <div className="container-tight">
        
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-4 block">
            Apply Now
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-charcoal uppercase tracking-tighter font-heading">
            Join Our Team
          </h2>
          <p className="text-sm text-brand-charcoal/40 font-light mt-4 max-w-xl mx-auto leading-relaxed">
            Take the first step towards a rewarding career in optical retail. Submit your application below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-brand-pearl/20 border border-black/5 p-8 md:p-16 rounded-[2.5rem] relative">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/60">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-xs font-medium tracking-tight focus:border-brand-gold/30 outline-none transition-all duration-300"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/60">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-xs font-medium tracking-tight focus:border-brand-gold/30 outline-none transition-all duration-300"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/60">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-xs font-medium tracking-tight focus:border-brand-gold/30 outline-none transition-all duration-300"
                />
              </div>

              {/* Position Applying For */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/60">
                  Position Applying For *
                </label>
                <select
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-xs font-medium tracking-tight focus:border-brand-gold/30 outline-none transition-all duration-300 appearance-none cursor-pointer"
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
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/60">
                  Years of Experience *
                </label>
                <select
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-xs font-medium tracking-tight focus:border-brand-gold/30 outline-none transition-all duration-300 appearance-none cursor-pointer"
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
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/60">
                  Current Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, District"
                  className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-xs font-medium tracking-tight focus:border-brand-gold/30 outline-none transition-all duration-300"
                />
              </div>

              {/* Preferred Branch */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/60">
                  Preferred Branch (Optional)
                </label>
                <select
                  name="preferredBranch"
                  value={formData.preferredBranch}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-black/5 rounded-xl px-5 py-4 text-xs font-medium tracking-tight focus:border-brand-gold/30 outline-none transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Any branch / No preference</option>
                  {branches.map(branch => (
                    <option key={branch.id} value={branch.name}>{branch.name}</option>
                  ))}
                </select>
              </div>

              {/* Resume File Upload */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/60">
                  Upload Resume (PDF, DOC, DOCX - Max 5MB)
                </label>
                <div className="relative group border border-dashed border-black/10 hover:border-brand-gold/30 rounded-2xl p-6 transition-all duration-500 bg-white/50 flex flex-col items-center justify-center text-center gap-3 cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <UploadCloud className="w-8 h-8 text-brand-charcoal/30 group-hover:text-brand-gold transition-colors duration-500" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-medium text-brand-charcoal/80">
                      {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
                    </span>
                    <span className="text-[9px] text-brand-charcoal/40 font-light">
                      {resumeFile ? `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB` : "PDF, DOC, DOCX (Max 5MB)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/60">
                  Cover Letter / Additional Information (Optional)
                </label>
                <textarea
                  name="coverLetter"
                  rows={5}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself, your experience, and why you'd like to join Emirates Optician..."
                  className="w-full bg-white border border-black/5 rounded-2xl px-5 py-4 text-xs font-medium tracking-tight focus:border-brand-gold/30 outline-none transition-all duration-300 resize-none"
                />
              </div>

            </div>

            {/* Submit Application Button */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full md:w-64 bg-brand-charcoal hover:bg-brand-gold text-white font-bold text-[10px] uppercase tracking-widest py-4.5 rounded-full shadow-xl transition-all duration-500 flex items-center justify-center gap-2",
                  isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Submitting..." : "Submit Application"}</span>
              </button>
              <p className="text-[9px] text-brand-charcoal/30 text-center font-light leading-relaxed">
                By submitting this application, you agree to be contacted by Emirates Optician regarding employment opportunities.
              </p>
            </div>
          </form>

          {/* Success / Error Toast Overlays */}
          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "absolute inset-0 bg-white/95 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center z-20",
                  submitStatus.type === "success" ? "text-brand-charcoal" : "text-brand-charcoal"
                )}
              >
                {submitStatus.type === "success" ? (
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-6" />
                ) : (
                  <AlertTriangle className="w-16 h-16 text-amber-500 mb-6" />
                )}
                <h3 className="text-xl font-bold uppercase tracking-widest mb-4">
                  {submitStatus.type === "success" ? "Thank You!" : "Application Error"}
                </h3>
                <p className="text-sm font-light text-brand-charcoal/70 max-w-md mb-8 leading-relaxed">
                  {submitStatus.message}
                </p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="bg-brand-charcoal text-white hover:bg-brand-gold text-[10px] uppercase tracking-widest font-bold py-3 px-8 rounded-full transition-colors duration-500"
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
