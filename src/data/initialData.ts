import { SchoolInfo, Notice, Photo, Faculty, Testimonial } from "../types";

export const initialSchoolInfo: SchoolInfo = {
  name: "Ekata Shishu Niketan",
  tagline: "Nurturing Minds, Cultivating Excellence",
  phone: "+91 98765 43210",
  email: "info@ekatashishu.edu.in",
  address: "NH-31, Sector-4, Children's Academy Zone, Jalpaiguri, West Bengal",
  aboutText: "Ekata Shishu Niketan was founded with a unified vision: to provide a nurturing, inclusive space where children can explore, innovate, and master academic and life skills. Over three decades of pedagogical excellence, we have blossomed into a premiere educational beacon, molding creative problem-solvers and compassionate citizens.",
  principalName: "Smt. Arundhati Roy Chowdhury",
  principalPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  principalMessage: "Welcome to Ekata Shishu Niketan. Here, education is not a mechanical receipt of facts, but a discovery of one's innate potential. Our passionate teaching team works together with supportive parents to build an ecosystem of rigor, empathy, and active participation in competitive sports, science exhibitions, and classical arts. I invite all prospective families to learn more and prepare their children for a glorious future.",
  schoolId: "ESN-WESTBENGAL-092",
  admissionStatus: "Open",
  curriculum: "Affiliated with CBSE Broad Syllabus with enhanced experiential learning modules, digital lab access, and specialized language coaching.",
  extracurricular: [
    "Semi-Classical & Folk Indian Dance",
    "Robotics & Virtual Coding Labs",
    "Competitive Track Athletics & Football",
    "Creative Debating & Literary Club",
    "Vocal Classical Music Classes"
  ]
};

export const initialNotices: Notice[] = [
  {
    id: "not-1",
    title: "Admission Open for Academic Year 2026-2027",
    date: "2026-06-05",
    category: "Admission",
    content: "Online registration for Nursery to Grade IX is now officially open! Parents can visit our admissions page, submit basic candidate specifications, and schedule an interactive campus screening. Seats are strictly limited to maintain a healthy 20:1 student-to-teacher ratio.",
    isPinned: true,
    author: "Admissions Desk"
  },
  {
    id: "not-2",
    title: "Vishwa Kannada & Bengali Cultural Fest Guidelines",
    date: "2026-06-02",
    category: "Event",
    content: "The annual regional cultural integration day will occur on Friday, June 19th. All participating students of the dance, poetry, and classical music delegations are requested to submit draft costume details to their respected house captains by June 12th.",
    isPinned: false,
    author: "Cultural Coordinator"
  },
  {
    id: "not-3",
    title: "Revised Science Lab Schedule & Safety Measures",
    date: "2026-05-28",
    category: "Academic",
    content: "In preparation for secondary board projects, chemistry and physics lab operational schedules have been expanded. Students must wear standard laboratory coats and full leather footwear. Safety goggles will be supplied by our technical center personnel.",
    isPinned: false,
    author: "Science Dept Head"
  },
  {
    id: "not-4",
    title: "Summer Solstice Special Vacation Declaration",
    date: "2026-05-15",
    category: "Holiday",
    content: "Please note that the institution will observe a 10-day heatwave mitigation break from June 21st to June 30th. Online remedial classes for board aspirants (Grades X and XII) will continue as scheduled via our student portals.",
    isPinned: true,
    author: "Principal's Office"
  }
];

export const initialPhotos: Photo[] = [
  {
    id: "img-1",
    title: "Lush Eco-Friendly Campus",
    category: "Campus",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200",
    date: "2026-05-01",
    description: "Our historic red-brick main complex featuring broad corridors, safe solar panels, and extensive sports parameters."
  },
  {
    id: "img-2",
    title: "Curiosity In Action - Chemistry Lab",
    category: "Academic",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600",
    date: "2026-04-12",
    description: "Senior secondary female candidates performing chemical analysis under expert professional guidance."
  },
  {
    id: "img-3",
    title: "Sub-Junior Football Champions Trophy",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&q=80&w=600",
    date: "2026-04-20",
    description: "Celebrating our inter-school shield triumph at the annual sub-regional sports competition."
  },
  {
    id: "img-4",
    title: "Annual Stage Performance",
    category: "Festivals",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600",
    date: "2026-03-15",
    description: "Students staging the historic patriotic chorus under dynamic auditorium spotlights."
  },
  {
    id: "img-5",
    title: "Interactive Smart Classrooms",
    category: "Academic",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600",
    date: "2026-02-10",
    description: "Elementary students utilizing high-definition touch-based learning panels for spatial mathematics."
  },
  {
    id: "img-6",
    title: "Organic Vegetable Garden Project",
    category: "Co-Curricular",
    imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600",
    date: "2026-05-10",
    description: "Cultivating respect for agriculture and food systems in our beautiful kitchen garden."
  }
];

export const initialFaculty: Faculty[] = [
  {
    id: "fac-1",
    name: "Dr. Bikash Bandyopadhyay",
    designation: "Vice Principal & Senior Physics Lecturer",
    department: "Science",
    email: "b.bandyo@ekatashishu.edu.in",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "fac-2",
    name: "Smt. Shreya Sen",
    designation: "Head of English & Public Speaking Coach",
    department: "Humanities & Languages",
    email: "shreya.sen@ekatashishu.edu.in",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "fac-3",
    name: "Sri. Ranjan Dasgupta",
    designation: "Mathematics Mentor & Olympiad Coordinator",
    department: "Mathematics",
    email: "ranjan.dg@ekatashishu.edu.in",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: "test-1",
    author: "Pranab Mukharjee",
    role: "Parent of Debayan (Grade VII)",
    content: "The individual attention my son receives at Ekata Shishu Niketan is exceptional. The balance between digital smart studies and classical sports values is truly commendable.",
    rating: 5
  },
  {
    id: "test-2",
    author: "Meera Bhatia",
    role: "Alumna, batch of 2018 (Now Software Engineer)",
    content: "My logic building and team values were forged during our lab session interactions here. The teachers aren't just instructional, they are career and life mentors.",
    rating: 5
  }
];
