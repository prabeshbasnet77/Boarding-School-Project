export interface SchoolInfo {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  aboutText: string;
  principalMessage: string;
  principalName: string;
  principalPhoto: string;
  schoolId: string;
  admissionStatus: "Open" | "Closed";
  curriculum: string;
  extracurricular: string[];
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: "Academic" | "Admission" | "Event" | "Holiday" | "General";
  content: string;
  isPinned: boolean;
  author: string;
}

export interface Inquiry {
  id: string;
  candidateName: string;
  parentName: string;
  expectedClass: string;
  mobile: string;
  email: string;
  queryDetails: string;
  status: "Pending" | "Reviewing" | "Approved" | "Contacted";
  date: string;
}

export interface Photo {
  id: string;
  title: string;
  category: "Campus" | "Sports" | "Festivals" | "Academic" | "Co-Curricular";
  imageUrl: string;
  date: string;
  description?: string;
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  photoUrl: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
}
