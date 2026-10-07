const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://haymfzaossavvchrdovn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhheW1memFvc3NhdnZjaHJkb3ZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDU2NzAzOCwiZXhwIjoyMTA2MTQzMDM4fQ.LVONUCgCj35M1-i57pZsG7ryBJ9tUyoLZ_GMFLdjfX4";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
});

const defaultFullData = {
  hero: {
    admissionsTag: "✨ Admissions Open for 2026-27 ✨",
    schoolTitle: "Prof. MVS Koteswara Rao Memorial School",
    sloganQuote: `"It's our responsibility to pay back to the SOCIETY"`,
    description: "Continuing the legacy of providing accessible, high-quality education in Guntur. We nurture the leaders of tomorrow with fun, holistic development, and endless creativity! 🚀",
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
  },
  about: {
    tag: "Our Philosophy",
    title: "Why Choose Prof. MVS Koteswara Rao Memorial School?",
    cards: [
      {
        id: "a1",
        title: "Quality Education",
        description: "We believe in empowering students with knowledge that transcends textbooks, preparing them for real-world challenges through interactive learning.",
        color: "orange"
      },
      {
        id: "a2",
        title: "Social Responsibility",
        description: "Instilling a sense of duty to pay back to the society that nurtures us is at the core of our educational philosophy.",
        color: "red"
      },
      {
        id: "a3",
        title: "Holistic Growth",
        description: "Fostering excellence not just in academics, but in sports, arts, and character building for complete all-around development.",
        color: "indigo"
      }
    ]
  },
  academics: {
    tag: "Curriculum",
    title: "Academic Excellence",
    description: "Our comprehensive English Medium curriculum is designed to stimulate intellectual curiosity and foster a lifelong love for learning. We maintain optimal student-teacher ratios for personalized attention.",
    image: "/event-1.jpg",
    programs: [
      { id: "p1", text: "Pre-Primary & Nursery Education" },
      { id: "p2", text: "Primary & Middle School (E.M)" },
      { id: "p3", text: "High School State Board & Digital Learning" }
    ]
  },
  support: {
    tag: "Support Us",
    title: "For Online Donations",
    schoolName: "Prof. MVS Koteswara Rao Memorial School",
    bankName: "Union Bank",
    accountNumber: "156910100118069",
    ifsc: "UBIN0815691"
  },
  contact: {
    tag: "Contact Us",
    title: "Get in Touch With Us",
    phone: "9849532787",
    email: "mvskchool22754@gmail.com",
    address: "Prof. MVS Koteswara Rao Memorial School, Sundaraiah Nagar, Adavithakkellapadu Road, Guntur, Andhra Pradesh 522006, India.",
    footerAbout: `"It's our responsibility to pay back to the SOCIETY" Nurturing students to become responsible, educated citizens of tomorrow.`,
    persons: [
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
    ]
  },
  notices: [
    { id: "1", tag: "NEW", tagColor: "orange", text: "Parent-Teacher Meeting scheduled for Nov 15th." },
    { id: "2", tag: "SPORTS", tagColor: "blue", text: "Annual Sports Day registration closes this Friday." },
    { id: "3", tag: "ACADEMICS", tagColor: "green", text: "Term 1 Syllabus has been updated on the portal." }
  ],
  popup: {
    enabled: true,
    title: "Campus Update",
    text: "We just had an amazing Independence Day celebration and Telugu Bhasha Dinotsavam! Check out the gallery on our portal."
  },
  gallery: [
    { id: "1", url: "/event-1.jpg", title: "Sports Day" },
    { id: "2", url: "/event-2.jpg", title: "Cultural Event" },
    { id: "3", url: "/event-3.jpg", title: "Independence Day" },
    { id: "4", url: "/event-4.jpg", title: "Telugu Bhasha Dinotsavam" },
    { id: "5", url: "/event-5.jpg", title: "Science Fair" },
    { id: "6", url: "/event-6.jpg", title: "Annual Gathering" },
    { id: "7", url: "/event-7.jpg", title: "Award Ceremony" },
    { id: "8", url: "/event-8.jpg", title: "Campus Activity" }
  ],
  leadership: [
    { id: "l1", name: "N. Tandava Krishna", role: "Secretary & Correspondent", qual: "BA. B.Ed.", img: "/tandava-krishna.jpg", category: "leadership" },
    { id: "l2", name: "K. Durga Naga Divya", role: "Primary Incharge", qual: "BSc.,B.Ed.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop", category: "leadership" },
    { id: "l3", name: "L. S. Bharavi", role: "Head Master", qual: "MA (Soc)", img: "/ls-bharavi..jpg", category: "leadership" },
    { id: "l4", name: "P. Sankar", role: "Principal", qual: "MSc.Ph.D.,MA.Ph.D.", img: "/p-sankar.jpg", category: "leadership" }
  ],
  teaching: [
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
  ],
  nonTeaching: [
    { id: "nt1", name: "J. Pavani", role: "Office Incharge", qual: "MBA (Fin & Hr)", category: "non-teaching" },
    { id: "nt2", name: "K. Anjaneyulu", role: "Care Taker", qual: "10th", category: "non-teaching" },
    { id: "nt3", name: "M. Atchyutha Kumari", role: "Aaya", qual: "-", category: "non-teaching" },
    { id: "nt4", name: "K. Naga Malleswari", role: "Aaya", qual: "-", category: "non-teaching" },
    { id: "nt5", name: "N. Padma", role: "Aaya", qual: "-", category: "non-teaching" }
  ],
  settings: {
    admissionsTag: "✨ Admissions Open for 2026-27 ✨",
    heroQuote: `"It's our responsibility to pay back to the SOCIETY"`,
    phone: "9849532787",
    email: "mvskchool22754@gmail.com",
    address: "Prof. MVS Koteswara Rao Memorial School, Sundaraiah Nagar, Adavithakkellapadu Road, Guntur, Andhra Pradesh 522006, India.",
    bankAccount: "156910100118069",
    ifsc: "UBIN0815691"
  }
};

async function seed() {
  await supabase.storage.createBucket("cms-storage", { public: true }).catch(() => {});
  const buf = Buffer.from(JSON.stringify(defaultFullData, null, 2), "utf-8");
  const { data, error } = await supabase.storage
    .from("cms-storage")
    .upload("cms-data.json", buf, {
      contentType: "application/json",
      upsert: true
    });

  if (error) {
    console.error("Supabase seed error:", error);
  } else {
    console.log("Supabase seed successful! Stored full dataset.");
  }
}

seed();
