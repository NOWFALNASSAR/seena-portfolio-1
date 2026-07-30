import { NextRequest, NextResponse } from "next/server";
import { getExternalVideos, saveExternalVideos } from "@/lib/cloudinary";

export async function GET() {
  const videos = await getExternalVideos();
  return NextResponse.json({ videos });
}

export async function POST(request: NextRequest) {
  const { videos } = await request.json();

  if (!Array.isArray(videos)) {
    return NextResponse.json({ error: "videos must be an array" }, { status: 400 });
  }
  const cleaned = videos
    .filter((v) => v && typeof v.url === "string" && v.url.trim())
    .map((v) => ({ url: v.url.trim(), label: (v.label || "").trim() }));

  try {
    await saveExternalVideos(cleaned);
    return NextResponse.json({ ok: true, videos: cleaned });
  } catch (err) {
    console.error("Saving video links failed:", err);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
