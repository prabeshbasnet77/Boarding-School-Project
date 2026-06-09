import React, { useState, useEffect } from "react";
import { SchoolInfo, Photo, Testimonial } from "../types";
import { Quote, ArrowRight, Compass, Heart, Award, Sparkles, ChevronLeft, ChevronRight, MessageSquareCode } from "lucide-react";

interface PublicHomeProps {
  schoolInfo: SchoolInfo;
  photos: Photo[];
  testimonials: Testimonial[];
  setActiveTab: (tab: string) => void;
}

export const PublicHome: React.FC<PublicHomeProps> = ({
  schoolInfo,
  photos,
  testimonials,
  setActiveTab,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  // Filter campus/academic images for slide show
  const slidePhotos = photos.filter(p => p.category === "Campus" || p.category === "Academic").slice(0, 4);

  useEffect(() => {
    if (slidePhotos.length === 0) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slidePhotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slidePhotos.length]);

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? slidePhotos.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % slidePhotos.length);
  };

  const keyValues = [
    {
      icon: <Compass className="w-8 h-8 text-[#3a5f94]" />,
      title: "Exploration",
      text: "Unlocks curiosity through experimental laboratory projects and interactive smart classroom designs.",
    },
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: "Empathy & Ethics",
      text: "Ensures community involvement, digital safety awareness, and strong respect for agricultural and labor values.",
    },
    {
      icon: <Award className="w-8 h-8 text-amber-500" />,
      title: "Academic Rigor",
      text: "Adheres strictly to the national standard of education, maintaining a strict 20:1 student-to-teacher focus.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-emerald-500" />,
      title: "Holistic Development",
      text: "Cultivates talents in regional dances, competitive track athletics, and state-level robotics Olympiads.",
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Dynamic Image Slideshow Hero */}
      {slidePhotos.length > 0 && (
        <section className="relative h-[480px] md:h-[580px] w-full overflow-hidden bg-slate-950">
          <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
            <img
              src={slidePhotos[slideIndex].imageUrl}
              alt={slidePhotos[slideIndex].title}
              className="w-full h-full object-cover opacity-60 transform scale-105 transition-transform duration-[5000ms]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000613] via-[#000613]/40 to-transparent"></div>
          </div>

          {/* Slider Content Frame */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto">
            <div className="max-w-2xl text-white space-y-4 animate-in fade-in slide-in-from-bottom duration-500">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ffe088] text-slate-950 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#735c00] animate-pulse"></span>
                Official Portal
              </span>
              <h2 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight drop-shadow-md">
                {schoolInfo.name}
              </h2>
              <p className="text-base md:text-lg text-slate-200/95 font-sans font-light drop-shadow">
                {slidePhotos[slideIndex].description || schoolInfo.tagline}
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveTab("admissions")}
                  className="px-6 py-3 bg-[#3a5f94] hover:bg-opacity-90 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center gap-2 group cursor-pointer"
                >
                  <span>Admission Enquiry 2026-27</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => setActiveTab("notices")}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium backdrop-blur transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Latest Notices</span>
                  <span className="material-symbols-outlined text-sm">notifications_active</span>
                </button>
              </div>
            </div>
          </div>

          {/* Slider Controllers */}
          <div className="absolute bottom-6 right-6 md:right-12 flex items-center gap-2 z-20">
            <button
              onClick={handlePrevSlide}
              className="p-3 rounded-full bg-[#000613]/80 hover:bg-[#000613] text-white transition-all hover:scale-105 border border-white/10"
              aria-label="Previous Campus Image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-white text-xs font-mono select-none px-2 backdrop-blur bg-black/40 py-1 rounded-md">
              {slideIndex + 1} / {slidePhotos.length}
            </span>
            <button
              onClick={handleNextSlide}
              className="p-3 rounded-full bg-[#000613]/80 hover:bg-[#000613] text-white transition-all hover:scale-105 border border-white/10"
              aria-label="Next Campus Image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      )}

      {/* Dynamic Key Performance Indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white p-8 rounded-3xl shadow-sm border border-[#eceef0]">
          <div className="text-center space-y-1">
            <p className="text-xs font-mono uppercase tracking-widest text-[#43474e]">ESTABLISHED</p>
            <h3 className="text-3xl md:text-4xl font-headline font-black text-[#000613]">1995</h3>
            <p className="text-xs text-[#43474e]">30+ Years Legacy</p>
          </div>
          <div className="text-center space-y-1 border-l border-slate-100">
            <p className="text-xs font-mono uppercase tracking-widest text-[#43474e]">FACULTY COUNT</p>
            <h3 className="text-3xl md:text-4xl font-headline font-black text-[#3a5f94]">25+</h3>
            <p className="text-xs text-[#43474e]">Dedicated Specialists</p>
          </div>
          <div className="text-center space-y-1 border-l border-slate-100">
            <p className="text-xs font-mono uppercase tracking-widest text-[#43474e]">TEACHER RATIO</p>
            <h3 className="text-3xl md:text-4xl font-headline font-black text-amber-600">20:1</h3>
            <p className="text-xs text-[#43474e]">Strict Classroom Limit</p>
          </div>
          <div className="text-center space-y-1 border-l border-slate-100">
            <p className="text-xs font-mono uppercase tracking-widest text-[#43474e]">SUCCESS RATIO</p>
            <h3 className="text-3xl md:text-4xl font-headline font-black text-emerald-600">100%</h3>
            <p className="text-xs text-[#43474e]">Board Exam Distinction</p>
          </div>
        </div>
      </section>

      {/* Main Core Values Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#3a5f94] font-bold">FOUNDATIONAL PILLARS</span>
          <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-[#000613]">
            Empowering Future Global Catalysts
          </h2>
          <div className="w-16 h-1.5 bg-[#3a5f94] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyValues.map((val, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-xs border border-[#eceef0] hover:shadow-md hover:border-[#3a5f94]/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-3 bg-slate-50 rounded-xl inline-block mb-4">
                {val.icon}
              </div>
              <h3 className="text-lg font-headline font-bold text-slate-950 mb-2">
                {val.title}
              </h3>
              <p className="text-sm text-[#43474e] leading-relaxed font-sans">
                {val.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Principal Photo & Message */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#000613] text-white rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Portrait Container */}
          <div className="lg:col-span-4 relative min-h-[350px] lg:min-h-full">
            <img
              src={schoolInfo.principalPhoto}
              alt={schoolInfo.principalName}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#000613]/5 to-[#000613]"></div>
            
            {/* Info Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#001f3f]/90 backdrop-blur border border-[#6f88ad]/20 text-center lg:text-left">
              <h4 className="font-headline font-semibold text-white">{schoolInfo.principalName}</h4>
              <p className="text-xs text-[#a7c8ff]">Headmistress & Educational Leader</p>
            </div>
          </div>

          {/* Letter / Message Frame */}
          <div className="lg:col-span-8 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <div className="flex gap-1 justify-start">
              <Quote className="w-12 h-12 text-[#9fc2fe] opacity-30" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-headline font-extrabold tracking-tight text-white">
                Principal&apos;s Message
              </h3>
              <div className="w-12 h-1 bg-[#9fc2fe] rounded-full"></div>
            </div>

            <p className="text-slate-200/90 leading-relaxed font-sans italic text-base md:text-lg">
              &ldquo;{schoolInfo.principalMessage}&rdquo;
            </p>

            <div className="pt-4 flex items-center gap-4 text-xs font-mono text-[#d5e3ff]">
              <div>
                <p className="font-semibold text-white">Arundhati Roy Chowdhury</p>
                <p>ESN Administration Council</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Curriculum & Extracurricular Blocks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Vision Content Card */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-[#eceef0] space-y-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl text-[#3a5f94]">school</span>
              <h3 className="text-xl font-headline font-bold text-slate-950">Academic Curriculum Vision</h3>
            </div>
            <p className="text-sm text-[#43474e] leading-relaxed font-sans">
              {schoolInfo.curriculum}
            </p>
            <div className="border-t border-slate-100 pt-4">
              <button
                onClick={() => setActiveTab("academics")}
                className="text-sm font-semibold text-[#3a5f94] hover:text-[#294f83] inline-flex items-center gap-1 group cursor-pointer"
              >
                <span>Read Curriculum Grid & Faculties</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Co-Scholastic Checklist */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-[#eceef0] space-y-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl text-amber-500">sports_esports</span>
              <h3 className="text-xl font-headline font-bold text-slate-950">Co-Scholastic & Extracurriculars</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {schoolInfo.extracurricular.map((item, id) => (
                <div key={id} className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-500 text-lg shrink-0 mt-0.5">verified</span>
                  <span className="text-sm text-slate-800 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-4">
              <button
                onClick={() => setActiveTab("gallery")}
                className="text-sm font-semibold text-[#3a5f94] hover:text-[#294f83] inline-flex items-center gap-1 group cursor-pointer"
              >
                <span>View Galleried Sports & Fest Actions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Parent Testimonials Carousel */}
      <section className="bg-[#f2f4f6]/60 border-y border-[#eceef0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500">PARENT VOICE</span>
            <h3 className="text-2xl md:text-3xl font-headline font-extrabold text-[#000613]">What Our Community Says</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-xs relative flex flex-col justify-between"
              >
                <div className="absolute top-6 right-6 opacity-10">
                  <span className="material-symbols-outlined text-4xl text-[#000613]">format_quote</span>
                </div>
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: test.rating }).map((_, rIdx) => (
                      <span key={rIdx} className="material-symbols-outlined text-[#cca830] text-[18px]">star</span>
                    ))}
                  </div>
                  <p className="text-[#43474e] text-sm leading-relaxed font-sans italic">
                    &ldquo;{test.content}&rdquo;
                  </p>
                </div>
                <div className="border-t border-slate-100 mt-6 pt-4">
                  <h5 className="font-headline font-bold text-xs text-slate-900">{test.author}</h5>
                  <p className="text-xs text-slate-500">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
