"use client";

import { useState } from "react";
import Image from "next/image";
import type { MediaItem } from "@/lib/cloudinary";

export default function MediaGrid({
  items,
  columns = 2,
  emptyLabel,
}: {
  items: MediaItem[];
  columns?: 2 | 4;
  emptyLabel: string;
}) {
  const [active, setActive] = useState<MediaItem | null>(null);

  if (items.length === 0) {
    return (
      <div className="border border-gold/20 py-16 text-center text-ivory/40 text-sm">
        {emptyLabel}
      </div>
    );
  }

  const gridCols =
    columns === 4
      ? "grid-cols-2 md:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <>
      <div className={`grid ${gridCols} gap-3.5`}>
        {items.map((item, i) => (
          <figure
            key={item.publicId}
            onClick={() => setActive(item)}
            className={`relative overflow-hidden cursor-pointer bg-emerald-mid group ${
              columns === 4 && i % 5 === 0 ? "row-span-2" : ""
            }`}
          >
            {item.resourceType === "video" ? (
              <video
                src={item.url}
                muted
                loop
                playsInline
                className="w-full h-full object-cover aspect-[3/4] transition-transform duration-700 group-hover:scale-105"
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => e.currentTarget.pause()}
              />
            ) : (
              <Image
                src={item.url}
                alt={item.caption || "Seena Grace John"}
                width={500}
                height={650}
                className="w-full h-full object-cover aspect-[3/4] transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 ring-0 group-hover:ring-1 ring-gold transition-all duration-300" />
          </figure>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-[4vw]"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-8 right-8 w-11 h-11 border border-gold/30 flex items-center justify-center text-ivory text-xl"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            ✕
          </button>
          {active.resourceType === "video" ? (
            <video
              src={active.url}
              controls
              autoPlay
              className="max-w-[90vw] max-h-[88vh] shadow-2xl"
            />
          ) : (
            <img
              src={active.url}
              alt={active.caption || "Seena Grace John"}
              className="max-w-[90vw] max-h-[88vh] object-contain shadow-2xl"
            />
          )}
        </div>
      )}
    </>
  );
}
