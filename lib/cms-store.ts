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

export interface AboutCard {
  id: string;
  title: string;
  description: string;
  color: "orange" | "red" | "indigo" | "emerald" | "purple" | "blue";
}

export interface HistoryMilestone {
  id: string;
  badge: string;
  tag: string;
  title: string;
  subtitle?: string;
  description: string;
  quote?: string;
  points?: string[];
  color?: "orange" | "amber" | "blue" | "emerald" | "purple" | "rose";
}

export interface AboutSectionData {
  tag: string;
  title: string;
  cards: AboutCard[];
  historyTag?: string;
  historyTitle?: string;
  historySubtitle?: string;
  milestones?: HistoryMilestone[];
}

export interface AcademicProgramItem {
  id: string;
  text: string;
}

export interface AcademicsSectionData {
  tag: string;
  title: string;
  description: string;
  image: string;
  programs: AcademicProgramItem[];
}

export interface HeroSectionData {
  admissionsTag: string;
  showAdmissions?: boolean;
  schoolTitle: string;
  sloganQuote: string;
  description: string;
  images: string[];
}

export interface SupportSectionData {
  tag: string;
  title: string;
  schoolName: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
}

export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  phone: string;
  email?: string;
  photo?: string;
}

export interface ContactSectionData {
  title?: string;
  tag?: string;
  phone: string;
  email: string;
  address: string;
  footerAbout: string;
  persons: ContactPerson[];
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

// Initial Defaults
export const defaultHero: HeroSectionData = {
  admissionsTag: "✨ Admissions Open for 2026-27 ✨",
  showAdmissions: false,
  schoolTitle: "Prof. MVS Koteswara Rao Memorial School",
  sloganQuote: `"It's our responsibility to pay back to the SOCIETY"`,
  description:
    "Continuing the legacy of providing accessible, high-quality education in Guntur. We nurture the leaders of tomorrow with fun, holistic development, and endless creativity! 🚀",
  images: [
    "/event-1.jpg",
    "/event-2.jpg",
    "/event-3.jpg",
    "/event-4.jpg",
    "/event-5.jpg",
    "/event-6.jpg",
    "/event-7.jpg",
    "/event-8.jpg"
  ]
};

export const defaultMilestones: HistoryMilestone[] = [
  {
    id: "m1",
    badge: "1975 & 1985 Batches",
    tag: "AUASD Initiative & Origins",
    title: "Andhra University Alumni for Sustainable Development",
    subtitle: "A Small Initiative for a Better Society",
    description:
      "The organization is a trust registered at Hyderabad, constituting alumni across multiple disciplines from Andhra University (mostly in 1975 and 1985 batches). Late Prof. M.V.S. Koteswara Rao was one of the key alumni involved in the carving of AUASD and all its welfare activities.",
    points: [
      "A.U. College of Engineering",
      "A.U. College of Science & Technology",
      "A.U. Arts College",
      "A.U. Law College"
    ],
    color: "blue"
  },
  {
    id: "m2",
    badge: "Core Ideology",
    tag: "Our Guiding Conviction",
    title: "A Duty to Pay Back to Society",
    subtitle: "Educating Underprivileged Children in Slum Areas",
    description:
      "From the past, every student studied in taxpayer-funded schools, colleges, and Government-aided institutions. Having benefited from that, we felt an undeniable responsibility to pay back to the SOCIETY that made us who we are today. We resolved to educate the poor in slum areas who cannot afford private education.",
    quote: "Today's child is tomorrow's nation. In the absence of education, child growth suffers depressiveness.",
    points: [
      "Bridging the private sector affordability divide in slum areas",
      "Reaching children unable to afford quality education",
      "Building high standards, values, and lifelong discipline"
    ],
    color: "orange"
  },
  {
    id: "m3",
    badge: "Our 4 Goals",
    tag: "Mission & Purpose",
    title: "Four Pillars of Our Mission",
    subtitle: "Transforming Young Lives into Responsible Citizens",
    description:
      "Our core goals steer every single lesson, classroom interaction, and student welfare decision across all grades:",
    points: [
      "To educate the poor and underprivileged children",
      "To equip them with good knowledge that leads to a better life",
      "To make them self-sustainable and confident",
      "To give responsible, value-driven citizens to the country"
    ],
    color: "emerald"
  },
  {
    id: "m4",
    badge: "2016 Foundation",
    tag: "Formation & Inception",
    title: "600 Sq. Yards Land & Inception",
    subtitle: "Sundaraiah Nagar, Adavithakkellapadu Road, Guntur-6",
    description:
      "AUASD was given 600 sq. yards of land by the Colony Welfare Association in Sundaraiah Nagar. With funds generated by society members and kind well-wishers, construction of a 3,600 sq. ft. building with six rooms started in January 2016. In recognition of Prof. M.V.S. Koteswara Rao's effort following his untimely demise, the school was dedicated in his memory. Classes began in June 2016 from Nursery to 3rd class with 150 students enrolled with nominal fees.",
    points: [
      "600 sq. yards land gifted by Colony Welfare Association",
      "3,600 sq. ft. initial single-floor building with 6 classrooms",
      "Commenced June 2016: 150 students from Nursery to 3rd Class"
    ],
    color: "purple"
  },
  {
    id: "m5",
    badge: "2017 Expansion",
    tag: "Infrastructure Growth",
    title: "Second Floor, Library & AV Education",
    subtitle: "Adding 4th Standard & Multi-Purpose Halls",
    description:
      "Due to rapid batch growth, a second-floor construction was planned and raised in 2017 with three large halls. We introduced the 4th standard, a dedicated Library, Audio-Visual digital smart learning, and interactive group-learning activities.",
    points: [
      "Second-floor construction adding 3 large halls",
      "Expansion to 4th class for incoming batches",
      "Equipped with Library, Audio-Visual smart education & group learning"
    ],
    color: "amber"
  },
  {
    id: "m6",
    badge: "2018 & Beyond",
    tag: "Continued Growth",
    title: "5th Standard & Full Modern Amenities",
    subtitle: "Outstanding Academic Results & Thriving Campus",
    description:
      "Added 5th standard in the 2018-19 academic year with extraordinarily high academic results. As student enrollment surged, dedicated spaces were provided for foundational Nursery & LKG batches, with all campus amenities fully upgraded to support holistic child growth.",
    points: [
      "Introduced 5th standard with outstanding academic performance",
      "New dedicated wing for foundational Nursery & LKG learners",
      "Complete basic campus amenities, safe play & nurturing environment"
    ],
    color: "rose"
  }
];

export const defaultAbout: AboutSectionData = {
  tag: "Our Philosophy & Story",
  title: "Why Choose Prof. MVS Koteswara Rao Memorial School?",
  cards: [
    {
      id: "a1",
      title: "Quality Education",
      description:
        "We believe in empowering students with knowledge that transcends textbooks, preparing them for real-world challenges through interactive learning.",
      color: "orange"
    },
    {
      id: "a2",
      title: "Social Responsibility",
      description:
        "Instilling a sense of duty to pay back to the society that nurtures us is at the core of our educational philosophy.",
      color: "red"
    },
    {
      id: "a3",
      title: "Holistic Growth",
      description:
        "Fostering excellence not just in academics, but in sports, arts, and character building for complete all-around development.",
      color: "indigo"
    }
  ],
  historyTag: "A Small Initiative for a Better Society",
  historyTitle: "Our Genesis, Ideology & Milestones",
  historySubtitle:
    "Sponsored by AUASD (Andhra University Alumni for Sustainable Development) — Started with a noble resolve to pay back to society through accessible, high-standard schooling in Guntur.",
  milestones: defaultMilestones
};

export const defaultAcademics: AcademicsSectionData = {
  tag: "Curriculum",
  title: "Academic Excellence",
  description:
    "Our comprehensive English Medium curriculum is designed to stimulate intellectual curiosity and foster a lifelong love for learning. We maintain optimal student-teacher ratios for personalized attention.",
  image: "/event-1.jpg",
  programs: [
    { id: "p1", text: "Pre-Primary & Nursery Education" },
    { id: "p2", text: "Primary & Middle School (E.M)" },
    { id: "p3", text: "High School State Board & Digital Learning" }
  ]
};

export const defaultSupport: SupportSectionData = {
  tag: "Support Us",
  title: "For Online Donations",
  schoolName: "Prof. MVS Koteswara Rao Memorial School",
  bankName: "Union Bank",
  accountNumber: "156910100118069",
  ifsc: "UBIN0815691"
};

export const defaultContactPersons: ContactPerson[] = [
  {
    id: "cp1",
    name: "N. Tandava Krishna",
    role: "Principal",
    phone: "9490 300 642",
    email: "mvskchool22754@gmail.com",
    photo: "/tandava-krishna.jpg"
  },
  {
    id: "cp2",
    name: "L.S. Bharavi",
    role: "Administrator",
    phone: "9490 300 859",
    email: "mvskchool22754@gmail.com",
    photo: "/ls-bharavi..jpg"
  }
];

export const defaultContact: ContactSectionData = {
  tag: "Contact Us",
  title: "Get in Touch With Us",
  phone: "9849532787",
  email: "mvskchool22754@gmail.com",
  address: "Prof. MVS Koteswara Rao Memorial School, Sundaraiah Nagar, Adavithakkellapadu Road, Guntur, Andhra Pradesh 522006, India.",
  footerAbout: `"It's our responsibility to pay back to the SOCIETY" Nurturing students to become responsible, educated citizens of tomorrow.`,
  persons: defaultContactPersons
};

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
  address: "Prof. MVS Koteswara Rao Memorial School, Sundaraiah Nagar, Adavithakkellapadu Road, Guntur, Andhra Pradesh 522006, India.",
  bankAccount: "156910100118069",
  ifsc: "UBIN0815691"
};

