import React, { useState } from "react";
import { SchoolInfo, Inquiry } from "../types";
import { ShieldAlert, Send, FileText, CheckCircle, Smartphone, Mail, Sparkles, ChevronRight, GraduationCap } from "lucide-react";

interface AdmissionsInquiryViewProps {
  schoolInfo: SchoolInfo;
  onAddInquiry: (inquiry: Omit<Inquiry, "id" | "status" | "date">) => void;
}

export const AdmissionsInquiryView: React.FC<AdmissionsInquiryViewProps> = ({
  schoolInfo,
  onAddInquiry,
}) => {
  const [formData, setFormData] = useState({
    candidateName: "",
    parentName: "",
    expectedClass: "Nursery",
    mobile: "",
    email: "",
    queryDetails: "",
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const classes = [
    "Nursery", "LKG", "UKG", 
    "Class I", "Class II", "Class III", "Class IV", "Class V",
    "Class VI", "Class VII", "Class VIII", "Class IX"
  ];

  const classEligibility = [
    { grade: "Nursery", age: "3+ Years", assessment: "Informal Interactive Play session" },
    { grade: "LKG / UKG", age: "4+ / 5+ Years", assessment: "Visual & Oral concept identification" },
    { grade: "Class I to V", age: "6+ to 10+ Years", assessment: "Basic General English & Math aptitude" },
    { grade: "Class VI to IX", age: "11+ to 14+ Years", assessment: "Analytical Science, Math, & First Language evaluation" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(""); // Clear errors on typing
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { candidateName, parentName, mobile, email, expectedClass } = formData;

    // Direct validation rules
    if (!candidateName.trim() || !parentName.trim() || !mobile.trim() || !email.trim()) {
      setFormError("All primary fields are required to process candidate assessment.");
      return;
    }

    if (!/^\d{10}$/.test(mobile.replace(/\+/g, "").trim().slice(-10))) {
      setFormError("Please register a valid 10-digit mobile contact number.");
      return;
    }

    setIsSubmitting(true);

    // Simulate clean animation delays
    setTimeout(() => {
      // Create random simulated tracking sequence ID
      const generatedInqId = `ESN-2026-INQ-${Math.floor(1000 + Math.random() * 9000)}`;
      
      onAddInquiry(formData);
      setSubmittedId(generatedInqId);
      setIsSubmitting(false);

      // Reset form variables
      setFormData({
        candidateName: "",
        parentName: "",
        expectedClass: "Nursery",
        mobile: "",
        email: "",
        queryDetails: "",
      });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Visual top announcement */}
      <section className="bg-white p-8 rounded-3xl border border-[#eceef0] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ffe088]/30 text-[#735c00] uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Admissions Session 2026-2027</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-headline font-black text-[#000613]">
            Take the First Step to Educational Excellence
          </h2>
          <p className="text-sm text-[#43474e] font-sans leading-relaxed">
            Welcome to the academic registration gateway of Ekata Shishu Niketan. Admissions are monitored using systematic interactive assessments to align classrooms appropriately and support candidate orientation.
          </p>
        </div>

        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col justify-center items-center text-center">
          <p className="text-xs font-mono uppercase text-slate-500">ADMISSION SYSTEM STATUS</p>
          <div className={`mt-2 font-headline font-black text-2xl uppercase tracking-wider ${
            schoolInfo.admissionStatus === "Open" ? "text-emerald-600" : "text-rose-500"
          }`}>
            Registry {schoolInfo.admissionStatus}
          </div>
          <p className="text-[11px] text-[#43474e] mt-1">Nursery to Class IX registrations accepted</p>
        </div>
      </section>

      {/* Main core splitter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Eligibility Details Guide Card (Left-side) */}
        <section className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="bg-white p-6 rounded-3xl border border-[#eceef0] space-y-6 flex-1">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="material-symbols-outlined text-[#3a5f94] text-2xl">verified_user</span>
              <h3 className="font-headline font-extrabold text-[#000613] text-base">Eligibility & Class Placement</h3>
            </div>

            <div className="space-y-4 text-xs">
              {classEligibility.map((el, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span className="font-headline">{el.grade}</span>
                    <span className="text-slate-500">{el.age}</span>
                  </div>
                  <p className="text-[#43474e] leading-relaxed italic">{el.assessment}</p>
                  {index < classEligibility.length - 1 && <div className="border-b border-dashed border-slate-100/80 pt-2"></div>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#ffe4bb]/20 border border-amber-300/40 p-6 rounded-3xl space-y-3">
            <h4 className="font-headline font-bold text-sm text-amber-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 shrink-0 text-amber-700" />
              <span>Assessment Disclaimer</span>
            </h4>
            <p className="text-[11px] text-[#4f3e00] leading-relaxed">
              Interactions are customized entirely to be stress-free, engaging experiences for child candidates. We aim to assess readiness, conceptual curiosity, and coordination levels rather than rote memory.
            </p>
          </div>
        </section>

        {/* Dynamic Registered Inquiry Form Card (Right-side) */}
        <section className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-[#eceef0] shadow-2xs">
          {submittedId ? (
            /* Successful Registration UI banner */
            <div className="h-full flex flex-col justify-center items-center text-center p-6 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-headline font-extrabold text-[#000613]">Inquiry Submitted Successfully!</h3>
                <p className="text-xs text-[#43474e] leading-relaxed">
                  Your reference ID is <span className="font-mono bg-slate-100 px-2.5 py-1 text-slate-800 rounded-md font-bold text-xs">{submittedId}</span>. Please preserve this ID for immediate admission correspondences.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-150 text-xs text-slate-600 space-y-2.5 w-full max-w-md">
                <h5 className="font-bold text-slate-900 uppercase font-headline tracking-wide">Next Action milestones:</h5>
                <p className="flex items-start gap-2">
                  <span className="w-4 h-4 bg-[#3a5f94] text-white rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                  <span>An evaluation coordinator will review details within 48 business hours.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="w-4 h-4 bg-[#3a5f94] text-white rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                  <span>You will receive an interactive assessment invitation schedule via email or cellular contact.</span>
                </p>
              </div>

              <button
                onClick={() => setSubmittedId(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                Submit school inquiry for another candidate
              </button>
            </div>
          ) : (
            /* Entry Form Core */
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div className="space-y-2 border-b border-slate-100 pb-3">
                <h3 className="text-lg font-headline font-bold text-slate-950">Candidate Inquiry Form</h3>
                <p className="text-slate-500 leading-normal">Register your interest and queries with our admissions and verification board.</p>
              </div>

              {formError && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span className="font-medium">{formError}</span>
                </div>
              )}

              {/* Form grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="space-y-1.5Col">
                  <label className="block text-xs font-semibold text-slate-800">Candidate’s Legal Name *</label>
                  <input
                    type="text"
                    name="candidateName"
                    required
                    value={formData.candidateName}
                    onChange={handleInputChange}
                    placeholder="e.g. Debayan Mukharjee"
                    className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-3 outline-none focus:border-[#3a5f94] focus:bg-white text-xs transition-all text-slate-950"
                  />
                </div>

                {/* Grade Option Selection */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-800">Class Year Level Sought *</label>
                  <select
                    name="expectedClass"
                    value={formData.expectedClass}
                    onChange={handleInputChange}
                    className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-3 outline-none focus:border-[#3a5f94] focus:bg-white text-xs transition-all text-slate-950"
                  >
                    {classes.map((cls, idx) => (
                      <option key={idx} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                {/* Parent Guardian Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-800">Primary Parent / Guardian name *</label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="e.g. Sri Pranab Mukharjee"
                    className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-3 outline-none focus:border-[#3a5f94] focus:bg-white text-xs transition-all text-slate-950"
                  />
                </div>

                {/* Mobile */}
                <div className="space-y-1.5">
                  <label className="block text-[#191c1e] text-xs font-semibold">10-Digit Mobile Contact *</label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="e.g. 9876543210"
                    maxLength={10}
                    className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-3 outline-none focus:border-[#3a5f94] focus:bg-white text-xs transition-all text-slate-950"
                  />
                </div>

              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#191c1e]">Primary Guardian Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. parent.guardian@gmail.com"
                  className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-3 outline-none focus:border-[#3a5f94] focus:bg-white text-xs transition-all text-slate-950"
                />
              </div>

              {/* Query Specific details */}
              <div className="space-y-1.5">
                <label className="block text-[#191c1e] text-xs font-semibold">Inquiry Details or Scholar Background Profile (Optional)</label>
                <textarea
                  name="queryDetails"
                  rows={4}
                  value={formData.queryDetails}
                  onChange={handleInputChange}
                  placeholder="Tell us about your child's favorite subjects, creative extracurriculars played, or specific health and administrative accommodations required..."
                  className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-3 outline-none focus:border-[#3a5f94] focus:bg-white text-xs transition-all text-slate-950 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || schoolInfo.admissionStatus === "Closed"}
                className={`w-full py-3.5 rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  schoolInfo.admissionStatus === "Closed"
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                    : "bg-[#3a5f94] hover:bg-[#294f83] text-white hover:scale-[1.01]"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Processing Secure Assessment Registry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Candidate Admission interest</span>
                  </>
                )}
              </button>
            </form>
          )}
        </section>

      </div>

    </div>
  );
};
