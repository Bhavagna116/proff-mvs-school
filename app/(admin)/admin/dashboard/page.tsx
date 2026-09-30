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
  X
} from "lucide-react";
import {
  cmsStore,
  NoticeBoardItem,
  PopupNotice,
  GalleryPhoto,
  StaffMember,
  SchoolSettings
} from "@/lib/cms-store";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"notices" | "popup" | "gallery" | "staff" | "settings">("notices");

  // State loaded from cmsStore
  const [notices, setNotices] = useState<NoticeBoardItem[]>([]);
  const [popup, setPopup] = useState<PopupNotice>({ enabled: true, title: "", text: "" });
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [leadership, setLeadership] = useState<StaffMember[]>([]);
  const [teaching, setTeaching] = useState<StaffMember[]>([]);
  const [nonTeaching, setNonTeaching] = useState<StaffMember[]>([]);
  const [settings, setSettings] = useState<SchoolSettings>({
    admissionsTag: "",
    heroQuote: "",
    phone: "",
    email: "",
    address: "",
    bankAccount: "",
    ifsc: ""
  });

  const [toastMsg, setToastMsg] = useState("");

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 4000);
  };

  // File input refs for laptop drive picking
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const staffFileInputRef = useRef<HTMLInputElement>(null);

  // Load from store on mount
  useEffect(() => {
    setNotices(cmsStore.getNotices());
    setPopup(cmsStore.getPopup());
    setGallery(cmsStore.getGallery());
    setLeadership(cmsStore.getLeadership());
    setTeaching(cmsStore.getTeaching());
    setNonTeaching(cmsStore.getNonTeaching());
    setSettings(cmsStore.getSettings());
  }, []);

  // --- NOTICE BOARD HANDLERS ---
  const [newNoticeTag, setNewNoticeTag] = useState("NEW");
  const [newNoticeColor, setNewNoticeColor] = useState<"orange" | "blue" | "green" | "purple" | "red">("orange");
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
    showToast("New Notice Board item added and published to site!");
  };

  const handleDeleteNotice = (id: string) => {
    const updated = notices.filter((n) => n.id !== id);
    setNotices(updated);
    cmsStore.setNotices(updated);
    showToast("Notice deleted!");
  };

  // --- POPUP NOTIFICATION HANDLERS ---
  const handleSavePopup = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.setPopup(popup);
    showToast("Website Popup notification updated successfully!");
  };

  // --- GALLERY HANDLERS ---
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
            // Auto name title from file basename
            const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
            setNewPhotoTitle(nameWithoutExt);
          }
          showToast(`Selected "${file.name}" from your laptop drive!`);
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
    if (galleryFileInputRef.current) galleryFileInputRef.current.value = "";
    showToast("New photo added to Gallery & Hero background carousel!");
  };

  const handleDeletePhoto = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    cmsStore.setGallery(updated);
    showToast("Photo removed from gallery!");
  };

  // --- STAFF HANDLERS ---
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
          showToast(`Selected staff photo "${file.name}" from drive!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim() || !newStaffRole.trim()) return;

    const newMember: StaffMember = {
      id: Date.now().toString(),
      name: newStaffName.trim(),
      role: newStaffRole.trim(),
      qual: newStaffQual.trim() || "-",
      img: newStaffImg.trim() || undefined,
      category: staffCategory
    };

    if (staffCategory === "leadership") {
      const updated = [...leadership, newMember];
      setLeadership(updated);
      cmsStore.setLeadership(updated);
    } else if (staffCategory === "teaching") {
      const updated = [...teaching, newMember];
      setTeaching(updated);
      cmsStore.setTeaching(updated);
    } else {
      const updated = [...nonTeaching, newMember];
      setNonTeaching(updated);
      cmsStore.setNonTeaching(updated);
    }

    setNewStaffName("");
    setNewStaffRole("");
    setNewStaffQual("");
    setNewStaffImg("");
    setStaffFileName("");
    if (staffFileInputRef.current) staffFileInputRef.current.value = "";
    showToast(`Added ${newMember.name} to ${staffCategory} staff roster!`);
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
    showToast("Staff member removed.");
  };

  // --- SETTINGS HANDLERS ---
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.setSettings(settings);
    showToast("General School Settings & Contact details updated!");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hidden File Inputs for laptop drive uploads */}
      <input
        type="file"
        ref={galleryFileInputRef}
        onChange={handleGalleryFileSelect}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={staffFileInputRef}
        onChange={handleStaffFileSelect}
        accept="image/*"
        className="hidden"
      />

      {/* Admin Top Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                Complete Content Control Center
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Prof. MVS Koteswara Rao Memorial School
            </h2>
            <p className="text-amber-100 text-sm mt-1 max-w-xl">
              Any changes made here immediately sync live to the main website!
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

      {/* Dynamic Toast Feedback */}
      {toastMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-semibold">{toastMsg}</p>
        </div>
      )}

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap border-b border-slate-800 gap-2 sm:gap-4">
        <button
          onClick={() => setActiveTab("notices")}
          className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "notices"
              ? "border-amber-500 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Notice Board ({notices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("popup")}
          className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "popup"
              ? "border-amber-500 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Pop-up Notification</span>
        </button>

        <button
          onClick={() => setActiveTab("gallery")}
          className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "gallery"
              ? "border-amber-500 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Gallery & Carousel ({gallery.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("staff")}
          className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "staff"
              ? "border-amber-500 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Staff & Leadership ({leadership.length + teaching.length + nonTeaching.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`pb-3 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "settings"
              ? "border-amber-500 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>School Contact & Info</span>
        </button>
      </div>

      {/* TAB 1: NOTICE BOARD */}
      {activeTab === "notices" && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              Add Item to Live Notice Board
            </h3>
            <form onSubmit={handleAddNotice} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Tag Label</label>
                <input
                  type="text"
                  placeholder="e.g. NEW, SPORTS, ACADEMICS"
                  value={newNoticeTag}
                  onChange={(e) => setNewNoticeTag(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Tag Color</label>
                <select
                  value={newNoticeColor}
                  onChange={(e: any) => setNewNoticeColor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="orange">Orange (Default)</option>
                  <option value="blue">Blue (Sports)</option>
                  <option value="green">Green (Academics)</option>
                  <option value="purple">Purple (Events)</option>
                  <option value="red">Red (Urgent)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 mb-1">Notice Description</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter notice content..."
                    value={newNoticeText}
                    onChange={(e) => setNewNoticeText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-5 rounded-xl transition-all shrink-0 text-sm flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Current Notice Board Items</h3>
            </div>
            <div className="divide-y divide-slate-800">
              {notices.map((n) => (
                <div key={n.id} className="p-4 sm:p-6 flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 ${
                      n.tagColor === "orange" ? "text-orange-400" :
                      n.tagColor === "blue" ? "text-blue-400" :
                      n.tagColor === "green" ? "text-emerald-400" :
                      n.tagColor === "purple" ? "text-purple-400" : "text-rose-400"
                    }`}>
                      {n.tag}
                    </span>
                    <p className="text-sm font-medium text-slate-200">{n.text}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteNotice(n.id)}
                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: POPUP NOTIFICATION */}
      {activeTab === "popup" && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Bell className="w-6 h-6 text-amber-400" />
              Website Pop-up Announcement Settings
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              This floating notification appears in the bottom right corner of the website.
            </p>
          </div>

          <form onSubmit={handleSavePopup} className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <input
                type="checkbox"
                id="popupEnabled"
                checked={popup.enabled}
                onChange={(e) => setPopup({ ...popup, enabled: e.target.checked })}
                className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
              />
              <label htmlFor="popupEnabled" className="text-sm font-bold text-white cursor-pointer">
                Enable Pop-up Notification on Main Website
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Pop-up Header Title</label>
              <input
                type="text"
                value={popup.title}
                onChange={(e) => setPopup({ ...popup, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-amber-500"
                placeholder="e.g. Campus Update"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Pop-up Announcement Message</label>
              <textarea
                rows={4}
                value={popup.text}
                onChange={(e) => setPopup({ ...popup, text: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-amber-500 leading-relaxed"
                placeholder="Enter detailed notification content..."
                required
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
            >
              <Save className="w-5 h-5" /> Save & Broadcast Popup
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: GALLERY & HERO CAROUSEL */}
      {activeTab === "gallery" && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-400" />
                  Add New Photo to Gallery & Hero Background Carousel
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select an image directly from your laptop drive or type a photo URL.
                </p>
              </div>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Method 1: Upload from Drive */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FolderOpen className="w-4 h-4" /> Option 1: Choose from Laptop Drive
                  </label>

                  <button
                    type="button"
                    onClick={() => galleryFileInputRef.current?.click()}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold p-4 rounded-xl text-sm flex items-center justify-center gap-3 transition-all shadow-lg border border-amber-400/30"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Select Photo File from Laptop</span>
                  </button>

                  {galleryFileName && (
                    <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 text-xs text-emerald-400">
                      <FileImage className="w-4 h-4 shrink-0" />
                      <span className="truncate font-mono">{galleryFileName}</span>
                    </div>
                  )}
                </div>

                {/* Method 2: Image URL / File Path */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-400" /> Option 2: Image URL or Relative Path
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. /event-1.jpg or https://..."
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                  <p className="text-[11px] text-slate-500">
                    You can select from laptop drive above OR paste a direct URL here.
                  </p>
                </div>
              </div>

              {/* Photo Title & Submit */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Event / Photo Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Annual Sports Meet 2026"
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:opacity-90 text-white font-bold p-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <Plus className="w-5 h-5" /> Add Photo to Gallery
                </button>
              </div>

              {/* Instant Image Preview */}
              {newPhotoUrl && (
                <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 flex items-center gap-4 animate-in fade-in">
                  <div className="w-24 h-24 bg-slate-800 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                    <img src={newPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-amber-400">Photo Loaded & Ready!</p>
                    <p className="text-sm font-semibold text-white truncate mt-0.5">{newPhotoTitle || "Untitled Photo"}</p>
                    <p className="text-[11px] text-slate-500 font-mono truncate mt-1">
                      {newPhotoUrl.startsWith("data:") ? "Local File (Base64)" : newPhotoUrl}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setNewPhotoUrl(""); setGalleryFileName(""); }}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Current Gallery Photos ({gallery.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {gallery.map((g) => (
                <div key={g.id} className="bg-slate-950 rounded-2xl border border-slate-800 p-3 space-y-2 group">
                  <div className="h-36 bg-slate-800 rounded-xl overflow-hidden relative">
                    <img src={g.url} alt={g.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-bold text-slate-200 truncate max-w-[130px]">{g.title}</span>
                    <button
                      onClick={() => handleDeletePhoto(g.id)}
                      className="text-rose-400 hover:text-rose-300 p-1"
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

      {/* TAB 4: STAFF MANAGEMENT */}
      {activeTab === "staff" && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              Add New Staff / Leadership Member
            </h3>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Category</label>
                  <select
                    value={staffCategory}
                    onChange={(e: any) => setStaffCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="leadership">Leadership Team</option>
                    <option value="teaching">Teaching Faculty</option>
                    <option value="non-teaching">Non-Teaching Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. N. Tandava Krishna"
                    value={newStaffName}
                    onChange={(e) => setNewStaffName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Designation / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Secretary & Correspondent"
                    value={newStaffRole}
                    onChange={(e) => setNewStaffRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Qualification</label>
                  <input
                    type="text"
                    placeholder="e.g. MA, B.Ed."
                    value={newStaffQual}
                    onChange={(e) => setNewStaffQual(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Staff Photo Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end pt-2">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 mb-1">Staff Photo (Select from Drive or enter URL)</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => staffFileInputRef.current?.click()}
                      className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold px-4 py-3 rounded-xl text-xs flex items-center gap-2 shrink-0"
                    >
                      <FolderOpen className="w-4 h-4" /> Pick from Drive
                    </button>
                    <input
                      type="text"
                      placeholder="Or enter photo URL / path..."
                      value={newStaffImg}
                      onChange={(e) => setNewStaffImg(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Staff Member
                </button>
              </div>
            </form>
          </div>

          {/* Leadership List */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white text-amber-400">School Leadership ({leadership.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {leadership.map((s) => (
                <div key={s.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden shrink-0 border border-slate-700">
                      {s.img ? (
                        <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-amber-400 font-bold text-xs">
                          {s.name.substring(0, 2)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{s.name}</h4>
                      <p className="text-xs text-amber-400 font-semibold">{s.role}</p>
                      <p className="text-[11px] text-slate-500">{s.qual}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteStaff(s.id, "leadership")} className="text-rose-400 hover:text-rose-300 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Teaching List */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white text-emerald-400">Teaching Faculty ({teaching.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {teaching.map((s) => (
                <div key={s.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white text-xs">{s.name}</h4>
                    <p className="text-[11px] text-slate-400">{s.role} ({s.qual})</p>
                  </div>
                  <button onClick={() => handleDeleteStaff(s.id, "teaching")} className="text-rose-400 hover:text-rose-300 p-1">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SCHOOL CONTACT & INFO */}
      {activeTab === "settings" && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white">Edit General School Contact & Info</h3>
            <p className="text-xs text-slate-400 mt-1">Updates banner line, hero quote, contact numbers, and bank account info.</p>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Admissions Banner Tag</label>
                <input
                  type="text"
                  value={settings.admissionsTag}
                  onChange={(e) => setSettings({ ...settings, admissionsTag: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Hero Quote Line</label>
                <input
                  type="text"
                  value={settings.heroQuote}
                  onChange={(e) => setSettings({ ...settings, heroQuote: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Contact Phone Number</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Contact Email Address</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-400 mb-2">School Address</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Donation Bank Account Number</label>
                <input
                  type="text"
                  value={settings.bankAccount}
                  onChange={(e) => setSettings({ ...settings, bankAccount: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-2">Donation IFSC Code</label>
                <input
                  type="text"
                  value={settings.ifsc}
                  onChange={(e) => setSettings({ ...settings, ifsc: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
            >
              <Save className="w-5 h-5" /> Save General Settings
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