// Storage keys
const KEYS = {
  HERO: "mvs_cms_hero_v3",
  ABOUT: "mvs_cms_about_v3",
  ACADEMICS: "mvs_cms_academics_v3",
  SUPPORT: "mvs_cms_support_v3",
  CONTACT: "mvs_cms_contact_v3",
  NOTICES: "mvs_cms_notices_v3",
  POPUP: "mvs_cms_popup_v3",
  GALLERY: "mvs_cms_gallery_v3",
  LEADERSHIP: "mvs_cms_leadership_v3",
  TEACHING: "mvs_cms_teaching_v3",
  NON_TEACHING: "mvs_cms_non_teaching_v3",
  SETTINGS: "mvs_cms_settings_v3"
};

const KEY_TO_SECTION: Record<string, string> = {
  [KEYS.HERO]: "hero",
  [KEYS.ABOUT]: "about",
  [KEYS.ACADEMICS]: "academics",
  [KEYS.SUPPORT]: "support",
  [KEYS.CONTACT]: "contact",
  [KEYS.NOTICES]: "notices",
  [KEYS.POPUP]: "popup",
  [KEYS.GALLERY]: "gallery",
  [KEYS.LEADERSHIP]: "leadership",
  [KEYS.TEACHING]: "teaching",
  [KEYS.NON_TEACHING]: "nonTeaching",
  [KEYS.SETTINGS]: "settings"
};

