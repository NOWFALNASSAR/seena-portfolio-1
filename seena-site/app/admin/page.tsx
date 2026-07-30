"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { MediaItem, Section } from "@/lib/cloudinary";

const SECTION_LABELS: Record<Section, string> = {
  hero: "Hero (homepage cover photo)",
  about: "About (single portrait)",
  bridal: "Portfolio — Bridal & Jewellery",
  fashion: "Portfolio — Fashion & Editorial",
  lifestyle: "Portfolio — Lifestyle",
  gallery: "General Gallery",
  showreel: "Showreel (video clips)",
};

const SECTION_ORDER: Section[] = [
  "hero",
  "about",
  "bridal",
  "fashion",
  "lifestyle",
  "gallery",
  "showreel",
];

type ExternalVideo = { url: string; label: string };

export default function AdminPage() {
  const router = useRouter();
  const [section, setSection] = useState<Section>("hero");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const [externalVideos, setExternalVideos] = useState<ExternalVideo[]>([]);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [newVideoLabel, setNewVideoLabel] = useState("");

  async function loadMedia(s: Section) {
    setLoading(true);
    const res = await fetch(`/api/admin/list?section=${s}`);
    const data = await res.json();
    setMedia(data.media || []);
    setLoading(false);
  }

  async function loadVideos() {
    const res = await fetch("/api/admin/videos");
    const data = await res.json();
    setExternalVideos(data.videos || []);
  }

  useEffect(() => {
    loadMedia(section);
  }, [section]);

  useEffect(() => {
    loadVideos();
  }, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setMessage("");
    setLoading(true);

    const form = new FormData();
    form.append("file", file);
    form.append("section", section);
    form.append("caption", caption);

    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    setLoading(false);

    if (res.ok) {
      setMessage("Uploaded.");
      setFile(null);
      setCaption("");
      loadMedia(section);
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage(data.error || "Upload failed.");
    }
  }

  async function handleDelete(item: MediaItem) {
    if (!confirm("Remove this photo/video from the site?")) return;
    const res = await fetch("/api/admin/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId: item.publicId, resourceType: item.resourceType }),
    });
    if (res.ok) loadMedia(section);
  }

  async function handleAddVideo(e: React.FormEvent) {
    e.preventDefault();
    if (!newVideoUrl.trim()) return;
    const updated = [...externalVideos, { url: newVideoUrl.trim(), label: newVideoLabel.trim() }];
    const res = await fetch("/api/admin/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videos: updated }),
    });
    if (res.ok) {
      setExternalVideos(updated);
      setNewVideoUrl("");
      setNewVideoLabel("");
    }
  }

  async function handleRemoveVideo(url: string) {
    const updated = externalVideos.filter((v) => v.url !== url);
    const res = await fetch("/api/admin/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videos: updated }),
    });
    if (res.ok) setExternalVideos(updated);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-emerald-deep text-ivory px-6 py-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <h1 className="font-display text-2xl tracking-wide">Site Admin</h1>
        <div className="flex gap-4">
          <a href="/" target="_blank" className="text-gold-soft text-sm underline">
            View live site
          </a>
          <button onClick={handleLogout} className="text-sm text-ivory/50 underline">
            Log out
          </button>
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {SECTION_ORDER.map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={`px-4 py-2 text-xs tracking-wide border ${
              section === s
                ? "bg-gold text-emerald-deep border-gold"
                : "border-ivory/20 text-ivory/60 hover:border-gold/50"
            }`}
          >
            {SECTION_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Upload form */}
      <form
        onSubmit={handleUpload}
        className="border border-gold/20 p-6 mb-10 flex flex-col gap-4"
      >
        <h2 className="text-sm tracking-wide text-gold uppercase">
          Add a photo or video to: {SECTION_LABELS[section]}
        </h2>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm"
        />
        <input
          type="text"
          placeholder="Optional caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="bg-transparent border border-ivory/20 focus:border-gold outline-none px-4 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={!file || loading}
          className="self-start bg-gold text-emerald-deep px-6 py-2.5 text-xs tracking-[0.2em] uppercase hover:bg-gold-soft transition-colors disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
        {message && <p className="text-sm text-gold-soft">{message}</p>}
        {(section === "hero" || section === "about") && (
          <p className="text-xs text-ivory/40">
            This section shows one photo on the site — the most recently uploaded one is used.
            Upload a new photo here to replace it.
          </p>
        )}
      </form>

      {/* Current media in this section */}
      <div className="mb-16">
        <h2 className="text-sm tracking-wide text-gold uppercase mb-4">Currently on the site</h2>
        {loading && media.length === 0 ? (
          <p className="text-ivory/40 text-sm">Loading...</p>
        ) : media.length === 0 ? (
          <p className="text-ivory/40 text-sm">Nothing uploaded to this section yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {media.map((item) => (
              <div key={item.publicId} className="relative border border-ivory/10">
                {item.resourceType === "video" ? (
                  <video src={item.url} className="w-full aspect-square object-cover" muted />
                ) : (
                  <img src={item.url} alt={item.caption || ""} className="w-full aspect-square object-cover" />
                )}
                <button
                  onClick={() => handleDelete(item)}
                  className="absolute top-2 right-2 bg-black/70 text-red-300 text-xs px-2 py-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* External video links for showreel */}
      <div className="border border-gold/20 p-6">
        <h2 className="text-sm tracking-wide text-gold uppercase mb-4">
          Showreel links (Instagram Reel / YouTube)
        </h2>
        <form onSubmit={handleAddVideo} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="url"
            required
            placeholder="Paste a Reel or YouTube link"
            value={newVideoUrl}
            onChange={(e) => setNewVideoUrl(e.target.value)}
            className="flex-1 bg-transparent border border-ivory/20 focus:border-gold outline-none px-4 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Label (optional)"
            value={newVideoLabel}
            onChange={(e) => setNewVideoLabel(e.target.value)}
            className="bg-transparent border border-ivory/20 focus:border-gold outline-none px-4 py-2 text-sm sm:w-48"
          />
          <button
            type="submit"
            className="bg-gold text-emerald-deep px-6 py-2 text-xs tracking-[0.2em] uppercase hover:bg-gold-soft transition-colors"
          >
            Add
          </button>
        </form>

        {externalVideos.length === 0 ? (
          <p className="text-ivory/40 text-sm">No links added yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {externalVideos.map((v) => (
              <li
                key={v.url}
                className="flex items-center justify-between border border-ivory/10 px-4 py-2 text-sm"
              >
                <span className="truncate mr-4">{v.label || v.url}</span>
                <button
                  onClick={() => handleRemoveVideo(v.url)}
                  className="text-red-300 text-xs flex-none"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
