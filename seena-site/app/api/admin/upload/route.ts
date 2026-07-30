import { NextRequest, NextResponse } from "next/server";
import { uploadMedia, SECTIONS, type Section } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const file = form.get("file") as File | null;
  const section = form.get("section") as string | null;
  const caption = (form.get("caption") as string | null) || "";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!section || !SECTIONS.includes(section as Section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const maxBytes = 100 * 1024 * 1024; // 100MB, comfortable for photos + short video clips
  if (file.size > maxBytes) {
    return NextResponse.json({ error: "File is too large (max 100MB)" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const media = await uploadMedia(buffer, section as Section, caption);
    return NextResponse.json({ ok: true, media });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
