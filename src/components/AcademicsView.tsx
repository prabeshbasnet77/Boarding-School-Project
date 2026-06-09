import React, { useState } from "react";
import { Faculty, SchoolInfo } from "../types";
import { Search, Mail, BookOpen, Layers, Award, Star, Globe } from "lucide-react";

interface AcademicsViewProps {
  schoolInfo: SchoolInfo;
  faculties: Faculty[];
}

export const AcademicsView: React.FC<AcademicsViewProps> = ({
  schoolInfo,
  faculties,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  // Get list of departments dynamically
  const departments = ["All", ...Array.from(new Set(faculties.map((f) => f.department)))];

  const filteredFaculties = faculties.filter((fac) => {
    const matchesSearch = fac.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          fac.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === "All" || fac.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const academicLevels = [
    {
      title: "Kindergarten (Nursery - UKG)",
      ages: "Ages 3 to 5",
      focus: "Play-based motor skills, phonetic vocabulary, creative drawing, social team learning.",
      subjects: ["English Phonics", "Elementary Numbers", "Interactive Arts", "Outdoor Coordination"],
    },
    {
      title: "Primary Wing (Grades I - V)",
      ages: "Ages 6 to 10",
      focus: "Logic structuring, linguistic fluency, basic scientific inquiry, and civic awareness.",
      subjects: ["Mathematics", "General Science", "Languages (English, Bengali/Hindi)", "Social Studies", "E-Coding"],
    },
    {
      title: "Secondary Wing (Grades VI - X)",
      ages: "Ages 11 to 15",
      focus: "Advanced analytical problem-solving, board syllabi alignment, competitive laboratorial skills.",
      subjects: ["Physics, Chemistry, Biology", "Algebra & Geometry", "Linguistics & Composition", "History & Civics", "IT Systems"],
    },
  ];

  const gradingSystem = [
    { grade: "A1", range: "91% - 100%", point: "10.0", criteria: "Outstanding scholastic mastery" },
    { grade: "A2", range: "81% - 90%", point: "9.0", criteria: "Excellent concept execution" },
    { grade: "B1", range: "71% - 80%", point: "8.0", criteria: "Very Good response rate" },
    { grade: "B2", range: "61% - 70%", point: "7.0", criteria: "Good standard proficiency" },
    { grade: "C1", range: "51% - 60%", point: "6.0", criteria: "Satisfactory participation" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Page Header Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#3a5f94] font-bold">NURTURING INTELLECTS</span>
        <h2 className="text-3xl md:text-4xl font-headline font-black text-[#000613]">
          Academics Curriculum & Evaluation Guidelines
        </h2>
        <p className="text-sm text-[#43474e] font-sans leading-relaxed">
          {schoolInfo.curriculum} We align our daily lessons with modern interactive models to make complex sciences, language composition, and math structures accessible.
        </p>
        <div className="w-16 h-1 bg-[#3a5f94] mx-auto rounded-full"></div>
      </div>

      {/* 1. Academic Tiers and Syllabus Grid */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-[#3a5f94]" />
          <h3 className="text-xl font-headline font-extrabold text-[#000613]">Instructional Tiers (CBSE Pattern)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {academicLevels.map((level, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-[#eceef0] shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-headline font-bold text-slate-900 text-lg leading-tight">{level.title}</h4>
                  <span className="text-[10px] font-mono text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded-full">{level.ages}</span>
                </div>
                <p className="text-xs text-[#43474e] leading-relaxed font-sans">{level.focus}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <h5 className="text-xs font-mono font-bold text-[#000613] uppercase tracking-wider mb-2">Subject Highlights:</h5>
                <div className="flex flex-wrap gap-1.5">
                  {level.subjects.map((sub, sIdx) => (
                    <span key={sIdx} className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Assessment Breakdown and Weights */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Term Structure details */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#eceef0] space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            <h4 className="text-lg font-headline font-bold text-slate-900">Term Evaluation Framework</h4>
          </div>
          <p className="text-xs text-[#43474e] leading-relaxed font-sans">
            Our academic cycle is divided into two comprehensive terms (April-September & October-March). Student advancement is monitored continuously via periodic milestones.
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-teal-950">Periodic Assessments (PA-I / PA-II)</p>
                <p className="text-[11px] text-teal-800">Assessed over oral presentations, assignments & written tests</p>
              </div>
              <span className="text-sm font-bold text-teal-900 bg-teal-200/50 px-2 py-1 rounded-md">20% Weight</span>
            </div>

            <div className="p-3 bg-[#ffe088]/30 border border-[#ffe088]/60 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-[#735c00]">Half Yearly / Term Finals Exam</p>
                <p className="text-[11px] text-[#735c00]">Summative comprehensive analytical written examinations</p>
              </div>
              <span className="text-sm font-bold text-[#735c00] bg-[#ffe088] px-2 py-1 rounded-md">80% Weight</span>
            </div>
          </div>
        </div>

        {/* Grading Scheme Table */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#eceef0] space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-500" />
            <h4 className="text-lg font-headline font-bold text-slate-900">Official CBSE Secondary Grading Sheet</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-mono uppercase text-slate-500">
                  <th className="py-2.5">Grade</th>
                  <th className="py-2.5">Progress Range</th>
                  <th className="py-2.5">Grade Points</th>
                  <th className="py-2.5">Performance Definition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {gradingSystem.map((item, id) => (
                  <tr key={id} className="hover:bg-slate-50">
                    <td className="py-3 font-semibold text-slate-900">{item.grade}</td>
                    <td className="py-3 text-[#43474e]">{item.range}</td>
                    <td className="py-3 font-mono text-slate-700">{item.point}</td>
                    <td className="py-3 text-slate-500 italic">{item.criteria}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* 3. Faculty Directory Search */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-600">groups</span>
            <h3 className="text-xl font-headline font-extrabold text-[#000613]">Meet Our Experienced Educators</h3>
          </div>
          
          {/* Controls */}
          <div className="flex flex-wrap gap-2.5">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-white text-xs text-slate-950 rounded-xl border border-slate-300 focus:outline-[#3a5f94]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Dept Filter */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-1.5 bg-white text-xs text-slate-950 rounded-xl border border-slate-300 focus:outline-[#3a5f94]"
            >
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>{dept} Department</option>
              ))}
            </select>
          </div>
        </div>

        {filteredFaculties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculties.map((fac) => (
              <div 
                key={fac.id}
                className="bg-white p-5 rounded-2xl border border-[#eceef0] flex gap-4 hover:border-[#3a5f94]/30 hover:shadow-xs transition-all duration-300"
              >
                <img
                  src={fac.photoUrl}
                  alt={fac.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-2 flex-1 min-w-0">
                  <div>
                    <h4 className="font-headline font-bold text-slate-900 text-sm leading-tight truncate">{fac.name}</h4>
                    <p className="text-[11px] text-[#3a5f94] font-medium leading-normal mt-0.5">{fac.designation}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 font-sans text-xs">
                    <span className="text-[10px] bg-slate-100 font-mono px-2 py-0.5 rounded-md uppercase">{fac.department} Dept</span>
                  </div>
                  <a 
                    href={`mailto:${fac.email}`}
                    className="inline-flex items-center gap-1 text-[11px] text-[#43474e] hover:text-[#3a5f94]"
                  >
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{fac.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white border border-[#eceef0] p-12 rounded-2xl">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">person_off</span>
            <p className="text-slate-500 font-sans text-sm">No teacher matches current filters or query.</p>
          </div>
        )}
      </section>

    </div>
  );
};
