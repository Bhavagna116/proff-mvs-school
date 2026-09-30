"use client";

import { useState, useEffect, useRef } from "react";
import {
  Users,
  Megaphone,
  ImageIcon,
  Settings,
  Plus,
  Trash2,
  CheckCircle,
  Bell,
  Sparkles,
  Upload,
  FolderOpen,
  Globe,
  Save,
  FileImage,
  X,
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Layers,
  PhoneCall,
  Phone,
  Edit3
} from "lucide-react";
import {
  cmsStore,
  NoticeBoardItem,
  PopupNotice,
  GalleryPhoto,
  StaffMember,
  AboutSectionData,
  AboutCard,
  AcademicsSectionData,
  AcademicProgramItem,
  HeroSectionData,
  SupportSectionData,
  ContactSectionData,
  ContactPerson,
  defaultHero,
  defaultAbout,
  defaultAcademics,
  defaultSupport,
  defaultContact,
  defaultContactPersons,
  defaultNoticeBoard,
  defaultPopup,
  defaultGallery,
  defaultLeadership,
  defaultTeaching,
  defaultNonTeaching
} from "@/lib/cms-store";

type AdminTab =
  | "about"
  | "academics"
  | "gallery"
  | "staff"
  | "support"
  | "contact"
  | "hero"
  | "notices";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("about");

  // State loaded from cmsStore
  const [hero, setHero] = useState<HeroSectionData>(defaultHero);
  const [about, setAbout] = useState<AboutSectionData>(defaultAbout);
  const [academics, setAcademics] = useState<AcademicsSectionData>(defaultAcademics);
  const [support, setSupport] = useState<SupportSectionData>(defaultSupport);
  const [contact, setContact] = useState<ContactSectionData>(defaultContact);
  const [notices, setNotices] = useState<NoticeBoardItem[]>([]);
  const [popup, setPopup] = useState<PopupNotice>({ enabled: true, title: "", text: "" });
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [leadership, setLeadership] = useState<StaffMember[]>([]);
  const [teaching, setTeaching] = useState<StaffMember[]>([]);
  const [nonTeaching, setNonTeaching] = useState<StaffMember[]>([]);

  // Edit states for modals
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [editingCard, setEditingCard] = useState<AboutCard | null>(null);
  const [editingProgram, setEditingProgram] = useState<AcademicProgramItem | null>(null);
  const [editingNotice, setEditingNotice] = useState<NoticeBoardItem | null>(null);
  const [editingContactPerson, setEditingContactPerson] = useState<ContactPerson | null>(null);

  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 4000);
  };

  // File input refs for drive file picking
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const editGalleryFileInputRef = useRef<HTMLInputElement>(null);
  const staffFileInputRef = useRef<HTMLInputElement>(null);
  const editStaffFileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const academicsFileInputRef = useRef<HTMLInputElement>(null);
  const cpFileInputRef = useRef<HTMLInputElement>(null);
  const editCpFileInputRef = useRef<HTMLInputElement>(null);

  const loadData = () => {
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

  // Load from store on mount & sync with server
  useEffect(() => {
    loadData();
    cmsStore.syncFromServer().then(() => loadData());

    const handleUpdate = () => loadData();
    window.addEventListener("mvs_cms_update", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("mvs_cms_update", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // ==========================================
  // 1. ABOUT SECTION HANDLERS
  // ==========================================
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDesc, setNewCardDesc] = useState("");
  const [newCardColor, setNewCardColor] = useState<AboutCard["color"]>("orange");

  const handleSaveAboutMeta = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.setAbout(about);
    showToast("About section header and title updated!");
  };

  const handleAddAboutCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardTitle.trim() || !newCardDesc.trim()) {
      showToast("Please provide card title and description!");
      return;
    }
    const newCard: AboutCard = {
      id: Date.now().toString(),
      title: newCardTitle.trim(),
      description: newCardDesc.trim(),
      color: newCardColor
    };
    const updatedCards = [...about.cards, newCard];
    const updated = { ...about, cards: updatedCards };
    setAbout(updated);
    cmsStore.setAbout(updated);
    setNewCardTitle("");
    setNewCardDesc("");
    showToast("New philosophy card added to About Us section!");
  };

  const handleSaveEditAboutCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;
    const updatedCards = about.cards.map((c) =>
      c.id === editingCard.id ? editingCard : c
    );
    const updated = { ...about, cards: updatedCards };
    setAbout(updated);
    cmsStore.setAbout(updated);
    setEditingCard(null);
    showToast(`Updated card "${editingCard.title}"!`);
  };

  const handleDeleteAboutCard = (id: string) => {
    const updatedCards = about.cards.filter((c) => c.id !== id);
    const updated = { ...about, cards: updatedCards };
    setAbout(updated);
    cmsStore.setAbout(updated);
    showToast("Card removed!");
  };

  // ==========================================
  // 2. ACADEMICS SECTION HANDLERS
  // ==========================================
  const [newProgramText, setNewProgramText] = useState("");

  const handleSaveAcademics = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.setAcademics(academics);
    showToast("Academics section updated successfully!");
  };

  const handleAcademicsFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          const updated = { ...academics, image: event.target.result };
          setAcademics(updated);
          cmsStore.setAcademics(updated);
          showToast(`Uploaded academic image "${file.name}"!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgramText.trim()) return;
    const item: AcademicProgramItem = {
      id: Date.now().toString(),
      text: newProgramText.trim()
    };
    const updated = { ...academics, programs: [...academics.programs, item] };
    setAcademics(updated);
    cmsStore.setAcademics(updated);
    setNewProgramText("");
    showToast("New academic program bullet point added!");
  };

  const handleSaveEditProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram) return;
    const updated = {
      ...academics,
      programs: academics.programs.map((p) =>
        p.id === editingProgram.id ? editingProgram : p
      )
    };
    setAcademics(updated);
    cmsStore.setAcademics(updated);
    setEditingProgram(null);
    showToast("Program point updated!");
  };

  const handleDeleteProgram = (id: string) => {
    const updated = {
      ...academics,
      programs: academics.programs.filter((p) => p.id !== id)
    };
    setAcademics(updated);
    cmsStore.setAcademics(updated);
    showToast("Program point removed!");
  };

  // ==========================================
  // 3. GALLERY PHOTO HANDLERS
  // ==========================================
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [galleryFileName, setGalleryFileName] = useState("");

  const handleGalleryFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGalleryFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setNewPhotoUrl(event.target.result);
          if (!newPhotoTitle) {
            const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
            setNewPhotoTitle(nameWithoutExt);
          }
          showToast(`Selected "${file.name}" from your drive!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim() || !newPhotoTitle.trim()) {
      showToast("Please choose a photo from drive or enter an Image URL / Title!");
      return;
    }

    const item: GalleryPhoto = {
      id: Date.now().toString(),
      url: newPhotoUrl.trim(),
      title: newPhotoTitle.trim()
    };

    const updated = [...gallery, item];
    setGallery(updated);
    cmsStore.setGallery(updated);
    setNewPhotoUrl("");
    setNewPhotoTitle("");
    setGalleryFileName("");
    if (galleryFileInputRef.current) {
      galleryFileInputRef.current.value = "";
    }
    showToast("New photo published directly to Gallery!");
  };

  const handleEditGalleryFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingPhoto) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setEditingPhoto({ ...editingPhoto, url: event.target.result });
          showToast(`Selected replacement photo "${file.name}"!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEditPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;
    const updated = gallery.map((p) =>
      p.id === editingPhoto.id ? editingPhoto : p
    );
    setGallery(updated);
    cmsStore.setGallery(updated);
    setEditingPhoto(null);
    showToast(`Updated photo "${editingPhoto.title}"!`);
  };

  const handleDeletePhoto = (id: string) => {
    const updated = gallery.filter((p) => p.id !== id);
    setGallery(updated);
    cmsStore.setGallery(updated);
    showToast("Photo removed from gallery!");
  };

  // ==========================================
  // 4. STAFF MANAGEMENT HANDLERS
  // ==========================================
  const [staffCategory, setStaffCategory] = useState<"leadership" | "teaching" | "non-teaching">("leadership");
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffRole, setNewStaffRole] = useState("");
  const [newStaffQual, setNewStaffQual] = useState("");
  const [newStaffImg, setNewStaffImg] = useState("");
  const [staffFileName, setStaffFileName] = useState("");

  const handleStaffFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStaffFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setNewStaffImg(event.target.result);
          showToast(`Loaded staff photo "${file.name}" from drive!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim() || !newStaffRole.trim()) {
      showToast("Please enter at least Name and Role!");
      return;
    }

    const member: StaffMember = {
      id: Date.now().toString(),
      name: newStaffName.trim(),
      role: newStaffRole.trim(),
      qual: newStaffQual.trim() || "-",
      img: newStaffImg.trim() || (staffCategory === "leadership" ? "/event-1.jpg" : undefined),
      category: staffCategory
    };

    if (staffCategory === "leadership") {
      const updated = [...leadership, member];
      setLeadership(updated);
      cmsStore.setLeadership(updated);
    } else if (staffCategory === "teaching") {
      const updated = [...teaching, member];
      setTeaching(updated);
      cmsStore.setTeaching(updated);
    } else {
      const updated = [...nonTeaching, member];
      setNonTeaching(updated);
      cmsStore.setNonTeaching(updated);
    }

    setNewStaffName("");
    setNewStaffRole("");
    setNewStaffQual("");
    setNewStaffImg("");
    setStaffFileName("");
    if (staffFileInputRef.current) {
      staffFileInputRef.current.value = "";
    }
    showToast(`Added ${member.name} to ${staffCategory} team!`);
  };

  const handleEditStaffFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingStaff) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setEditingStaff({ ...editingStaff, img: event.target.result });
          showToast(`Loaded photo "${file.name}" for ${editingStaff.name}!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEditStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff) return;

    // Helper updater
    const updateList = (list: StaffMember[]) =>
      list.map((m) => (m.id === editingStaff.id ? editingStaff : m));

    if (editingStaff.category === "leadership") {
      const updated = updateList(leadership);
      setLeadership(updated);
      cmsStore.setLeadership(updated);
    } else if (editingStaff.category === "teaching") {
      const updated = updateList(teaching);
      setTeaching(updated);
      cmsStore.setTeaching(updated);
    } else {
      const updated = updateList(nonTeaching);
      setNonTeaching(updated);
      cmsStore.setNonTeaching(updated);
    }

    showToast(`Updated details for ${editingStaff.name}!`);
    setEditingStaff(null);
  };

  const handleDeleteStaff = (id: string, category: "leadership" | "teaching" | "non-teaching") => {
    if (category === "leadership") {
      const updated = leadership.filter((s) => s.id !== id);
      setLeadership(updated);
      cmsStore.setLeadership(updated);
    } else if (category === "teaching") {
      const updated = teaching.filter((s) => s.id !== id);
      setTeaching(updated);
      cmsStore.setTeaching(updated);
    } else {
      const updated = nonTeaching.filter((s) => s.id !== id);
      setNonTeaching(updated);
      cmsStore.setNonTeaching(updated);
    }
    showToast("Staff member removed!");
  };

  // ==========================================
  // 5. SUPPORT & DONATIONS HANDLERS
  // ==========================================
  const handleSaveSupport = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.setSupport(support);
    showToast("Donations and bank details updated live!");
  };

  // ==========================================
  // 6. CONTACT & FOOTER HANDLERS
  // ==========================================
  const [newCpName, setNewCpName] = useState("");
  const [newCpRole, setNewCpRole] = useState("");
  const [newCpPhone, setNewCpPhone] = useState("");
  const [newCpEmail, setNewCpEmail] = useState("");
  const [newCpPhoto, setNewCpPhoto] = useState("");
  const [cpFileName, setCpFileName] = useState("");

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.setContact(contact);
    showToast("Contact details and footer updated!");
  };

  const handleCpFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCpFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setNewCpPhoto(event.target.result);
          showToast(`Selected photo "${file.name}" for contact person!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddContactPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCpName.trim() || !newCpPhone.trim()) {
      showToast("Please enter at least Contact Name and Phone Number!");
      return;
    }

    const newPerson: ContactPerson = {
      id: Date.now().toString(),
      name: newCpName.trim(),
      role: newCpRole.trim() || "Contact Person",
      phone: newCpPhone.trim(),
      email: newCpEmail.trim() || undefined,
      photo: newCpPhoto.trim() || undefined
    };

    const currentPersons = contact.persons && contact.persons.length > 0 ? contact.persons : defaultContactPersons;
    const updated = {
      ...contact,
      persons: [...currentPersons, newPerson]
    };

    setContact(updated);
    cmsStore.setContact(updated);
    setNewCpName("");
    setNewCpRole("");
    setNewCpPhone("");
    setNewCpEmail("");
    setNewCpPhoto("");
    setCpFileName("");
    if (cpFileInputRef.current) {
      cpFileInputRef.current.value = "";
    }
    showToast(`Added ${newPerson.name} under Contact Us!`);
  };

  const handleEditCpFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingContactPerson) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setEditingContactPerson({ ...editingContactPerson, photo: event.target.result });
          showToast(`Loaded replacement photo "${file.name}"!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEditContactPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContactPerson) return;
    const currentPersons = contact.persons && contact.persons.length > 0 ? contact.persons : defaultContactPersons;
    const updatedPersons = currentPersons.map((p) =>
      p.id === editingContactPerson.id ? editingContactPerson : p
    );
    const updated = { ...contact, persons: updatedPersons };
    setContact(updated);
    cmsStore.setContact(updated);
    setEditingContactPerson(null);
    showToast(`Updated details & photo for ${editingContactPerson.name}!`);
  };

  const handleDeleteContactPerson = (id: string) => {
    const currentPersons = contact.persons && contact.persons.length > 0 ? contact.persons : defaultContactPersons;
    const updatedPersons = currentPersons.filter((p) => p.id !== id);
    const updated = { ...contact, persons: updatedPersons };
    setContact(updated);
    cmsStore.setContact(updated);
    showToast("Contact person removed!");
  };

  // ==========================================
  // 7. HERO SECTION & SLIDESHOW HANDLERS
  // ==========================================
  const [newHeroImgUrl, setNewHeroImgUrl] = useState("");

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.setHero(hero);
    showToast("Hero banner and quotes updated live!");
  };

  const handleHeroFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          const updated = {
            ...hero,
            images: [event.target.result, ...(hero.images || [])]
          };
          setHero(updated);
          cmsStore.setHero(updated);
          showToast(`Added "${file.name}" to Hero background slideshow!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddHeroImgUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHeroImgUrl.trim()) return;
    const updated = {
      ...hero,
      images: [newHeroImgUrl.trim(), ...(hero.images || [])]
    };
    setHero(updated);
    cmsStore.setHero(updated);
    setNewHeroImgUrl("");
    showToast("Added image to Hero slideshow!");
  };

  const handleDeleteHeroImg = (index: number) => {
    const updatedImages = (hero.images || []).filter((_, idx) => idx !== index);
    const updated = { ...hero, images: updatedImages };
    setHero(updated);
    cmsStore.setHero(updated);
    showToast("Hero slide removed!");
  };

  // ==========================================
  // 8. NOTICES & POPUP HANDLERS
  // ==========================================
  const [newNoticeTag, setNewNoticeTag] = useState("NEW");
  const [newNoticeColor, setNewNoticeColor] = useState<NoticeBoardItem["tagColor"]>("orange");
  const [newNoticeText, setNewNoticeText] = useState("");

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeText.trim()) return;

    const item: NoticeBoardItem = {
      id: Date.now().toString(),
      tag: newNoticeTag.toUpperCase(),
      tagColor: newNoticeColor,
      text: newNoticeText.trim()
    };

    const updated = [item, ...notices];
    setNotices(updated);
    cmsStore.setNotices(updated);
    setNewNoticeText("");
    showToast("New Notice Board item added!");
  };

  const handleSaveEditNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice) return;
    const updated = notices.map((n) =>
      n.id === editingNotice.id ? editingNotice : n
    );
    setNotices(updated);
    cmsStore.setNotices(updated);
    setEditingNotice(null);
    showToast("Notice updated successfully!");
  };

  const handleDeleteNotice = (id: string) => {
    const updated = notices.filter((n) => n.id !== id);
    setNotices(updated);
    cmsStore.setNotices(updated);
    showToast("Notice deleted!");
  };

  const handleSavePopup = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.setPopup(popup);
    showToast("Popup modal notification settings updated!");
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white font-semibold px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-in slide-in-from-top-4">
          <CheckCircle className="w-6 h-6 text-emerald-200 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                Full Portal Access & Real-Time Management
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {hero.schoolTitle}
            </h2>
            <p className="text-amber-100 text-sm mt-1 max-w-xl">
              Add, modify, and edit all sections: About Us, Academics, Gallery Photos, Faculty & Staff, Support, Contact, and Notices!
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-bold px-5 py-3 rounded-2xl shadow-xl transition-all border border-amber-500/30 shrink-0"
          >
            <Globe className="w-5 h-5 text-emerald-400" />
            <span>Preview Live Site</span>
          </a>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-thin">
        {[
          { id: "about", label: "About Us", icon: BookOpen },
          { id: "academics", label: "Academics", icon: GraduationCap },
          { id: "gallery", label: "Gallery Photos", icon: ImageIcon },
          { id: "staff", label: "Staff & Faculty", icon: Users },
          { id: "support", label: "Support & Donations", icon: HeartHandshake },
          { id: "contact", label: "Contact & Footer", icon: PhoneCall },
          { id: "hero", label: "Hero & Slideshow", icon: Layers },
          { id: "notices", label: "Notices & Popup", icon: Bell }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm transition-all shrink-0 ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25 scale-105"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================== */}
      {/* 1. ABOUT US TAB */}
      {/* ========================================== */}
      {activeTab === "about" && (
        <div className="space-y-8 animate-in fade-in-50">
          {/* Section Heading Settings */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" />
              About Section Header
            </h3>
            <form onSubmit={handleSaveAboutMeta} className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Tag / Subtitle (e.g. &quot;Our Philosophy&quot;)
                </label>
                <input
                  type="text"
                  value={about.tag}
                  onChange={(e) => setAbout({ ...about, tag: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Main Section Heading
                </label>
                <input
                  type="text"
                  value={about.title}
                  onChange={(e) => setAbout({ ...about, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Section Titles</span>
              </button>
            </form>
          </div>

          {/* About Philosophy Cards */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-orange-500" />
              Add Core Value / Philosophy Card
            </h3>
            <form onSubmit={handleAddAboutCard} className="space-y-4 mb-8 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Card Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Quality Education, Holistic Growth..."
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Card Color Theme</label>
                  <select
                    value={newCardColor}
                    onChange={(e) => setNewCardColor(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="orange">Orange Theme</option>
                    <option value="red">Red Theme</option>
                    <option value="indigo">Indigo Theme</option>
                    <option value="emerald">Emerald Theme</option>
                    <option value="purple">Purple Theme</option>
                    <option value="blue">Blue Theme</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Description Paragraph</label>
                <textarea
                  rows={3}
                  placeholder="Explain the importance and philosophy for students..."
                  value={newCardDesc}
                  onChange={(e) => setNewCardDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Card to About Us</span>
              </button>
            </form>

            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
              Current Live About Cards ({about.cards.length}) - Click &quot;Edit&quot; to change any card
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {about.cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-orange-500/20 text-orange-400 mb-3 inline-block">
                      {card.color}
                    </span>
                    <h5 className="font-bold text-white text-lg mb-2">{card.title}</h5>
                    <p className="text-slate-400 text-xs leading-relaxed">{card.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => setEditingCard({ ...card })}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 py-2 rounded-lg border border-amber-500/20 transition-all font-semibold"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Card</span>
                    </button>
                    <button
                      onClick={() => handleDeleteAboutCard(card.id)}
                      className="flex items-center justify-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-2 rounded-lg border border-rose-500/20 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. ACADEMICS TAB */}
      {/* ========================================== */}
      {activeTab === "academics" && (
        <div className="space-y-8 animate-in fade-in-50">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-orange-500" />
              Academics & Curriculum Overview
            </h3>

            <form onSubmit={handleSaveAcademics} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Section Tag (e.g. &quot;Curriculum&quot;)
                  </label>
                  <input
                    type="text"
                    value={academics.tag}
                    onChange={(e) => setAcademics({ ...academics, tag: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={academics.title}
                    onChange={(e) => setAcademics({ ...academics, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Curriculum Description
                </label>
                <textarea
                  rows={3}
                  value={academics.description}
                  onChange={(e) => setAcademics({ ...academics, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Academic Image Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Academic Section Image (Upload from drive or enter URL)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <input
                    type="file"
                    ref={academicsFileInputRef}
                    onChange={handleAcademicsFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => academicsFileInputRef.current?.click()}
                    className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-5 py-3 rounded-xl border border-slate-700 flex items-center justify-center gap-2 shadow"
                  >
                    <FolderOpen className="w-4 h-4" />
                    <span>Choose Image from Laptop Drive</span>
                  </button>
                  <input
                    type="text"
                    placeholder="Or enter image URL (e.g. /event-1.jpg)"
                    value={academics.image}
                    onChange={(e) => setAcademics({ ...academics, image: e.target.value })}
                    className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                {academics.image && (
                  <div className="mt-3">
                    <img
                      src={academics.image}
                      alt="Academic Preview"
                      className="h-32 rounded-xl object-cover border border-slate-700"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Academics Details</span>
              </button>
            </form>
          </div>

          {/* Program Bullet Points Manager */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4">
              Academic Program Highlights
            </h3>
            <form onSubmit={handleAddProgram} className="flex gap-3 mb-6">
              <input
                type="text"
                placeholder="e.g. Pre-Primary & Nursery Education, Robotics Lab..."
                value={newProgramText}
                onChange={(e) => setNewProgramText(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shrink-0 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Point</span>
              </button>
            </form>

            <div className="space-y-2">
              {academics.programs.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3"
                >
                  <span className="text-slate-200 font-medium text-sm flex items-center gap-2">
                    <span className="text-orange-400 font-bold">✓</span> {item.text}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingProgram({ ...item })}
                      className="text-amber-400 hover:text-amber-300 p-1.5 rounded-lg hover:bg-amber-500/10"
                      title="Edit point"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProgram(item.id)}
                      className="text-rose-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-500/10"
                      title="Delete point"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. GALLERY PHOTOS TAB */}
      {/* ========================================== */}
      {activeTab === "gallery" && (
        <div className="space-y-8 animate-in fade-in-50">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-orange-500" />
              Upload & Add Photos to Gallery
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Pick photos directly from your computer / laptop drive or provide an image link. Click &quot;Edit&quot; on any photo below to update its caption or change its picture.
            </p>

            <form onSubmit={handleAddPhoto} className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              {/* Drive File Picker */}
              <div className="p-6 bg-slate-900/60 rounded-2xl border-2 border-dashed border-slate-700 text-center hover:border-orange-500 transition-colors">
                <input
                  type="file"
                  ref={galleryFileInputRef}
                  onChange={handleGalleryFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => galleryFileInputRef.current?.click()}
                  className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-xl flex items-center gap-3 mx-auto transition-all transform hover:scale-105"
                >
                  <FolderOpen className="w-5 h-5 text-yellow-200" />
                  <span>Choose Photo From Your Laptop / PC</span>
                </button>
                <p className="text-xs text-slate-400 mt-3">
                  Supports JPG, PNG, WEBP, JPEG images from local folders
                </p>
                {galleryFileName && (
                  <p className="text-xs font-semibold text-emerald-400 mt-2 bg-emerald-950/40 py-1.5 px-3 rounded-lg inline-block border border-emerald-500/30">
                    Selected Drive File: {galleryFileName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Photo Title / Event Caption
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Science Fair, Sports Meet, Republic Day..."
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Direct Image URL (Optional if picked from drive)
                  </label>
                  <input
                    type="text"
                    placeholder="https://... or /event-1.jpg"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-sm font-mono truncate"
                  />
                </div>
              </div>

              {newPhotoUrl && (
                <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <img
                    src={newPhotoUrl}
                    alt="Preview"
                    className="w-20 h-20 rounded-xl object-cover border border-amber-500/40"
                  />
                  <div>
                    <p className="text-sm font-bold text-white">Preview Ready</p>
                    <p className="text-xs text-slate-400">Click Publish Photo below to push to website!</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all text-base"
              >
                <Plus className="w-5 h-5" />
                <span>Publish Photo to Live Gallery</span>
              </button>
            </form>

            {/* Gallery Grid */}
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-10 mb-4">
              Live Photos in Gallery ({gallery.length}) - Hover or click &quot;Edit&quot; to change
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {gallery.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-md flex flex-col"
                >
                  <div className="aspect-square w-full overflow-hidden bg-slate-900 relative">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 bg-slate-950 flex items-center justify-between gap-2 border-t border-slate-800/80">
                    <p className="text-xs font-bold text-white truncate flex-1" title={photo.title}>
                      {photo.title}
                    </p>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => setEditingPhoto({ ...photo })}
                        className="text-amber-400 hover:text-amber-300 p-1.5 rounded-lg hover:bg-amber-500/10"
                        title="Edit caption or replace image"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeletePhoto(photo.id)}
                        className="text-rose-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-500/10"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. STAFF & FACULTY TAB */}
      {/* ========================================== */}
      {activeTab === "staff" && (
        <div className="space-y-8 animate-in fade-in-50">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              Staff & Faculty Management
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Add new staff members or click &quot;Edit&quot; on any existing member to modify their Name, Designation, Qualification, or Photo.
            </p>

            {/* Add Staff Form */}
            <form onSubmit={handleAddStaff} className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Team Category</label>
                  <select
                    value={staffCategory}
                    onChange={(e) => setStaffCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 font-medium"
                  >
                    <option value="leadership">Leadership Team</option>
                    <option value="teaching">Teaching Faculty</option>
                    <option value="non-teaching">Non-Teaching Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Smt. K. Divya"
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Designation / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Head Master, Math Teacher..."
                    value={newStaffRole}
                    onChange={(e) => setNewStaffRole(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Qualification</label>
                  <input
                    type="text"
                    placeholder="e.g. MSc., B.Ed. / MA"
                    value={newStaffQual}
                    onChange={(e) => setNewStaffQual(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Photo (for Leadership)</label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={staffFileInputRef}
                      onChange={handleStaffFileSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => staffFileInputRef.current?.click()}
                      className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-4 py-3 rounded-xl border border-slate-700 text-xs shrink-0"
                    >
                      Pick From Drive
                    </button>
                    <input
                      type="text"
                      placeholder="Or URL / /event-1.jpg"
                      value={newStaffImg}
                      onChange={(e) => setNewStaffImg(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-xs truncate"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Member</span>
              </button>
            </form>

            {/* List by Categories */}
            <div className="space-y-8">
              {/* 1. Leadership Team */}
              <div>
                <h4 className="text-base font-bold text-amber-400 mb-4 border-b border-slate-800 pb-2">
                  1. Leadership Team ({leadership.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {leadership.map((s) => (
                    <div key={s.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <img
                          src={s.img || "/event-1.jpg"}
                          alt={s.name}
                          className="w-full h-36 object-cover rounded-xl mb-3"
                        />
                        <h5 className="font-bold text-white text-sm">{s.name}</h5>
                        <p className="text-orange-400 text-xs font-semibold">{s.role}</p>
                        <p className="text-slate-400 text-[11px] mt-1">{s.qual}</p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800 flex items-center gap-2">
                        <button
                          onClick={() => setEditingStaff({ ...s })}
                          className="flex-1 flex items-center justify-center gap-1 text-xs text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 py-1.5 rounded-lg border border-amber-500/20 font-semibold"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteStaff(s.id, "leadership")}
                          className="text-xs text-rose-400 hover:text-rose-300 p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Teaching Faculty */}
              <div>
                <h4 className="text-base font-bold text-amber-400 mb-4 border-b border-slate-800 pb-2">
                  2. Teaching Faculty ({teaching.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {teaching.map((s) => (
                    <div key={s.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h5 className="font-bold text-white text-sm truncate">{s.name}</h5>
                        <p className="text-orange-400 text-xs truncate">{s.role}</p>
                        <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded mt-1 inline-block border border-slate-800">
                          {s.qual}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setEditingStaff({ ...s })}
                          className="text-amber-400 hover:text-amber-300 p-1.5 rounded-lg hover:bg-amber-500/10"
                          title="Edit staff details"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStaff(s.id, "teaching")}
                          className="text-rose-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Non-Teaching Staff */}
              <div>
                <h4 className="text-base font-bold text-amber-400 mb-4 border-b border-slate-800 pb-2">
                  3. Non-Teaching Staff ({nonTeaching.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {nonTeaching.map((s) => (
                    <div key={s.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h5 className="font-bold text-white text-sm truncate">{s.name}</h5>
                        <p className="text-slate-300 text-xs truncate">{s.role}</p>
                        {s.qual !== "-" && (
                          <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded mt-1 inline-block border border-slate-800">
                            {s.qual}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setEditingStaff({ ...s })}
                          className="text-amber-400 hover:text-amber-300 p-1.5 rounded-lg hover:bg-amber-500/10"
                          title="Edit staff details"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStaff(s.id, "non-teaching")}
                          className="text-rose-400 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 5. SUPPORT & DONATIONS TAB */}
      {/* ========================================== */}
      {activeTab === "support" && (
        <div className="space-y-8 animate-in fade-in-50">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 max-w-3xl">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-orange-500" />
              Online Donations & Bank Account Settings
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Update school official banking and donation details visible to patrons.
            </p>

            <form onSubmit={handleSaveSupport} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Section Tag</label>
                  <input
                    type="text"
                    value={support.tag}
                    onChange={(e) => setSupport({ ...support, tag: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Section Title</label>
                  <input
                    type="text"
                    value={support.title}
                    onChange={(e) => setSupport({ ...support, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Beneficiary School Name</label>
                <input
                  type="text"
                  value={support.schoolName}
                  onChange={(e) => setSupport({ ...support, schoolName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={support.bankName}
                    onChange={(e) => setSupport({ ...support, bankName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Account Number</label>
                  <input
                    type="text"
                    value={support.accountNumber}
                    onChange={(e) => setSupport({ ...support, accountNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={support.ifsc}
                    onChange={(e) => setSupport({ ...support, ifsc: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Donation Details</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 6. CONTACT & FOOTER TAB */}
      {/* ========================================== */}
      {activeTab === "contact" && (
        <div className="space-y-8 animate-in fade-in-50">
          {/* Key Contact Persons Management */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  Key Contact Persons (Under Contact Us)
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Manage leadership contacts displayed prominently in the Contact Us section (e.g., Principal, Administrator).
                </p>
              </div>
            </div>

            {/* List of Current Contact Persons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {(contact.persons && contact.persons.length > 0 ? contact.persons : defaultContactPersons).map((p) => (
                <div
                  key={p.id}
                  className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition flex items-start gap-4"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center">
                    {p.photo ? (
                      <img src={p.photo} alt={p.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <span className="text-orange-400 font-black text-xl">{p.name.charAt(0)}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold bg-orange-950 text-orange-400 px-2.5 py-0.5 rounded-full border border-orange-800/60 uppercase">
                        {p.role}
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-base mt-1 truncate">{p.name}</h4>
                    <p className="text-slate-300 font-mono text-sm font-semibold mt-0.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-orange-400" />
                      {p.phone}
                    </p>
                    {p.email && (
                      <p className="text-slate-400 text-xs truncate mt-0.5">{p.email}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingContactPerson(p)}
                      className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition"
                      title="Edit Contact Person"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteContactPerson(p.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
                      title="Delete Contact Person"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Contact Person Form */}
            <div className="pt-6 border-t border-slate-800">
              <h4 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add New Key Contact Person
              </h4>

              <form onSubmit={handleAddContactPerson} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. N. Tandava Krishna"
                      value={newCpName}
                      onChange={(e) => setNewCpName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Role / Designation *</label>
                    <input
                      type="text"
                      placeholder="e.g. Principal / Administrator"
                      value={newCpRole}
                      onChange={(e) => setNewCpRole(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number *</label>
                    <input
                      type="text"
                      placeholder="e.g. 9490 300 642"
                      value={newCpPhone}
                      onChange={(e) => setNewCpPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. school@gmail.com"
                      value={newCpEmail}
                      onChange={(e) => setNewCpEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Photo (Pick from Device/Drive or paste URL)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={cpFileInputRef}
                        onChange={handleCpFileSelect}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => cpFileInputRef.current?.click()}
                        className="bg-slate-800 hover:bg-slate-700 text-orange-400 font-bold px-4 py-3 rounded-xl border border-slate-700 text-xs shrink-0"
                      >
                        Pick Photo
                      </button>
                      <input
                        type="text"
                        placeholder="Or image URL (e.g. /tandava-krishna.jpg)"
                        value={newCpPhoto}
                        onChange={(e) => setNewCpPhoto(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 text-xs truncate"
                      />
                    </div>
                  </div>
                </div>

                {newCpPhoto && (
                  <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 max-w-sm">
                    <img src={newCpPhoto} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />
                    <span className="text-xs text-slate-300">Photo preview loaded</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Key Contact Person</span>
                </button>
              </form>
            </div>
          </div>

          {/* General Contact Info & Footer Settings */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-orange-500" />
              General School Contact & Footer Info
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Update general school phone number, email address, physical location, and footer quote.
            </p>

            <form onSubmit={handleSaveContact} className="space-y-4 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Section Tag Badge</label>
                  <input
                    type="text"
                    value={contact.tag || "Contact Us"}
                    onChange={(e) => setContact({ ...contact, tag: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Section Title</label>
                  <input
                    type="text"
                    value={contact.title || "Get in Touch With Us"}
                    onChange={(e) => setContact({ ...contact, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">General Office Phone</label>
                  <input
                    type="text"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">General Office Email</label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Campus Physical Address</label>
                <textarea
                  rows={2}
                  value={contact.address}
                  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Footer About Quote / Text</label>
                <textarea
                  rows={3}
                  value={contact.footerAbout}
                  onChange={(e) => setContact({ ...contact, footerAbout: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Contact Details</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 7. HERO & SLIDESHOW TAB */}
      {/* ========================================== */}
      {activeTab === "hero" && (
        <div className="space-y-8 animate-in fade-in-50">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-orange-500" />
              Hero Banner, Titles & Quotes
            </h3>
            <form onSubmit={handleSaveHero} className="space-y-4 max-w-3xl">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Admissions Tag Badge
                </label>
                <input
                  type="text"
                  value={hero.admissionsTag}
                  onChange={(e) => setHero({ ...hero, admissionsTag: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  School Display Title
                </label>
                <input
                  type="text"
                  value={hero.schoolTitle}
                  onChange={(e) => setHero({ ...hero, schoolTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Hero Slogan / Highlight Quote
                </label>
                <input
                  type="text"
                  value={hero.sloganQuote}
                  onChange={(e) => setHero({ ...hero, sloganQuote: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Hero Subtitle Paragraph
                </label>
                <textarea
                  rows={3}
                  value={hero.description}
                  onChange={(e) => setHero({ ...hero, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Hero Text</span>
              </button>
            </form>
          </div>

          {/* Hero Carousel Slideshow Manager */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-2">
              Hero Background Slideshow Images
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Add photos from laptop drive or web URLs to cycle in the animated hero background.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <input
                type="file"
                ref={heroFileInputRef}
                onChange={handleHeroFileSelect}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => heroFileInputRef.current?.click()}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow"
              >
                <FolderOpen className="w-4 h-4" />
                <span>Pick Slide Image from Laptop Drive</span>
              </button>
              <form onSubmit={handleAddHeroImgUrl} className="flex-1 w-full flex gap-2">
                <input
                  type="text"
                  placeholder="Or enter image URL..."
                  value={newHeroImgUrl}
                  onChange={(e) => setNewHeroImgUrl(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl shadow shrink-0 text-sm"
                >
                  Add URL
                </button>
              </form>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(hero.images || []).map((imgUrl, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border border-slate-800 group aspect-video bg-slate-950">
                  <img src={imgUrl} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleDeleteHeroImg(idx)}
                      className="bg-rose-600 hover:bg-rose-500 text-white p-2 rounded-xl"
                      title="Remove slide"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] bg-black/80 text-white px-2 py-0.5 rounded">
                    Slide {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 8. NOTICES & POPUP TAB */}
      {/* ========================================== */}
      {activeTab === "notices" && (
        <div className="space-y-8 animate-in fade-in-50">
          {/* Popup Modal Control */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-500" />
                Website Popup Modal Notification
              </h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={popup.enabled}
                  onChange={(e) => setPopup({ ...popup, enabled: e.target.checked })}
                  className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
                />
                <span className="text-sm font-bold text-white">Enable on Main Site</span>
              </label>
            </div>

            <form onSubmit={handleSavePopup} className="space-y-4 max-w-2xl">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Popup Title</label>
                <input
                  type="text"
                  value={popup.title}
                  onChange={(e) => setPopup({ ...popup, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Popup Text Announcement</label>
                <textarea
                  rows={3}
                  value={popup.text}
                  onChange={(e) => setPopup({ ...popup, text: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Popup Notification</span>
              </button>
            </form>
          </div>

          {/* Notice Board Items */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-orange-500" />
              Notice Board Scrolling Items
            </h3>

            <form onSubmit={handleAddNotice} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 mb-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Tag Label</label>
                  <input
                    type="text"
                    placeholder="e.g. NEW, SPORTS, EXAM, HOLIDAY..."
                    value={newNoticeTag}
                    onChange={(e) => setNewNoticeTag(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Tag Color</label>
                  <select
                    value={newNoticeColor}
                    onChange={(e) => setNewNoticeColor(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="orange">Orange Badge</option>
                    <option value="blue">Blue Badge</option>
                    <option value="green">Green Badge</option>
                    <option value="purple">Purple Badge</option>
                    <option value="red">Red Badge</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Notice Message Text</label>
                <input
                  type="text"
                  placeholder="e.g. Science exhibition registration closes on Friday at 4 PM."
                  value={newNoticeText}
                  onChange={(e) => setNewNoticeText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Notice to Board</span>
              </button>
            </form>

            <div className="space-y-3">
              {notices.map((n) => (
                <div
                  key={n.id}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shrink-0 ${
                        n.tagColor === "orange" ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" :
                        n.tagColor === "blue" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                        n.tagColor === "green" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                        n.tagColor === "purple" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" :
                        "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {n.tag}
                    </span>
                    <p className="text-sm font-medium text-slate-200 truncate">{n.text}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setEditingNotice({ ...n })}
                      className="text-amber-400 hover:text-amber-300 p-2 rounded-lg hover:bg-amber-500/10"
                      title="Edit notice"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNotice(n.id)}
                      className="text-rose-400 hover:text-rose-300 p-2 rounded-lg hover:bg-rose-500/10"
                      title="Delete notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT MODALS FOR ALL SECTIONS */}
      {/* ========================================================================= */}

      {/* 1. EDIT STAFF MODAL */}
      {editingStaff && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                Edit Staff Member
              </h3>
              <button
                onClick={() => setEditingStaff(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditStaff} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingStaff.name}
                  onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Designation / Role</label>
                  <input
                    type="text"
                    value={editingStaff.role}
                    onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Qualification</label>
                  <input
                    type="text"
                    value={editingStaff.qual}
                    onChange={(e) => setEditingStaff({ ...editingStaff, qual: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {editingStaff.category === "leadership" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Photo (Upload new from drive or URL)</label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={editStaffFileInputRef}
                      onChange={handleEditStaffFileSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => editStaffFileInputRef.current?.click()}
                      className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-4 py-3 rounded-xl border border-slate-700 text-xs shrink-0"
                    >
                      Pick From Drive
                    </button>
                    <input
                      type="text"
                      value={editingStaff.img || ""}
                      onChange={(e) => setEditingStaff({ ...editingStaff, img: e.target.value })}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 text-xs truncate"
                    />
                  </div>
                  {editingStaff.img && (
                    <img
                      src={editingStaff.img}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-xl mt-3 border border-slate-700"
                    />
                  )}
                </div>
              )}

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingStaff(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl shadow-lg transition-all text-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. EDIT GALLERY PHOTO MODAL */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                Edit Gallery Photo
              </h3>
              <button
                onClick={() => setEditingPhoto(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Photo Title / Caption</label>
                <input
                  type="text"
                  value={editingPhoto.title}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Replace Image (from laptop drive or URL)</label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={editGalleryFileInputRef}
                    onChange={handleEditGalleryFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => editGalleryFileInputRef.current?.click()}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-4 py-3 rounded-xl border border-slate-700 text-xs shrink-0"
                  >
                    Pick New From Drive
                  </button>
                  <input
                    type="text"
                    value={editingPhoto.url}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, url: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 text-xs truncate"
                  />
                </div>
                {editingPhoto.url && (
                  <img
                    src={editingPhoto.url}
                    alt="Preview"
                    className="w-full h-36 object-cover rounded-xl mt-3 border border-slate-700"
                  />
                )}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl shadow-lg transition-all text-sm"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. EDIT ABOUT CARD MODAL */}
      {editingCard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                Edit Philosophy Card
              </h3>
              <button
                onClick={() => setEditingCard(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditAboutCard} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Card Title</label>
                <input
                  type="text"
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Theme Color</label>
                <select
                  value={editingCard.color}
                  onChange={(e) => setEditingCard({ ...editingCard, color: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="orange">Orange Theme</option>
                  <option value="red">Red Theme</option>
                  <option value="indigo">Indigo Theme</option>
                  <option value="emerald">Emerald Theme</option>
                  <option value="purple">Purple Theme</option>
                  <option value="blue">Blue Theme</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Description Paragraph</label>
                <textarea
                  rows={4}
                  value={editingCard.description}
                  onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl shadow-lg transition-all text-sm"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. EDIT ACADEMIC PROGRAM MODAL */}
      {editingProgram && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                Edit Academic Program Point
              </h3>
              <button
                onClick={() => setEditingProgram(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditProgram} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Highlight Point Text</label>
                <input
                  type="text"
                  value={editingProgram.text}
                  onChange={(e) => setEditingProgram({ ...editingProgram, text: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProgram(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl shadow-lg transition-all text-sm"
                >
                  Save Point
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. EDIT NOTICE MODAL */}
      {editingNotice && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                Edit Notice Item
              </h3>
              <button
                onClick={() => setEditingNotice(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditNotice} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Tag Label</label>
                  <input
                    type="text"
                    value={editingNotice.tag}
                    onChange={(e) => setEditingNotice({ ...editingNotice, tag: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Tag Color</label>
                  <select
                    value={editingNotice.tagColor}
                    onChange={(e) => setEditingNotice({ ...editingNotice, tagColor: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="orange">Orange Badge</option>
                    <option value="blue">Blue Badge</option>
                    <option value="green">Green Badge</option>
                    <option value="purple">Purple Badge</option>
                    <option value="red">Red Badge</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Notice Message Text</label>
                <textarea
                  rows={3}
                  value={editingNotice.text}
                  onChange={(e) => setEditingNotice({ ...editingNotice, text: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingNotice(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl shadow-lg transition-all text-sm"
                >
                  Save Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. EDIT CONTACT PERSON MODAL */}
      {editingContactPerson && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                Edit Key Contact Person
              </h3>
              <button
                onClick={() => setEditingContactPerson(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditContactPerson} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={editingContactPerson.name}
                  onChange={(e) => setEditingContactPerson({ ...editingContactPerson, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Role / Designation *</label>
                  <input
                    type="text"
                    value={editingContactPerson.role}
                    onChange={(e) => setEditingContactPerson({ ...editingContactPerson, role: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    value={editingContactPerson.phone}
                    onChange={(e) => setEditingContactPerson({ ...editingContactPerson, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  value={editingContactPerson.email || ""}
                  onChange={(e) => setEditingContactPerson({ ...editingContactPerson, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Change Photo (Upload from Device or enter URL)
                </label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={editCpFileInputRef}
                    onChange={handleEditCpFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => editCpFileInputRef.current?.click()}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-4 py-3 rounded-xl border border-slate-700 text-xs shrink-0"
                  >
                    Pick New Photo
                  </button>
                  <input
                    type="text"
                    value={editingContactPerson.photo || ""}
                    onChange={(e) => setEditingContactPerson({ ...editingContactPerson, photo: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 text-xs truncate"
                    placeholder="Image URL"
                  />
                </div>
                {editingContactPerson.photo && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={editingContactPerson.photo}
                      alt="Preview"
                      className="w-16 h-16 rounded-xl object-cover object-top border border-slate-700"
                    />
                    <span className="text-xs text-slate-400">Current photo preview</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingContactPerson(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl shadow-lg transition-all text-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
