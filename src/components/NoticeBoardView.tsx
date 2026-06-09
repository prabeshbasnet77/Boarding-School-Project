import React, { useState } from "react";
import { Notice } from "../types";
import { Search, Calendar, User, Pin, Printer, Download, Eye, X, BookOpen, AlertCircle, Sparkles } from "lucide-react";

interface NoticeBoardViewProps {
  notices: Notice[];
}

export const NoticeBoardView: React.FC<NoticeBoardViewProps> = ({ notices }) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);

  const categories = ["All", "Academic", "Admission", "Event", "Holiday", "General"];

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(search.toLowerCase()) || 
                          notice.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort pinned notices to the absolute top, then sort by date descending
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Admission": return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Academic": return "bg-blue-50 text-blue-700 border-blue-200/60";
      case "Event": return "bg-purple-50 text-purple-700 border-purple-200/60";
      case "Holiday": return "bg-rose-50 text-rose-700 border-rose-250/60";
      default: return "bg-slate-50 text-slate-700 border-slate-200/60";
    }
  };

  const handlePrint = (notice: Notice) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return alert("Please allow popups to print notice!");
    printWindow.document.write(`
      <html>
        <head>
          <title>PRINT NOTICE - ${notice.title}</title>
          <style>
            body { font-family: "Inter", sans-serif; padding: 40px; color: #191c1e; line-height: 1.6; }
            .header { border-bottom: 2px solid #000613; padding-bottom: 20px; margin-bottom: 30px; text-align: center; }
            .school-title { font-size: 24px; font-weight: bold; font-family: "Montserrat", sans-serif; letter-spacing: 1px; }
            .notice-meta { display: flex; justify-content: space-between; font-size: 13px; color: #555; margin-bottom: 20px; }
            .title { font-size: 20px; font-weight: 800; margin-bottom: 15px; color: #000; }
            .content { white-space: pre-wrap; margin-bottom: 40px; text-align: justify; }
            .footer { border-top: 1px solid #ccc; padding-top: 20px; margin-top: 50px; text-align: right; font-size: 13px; }
          </style>
        </head>
        <body onload="window.print()">
          <div class="header">
            <div class="school-title">EKATA SHISHU NIKETAN</div>
            <div>Official Educational Administration Board Notice</div>
          </div>
          <div class="notice-meta">
            <div><strong>Date:</strong> ${notice.date}</div>
            <div><strong>Category:</strong> ${notice.category}</div>
            <div><strong>By:</strong> ${notice.author}</div>
          </div>
          <div class="title">${notice.title}</div>
          <div class="content">${notice.content}</div>
          <div class="footer">
            <p>Authorized Signature Representative</p>
            <p><em>Ekata Shishu Niketan, West Bengal</em></p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Notice Board Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-500">LIVE ANNOUNCEMENTS</span>
        <h2 className="text-3xl font-headline font-black text-[#000613]">Official Board of Notice</h2>
        <div className="w-12 h-1 bg-[#3a5f94] mx-auto rounded-full"></div>
      </div>

      {/* Interactive Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#eceef0] flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-[#3a5f94] text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {cat === "All" ? "All Notices" : cat}
            </button>
          ))}
        </div>

        {/* Search Input bar */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search notice body..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white text-xs text-slate-950 rounded-lg border border-slate-300 focus:outline-[#3a5f94]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Notices Grid listing */}
      <div className="space-y-4">
        {sortedNotices.length > 0 ? (
          sortedNotices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white rounded-2xl border transition-all hover:scale-[1.01] p-6 relative flex flex-col justify-between gap-4 ${
                notice.isPinned
                  ? "border-amber-400/80 bg-amber-500/[0.02] shadow-xs"
                  : "border-[#eceef0]"
              }`}
            >
              {/* Highlight badge for Pinned items */}
              {notice.isPinned && (
                <div className="absolute top-0 right-6 -translate-y-1/2 flex items-center gap-1 bg-[#ffe088] text-[#735c00] text-[10px] font-bold font-mono px-2.5 py-1 rounded-full border border-amber-300 shadow-xs">
                  <Pin className="w-3 h-3 uppercase rotate-45" />
                  <span>PINNED URGENT</span>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-bold border px-2.5 py-0.5 rounded-md uppercase ${getCategoryColor(notice.category)}`}>
                    {notice.category}
                  </span>
                  <span className="text-slate-400 font-medium text-xs">•</span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{notice.date}</span>
                  </div>
                </div>

                <h3 className="font-headline font-bold text-base md:text-lg text-slate-900 line-clamp-1">
                  {notice.title}
                </h3>

                <p className="text-xs text-[#43474e] leading-relaxed font-sans line-clamp-2 md:line-clamp-3">
                  {notice.content}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium text-[11px]">Published: {notice.author}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveNotice(notice)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-[#ffe088]/20 hover:text-amber-800 rounded-lg text-slate-700 transition-all font-medium inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Read Full</span>
                  </button>
                  <button
                    onClick={() => handlePrint(notice)}
                    title="Print Notice Card"
                    className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center bg-white border border-[#eceef0] p-16 rounded-3xl">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">campaign</span>
            <p className="text-slate-500 font-sans text-sm">No notices discovered matching that search context.</p>
          </div>
        )}
      </div>

      {/* Read Notice Modal dialog */}
      {activeNotice && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-[999] animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            {/* Header banner */}
            <div className="bg-[#000613] text-white p-6 relative">
              <button
                onClick={() => setActiveNotice(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 roundedbg-slate-800 text-[#a7c8ff] uppercase font-bold text-[10px] border border-sky-800">
                    {activeNotice.category}
                  </span>
                  <span>•</span>
                  <span className="font-mono text-slate-300">{activeNotice.date}</span>
                </div>
                <h4 className="font-headline font-bold text-lg md:text-xl text-white tracking-wide pr-8">
                  {activeNotice.title}
                </h4>
              </div>
            </div>

            {/* Core body */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="text-xs md:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-wrap text-justify">
                {activeNotice.content}
              </div>

              {/* Publisher stamps */}
              <div className="bg-[#f2f4f6] p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="text-xs">
                  <p className="text-slate-500">Official Issuing Representative</p>
                  <p className="font-bold text-slate-800 font-headline mt-0.5">{activeNotice.author}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePrint(activeNotice)}
                    className="px-4 py-2 bg-slate-200 text-slate-850 hover:bg-slate-300 text-xs font-semibold rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Notice</span>
                  </button>
                  <button
                    onClick={() => {
                      alert("Simulating file download: ESN_Notice_" + activeNotice.id + ".pdf generated successfully!");
                    }}
                    className="px-4 py-2 bg-[#001f3f] hover:bg-opacity-90 text-white text-xs font-semibold rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
