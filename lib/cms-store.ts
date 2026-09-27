"use client";

export interface NoticeBoardItem {
  id: string;
  tag: string;
  tagColor: "orange" | "blue" | "green" | "purple" | "red";
  text: string;
}

export interface PopupNotice {
  enabled: boolean;
  title: string;
  text: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  qual: string;
  img?: string;
  category: "leadership" | "teaching" | "non-teaching";
}

export interface SchoolSettings {
  admissionsTag: string;
  heroQuote: string;
  phone: string;
  email: string;
  address: string;
  bankAccount: string;
  ifsc: string;
}

// Initial Default Values
export const defaultNoticeBoard: NoticeBoardItem[] = [
  { id: "1", tag: "NEW", tagColor: "orange", text: "Parent-Teacher Meeting scheduled for Nov 15th." },
  { id: "2", tag: "SPORTS", tagColor: "blue", text: "Annual Sports Day registration closes this Friday." },
  { id: "3", tag: "ACADEMICS", tagColor: "green", text: "Term 1 Syllabus has been updated on the portal." }
];

export const defaultPopup: PopupNotice = {
  enabled: true,
  title: "Campus Update",
  text: "We just had an amazing Independence Day celebration and Telugu Bhasha Dinotsavam! Check out the gallery on our portal."
};

export const defaultGallery: GalleryPhoto[] = [
  { id: "1", url: "/event-1.jpg", title: "Sports Day" },
  { id: "2", url: "/event-2.jpg", title: "Cultural Event" },
  { id: "3", url: "/event-3.jpg", title: "Independence Day" },
  { id: "4", url: "/event-4.jpg", title: "Telugu Bhasha Dinotsavam" },
  { id: "5", url: "/event-5.jpg", title: "Science Fair" },
  { id: "6", url: "/event-6.jpg", title: "Annual Gathering" },
  { id: "7", url: "/event-7.jpg", title: "Award Ceremony" },
  { id: "8", url: "/event-8.jpg", title: "Campus Activity" }
];

export const defaultLeadership: StaffMember[] = [
  { id: "l1", name: "N. Tandava Krishna", role: "Secretary & Correspondent", qual: "BA. B.Ed.", img: "/tandava-krishna.jpg", category: "leadership" },
  { id: "l2", name: "K. Durga Naga Divya", role: "Primary Incharge", qual: "BSc.,B.Ed.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop", category: "leadership" },
  { id: "l3", name: "L. S. Bharavi", role: "Head Master", qual: "MA (Soc)", img: "/ls-bharavi..jpg", category: "leadership" },
  { id: "l4", name: "P. Sankar", role: "Principal", qual: "MSc.Ph.D.,MA.Ph.D.", img: "/p-sankar.jpg", category: "leadership" }
];

export const defaultTeaching: StaffMember[] = [
  { id: "t1", name: "G. Sailaja Lakshmi", role: "Teacher", qual: "BA Special English", category: "teaching" },
  { id: "t2", name: "A. Sujatha", role: "Teacher", qual: "BA Special Telugu", category: "teaching" },
  { id: "t3", name: "A. Sukanya", role: "Teacher", qual: "BCom.", category: "teaching" },
  { id: "t4", name: "K. Sujatha", role: "Teacher", qual: "MA.,B.Ed.", category: "teaching" },
  { id: "t5", name: "V. Suneetha", role: "Teacher", qual: "D.Ed.", category: "teaching" },
  { id: "t6", name: "S. Sukanya", role: "Teacher", qual: "D.Ed.", category: "teaching" },
  { id: "t7", name: "D. Prathyusha", role: "Teacher", qual: "D.Ed.", category: "teaching" },
  { id: "t8", name: "Sd. Salma", role: "Teacher", qual: "BCom.", category: "teaching" },
  { id: "t9", name: "V. Rupalatha", role: "Teacher", qual: "MA.B.Ed.", category: "teaching" },
  { id: "t10", name: "B. Naveena", role: "Teacher", qual: "BSc.B.Ed.", category: "teaching" },
  { id: "t11", name: "P. Tirupatmma", role: "Teacher", qual: "BCom.", category: "teaching" },
  { id: "t12", name: "Sk. Mahaboob Subhani", role: "Teacher", qual: "D.Ed.", category: "teaching" },
  { id: "t13", name: "N. Priyanka", role: "Teacher", qual: "BTech.", category: "teaching" },
  { id: "t14", name: "Sk. Raziya Sulthana", role: "Teacher", qual: "BA (Com)", category: "teaching" },
  { id: "t15", name: "Sk. Hayyium", role: "PET", qual: "B.P.Ed.", category: "teaching" }
];

