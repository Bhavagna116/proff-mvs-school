import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";
import {
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
  defaultNonTeaching,
  defaultSettings
} from "@/lib/cms-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://haymfzaossavvchrdovn.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhheW1memFvc3NhdnZjaHJkb3ZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDU2NzAzOCwiZXhwIjoyMTA2MTQzMDM4fQ.LVONUCgCj35M1-i57pZsG7ryBJ9tUyoLZ_GMFLdjfX4";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

const BUCKET_NAME = "cms-storage";
const FILE_NAME = "cms-data.json";

const DATA_DIR = path.join(process.cwd(), "data");
const LOCAL_DATA_FILE = path.join(DATA_DIR, "cms-data.json");

const defaultFullData = {
  hero: defaultHero,
  about: defaultAbout,
  academics: defaultAcademics,
  support: defaultSupport,
  contact: defaultContact,
  notices: defaultNoticeBoard,
  popup: defaultPopup,
  gallery: defaultGallery,
  leadership: defaultLeadership,
  teaching: defaultTeaching,
  nonTeaching: defaultNonTeaching,
  settings: defaultSettings
};

async function readFromSupabase() {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(FILE_NAME);

    if (error || !data) {
      return null;
    }

    const text = await data.text();
    const parsed = JSON.parse(text);
    return { ...defaultFullData, ...parsed };
  } catch (err) {
    console.warn("Error reading from Supabase storage:", err);
    return null;
  }
}

async function writeToSupabase(data: any) {
  try {
    // Ensure bucket exists
    await supabase.storage.createBucket(BUCKET_NAME, { public: true }).catch(() => {});
    
    const jsonString = JSON.stringify(data, null, 2);
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(FILE_NAME, jsonString, {
        contentType: "application/json",
        upsert: true
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Error writing to Supabase storage:", err);
    return false;
  }
}

async function readFromLocalFallback() {
  try {
    const content = await fs.readFile(LOCAL_DATA_FILE, "utf-8");
    const parsed = JSON.parse(content);
    return { ...defaultFullData, ...parsed };
  } catch {
    return defaultFullData;
  }
}

async function writeToLocalFallback(data: any) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(LOCAL_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Ignored in serverless/readonly environments
  }
}

async function getMergedData() {
  const remote = await readFromSupabase();
  if (remote) {
    // Update local cache if possible
    await writeToLocalFallback(remote);
    return remote;
  }
  const local = await readFromLocalFallback();
  // Try uploading local to Supabase to initialize cloud
  await writeToSupabase(local);
  return local;
}

export async function GET() {
  try {
    const data = await getMergedData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });
  } catch (err) {
    console.error("GET /api/cms error:", err);
    return NextResponse.json(defaultFullData, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = await getMergedData();

    let updated = { ...current };

    if (body.section && body.data !== undefined) {
      updated[body.section as keyof typeof defaultFullData] = body.data;
    } else {
      updated = { ...current, ...body };
    }

    // Persist to Supabase cloud storage (syncs across all devices & Vercel)
    await writeToSupabase(updated);
    // Also save locally
    await writeToLocalFallback(updated);

    return NextResponse.json({ success: true, data: updated }, {
      headers: {
        "Cache-Control": "no-store, no-cache"
      }
    });
  } catch (err) {
    console.error("POST /api/cms error:", err);
    return NextResponse.json({ success: false, error: "Failed to save CMS data" }, { status: 500 });
  }
}
