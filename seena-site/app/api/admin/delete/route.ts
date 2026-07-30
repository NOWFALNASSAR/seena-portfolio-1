import { NextRequest, NextResponse } from "next/server";
import { deleteMedia } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  const { publicId, resourceType } = await request.json();

  if (!publicId || !resourceType) {
    return NextResponse.json({ error: "Missing publicId or resourceType" }, { status: 400 });
  }

  try {
    await deleteMedia(publicId, resourceType);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Delete failed:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