export const defaultNonTeaching: StaffMember[] = [
  { id: "nt1", name: "J. Pavani", role: "Office Incharge", qual: "MBA (Fin & Hr)", category: "non-teaching" },
  { id: "nt2", name: "K. Anjaneyulu", role: "Care Taker", qual: "10th", category: "non-teaching" },
  { id: "nt3", name: "M. Atchyutha Kumari", role: "Aaya", qual: "-", category: "non-teaching" },
  { id: "nt4", name: "K. Naga Malleswari", role: "Aaya", qual: "-", category: "non-teaching" },
  { id: "nt5", name: "N. Padma", role: "Aaya", qual: "-", category: "non-teaching" }
];

export const defaultSettings: SchoolSettings = {
  admissionsTag: "✨ Admissions Open for 2026-27 ✨",
  heroQuote: `"It's our responsibility to pay back to the SOCIETY"`,
  phone: "9849532787",
  email: "mvskchool22754@gmail.com",
  address: "Proff. MVS Koteswara Rao Memorial Public School, Mandapeta, Andhra Pradesh, India.",
  bankAccount: "156910100118069",
  ifsc: "UBIN0815691"
};

// Storage keys
const KEYS = {
  NOTICES: "mvs_cms_notices_v2",
  POPUP: "mvs_cms_popup_v2",
  GALLERY: "mvs_cms_gallery_v2",
  LEADERSHIP: "mvs_cms_leadership_v2",
  TEACHING: "mvs_cms_teaching_v2",
  NON_TEACHING: "mvs_cms_non_teaching_v2",
  SETTINGS: "mvs_cms_settings_v2"
};

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("mvs_cms_update"));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
}

export const cmsStore = {
  getNotices: (): NoticeBoardItem[] => safeGet(KEYS.NOTICES, defaultNoticeBoard),
  setNotices: (v: NoticeBoardItem[]) => safeSet(KEYS.NOTICES, v),

  getPopup: (): PopupNotice => safeGet(KEYS.POPUP, defaultPopup),
  setPopup: (v: PopupNotice) => safeSet(KEYS.POPUP, v),

  getGallery: (): GalleryPhoto[] => safeGet(KEYS.GALLERY, defaultGallery),
  setGallery: (v: GalleryPhoto[]) => safeSet(KEYS.GALLERY, v),

  getLeadership: (): StaffMember[] => safeGet(KEYS.LEADERSHIP, defaultLeadership),
  setLeadership: (v: StaffMember[]) => safeSet(KEYS.LEADERSHIP, v),

  getTeaching: (): StaffMember[] => safeGet(KEYS.TEACHING, defaultTeaching),
  setTeaching: (v: StaffMember[]) => safeSet(KEYS.TEACHING, v),

  getNonTeaching: (): StaffMember[] => safeGet(KEYS.NON_TEACHING, defaultNonTeaching),
  setNonTeaching: (v: StaffMember[]) => safeSet(KEYS.NON_TEACHING, v),

  getSettings: (): SchoolSettings => safeGet(KEYS.SETTINGS, defaultSettings),
  setSettings: (v: SchoolSettings) => safeSet(KEYS.SETTINGS, v),
};
