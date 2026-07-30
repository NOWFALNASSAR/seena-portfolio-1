import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export type MediaItem = {
  publicId: string;
  url: string;
  resourceType: "image" | "video";
  caption?: string;
  createdAt: string;
};

const SECTIONS = [
  "hero",
  "about",
  "bridal",
  "fashion",
  "lifestyle",
  "gallery",
  "showreel",
] as const;
export type Section = (typeof SECTIONS)[number];
export { SECTIONS };

// Fetch every asset tagged with a given section, newest first.
export async function getMediaForSection(section: Section): Promise<MediaItem[]> {
  try {
    const result = await cloudinary.api.resources_by_tag(section, {
      max_results: 60,
      context: true,
      resource_type: "image",
    });
    const videos = await cloudinary.api.resources_by_tag(section, {
      max_results: 60,
      context: true,
      resource_type: "video",
    });
    const all = [...(result.resources || []), ...(videos.resources || [])];
    return all
      .map((r: any): MediaItem => ({ (just adding ": MediaItem" right after "(r: any)")
      
        publicId: r.public_id,
        url: r.secure_url,
        resourceType: r.resource_type === "video" ? "video" : "image",
        caption: r.context?.custom?.caption || r.context?.caption || "",
        createdAt: r.created_at,
      }))
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  } catch (err) {
    // No assets tagged yet, or Cloudinary not configured — fail soft.
    console.error(`Cloudinary fetch failed for section "${section}":`, err);
    return [];
  }
}

export async function uploadMedia(
  fileBuffer: Buffer,
  section: Section,
  caption: string
): Promise<MediaItem> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        tags: [section],
        context: caption ? { caption } : undefined,
        folder: "seena-portfolio",
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({
          publicId: result.public_id,
          url: result.secure_url,
          resourceType: result.resource_type === "video" ? "video" : "image",
          caption,
          createdAt: result.created_at,
        });
      }
    );
    stream.end(fileBuffer);
  });
}

export async function deleteMedia(publicId: string, resourceType: "image" | "video") {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

// --- External video links (YouTube / Instagram Reel URLs) for the Showreel section ---
// Stored as a small raw JSON file in Cloudinary so no separate database is needed.

const VIDEO_CONFIG_PUBLIC_ID = "seena-portfolio/site-config/videos";

export type ExternalVideo = { url: string; label: string };

export async function getExternalVideos(): Promise<ExternalVideo[]> {
  try {
    const resource = await cloudinary.api.resource(VIDEO_CONFIG_PUBLIC_ID, {
      resource_type: "raw",
    });
    const res = await fetch(resource.secure_url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function saveExternalVideos(videos: ExternalVideo[]) {
  const json = Buffer.from(JSON.stringify(videos, null, 2));
  return new Promise<void>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: VIDEO_CONFIG_PUBLIC_ID,
        overwrite: true,
        invalidate: true,
      },
      (error) => {
        if (error) return reject(error);
        resolve();
      }
    );
    stream.end(json);
  });
}

export default cloudinary;
