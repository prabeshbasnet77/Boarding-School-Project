import React from "react";
import { SchoolInfo } from "../types";
import { GraduationCap, Phone, Mail, MapPin, Shield, Menu, X, Landmark } from "lucide-react";

interface PublicNavBarProps {
  schoolInfo: SchoolInfo;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onEnterAdmin: () => void;
}

export const PublicNavBar: React.FC<PublicNavBarProps> = ({
  schoolInfo,
  activeTab,
  setActiveTab,
  isAdmin,
  onToggleAdmin,
  onEnterAdmin,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const mainTabs = [
    { id: "home", label: "Home", icon: "home" },
    { id: "academics", label: "Academics", icon: "school" },
    { id: "notices", label: "Notice Board", icon: "campaign" },
    { id: "admissions", label: "Admissions", icon: "feed" },
    { id: "gallery", label: "Gallery", icon: "photo_library" },
  ];

  return (
    <header className="w-full bg-[#000613] text-white shadow-md relative z-50">
      {/* Top Banner Context Utility */}
      <div className="bg-[#001f3f]/90 text-xs px-4 md:px-8 py-2 border-b border-[#6f88ad]/20 flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-4 text-[#d4e3ff]">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">alarm_on</span>
            <span>Office Hrs: 8:00 AM - 2:30 PM &nbsp;(Mon - Sat)</span>
          </span>
          <span className="hidden md:inline-block">|</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">id_card</span>
            <span>ID: {schoolInfo.schoolId}</span>
          </span>
          <span className="hidden lg:inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            Admissions 2026-27 {schoolInfo.admissionStatus}
          </span>
        </div>
        <div className="flex items-center gap-4 text-[#d4e3ff]">
          <a href={`tel:${schoolInfo.phone}`} className="hover:text-white flex items-center gap-1 transition-colors">
            <span className="material-symbols-outlined text-sm">call</span>
            <span className="hidden sm:inline">{schoolInfo.phone}</span>
          </a>
          <a href={`mailto:${schoolInfo.email}`} className="hover:text-white flex items-center gap-1 transition-colors">
            <span className="material-symbols-outlined text-sm">mail</span>
            <span className="hidden sm:inline">{schoolInfo.email}</span>
          </a>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Brand Crest */}
        <div 
          onClick={() => setActiveTab("home")} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="bg-[#d4e3ff] text-[#000613] p-2.5 rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-inner">
            <Landmark className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-headline font-extrabold text-lg sm:text-xl md:text-2xl tracking-wider text-white select-none">
              {schoolInfo.name}
            </h1>
            <p className="text-xs text-[#a7c8ff]/80 font-sans tracking-wide">
              {schoolInfo.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-1">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (isAdmin) onToggleAdmin(); // Leave admin view when switching
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab.id && !isAdmin
                  ? "bg-[#3a5f94] text-white shadow-md shadow-blue-900/30 font-semibold"
                  : "text-[#d5e3ff] hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              {tab.label}
            </button>
          ))}

          {/* Vertical divider */}
          <span className="w-px h-6 bg-slate-700/50 mx-2"></span>

          {/* Admin Switch */}
          <button
            onClick={onEnterAdmin}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              isAdmin
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-800 text-[#ffe088] border border-amber-500/40 hover:bg-slate-700"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>{isAdmin ? "Admin Console Active" : "Admin Login"}</span>
          </button>
        </nav>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobilized Admin button */}
          <button
            onClick={onEnterAdmin}
            title="Admin Console"
            className={`p-2 rounded-lg shrink-0 transition-all ${
              isAdmin ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-[#ffe088] border border-[#ffe088]/30"
            }`}
          >
            <Shield className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-[#00132b] border-t border-slate-800 animate-in fade-in slide-in-from-top duration-250 z-50 relative">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (isAdmin) onToggleAdmin();
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all flex items-center gap-3 ${
                  activeTab === tab.id && !isAdmin
                    ? "bg-[#3a5f94] text-white font-bold"
                    : "text-[#d5e3ff] hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
