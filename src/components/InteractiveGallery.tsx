import React, { useState } from "react";
import { Photo } from "../types";
import { X, ChevronLeft, ChevronRight, Eye, Calendar, Sparkles } from "lucide-react";

interface InteractiveGalleryProps {
  photos: Photo[];
}

export const InteractiveGallery: React.FC<InteractiveGalleryProps> = ({ photos }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Campus", "Sports", "Academic", "Festivals", "Co-Curricular"];

  const filteredPhotos = photos.filter((p) => {
    return selectedCategory === "All" || p.category === selectedCategory;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null || filteredPhotos.length === 0) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null || filteredPhotos.length === 0) return;
    setLightboxIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev! + 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Page Header Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#3a5f94] font-bold">LIFE AT ES NICETAN</span>
        <h2 className="text-3xl font-headline font-black text-[#000613]">School Gallery & Moments</h2>
        <div className="w-12 h-1 bg-[#3a5f94] mx-auto rounded-full"></div>
      </div>

      {/* Categories Selector Ribbon */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-[#3a5f94] text-white shadow-xs"
                : "bg-white border border-[#eceef0] hover:bg-slate-50 text-slate-700"
            }`}
          >
            {cat === "All" ? "All Moments" : cat}
          </button>
        ))}
      </div>

      {/* Grid Canvas */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id || index}
              onClick={() => setLightboxIndex(index)}
              className="group bg-white rounded-2xl overflow-hidden border border-[#eceef0] shadow-2xs hover:shadow-md cursor-pointer transition-all duration-300 transform hover:-translate-y-1 relative"
            >
              {/* Image Frame */}
              <div className="h-56 md:h-60 overflow-hidden relative">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glass Hover Plate */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <Eye className="w-5 h-5 animate-pulse" />
                  </div>
                </div>

                {/* Category label */}
                <span className="absolute top-3 left-3 bg-[#001f3f]/90 text-[#a7c8ff] text-[10px] font-bold font-mono px-2.5 py-1 rounded-md border border-[#6f88ad]/20 uppercase">
                  {photo.category}
                </span>
              </div>

              {/* Data panel Details */}
              <div className="p-4 space-y-1 bg-white">
                <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{photo.date}</span>
                </p>
                <h4 className="font-headline font-bold text-slate-900 text-sm leading-tight line-clamp-1">
                  {photo.title}
                </h4>
                {photo.description && (
                  <p className="text-xs text-[#43474e] leading-snug line-clamp-2 pt-0.5">
                    {photo.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-white border border-[#eceef0] p-16 rounded-3xl max-w-md mx-auto">
          <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">image_not_supported</span>
          <p className="text-slate-500 font-sans text-sm">No photos added yet in the selected category.</p>
        </div>
      )}

      {/* Dynamic Slide Lightbox Dialog overlay */}
      {lightboxIndex !== null && filteredPhotos.length > 0 && (
        <div 
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 bg-slate-950/95 backdrop-blur-xs flex flex-col justify-between p-4 z-[999] animate-in fade-in duration-200"
        >
          {/* Top Panel Actions */}
          <div className="flex justify-between items-center text-white p-2">
            <div className="text-xs font-mono">
              <span className="bg-[#3a5f94] px-2.5 py-1 rounded-md uppercase font-bold text-[10px] text-white">
                {filteredPhotos[lightboxIndex].category}
              </span>
              <span className="ml-3 text-slate-300">{lightboxIndex + 1} / {filteredPhotos.length}</span>
            </div>
            
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 bg-white/10 hover:bg-white/25 rounded-full text-white transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Standard Center image block */}
          <div className="flex-1 flex items-center justify-between gap-4 max-w-5xl mx-auto w-full relative">
            
            {/* Slide left button */}
            <button
              onClick={handlePrev}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all shrink-0 hover:scale-[1.05] cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Core Box */}
            <div className="max-h-[60vh] md:max-h-[70vh] flex items-center justify-center overflow-hidden">
              <img
                src={filteredPhotos[lightboxIndex].imageUrl}
                alt={filteredPhotos[lightboxIndex].title}
                onClick={(e) => e.stopPropagation()} // Avoid closing
                className="max-h-full max-w-full rounded-2xl object-contain border border-white/10 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Slide right button */}
            <button
              onClick={handleNext}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all shrink-0 hover:scale-[1.05] cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption Overlay text panel */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 p-5 rounded-2xl max-w-3xl mx-auto text-white space-y-1.5 w-full mb-4 md:mb-8"
          >
            <h4 className="font-headline font-bold text-sm tracking-wide text-[#ffe088] uppercase">
              {filteredPhotos[lightboxIndex].title}
            </h4>
            <p className="text-xs text-slate-300 font-sans">
              {filteredPhotos[lightboxIndex].description || "Official photograph representing curriculum milestones at Ekata Shishu Niketan."}
            </p>
            <p className="text-[10px] text-slate-500 font-mono uppercase">
              Captured: {filteredPhotos[lightboxIndex].date}
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
