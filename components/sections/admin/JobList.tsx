"use client";

import React, { useState, useTransition } from "react";
import { createJob, deleteJob, toggleJobStatus } from "@/actions/cms-careers";
import { 
  Briefcase, 
  Trash2, 
  Plus, 
  X, 
  MapPin, 
  Link as LinkIcon, 
  Calendar, 
  Power, 
  Globe, 
  AlertCircle, 
  CheckCircle2, 
  Loader2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";

interface Job {
  id: string;
  title: string;
  desc: string;
  requirements: string[];
  branchId: string;
  googleFormUrl?: string;
  expiryDate?: string;
  isActive: boolean;
  createdAt: string;
}

interface JobListProps {
  initialJobs: Job[];
  branches: any[];
}

export function JobList({ initialJobs, branches }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [isPosting, setIsPosting] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "open" | "closed">("all");
  const [isPending, startTransition] = useTransition();

  // Form State
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [reqsText, setReqsText] = useState("");
  const [branchId, setBranchId] = useState("Global");
  const [googleFormUrl, setGoogleFormUrl] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!title || !desc) {
      setError("Title and Description are required parameters.");
      return;
    }

    const requirements = reqsText
      .split("\n")
      .map(r => r.trim())
      .filter(r => r.length > 0);

    const data = {
      title,
      desc,
      requirements,
      branchId,
      googleFormUrl: googleFormUrl || undefined,
      expiryDate: expiryDate || undefined
    };

    startTransition(async () => {
      const res = await createJob(data);
      if (res.success && res.data) {
        setJobs(prev => [res.data as Job, ...prev]);
        setTitle("");
        setDesc("");
        setReqsText("");
        setBranchId("Global");
        setGoogleFormUrl("");
        setExpiryDate("");
        setIsPosting(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } else {
        setError(res.error || "Failed to publish job opening.");
      }
    });
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    // Optimistic Update
    setJobs(prev => prev.map(j => j.id === id ? { ...j, isActive: !currentStatus } : j));
    
    const res = await toggleJobStatus(id, !currentStatus);
    if (res.error) {
      // Rollback
      setJobs(prev => prev.map(j => j.id === id ? { ...j, isActive: currentStatus } : j));
      alert(res.error);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to permanently withdraw this job position?")) return;

    startTransition(async () => {
      const res = await deleteJob(id);
      if (res.success) {
        setJobs(prev => prev.filter(j => j.id !== id));
      } else {
        alert(res.error || "Failed to delete position.");
      }
    });
  };

  const filteredJobs = jobs.filter(j => {
    if (activeFilter === "open") return j.isActive;
    if (activeFilter === "closed") return !j.isActive;
    return true;
  });

  return (
    <div className="space-y-10 text-black">
      
      {/* Filters & Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-4 border-b border-black/5">
        <div className="flex items-center gap-2 p-1 bg-brand-pearl rounded-2xl w-fit border border-black/5">
          {[
            { id: "all", label: "All Listed" },
            { id: "open", label: "Open Roles" },
            { id: "closed", label: "Closed / Filled" }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all",
                activeFilter === f.id ? "bg-white text-brand-gold shadow-md" : "text-brand-charcoal/40 hover:text-brand-charcoal"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {!isPosting && (
          <button 
            onClick={() => setIsPosting(true)}
            className="px-8 py-4 bg-brand-charcoal text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.25em] flex items-center gap-3 hover:bg-brand-gold transition-all duration-500 shadow-md shrink-0 w-fit"
          >
            <Plus className="w-4 h-4" />
            Publish Opportunity
          </button>
        )}
      </div>

      {/* 2. Create Job Form */}
      <AnimatePresence>
        {isPosting && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handlePost} className="bg-white p-10 border border-black/5 rounded-[2.5rem] shadow-sm space-y-8 max-w-4xl">
              <div className="flex justify-between items-center pb-4 border-b border-black/5">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-charcoal">New Opportunity Protocol</h3>
                <button type="button" onClick={() => setIsPosting(false)} className="p-2 hover:bg-brand-pearl rounded-lg text-brand-charcoal/30">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-700 text-[10px] font-bold rounded-xl flex items-center gap-2 border border-red-100 uppercase tracking-widest">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 block">Position Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Senior Optometrist"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-brand-pearl/20 border-none p-4 text-xs font-light focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 block">Job Description</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="Describe the roles, day-to-day work, and benefits..."
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="w-full bg-brand-pearl/20 border-none p-4 text-xs font-light focus:ring-1 focus:ring-brand-gold/20 rounded-xl leading-relaxed outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 block">Target Boutique Node</label>
                      <select
                        value={branchId}
                        onChange={(e) => setBranchId(e.target.value)}
                        className="w-full bg-brand-pearl/20 border-none p-3.5 text-xs focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none"
                      >
                        <option value="Global">Global (All branches)</option>
                        {branches.map(br => (
                          <option key={br.id} value={br.id}>{br.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 block">Expiry Schedule Date</label>
                      <input 
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="w-full bg-brand-pearl/20 border-none p-3.5 text-xs focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 block">Google Form Redirect Application Link</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/20" />
                      <input 
                        type="text" 
                        placeholder="https://docs.google.com/forms/d/..."
                        value={googleFormUrl}
                        onChange={(e) => setGoogleFormUrl(e.target.value)}
                        className="w-full bg-brand-pearl/20 border-none py-3.5 pl-12 pr-4 text-xs focus:ring-1 focus:ring-brand-gold/20 rounded-xl outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 flex flex-col h-full">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 block">
                    Key Requirements
                    <span className="ml-2 font-normal text-brand-gold/60 lowercase">â€” one per line</span>
                  </label>
                  <textarea 
                    rows={12}
                    required
                    placeholder="e.g. Diploma/B.Sc in Optometry&#10;3+ Years Clinical Experience&#10;Strong Customer engagement skills"
                    value={reqsText}
                    onChange={(e) => setReqsText(e.target.value)}
                    className="w-full flex-1 bg-brand-pearl/20 border-none p-4 text-xs font-light focus:ring-1 focus:ring-brand-gold/20 rounded-xl leading-relaxed outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-black/5">
                <button 
                  type="button" 
                  onClick={() => setIsPosting(false)}
                  className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/40 hover:text-red-500 transition-colors"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="px-10 py-4 bg-brand-charcoal hover:bg-brand-gold text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-xl transition-colors shadow-lg"
                >
                  {isPending ? "Publishing..." : "Finalize Posting"}
                </button>
              </div>
            </form>
          </m.div>
        )}
      </AnimatePresence>

      {/* 3. Active Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const branchName = job.branchId === "Global" ? "Global (All Branches)" : branches.find(b => b.id === job.branchId)?.name || job.branchId;
            return (
              <div key={job.id} className="bg-white border border-black/5 p-8 rounded-[2rem] shadow-sm flex flex-col justify-between group hover:border-brand-gold/20 transition-all duration-500">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 bg-brand-pearl rounded-xl flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors duration-500">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(job.id, job.isActive)}
                        className={cn(
                          "p-2 rounded-xl border transition-colors flex items-center justify-center gap-1.5 text-[8px] font-bold uppercase tracking-widest",
                          job.isActive 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-500/10 hover:bg-emerald-100" 
                            : "bg-gray-50 text-gray-400 border-black/5 hover:bg-brand-pearl"
                        )}
                      >
                        <Power className="w-3.5 h-3.5" />
                        {job.isActive ? "Open" : "Closed"}
                      </button>

                      <button 
                        onClick={() => handleDelete(job.id)}
                        disabled={isPending}
                        className="p-2 bg-brand-pearl/40 hover:bg-red-50 rounded-xl text-brand-charcoal/20 hover:text-red-500 border border-transparent hover:border-red-500/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="flex items-center gap-1 text-[8.5px] font-bold text-brand-gold uppercase tracking-widest">
                      <MapPin className="w-3 h-3" />
                      {branchName}
                    </span>
                    {job.expiryDate && (
                      <span className="flex items-center gap-1 text-[8.5px] font-medium text-brand-charcoal/40 uppercase tracking-widest">
                        <Calendar className="w-3 h-3" />
                        Exp: {new Date(job.expiryDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-brand-charcoal uppercase tracking-tight mb-2 group-hover:text-brand-gold transition-colors">
                    {job.title}
                  </h3>
                  
                  {job.googleFormUrl && (
                    <a 
                      href={job.googleFormUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-widest text-brand-gold hover:text-brand-charcoal mb-4 transition-colors"
                    >
                      <Globe className="w-3 h-3" />
                      Google Form Configured
                    </a>
                  )}

                  <p className="text-xs text-brand-charcoal/50 font-light line-clamp-4 leading-relaxed mb-6">
                    {job.desc}
                  </p>

                  {job.requirements.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/30 block mb-1">Key Requirements</span>
                      <ul className="space-y-1.5">
                        {job.requirements.slice(0, 3).map((req, rIdx) => (
                          <li key={rIdx} className="text-[10px] font-medium text-brand-charcoal/70 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 flex-shrink-0" />
                            <span className="truncate">{req}</span>
                          </li>
                        ))}
                        {job.requirements.length > 3 && (
                          <li className="text-[9px] text-brand-gold uppercase tracking-wider font-bold">
                            + {job.requirements.length - 3} more specs
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/30">
                  <span className={cn(
                    "flex items-center gap-1.5 font-bold",
                    job.isActive ? "text-emerald-600" : "text-brand-charcoal/40"
                  )}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {job.isActive ? "Live on Portal" : "Position Closed"}
                  </span>
                  <span>ID: {job.id}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center bg-white border border-dashed border-black/10 rounded-[2.5rem]">
            <div className="flex flex-col items-center gap-4 text-brand-charcoal/30">
              <Briefcase className="w-10 h-10 font-light" />
              <p className="text-xs uppercase tracking-widest font-bold">No listed openings matched active filter.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
