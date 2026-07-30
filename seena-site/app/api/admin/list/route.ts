import { NextRequest, NextResponse } from "next/server";
import { getMediaForSection, SECTIONS, type Section } from "@/lib/cloudinary";

export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get("section");

  if (!section || !SECTIONS.includes(section as Section)) {
    return NextResponse.json({ error: "Invalid section" }, { status: 400 });
  }

  const media = await getMediaForSection(section as Section);
  return NextResponse.json({ media });
}
