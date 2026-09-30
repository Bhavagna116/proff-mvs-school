import { NextRequest, NextResponse } from "next/server";
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

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "cms-data.json");

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

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const content = await fs.readFile(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content);
      // Merge with defaults in case new fields were added
      return { ...defaultFullData, ...parsed };
    } catch {
      // File does not exist or invalid JSON, initialize with defaults
      await fs.writeFile(DATA_FILE, JSON.stringify(defaultFullData, null, 2), "utf-8");
      return defaultFullData;
    }
  } catch (err) {
    console.error("Error accessing CMS data file:", err);
    return defaultFullData;
  }
}

export async function GET() {
  try {
    const data = await ensureDataFile();
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
    const current = await ensureDataFile();

    let updated = { ...current };

    if (body.section && body.data !== undefined) {
      // Partial update by section key: e.g. { section: 'contact', data: {...} }
      updated[body.section as keyof typeof defaultFullData] = body.data;
    } else {
      // Bulk update
      updated = { ...current, ...body };
    }

    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");

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
