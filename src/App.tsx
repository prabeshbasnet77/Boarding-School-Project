import React, { useState, useEffect } from "react";
import { SchoolInfo, Notice, Inquiry, Photo, Faculty, Testimonial } from "./types";
import { 
  initialSchoolInfo, 
  initialNotices, 
  initialPhotos, 
  initialFaculty, 
  initialTestimonials 
} from "./data/initialData";
import { PublicNavBar } from "./components/PublicNavBar";
import { PublicHome } from "./components/PublicHome";
import { AcademicsView } from "./components/AcademicsView";
import { NoticeBoardView } from "./components/NoticeBoardView";
import { AdmissionsInquiryView } from "./components/AdmissionsInquiryView";
import { InteractiveGallery } from "./components/InteractiveGallery";
import { AdminPortal } from "./components/AdminPortal";
import { Landmark, ShieldAlert, Heart, Info, Loader2 } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // States with LocalStorage synchronization
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>(() => {
    const saved = localStorage.getItem("esn_school_info");
    return saved ? JSON.parse(saved) : initialSchoolInfo;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem("esn_notices");
    return saved ? JSON.parse(saved) : initialNotices;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem("esn_inquiries");
    if (saved) return JSON.parse(saved);
    // Fresh mock state populate so admin section looks great instantly
    return [
      {
        id: "ESN-2026-INQ-1049",
        candidateName: "Debayan Mukharjee",
        parentName: "Sri Pranab Mukharjee",
        expectedClass: "Class VII",
        mobile: "9876543210",
        email: "pranab.mukh@yahoo.co.in",
        queryDetails: "Inquiring about special track athletics participation coaching slots and regional language alternatives.",
        status: "Contacted",
        date: "2026-06-05",
      },
      {
        id: "ESN-2026-INQ-2481",
        candidateName: "Ishita Kundu",
        parentName: "Smt. Shrestha Kundu",
        expectedClass: "LKG",
        mobile: "9123456789",
        email: "shrestha.kundu@gmail.com",
        queryDetails: "Daughter is 4 years old. Wants to verify transport routing limits around the Children's Academy Zone in Jalpaiguri.",
        status: "Pending",
        date: "2026-06-07",
      }
    ];
  });

  const [faculties, setFaculties] = useState<Faculty[]>(() => {
    const saved = localStorage.getItem("esn_faculty");
    return saved ? JSON.parse(saved) : initialFaculty;
  });

  const [photos, setPhotos] = useState<Photo[]>(() => {
    const saved = localStorage.getItem("esn_photos");
    return saved ? JSON.parse(saved) : initialPhotos;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem("esn_testimonials");
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  // Watchers to synchronize with user's localStorage
  useEffect(() => {
    localStorage.setItem("esn_school_info", JSON.stringify(schoolInfo));
  }, [schoolInfo]);

  useEffect(() => {
    localStorage.setItem("esn_notices", JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem("esn_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem("esn_faculty", JSON.stringify(faculties));
  }, [faculties]);

  useEffect(() => {
    localStorage.setItem("esn_photos", JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem("esn_testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  // Scroll to TOP on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab, isAdmin]);

  // Handle addition of inquiries
  const handleAddInquiry = (newInq: Omit<Inquiry, "id" | "status" | "date">) => {
    const generatedInq: Inquiry = {
      ...newInq,
      id: `ESN-2026-INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };
    setInquiries((prev) => [generatedInq, ...prev]);
  };

  // Inquiry update status
  const handleUpdateInquiryStatus = (id: string, status: Inquiry["status"]) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  // Inquiry deletion
  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  // Switch Admin tab directly
  const handleEnterAdminConsole = () => {
    setIsAdmin(true);
    setActiveTab("admin-portal");
  };

  const handleToggleAdminMode = () => {
    setIsAdmin(!isAdmin);
    if (isAdmin) {
      setActiveTab("home");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col justify-between selection:bg-[#3a5f94] selection:text-white relative">
      
      {/* 1. Global Public Ribbon Layout */}
      <PublicNavBar
        schoolInfo={schoolInfo}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdminMode}
        onEnterAdmin={handleEnterAdminConsole}
      />

      {/* 2. Core Operational Body Wrapper */}
      <main className="flex-grow">
        {isAdmin ? (
          /* Secure Workspace dashboard panels */
          <AdminPortal
            schoolInfo={schoolInfo}
            onUpdateSchoolInfo={setSchoolInfo}
            notices={notices}
            onAddNotice={(n) => setNotices((prev) => [n, ...prev])}
            onDeleteNotice={(id) => setNotices((prev) => prev.filter((n) => n.id !== id))}
            onTogglePinNotice={(id) => setNotices((prev) =>
              prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
            )}
            inquiries={inquiries}
            onUpdateInquiryStatus={handleUpdateInquiryStatus}
            onDeleteInquiry={handleDeleteInquiry}
            faculties={faculties}
            onAddFaculty={(fac) => setFaculties((prev) => [fac, ...prev])}
            onDeleteFaculty={(id) => setFaculties((prev) => prev.filter((fac) => fac.id !== id))}
            photos={photos}
            onAddPhoto={(photo) => setPhotos((prev) => [photo, ...prev])}
            onDeletePhoto={(id) => setPhotos((prev) => prev.filter((photo) => photo.id !== id))}
          />
        ) : (
          /* Public Views govern tabs */
          <>
            {activeTab === "home" && (
              <PublicHome
                schoolInfo={schoolInfo}
                photos={photos}
                testimonials={testimonials}
                setActiveTab={setActiveTab}
              />
            )}
            
            {activeTab === "academics" && (
              <AcademicsView 
                schoolInfo={schoolInfo} 
                faculties={faculties} 
              />
            )}
            
            {activeTab === "notices" && (
              <NoticeBoardView 
                notices={notices} 
              />
            )}
            
            {activeTab === "admissions" && (
              <AdmissionsInquiryView
                schoolInfo={schoolInfo}
                onAddInquiry={handleAddInquiry}
              />
            )}
            
            {activeTab === "gallery" && (
              <InteractiveGallery 
                photos={photos} 
              />
            )}
          </>
        )}
      </main>

      {/* 3. Aesthetic Universal Footer Coordinates */}
      <footer className="bg-[#000613] text-white pt-12 border-t border-[#6f88ad]/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 pb-8">
          
          {/* Column A: Logo Brand and Vision */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#d4e3ff] text-[#000613] p-1.5 rounded-lg">
                <Landmark className="w-5 h-5" />
              </div>
              <h2 className="font-headline font-black text-white tracking-wider text-base">
                {schoolInfo.name}
              </h2>
            </div>
            
            <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm text-justify">
              {schoolInfo.aboutText}
            </p>

            <div className="pt-2 text-[10px] text-slate-500 font-mono">
              Affiliated with WB Board Standards & CBSE Curriculum Guide Integration Plan.
            </div>
          </div>

          {/* Column B: Links Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-headline font-bold text-[#ffe088] text-xs uppercase tracking-wider">
              Quick Portals
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <button onClick={() => { setActiveTab("home"); setIsAdmin(false); }} className="text-left hover:text-[#ffe088] transition-colors cursor-pointer">Home</button>
              <button onClick={() => { setActiveTab("academics"); setIsAdmin(false); }} className="text-left hover:text-[#ffe088] transition-colors cursor-pointer">Academics</button>
              <button onClick={() => { setActiveTab("notices"); setIsAdmin(false); }} className="text-left hover:text-[#ffe088] transition-colors cursor-pointer">Notice Feed</button>
              <button onClick={() => { setActiveTab("admissions"); setIsAdmin(false); }} className="text-left hover:text-[#ffe088] transition-colors cursor-pointer font-bold text-emerald-400">Admissions</button>
              <button onClick={() => { setActiveTab("gallery"); setIsAdmin(false); }} className="text-left hover:text-[#ffe088] transition-colors cursor-pointer">Media Gallery</button>
              <button onClick={handleEnterAdminConsole} className="text-left hover:text-[#ffe088] transition-colors cursor-pointer text-amber-500">Admin Login</button>
            </div>
          </div>

          {/* Column C: Contact Points */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-headline font-bold text-[#ffe088] text-xs uppercase tracking-wider">
              Institutional Coordinates
            </h4>
            
            <div className="space-y-2 text-slate-300">
              <p className="flex items-start gap-2 leading-relaxed">
                <span className="material-symbols-outlined text-sm shrink-0 text-[#a7c8ff] mt-0.5">map</span>
                <span>{schoolInfo.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm shrink-0 text-[#a7c8ff]">call</span>
                <a href={`tel:${schoolInfo.phone}`} className="hover:text-white">{schoolInfo.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm shrink-0 text-[#a7c8ff]">mail</span>
                <a href={`mailto:${schoolInfo.email}`} className="hover:text-white">{schoolInfo.email}</a>
              </p>
            </div>
          </div>

        </div>

        {/* Outer Ribbon info */}
        <div className="bg-[#00132b] py-3 text-center border-t border-slate-900 text-[10px] text-slate-400 font-sans px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <p>&copy; 2026 {schoolInfo.name}. All administrative clearance reservations guaranteed.</p>
            <p className="flex items-center gap-1">
              <span>Made for Jalpaiguri Excellence wing</span>
              <Heart className="w-3 h-3 text-rose-500 shrink-0 fill-rose-500" />
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
