import React, { useState } from "react";
import { SchoolInfo, Notice, Inquiry, Photo, Faculty } from "../types";
import { 
  Key, ShieldAlert, Check, RefreshCw, LogOut, Trash2, Pin, PinOff, Plus, 
  Settings, Users, Bell, Image as ImageIcon, CheckCircle2, Phone, Mail, 
  MapPin, Edit, Eye, Clock, FileText, AlertCircle, Sparkles, GraduationCap 
} from "lucide-react";

interface AdminPortalProps {
  schoolInfo: SchoolInfo;
  onUpdateSchoolInfo: (info: SchoolInfo) => void;
  
  notices: Notice[];
  onAddNotice: (notice: Notice) => void;
  onDeleteNotice: (id: string) => void;
  onTogglePinNotice: (id: string) => void;
  
  inquiries: Inquiry[];
  onUpdateInquiryStatus: (id: string, status: Inquiry["status"]) => void;
  onDeleteInquiry: (id: string) => void;
  
  faculties: Faculty[];
  onAddFaculty: (faculty: Faculty) => void;
  onDeleteFaculty: (id: string) => void;

  photos: Photo[];
  onAddPhoto: (photo: Photo) => void;
  onDeletePhoto: (id: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  schoolInfo,
  onUpdateSchoolInfo,
  notices,
  onAddNotice,
  onDeleteNotice,
  onTogglePinNotice,
  inquiries,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  faculties,
  onAddFaculty,
  onDeleteFaculty,
  photos,
  onAddPhoto,
  onDeletePhoto,
}) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [currentSection, setCurrentSection] = useState<"inquiries" | "notices" | "faculty" | "gallery" | "settings">("inquiries");

  // Multi-state forms
  const [noticeForm, setNoticeForm] = useState({
    title: "",
    category: "Academic" as Notice["category"],
    content: "",
    isPinned: false,
    author: "Administration Desk",
  });

  const [facultyForm, setFacultyForm] = useState({
    name: "",
    designation: "",
    department: "",
    email: "",
    photoUrl: "",
  });

  const [photoForm, setPhotoForm] = useState({
    title: "",
    category: "Campus" as Photo["category"],
    imageUrl: "",
    description: "",
  });

  const [settingsForm, setSettingsForm] = useState<SchoolInfo>({ ...schoolInfo });
  const [activeInquiryDetails, setActiveInquiryDetails] = useState<Inquiry | null>(null);

  // Sync settingsForm state when schoolInfo changes in background
  React.useEffect(() => {
    setSettingsForm({ ...schoolInfo });
  }, [schoolInfo]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === "prabesh098") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Access Revoked: Please input authorized credential password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  // 1. Handlers for Notices
  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeForm.title.trim() || !noticeForm.content.trim()) return;

    onAddNotice({
      id: `not-${Math.floor(Math.random() * 10000)}`,
      title: noticeForm.title,
      category: noticeForm.category,
      content: noticeForm.content,
      isPinned: noticeForm.isPinned,
      author: noticeForm.author,
      date: new Date().toISOString().split("T")[0],
    });

    setNoticeForm({
      title: "",
      category: "Academic",
      content: "",
      isPinned: false,
      author: "Administration Desk",
    });
    alert("New official notice dispatched successfully!");
  };

  // 2. Handlers for Faculty
  const handleCreateFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facultyForm.name.trim() || !facultyForm.designation.trim() || !facultyForm.email.trim()) return;

    onAddFaculty({
      id: `fac-${Math.floor(Math.random() * 10000)}`,
      name: facultyForm.name,
      designation: facultyForm.designation,
      department: facultyForm.department || "General",
      email: facultyForm.email,
      photoUrl: facultyForm.photoUrl.trim() || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    });

    setFacultyForm({
      name: "",
      designation: "",
      department: "",
      email: "",
      photoUrl: "",
    });
    alert("Educator registered safely into school registry.");
  };

  // 3. Handlers for Pictures
  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoForm.title.trim() || !photoForm.imageUrl.trim()) return;

    onAddPhoto({
      id: `img-${Math.floor(Math.random() * 10000)}`,
      title: photoForm.title,
      category: photoForm.category,
      imageUrl: photoForm.imageUrl,
      date: new Date().toISOString().split("T")[0],
      description: photoForm.description,
    });

    setPhotoForm({
      title: "",
      category: "Campus",
      imageUrl: "",
      description: "",
    });
    alert("New moment successfully attached to Gallery stack.");
  };

  // 4. Update school core configurations
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSchoolInfo(settingsForm);
    alert("School metadata configurations deployed successfully!");
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-[#eceef0] shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center text-amber-600 mx-auto">
            <Key className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-xl font-headline font-black text-slate-900">Administration Clearance</h2>
          <p className="text-xs text-[#43474e] leading-relaxed">
            Authorized admin credentials required. Enter <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-900">prabesh</code> to authenticate into the system.
          </p>
        </div>

        {loginError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-medium">{loginError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Enter Clearance Key *</label>
            <input
              type="password"
              placeholder=" Clearance Password (admin) ..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-3 outline-none focus:border-[#3a5f94] focus:bg-white text-xs text-slate-950"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#000613] hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Authenticate Portal Clearance
          </button>
        </form>
      </div>
    );
  }

  // Active UI when authenticated
  const sectionTabs = [
    { id: "inquiries", label: "Inquiries Desk", icon: <Users className="w-4 h-4" />, count: inquiries.length },
    { id: "notices", label: "Notice Publisher", icon: <Bell className="w-4 h-4" />, count: notices.length },
    { id: "faculty", label: "Educators Roster", icon: <GraduationCap className="w-4 h-4" />, count: faculties.length },
    { id: "gallery", label: "Media Gallery", icon: <ImageIcon className="w-4 h-4" />, count: photos.length },
    { id: "settings", label: "School Configs", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* Admin Title Board */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#000613] text-white p-6 rounded-3xl shadow-md">
        <div>
          <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2.5 py-0.5 rounded-full uppercase">
            CLEARANCE SECURED
          </span>
          <h2 className="text-xl md:text-2xl font-headline font-black mt-1">
            Institutional Administration Workspace
          </h2>
          <p className="text-xs text-[#a7c8ff]/90">
            Control center to modify notices, regulate registrations, and adapt static parameters.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-rose-950/80 hover:bg-rose-900 text-xs font-semibold text-rose-200 border border-rose-500/10 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Workspace</span>
        </button>
      </section>

      {/* Primary Workspace navigation tabs / stats */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {sectionTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentSection(tab.id as any)}
            className={`p-4 rounded-2xl border text-left transition-all duration-250 flex flex-col justify-between cursor-pointer ${
              currentSection === tab.id
                ? "bg-white border-[#3a5f94] text-[#3a5f94] shadow-xs"
                : "bg-white text-slate-700 border-slate-200/60 hover:bg-slate-50"
            }`}
          >
            <div className="flex justify-between items-center w-full">
              <span className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg">{tab.icon}</span>
              {tab.count !== undefined && (
                <span className="text-xs font-bold font-mono bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200">
                  {tab.count}
                </span>
              )}
            </div>
            <p className="text-xs font-headline font-bold mt-4 leading-none">{tab.label}</p>
          </button>
        ))}
      </section>

      {/* ----------------- INQUIRIES DESK VIEW ----------------- */}
      {currentSection === "inquiries" && (
        <section className="bg-white p-6 rounded-3xl border border-[#eceef0] space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-headline font-bold text-slate-900">Parent Admission Inquiries Registry</h3>
            <p className="text-xs text-slate-500">View child registrations, contact indicators, and update status sheets.</p>
          </div>

          {inquiries.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-mono uppercase text-slate-500 font-bold">
                    <th className="p-3">Reference ID</th>
                    <th className="p-3">Candidate Name</th>
                    <th className="p-3">Expected Class</th>
                    <th className="p-3">Parent Name</th>
                    <th className="p-3">Contact Details</th>
                    <th className="p-3">Date Registered</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/60">
                      <td className="p-3 font-mono font-bold text-slate-700">{inq.id}</td>
                      <td className="p-3 font-semibold text-slate-900">{inq.candidateName}</td>
                      <td className="p-3">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium text-[11px] border border-slate-200">
                          {inq.expectedClass}
                        </span>
                      </td>
                      <td className="p-3 text-slate-700">{inq.parentName}</td>
                      <td className="p-3 space-y-0.5 text-[11px]">
                        <p className="flex items-center gap-1 text-[#43474e]">
                          <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{inq.mobile}</span>
                        </p>
                        <p className="flex items-center gap-1 text-slate-400">
                          <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate max-w-40">{inq.email}</span>
                        </p>
                      </td>
                      <td className="p-3 font-mono text-slate-500">{inq.date}</td>
                      <td className="p-3 text-center">
                        <select
                          value={inq.status}
                          onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                          className={`px-2 py-1 rounded text-[10px] font-bold border outline-none cursor-pointer ${
                            inq.status === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            inq.status === "Contacted" ? "bg-sky-50 text-sky-700 border-sky-200" :
                            inq.status === "Reviewing" ? "bg-amber-50 text-amber-700 border-amber-200" :
                            "bg-slate-50 text-slate-700 border-slate-200"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Reviewing">Reviewing</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Approved">Approved</option>
                        </select>
                      </td>
                      <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setActiveInquiryDetails(inq)}
                          title="View Complete Specifications"
                          className="p-1.5 text-slate-600 hover:text-[#3a5f94] hover:bg-[#3a5f94]/5 rounded-lg transition-colors inline-block"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Delete this inquiry from records?")) {
                              onDeleteInquiry(inq.id);
                            }
                          }}
                          title="Purge Record"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors inline-block"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <span className="material-symbols-outlined text-4xl text-slate-300">verified_user</span>
              <p className="text-slate-500 font-sans text-xs mt-2">Active inquiries inbox is perfectly clear.</p>
            </div>
          )}
        </section>
      )}

      {/* ----------------- NOTICE MANAGEMENT ----------------- */}
      {currentSection === "notices" && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* New Dispatch Form */}
          <form onSubmit={handleCreateNotice} className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#eceef0] space-y-4 text-xs">
            <h4 className="text-base font-headline font-bold text-slate-900 border-b border-slate-100 pb-2">
              Dispatch New Official Announcement
            </h4>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-850">Notice Title *</label>
              <input
                type="text"
                placeholder="e.g. Independence Day Uniform Dress Requirements..."
                required
                value={noticeForm.title}
                onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-3 outline-none focus:border-[#3a5f94] focus:bg-white text-xs text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#191c1e]">Publishing Category *</label>
                <select
                  value={noticeForm.category}
                  onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value as any })}
                  className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
                >
                  <option value="Academic">Academic</option>
                  <option value="Admission">Admission</option>
                  <option value="Event">Event</option>
                  <option value="Holiday">Holiday</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-850">Issuing Authority *</label>
                <input
                  type="text"
                  required
                  value={noticeForm.author}
                  onChange={(e) => setNoticeForm({ ...noticeForm, author: e.target.value })}
                  className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94] text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-850">Detailed Notice Content Text *</label>
              <textarea
                rows={5}
                required
                placeholder="Write specific notification outlines here. Markdown formatting or line spacing is preserved..."
                value={noticeForm.content}
                onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-3 outline-none focus:border-[#3a5f94] focus:bg-white text-xs resize-none text-slate-900"
              />
            </div>

            <div className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                id="isPinned"
                checked={noticeForm.isPinned}
                onChange={(e) => setNoticeForm({ ...noticeForm, isPinned: e.target.checked })}
                className="w-4 h-4 text-[#3a5f94] rounded border-slate-300 focus:ring-0"
              />
              <label htmlFor="isPinned" className="text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer">
                <Pin className="w-3.5 h-3.5 rotate-45" />
                <span>Mark as Pinned (Urgent Banner top display)</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#001f3f] hover:bg-opacity-90 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Broadcast Bulletin Notice</span>
            </button>
          </form>

          {/* Active Notices Registry */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#eceef0] space-y-4 text-xs">
            <h4 className="text-base font-headline font-bold text-slate-900 border-b border-slate-100 pb-2">
              Broadcast Archive
            </h4>

            {notices.length > 0 ? (
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-2">
                {notices.map((not) => (
                  <div
                    key={not.id}
                    className={`p-4 rounded-xl border flex justify-between items-start gap-4 ${
                      not.isPinned ? "border-amber-300 bg-amber-50/20" : "border-slate-150"
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {not.category}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">{not.date}</span>
                      </div>
                      <h5 className="font-bold text-slate-900 truncate">{not.title}</h5>
                      <p className="text-[11px] text-[#43474e] line-clamp-2 leading-relaxed">{not.content}</p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1 bg-white p-1 rounded-lg border border-slate-100">
                      <button
                        onClick={() => onTogglePinNotice(not.id)}
                        className={`p-1.5 rounded transition-all ${
                          not.isPinned ? "text-[#735c00] hover:bg-amber-100" : "text-slate-400 hover:bg-slate-100"
                        }`}
                        title={not.isPinned ? "Unpin banner" : "Pin banner to top"}
                      >
                        {not.isPinned ? <Pin className="w-3.5 h-3.5" /> : <PinOff className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => onDeleteNotice(not.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-all"
                        title="Delete announcement"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-slate-50 rounded-2xl">
                <p className="text-slate-500">Notice records are entirely empty.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ----------------- EDUCATORS ROSTER ----------------- */}
      {currentSection === "faculty" && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Add Teacher */}
          <form onSubmit={handleCreateFaculty} className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#eceef0] space-y-4 text-xs">
            <h4 className="text-base font-headline font-bold text-slate-900 border-b border-slate-100 pb-2">
              Register New Faculty Member
            </h4>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-850">Full Educator Name *</label>
              <input
                type="text"
                placeholder="e.g. Smt. Shreya Sen"
                required
                value={facultyForm.name}
                onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-850">Designation *</label>
                <input
                  type="text"
                  placeholder="e.g. Mathematics Mentor"
                  required
                  value={facultyForm.designation}
                  onChange={(e) => setFacultyForm({ ...facultyForm, designation: e.target.value })}
                  className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-850">Department *</label>
                <input
                  type="text"
                  placeholder="e.g. Science, Languages"
                  required
                  value={facultyForm.department}
                  onChange={(e) => setFacultyForm({ ...facultyForm, department: e.target.value })}
                  className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-850">Official Email *</label>
              <input
                type="email"
                placeholder="e.g. shreya.sen@ekatashishu.edu.in"
                required
                value={facultyForm.email}
                onChange={(e) => setFacultyForm({ ...facultyForm, email: e.target.value })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-850">Educator Portrait Photo URL (Optional)</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={facultyForm.photoUrl}
                onChange={(e) => setFacultyForm({ ...facultyForm, photoUrl: e.target.value })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#001f3f] hover:bg-opacity-90 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll Educator</span>
            </button>
          </form>

          {/* Teacher List */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#eceef0] space-y-4 text-xs">
            <h4 className="text-base font-headline font-bold text-slate-900 border-b border-slate-100 pb-2">
              School Faculty List
            </h4>

            {faculties.length > 0 ? (
              <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto pr-2">
                {faculties.map((fac) => (
                  <div key={fac.id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={fac.photoUrl}
                        alt={fac.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h5 className="font-bold text-slate-900">{fac.name}</h5>
                        <p className="text-[11px] text-[#3a5f94]">{fac.designation} ({fac.department})</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteFaculty(fac.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-all cursor-pointer"
                      title="De-register"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-slate-50 rounded-2xl">
                <p className="text-slate-500">Educator roster is empty.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ----------------- MEDIA GALLERY ----------------- */}
      {currentSection === "gallery" && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Add Moment Form */}
          <form onSubmit={handleCreatePhoto} className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#eceef0] space-y-4 text-xs">
            <h4 className="text-base font-headline font-bold text-slate-900 border-b border-slate-100 pb-2">
              Attach New Moment Photo
            </h4>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#191c1e]">Moment Title *</label>
              <input
                type="text"
                placeholder="e.g. Secondary Chemistry Lab Session"
                required
                value={photoForm.title}
                onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#191c1e]">Visual Category *</label>
                <select
                  value={photoForm.category}
                  onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value as any })}
                  className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
                >
                  <option value="Campus">Campus</option>
                  <option value="Sports">Sports</option>
                  <option value="Academic">Academic</option>
                  <option value="Festivals">Festivals</option>
                  <option value="Co-Curricular">Co-Curricular</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#191c1e]">Image Unsplash URL *</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  required
                  value={photoForm.imageUrl}
                  onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                  className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-850">Visual Legend Short Description</label>
              <input
                type="text"
                placeholder="Describe that activity or context in brief..."
                value={photoForm.description}
                onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#001f3f] hover:bg-opacity-90 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Broadcast Media to Gallery</span>
            </button>
          </form>

          {/* Active Photos list */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#eceef0] space-y-4 text-xs">
            <h4 className="text-base font-headline font-bold text-slate-900 border-b border-slate-100 pb-2">
              Media Catalog
            </h4>

            {photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto pr-2">
                {photos.map((ph) => (
                  <div key={ph.id} className="border border-slate-150 rounded-xl overflow-hidden relative group">
                    <img
                      src={ph.imageUrl}
                      alt={ph.title}
                      className="w-full h-24 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="p-2 bg-white">
                      <p className="font-bold text-slate-900 truncate leading-none mb-1">{ph.title}</p>
                      <p className="text-[9px] text-[#3a5f94] font-mono leading-none tracking-wider uppercase">{ph.category}</p>
                    </div>

                    <button
                      onClick={() => onDeletePhoto(ph.id)}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-950/80 text-rose-200 hover:bg-red-900 rounded-md transition-all border border-rose-500/10 cursor-pointer"
                      title="De-catalog moment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-slate-50 rounded-2xl">
                <p className="text-slate-500">Visual database is empty.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ----------------- SCHOOL CONFIGURATIONS ----------------- */}
      {currentSection === "settings" && (
        <form onSubmit={handleSaveSettings} className="bg-white p-6 md:p-8 rounded-3xl border border-[#eceef0] space-y-6 text-xs">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-headline font-bold text-slate-900">Institutional General Configuration Metadata</h3>
              <p className="text-xs text-slate-500">Edit values and taglines shown globally across the school homepage.</p>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#3a5f94] hover:bg-[#294f83] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Deploy Global Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-800">School Legal Name *</label>
              <input
                type="text"
                required
                value={settingsForm.name}
                onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-800">Institutional Tagline *</label>
              <input
                type="text"
                required
                value={settingsForm.tagline}
                onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-800">Direct Office Mobile Line *</label>
              <input
                type="text"
                required
                value={settingsForm.phone}
                onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-800">Help Desk Email *</label>
              <input
                type="email"
                required
                value={settingsForm.email}
                onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-800">Institutional Postal Address *</label>
            <input
              type="text"
              required
              value={settingsForm.address}
              onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
              className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-800">Admissions Status Gateway *</label>
              <select
                value={settingsForm.admissionStatus}
                onChange={(e) => setSettingsForm({ ...settingsForm, admissionStatus: e.target.value as any })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="space-y-1.5 w-full">
              <label className="block text-xs font-semibold text-slate-800">Principal Educator Name *</label>
              <input
                type="text"
                required
                value={settingsForm.principalName}
                onChange={(e) => setSettingsForm({ ...settingsForm, principalName: e.target.value })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#3a5f94]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-800">Curriculum Vision Highlight Text *</label>
              <textarea
                rows={4}
                required
                value={settingsForm.curriculum}
                onChange={(e) => setSettingsForm({ ...settingsForm, curriculum: e.target.value })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-3 outline-none focus:border-[#3a5f94] resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-800">Detailed Head Principal Message Address *</label>
              <textarea
                rows={4}
                required
                value={settingsForm.principalMessage}
                onChange={(e) => setSettingsForm({ ...settingsForm, principalMessage: e.target.value })}
                className="w-full bg-[#f2f4f6]/50 rounded-xl border border-slate-200 p-3 outline-none focus:border-[#3a5f94] resize-none"
              />
            </div>
          </div>
        </form>
      )}

      {/* Detail view dialog for Candidate Inquiry specifications */}
      {activeInquiryDetails && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-[999] animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="bg-[#000613] text-white p-5 flex justify-between items-center">
              <div>
                <p className="font-mono text-[10px] text-amber-400">INQUIRY SPECIFICATION SHEET</p>
                <h4 className="font-headline font-bold text-sm tracking-wide mt-1">Ref ID: {activeInquiryDetails.id}</h4>
              </div>
              <button
                onClick={() => setActiveInquiryDetails(null)}
                className="p-1 px-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2.5 border-b border-slate-100 pb-3">
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-mono">Candidate Name</p>
                  <p className="font-bold text-slate-950 text-sm mt-0.5">{activeInquiryDetails.candidateName}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-mono">Expected Class sought</p>
                  <p className="font-bold text-[#3a5f94] text-sm mt-0.5">{activeInquiryDetails.expectedClass}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 border-b border-slate-100 pb-3">
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-mono">Parent / Guardian name</p>
                  <p className="font-medium text-slate-800 text-sm mt-0.5">{activeInquiryDetails.parentName}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-mono">Date Registered</p>
                  <p className="font-medium text-slate-600 mt-0.5">{activeInquiryDetails.date}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-slate-400 text-[10px] uppercase font-mono">Contact Details Details</p>
                <p className="text-slate-800 font-semibold flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{activeInquiryDetails.mobile}</span>
                </p>
                <p className="text-slate-600 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{activeInquiryDetails.email}</span>
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl space-y-1 text-slate-700 leading-relaxed border border-slate-100 italic">
                <p className="text-[10px] font-mono uppercase text-slate-400 not-italic">Additional Scholar Background & Query Notes</p>
                <p className="text-[11px] mt-1 whitespace-pre-wrap">{activeInquiryDetails.queryDetails || "No additional queries registered on form submit."}</p>
              </div>

              <div className="flex gap-2 justify-end pt-2 border-t border-slate-100">
                <select
                  value={activeInquiryDetails.status}
                  onChange={(e) => {
                    onUpdateInquiryStatus(activeInquiryDetails.id, e.target.value as any);
                    setActiveInquiryDetails((prev) => prev ? { ...prev, status: e.target.value as any } : null);
                  }}
                  className="px-3 py-1.5 rounded-lg border text-xs outline-none cursor-pointer text-slate-800 bg-slate-100 font-semibold"
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewing">Reviewing</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Approved">Approved</option>
                </select>

                <button
                  onClick={() => alert(`Simulating outbound confirmation text / e-mail dispatch to parent contact ${activeInquiryDetails.mobile}...`)}
                  className="px-4 py-1.5 bg-[#3a5f94] text-white hover:bg-opacity-90 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Initiate Parent Contact Correspondence
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