let lastSaveTimestamp = 0;

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

async function safeSet<T>(key: string, value: T): Promise<boolean> {
  if (typeof window === "undefined") return false;
  lastSaveTimestamp = Date.now();
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("mvs_cms_update"));
    window.dispatchEvent(new Event("storage"));

    // Persist to server API & Supabase cloud
    const sectionName = KEY_TO_SECTION[key];
    if (sectionName) {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: sectionName, data: value })
      });
      return res.ok;
    }
    return true;
  } catch (e) {
    console.error("Failed to save to localStorage / server", e);
    return false;
  }
}

export const cmsStore = {
  getHero: (): HeroSectionData => {
    const raw = safeGet<HeroSectionData>(KEYS.HERO, defaultHero);
    return {
      ...defaultHero,
      ...raw,
      showAdmissions: typeof raw?.showAdmissions === "boolean" ? raw.showAdmissions : false
    };
  },
  setHero: (v: HeroSectionData) => safeSet(KEYS.HERO, v),

  getAbout: (): AboutSectionData => {
    const raw = safeGet<AboutSectionData>(KEYS.ABOUT, defaultAbout);
    return {
      ...defaultAbout,
      ...raw,
      cards: raw?.cards && raw.cards.length > 0 ? raw.cards : defaultAbout.cards,
      milestones: raw?.milestones && raw.milestones.length > 0 ? raw.milestones : defaultMilestones
    };
  },
  setAbout: (v: AboutSectionData) => safeSet(KEYS.ABOUT, v),

  getAcademics: (): AcademicsSectionData => safeGet(KEYS.ACADEMICS, defaultAcademics),
  setAcademics: (v: AcademicsSectionData) => safeSet(KEYS.ACADEMICS, v),

  getSupport: (): SupportSectionData => safeGet(KEYS.SUPPORT, defaultSupport),
  setSupport: (v: SupportSectionData) => safeSet(KEYS.SUPPORT, v),

  getContact: (): ContactSectionData => {
    const raw = safeGet<Partial<ContactSectionData>>(KEYS.CONTACT, defaultContact);
    return {
      ...defaultContact,
      ...raw,
      persons: raw.persons && raw.persons.length > 0 ? raw.persons : defaultContact.persons
    };
  },
  setContact: (v: ContactSectionData) => safeSet(KEYS.CONTACT, v),

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

  syncFromServer: async (): Promise<boolean> => {
    if (typeof window === "undefined") return false;
    // If a save occurred in the last 4 seconds, don't let a background poll overwrite local state
    if (Date.now() - lastSaveTimestamp < 4000) return false;

    try {
      const res = await fetch("/api/cms", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" }
      });
      if (!res.ok) return false;
      const data = await res.json();

      if (data.hero) localStorage.setItem(KEYS.HERO, JSON.stringify(data.hero));
      if (data.about) localStorage.setItem(KEYS.ABOUT, JSON.stringify(data.about));
      if (data.academics) localStorage.setItem(KEYS.ACADEMICS, JSON.stringify(data.academics));
      if (data.support) localStorage.setItem(KEYS.SUPPORT, JSON.stringify(data.support));
      if (data.contact) localStorage.setItem(KEYS.CONTACT, JSON.stringify(data.contact));
      if (data.notices) localStorage.setItem(KEYS.NOTICES, JSON.stringify(data.notices));
      if (data.popup) localStorage.setItem(KEYS.POPUP, JSON.stringify(data.popup));
      if (data.gallery) localStorage.setItem(KEYS.GALLERY, JSON.stringify(data.gallery));
      if (data.leadership) localStorage.setItem(KEYS.LEADERSHIP, JSON.stringify(data.leadership));
      if (data.teaching) localStorage.setItem(KEYS.TEACHING, JSON.stringify(data.teaching));
      if (data.nonTeaching) localStorage.setItem(KEYS.NON_TEACHING, JSON.stringify(data.nonTeaching));
      if (data.settings) localStorage.setItem(KEYS.SETTINGS, JSON.stringify(data.settings));

      window.dispatchEvent(new Event("mvs_cms_update"));
      return true;
    } catch (err) {
      console.warn("Failed to sync CMS from server:", err);
      return false;
    }
  }
};

// Automatic initial sync from server when running in browser
if (typeof window !== "undefined") {
  cmsStore.syncFromServer();
}



