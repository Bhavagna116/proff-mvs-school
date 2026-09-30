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
    description: "Continuing the legacy of providing accessible, high-quality education in Mandapeta. We nurture the leaders of tomorrow with fun, holistic development, and endless creativity! 🚀",
    images: ["/event-1.jpg", "/event-2.jpg", "/event-3.jpg", "/event-4.jpg", "/event-5.jpg", "/event-6.jpg", "/event-7.jpg", "/event-8.jpg"]
  },
  about: {
    tag: "Our Philosophy",
    title: "Why Choose Prof. MVS Koteswara Rao Memorial School?",
    cards: [
      { id: "a1", title: "Quality Education", description: "We believe in empowering students with knowledge that transcends textbooks, preparing them for real-world challenges through interactive learning.", color: "orange" },
      { id: "a2", title: "Social Responsibility", description: "Instilling a sense of duty to pay back to the society that nurtures us is at the core of our educational philosophy.", color: "red" },
      { id: "a3", title: "Holistic Growth", description: "Fostering excellence not just in academics, but in sports, arts, and character building for complete all-around development.", color: "indigo" }
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
    address: "Prof. MVS Koteswara Rao Memorial School, Mandapeta, Andhra Pradesh, India.",
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
  }
};

async function main() {
  await supabase.storage.createBucket("cms-storage", { public: true }).catch(() => {});
  const { data, error } = await supabase.storage
    .from("cms-storage")
    .upload("cms-data.json", JSON.stringify(defaultFullData, null, 2), {
      contentType: "application/json",
      upsert: true
    });

  if (error) {
    console.error("Upload error:", error);
  } else {
    console.log("Successfully initialized cms-data.json in Supabase storage!", data);
  }
}

main();
