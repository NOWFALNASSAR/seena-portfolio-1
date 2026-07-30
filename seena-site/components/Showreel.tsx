"use client";

import { useEffect } from "react";
import type { MediaItem } from "@/lib/cloudinary";
import type { ExternalVideo } from "@/lib/cloudinary";
import { getYouTubeEmbedUrl, isInstagramUrl } from "@/lib/embed";

export default function Showreel({
  uploadedVideos,
  externalVideos,
}: {
  uploadedVideos: MediaItem[];
  externalVideos: ExternalVideo[];
}) {
  const hasInstagram = externalVideos.some((v) => isInstagramUrl(v.url));

  useEffect(() => {
    if (!hasInstagram) return;
    // Load Instagram's official embed script so instagram-media blockquotes render.
    if (document.getElementById("instagram-embed-script")) {
      // @ts-ignore
      window.instgrm?.Embeds?.process();
      return;
    }
    const script = document.createElement("script");
    script.id = "instagram-embed-script";
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [hasInstagram, externalVideos]);

  const hasAny = uploadedVideos.length > 0 || externalVideos.length > 0;

  return (
    <section id="showreel" className="bg-emerald px-[5vw] py-36">
      <div className="reveal mb-14 max-w-xl mx-auto text-center">
        <span className="block text-xs tracking-[0.35em] uppercase text-gold mb-4">Motion</span>
        <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)]">Showreel</h2>
      </div>

      {!hasAny ? (
        <div className="reveal max-w-2xl mx-auto border border-gold/20 py-16 px-8 text-center">
          <div className="w-[74px] h-[74px] rounded-full border border-gold mx-auto mb-8 flex items-center justify-center text-gold text-xl">
            ▶
          </div>
          <p className="font-serif-italic text-lg text-ivory/60">
            Add a video clip or paste a Reel/YouTube link from the admin panel — it plays right here.
          </p>
        </div>
      ) : (
        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {uploadedVideos.map((v) => (
            <video
              key={v.publicId}
              src={v.url}
              controls
              className="w-full aspect-video bg-black"
            />
          ))}

          {externalVideos.map((v) => {
            const yt = getYouTubeEmbedUrl(v.url);
            if (yt) {
              return (
                <iframe
                  key={v.url}
                  src={yt}
                  title={v.label || "Showreel video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full aspect-video"
                />
              );
            }
            if (isInstagramUrl(v.url)) {
              return (
                <blockquote
                  key={v.url}
                  className="instagram-media w-full"
                  data-instgrm-permalink={v.url}
                  data-instgrm-version="14"
                />
              );
            }
            return (
              <a
                key={v.url}
                href={v.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center border border-gold/30 aspect-video text-gold-soft underline"
              >
                {v.label || "Watch video"}
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
