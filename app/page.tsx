"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Trophy,
  Heart,
  Calendar,
  Image as ImageIcon,
  MapPin,
  Phone,
  Mail,
  Award,
  Users,
  Menu,
  X
} from "lucide-react";
import {
  cmsStore,
  NoticeBoardItem,
  PopupNotice,
  GalleryPhoto,
  StaffMember,
  AboutSectionData,
  AcademicsSectionData,
  HeroSectionData,
  SupportSectionData,
  ContactSectionData,
  defaultHero,
  defaultAbout,
  defaultAcademics,
  defaultSupport,
  defaultContact,
  defaultNoticeBoard,
  defaultPopup,
  defaultGallery,
  defaultLeadership,
  defaultTeaching,
  defaultNonTeaching
} from "@/lib/cms-store";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const [showPopup, setShowPopup] = useState(true);

  // Dynamic CMS state
  const [hero, setHero] = useState<HeroSectionData>(defaultHero);
  const [about, setAbout] = useState<AboutSectionData>(defaultAbout);
  const [academics, setAcademics] = useState<AcademicsSectionData>(defaultAcademics);
  const [support, setSupport] = useState<SupportSectionData>(defaultSupport);
  const [contact, setContact] = useState<ContactSectionData>(defaultContact);
  const [notices, setNotices] = useState<NoticeBoardItem[]>(defaultNoticeBoard);
  const [popup, setPopup] = useState<PopupNotice>(defaultPopup);
  const [gallery, setGallery] = useState<GalleryPhoto[]>(defaultGallery);
  const [leadership, setLeadership] = useState<StaffMember[]>(defaultLeadership);
  const [teaching, setTeaching] = useState<StaffMember[]>(defaultTeaching);
  const [nonTeaching, setNonTeaching] = useState<StaffMember[]>(defaultNonTeaching);

  const loadCmsData = () => {
    setHero(cmsStore.getHero());
    setAbout(cmsStore.getAbout());
    setAcademics(cmsStore.getAcademics());
    setSupport(cmsStore.getSupport());
    setContact(cmsStore.getContact());
    setNotices(cmsStore.getNotices());
    setPopup(cmsStore.getPopup());
    setGallery(cmsStore.getGallery());
    setLeadership(cmsStore.getLeadership());
    setTeaching(cmsStore.getTeaching());
    setNonTeaching(cmsStore.getNonTeaching());
  };

  useEffect(() => {
    loadCmsData();
    cmsStore.syncFromServer().then(() => loadCmsData());

    const handleUpdate = () => loadCmsData();
    window.addEventListener("mvs_cms_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    window.addEventListener("focus", () => cmsStore.syncFromServer().then(() => loadCmsData()));

    // Periodic sync every 15 seconds so phone & visitor browsers stay updated
    const syncInterval = setInterval(() => {
      cmsStore.syncFromServer().then(() => loadCmsData());
    }, 15000);

    return () => {
      window.removeEventListener("mvs_cms_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("focus", () => cmsStore.syncFromServer().then(() => loadCmsData()));
      clearInterval(syncInterval);
    };
  }, []);

  // Background carousel images array from hero images or gallery
  const heroImages = hero.images && hero.images.length > 0
    ? hero.images
    : (gallery.length > 0 ? gallery.map((g) => g.url) : ["/event-1.jpg"]);

  useEffect(() => {
    if (heroImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar / Header */}
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Prof. MVS Koteswara Rao Memorial School Logo"
                className="w-12 h-12 rounded-full object-cover shadow-md border border-amber-500/20"
                width={48}
                height={48}
              />
              <span className="text-lg font-extrabold text-slate-800 hidden md:block tracking-tight">
                Prof. MVS Koteswara Rao Memorial School
              </span>
              <span className="text-base font-extrabold text-orange-600 md:hidden">
                Prof. MVS Memorial School
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#about" className="text-xs text-gray-600 hover:text-orange-600 transition font-semibold tracking-wide uppercase">About</Link>
              <Link href="#academics" className="text-xs text-gray-600 hover:text-orange-600 transition font-semibold tracking-wide uppercase">Academics</Link>
              <Link href="#gallery" className="text-xs text-gray-600 hover:text-orange-600 transition font-semibold tracking-wide uppercase">Gallery</Link>
              <Link href="#staff" className="text-xs text-gray-600 hover:text-orange-600 transition font-semibold tracking-wide uppercase">Staff</Link>
              <Link href="#donations" className="text-xs text-gray-600 hover:text-orange-600 transition font-semibold tracking-wide uppercase">Support</Link>
              <Link href="#contact" className="text-xs text-gray-600 hover:text-orange-600 transition font-semibold tracking-wide uppercase">Contact</Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="text-slate-800 hover:text-orange-600 p-2 focus:outline-none"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-6 shadow-2xl absolute w-full left-0 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-6 text-center">
              <Link onClick={() => setMobileMenuOpen(false)} href="#about" className="text-base font-bold text-slate-800 uppercase tracking-widest hover:text-orange-600">About</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="#academics" className="text-base font-bold text-slate-800 uppercase tracking-widest hover:text-orange-600">Academics</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="#gallery" className="text-base font-bold text-slate-800 uppercase tracking-widest hover:text-orange-600">Gallery</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="#staff" className="text-base font-bold text-slate-800 uppercase tracking-widest hover:text-orange-600">Staff</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="#donations" className="text-base font-bold text-slate-800 uppercase tracking-widest hover:text-orange-600">Support</Link>
              <Link onClick={() => setMobileMenuOpen(false)} href="#contact" className="text-base font-bold text-slate-800 uppercase tracking-widest hover:text-orange-600">Contact</Link>
            </div>
          </div>
        )}
      </header>

      <main id="main-content">
        {/* 1. Playful Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-sky-100 via-white to-white group" aria-label="Hero Introduction">
          <div className="absolute inset-0 z-0 overflow-hidden bg-black/5">
            {/* Animated background image with continuous panning and 10s rotation */}
            {heroImages.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`Prof. MVS Koteswara Rao Memorial School Campus Life and Activity ${index + 1}`} 
                className={`absolute inset-0 w-full h-full object-cover animate-pan-zoom transition-opacity duration-1000 ${
                  index === (currentBg % heroImages.length) ? 'opacity-25 group-hover:scale-110 group-hover:opacity-35 transition-transform' : 'opacity-0'
                }`}
              />
            ))}
            
            {/* Floating Sparkles */}
            <div className="absolute top-20 left-10 text-yellow-400 animate-float w-16 h-16 opacity-80" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div className="absolute top-40 right-20 text-orange-400 animate-float-delay-1 w-12 h-12 opacity-70" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {hero.admissionsTag && (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-sm mb-6 shadow-xl shadow-orange-200 animate-bounce">
                {hero.admissionsTag}
              </div>
            )}
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
              <span className="block text-2xl md:text-3xl font-extrabold text-orange-600 mb-2 tracking-normal">
                {hero.schoolTitle}
              </span>
              A Magical Place To <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 animate-pulse">
                Learn & Grow
              </span>
            </h1>
            
            <div className="max-w-3xl mx-auto mb-10">
              {hero.sloganQuote && (
                <p className="text-2xl text-slate-800 font-extrabold italic mb-4 bg-yellow-100 inline-block px-4 py-1 rounded-2xl transform -rotate-2">
                  {hero.sloganQuote}
                </p>
              )}
              <p className="text-xl text-slate-600 leading-relaxed font-semibold mt-4">
                {hero.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="#contact" className="px-10 py-5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl font-black text-xl hover:scale-105 hover:shadow-2xl hover:shadow-pink-300 transition-all duration-300 flex items-center justify-center gap-3 border-b-4 border-pink-700 active:border-b-0 active:translate-y-1" aria-label="Navigate to school admissions and contact information">
                Admissions & Contact <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </section>

        {/* 2. Notice Board / Latest Updates */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex items-center gap-3 shrink-0">
                <Calendar className="w-8 h-8 text-orange-500" />
                <h2 className="text-2xl font-bold">Notice Board</h2>
              </div>
              <div className="flex-1 w-full overflow-hidden bg-slate-800 rounded-xl p-4 flex gap-6 overflow-x-auto snap-x border border-slate-700">
                {notices.map((notice) => (
                  <div key={notice.id} className="shrink-0 snap-start bg-slate-700/50 p-3 rounded-lg min-w-[250px] max-w-[320px]">
                    <span className={`text-xs font-bold mb-1 block ${
                      notice.tagColor === "orange" ? "text-orange-400" :
                      notice.tagColor === "blue" ? "text-blue-400" :
                      notice.tagColor === "green" ? "text-emerald-400" :
                      notice.tagColor === "purple" ? "text-purple-400" : "text-rose-400"
                    }`}>
                      {notice.tag}
                    </span>
                    <p className="text-sm font-medium text-slate-200">{notice.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Core Values & About */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-orange-600 tracking-widest uppercase mb-2">{about.tag || "Our Philosophy"}</h2>
              <h3 className="text-4xl font-extrabold text-slate-900">{about.title}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {about.cards.map((card, idx) => {
                const bgClass =
                  card.color === "orange" ? "bg-orange-100 text-orange-600" :
                  card.color === "red" ? "bg-red-100 text-red-600" :
                  card.color === "indigo" ? "bg-indigo-100 text-indigo-600" :
                  card.color === "emerald" ? "bg-emerald-100 text-emerald-600" :
                  card.color === "purple" ? "bg-purple-100 text-purple-600" :
                  "bg-blue-100 text-blue-600";

                return (
                  <div key={card.id || idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-14 h-14 ${bgClass} rounded-2xl flex items-center justify-center mb-6`}>
                      {idx === 0 ? <BookOpen className="w-7 h-7" /> : idx === 1 ? <Heart className="w-7 h-7" /> : <Award className="w-7 h-7" />}
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Academics & Programs */}
        <section id="academics" className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-sm font-bold text-orange-600 tracking-widest uppercase mb-2">{academics.tag || "Curriculum"}</h2>
                <h3 className="text-4xl font-extrabold text-slate-900 mb-6">{academics.title}</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {academics.description}
                </p>
                <ul className="space-y-4 mb-8">
                  {academics.programs.map((item, idx) => (
                    <li key={item.id || idx} className="flex items-center gap-3 text-slate-700 font-medium">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">✓</span> {item.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2 relative">
                <img 
                  src={academics.image || "/event-1.jpg"} 
                  alt={`Academic programs at ${hero.schoolTitle}`} 
                  className="rounded-3xl shadow-2xl object-cover h-80 w-full" 
                  width={600}
                  height={320}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Image Gallery Section */}
        <section id="gallery" className="py-24 bg-white" aria-label="Campus Life Gallery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-sm font-bold text-orange-600 tracking-widest uppercase mb-2">Campus Life</h2>
                <h3 className="text-4xl font-extrabold text-slate-900">Photo Gallery</h3>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((img, idx) => (
                <div
                  key={img.id || idx}
                  className={`relative group overflow-hidden rounded-2xl bg-slate-200 ${
                    idx === 0 || idx === 7 ? "col-span-2 row-span-2 min-h-[260px]" : "aspect-square"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={`${img.title} - ${hero.schoolTitle}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                    <span className="text-white font-bold text-sm">{img.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Staff Section */}
        <section id="staff" className="py-24 bg-slate-50 border-t border-slate-200" aria-label="Faculty and Leadership Team">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-orange-600 tracking-widest uppercase mb-2">Our Faculty & Leadership</h2>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-slate-900">Meet Our Dedicated Staff</h3>
              <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Our highly qualified teaching and non-teaching staff are committed to nurturing the potential within every student in Guntur.
              </p>
            </div>
            
            {/* Leadership Team */}
            <h4 className="text-3xl font-extrabold text-slate-900 mb-10 border-b-4 border-orange-500 pb-3 inline-block">
              School Leadership
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {leadership.map((staff) => (
                <article key={staff.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 group flex flex-col justify-between">
                  <div className="h-80 sm:h-96 overflow-hidden bg-slate-200 relative">
                    <img
                      src={staff.img || "/event-1.jpg"}
                      alt={`${staff.name}, ${staff.role} at ${hero.schoolTitle}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs font-bold uppercase tracking-wider bg-orange-600 px-3 py-1 rounded-full shadow">
                        Leadership
                      </span>
                    </div>
                  </div>
                  <div className="p-6 text-center bg-white space-y-2">
                    <h4 className="text-2xl font-black text-slate-900 leading-tight">{staff.name}</h4>
                    <p className="text-orange-600 font-extrabold text-base">{staff.role}</p>
                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-4 py-1.5 rounded-full inline-block border border-slate-200">
                        {staff.qual}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Teaching Staff */}
            <h4 className="text-3xl font-extrabold text-slate-900 mb-10 border-b-4 border-orange-500 pb-3 inline-block">
              Teaching Faculty
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
              {teaching.map((staff) => (
                <article key={staff.id} className="bg-white p-6 sm:p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-orange-400 transform hover:-translate-y-1 group flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-2xl flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-orange-500/20" aria-hidden="true">
                    {staff.name.substring(0, 1)}
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <h4 className="font-extrabold text-slate-900 text-lg group-hover:text-orange-600 transition-colors truncate">{staff.name}</h4>
                    <p className="text-sm font-bold text-orange-600">{staff.role}</p>
                    <p className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg inline-block border border-slate-200 mt-2">
                      {staff.qual}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Non-Teaching Staff */}
            <h4 className="text-3xl font-extrabold text-slate-900 mb-10 border-b-4 border-orange-500 pb-3 inline-block">
              Non-Teaching Staff
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nonTeaching.map((staff) => (
                <article key={staff.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-2xl flex items-center justify-center font-black text-base shrink-0 shadow" aria-hidden="true">
                    {staff.name.substring(0, 1)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{staff.name}</h4>
                    <p className="text-xs font-bold text-slate-600 mt-0.5">{staff.role}</p>
                    {staff.qual !== "-" && (
                      <p className="text-[11px] text-slate-500 font-medium mt-1">{staff.qual}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* 6. Online Donations */}
        <section id="donations" className="py-24 bg-orange-50 border-t border-orange-100" aria-label="Support and Online Donations">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-sm font-bold text-orange-600 tracking-widest uppercase mb-2">{support.tag || "Support Us"}</h2>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-8">{support.title || "For Online Donations"}</h3>
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-orange-100 text-left md:text-center">
              <h4 className="text-2xl font-bold text-slate-800 mb-6">{support.schoolName}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                  <p className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wider">Bank</p>
                  <p className="font-bold text-slate-900 text-xl">{support.bankName}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                  <p className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wider">Account Number</p>
                  <p className="font-bold text-slate-900 text-xl font-mono tracking-widest">{support.accountNumber}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 md:col-span-2 hover:shadow-md transition-shadow">
                  <p className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wider">IFSC Code</p>
                  <p className="font-bold text-slate-900 text-xl font-mono tracking-widest">{support.ifsc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Contact Us Section */}
        <section id="contact" className="py-24 bg-gradient-to-b from-orange-50/50 via-white to-slate-50 border-t border-orange-100" aria-label="Contact Us & School Office">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
                <Phone className="w-3.5 h-3.5" />
                {contact.tag || "Contact Us"}
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
                {contact.title || "Get in Touch With Us"}
              </h3>
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                Have questions regarding admissions, academics, or school activities? Reach out to our leadership team or main administration office.
              </p>
            </div>

            {/* Key Contact Persons Cards */}
            {contact.persons && contact.persons.length > 0 && (
              <div className="mb-16">
                <h4 className="text-center text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-8">
                  Key Contact Persons
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {contact.persons.map((person) => (
                    <div
                      key={person.id}
                      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-orange-100 hover:border-orange-400 group relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6"
                    >
                      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full pointer-events-none" />
                      
                      {/* Photo / Avatar */}
                      <div className="relative shrink-0">
                        {person.photo ? (
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-orange-500 shadow-md">
                            <img
                              src={person.photo}
                              alt={person.name}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center font-black text-3xl shadow-md">
                            {person.name.charAt(0)}
                          </div>
                        )}
                        <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-1.5 rounded-xl shadow">
                          <Phone className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex-1 text-center sm:text-left space-y-2">
                        <span className="inline-block bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1 rounded-full border border-orange-200 uppercase tracking-wide">
                          {person.role}
                        </span>
                        <h4 className="text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                          {person.name}
                        </h4>
                        
                        <div className="pt-2 flex flex-col gap-2">
                          <a
                            href={`tel:${person.phone.replace(/\s+/g, '')}`}
                            className="inline-flex items-center justify-center sm:justify-start gap-2 text-slate-800 hover:text-orange-600 font-extrabold text-lg transition-colors group/btn"
                          >
                            <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center group-hover/btn:bg-orange-600 group-hover/btn:text-white transition-colors">
                              <Phone className="w-4 h-4" />
                            </span>
                            <span>{person.phone}</span>
                          </a>

                          {person.email && (
                            <a
                              href={`mailto:${person.email}`}
                              className="inline-flex items-center justify-center sm:justify-start gap-2 text-slate-600 hover:text-orange-600 text-xs font-semibold transition-colors truncate"
                            >
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <span className="truncate">{person.email}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General School Office Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-lg transition-all text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-slate-900 text-base mb-1">Campus Location</h5>
                <p className="text-sm text-slate-600 leading-relaxed">{contact.address}</p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-lg transition-all text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-slate-900 text-base mb-1">General Office Phone</h5>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-base font-bold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  {contact.phone}
                </a>
                <p className="text-xs text-slate-400 mt-1">Mon - Sat: 8:30 AM - 4:30 PM</p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-lg transition-all text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-slate-900 text-base mb-1">Official Email</h5>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors break-all"
                >
                  {contact.email}
                </a>
                <p className="text-xs text-slate-400 mt-1">Official Inquiries & Admissions</p>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Footer */}
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-10 border-t-4 border-orange-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-1">
                <h3 className="text-2xl font-bold text-white mb-6">{hero.schoolTitle}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {contact.footerAbout}
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Quick Links</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="#" className="hover:text-orange-400 transition-colors">Home</Link></li>
                  <li><Link href="#about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
                  <li><Link href="#academics" className="hover:text-orange-400 transition-colors">Academics</Link></li>
                  <li><Link href="#gallery" className="hover:text-orange-400 transition-colors">Gallery</Link></li>
                  <li><Link href="#donations" className="hover:text-orange-400 transition-colors">Donations & Support</Link></li>
                  <li><Link href="/admin/dashboard" className="hover:text-orange-400 transition-colors">Admin Portal</Link></li>
                </ul>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Contact & Key Staff</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {contact.persons && contact.persons.map((p) => (
                    <div key={p.id} className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60 flex items-center gap-3">
                      {p.photo ? (
                        <img src={p.photo} alt={p.name} className="w-10 h-10 rounded-lg object-cover object-top shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {p.name.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-white text-xs font-bold truncate">{p.name}</p>
                        <p className="text-orange-400 text-[11px] font-semibold">{p.role}</p>
                        <a href={`tel:${p.phone.replace(/\s+/g, '')}`} className="text-slate-300 hover:text-orange-400 text-xs font-mono font-bold block mt-0.5">
                          {p.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <address className="not-italic">
                  <ul className="space-y-3 pt-2">
                    <li className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-xs text-slate-400">{contact.address}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-orange-500 shrink-0" aria-hidden="true" />
                      <a href={`tel:${contact.phone}`} className="text-xs text-slate-400 hover:text-orange-400 transition-colors">{contact.phone}</a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-orange-500 shrink-0" aria-hidden="true" />
                      <a href={`mailto:${contact.email}`} className="text-xs text-slate-400 hover:text-orange-400 transition-colors">{contact.email}</a>
                    </li>
                  </ul>
                </address>
              </div>
            </div>
            
            <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
              <p>&copy; {new Date().getFullYear()} {hero.schoolTitle}. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>

        {/* Popup Notification */}
        {showPopup && popup.enabled && (
          <div className="fixed bottom-6 right-6 max-w-sm bg-white rounded-2xl shadow-2xl border-l-4 border-orange-500 p-5 z-50 animate-in slide-in-from-bottom-5">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2 text-orange-600">
                <Calendar className="w-5 h-5" />
                <h4 className="font-bold">{popup.title}</h4>
              </div>
              <button onClick={() => setShowPopup(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {popup.text}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
